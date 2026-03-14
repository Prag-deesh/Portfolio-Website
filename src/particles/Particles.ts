/**
 * Particles — Core GPU-accelerated particle system.
 *
 * Manages:
 *  - Data textures (positions, targets)
 *  - Ping-pong render targets for GPU simulation
 *  - Simulation material (fragment shader physics)
 *  - Render material (points with GLSL vertex/fragment)
 *  - Web Worker dispatching for image→particle mapping
 */
import * as THREE from 'three'
import { generatePoissonPoints } from './poissonSampling'

// Shader imports
import simVertSrc from './shaders/sim.vert.glsl'
import simFragSrc from './shaders/sim.frag.glsl'
import renderVertSrc from './shaders/render.vert.glsl'
import renderFragSrc from './shaders/render.frag.glsl'

// Worker
import ParticleMapperWorker from './workers/particleMapper.worker.ts?worker'

const TEX_SIZE = 256
const TEX_LENGTH = TEX_SIZE * TEX_SIZE // 65,536

export interface ParticlesOptions {
  density: number
  textures: string[]
  color1: string
  color2: string
  color3: string
  colorScheme: number // 0 = dark, 1 = light
  particleScale: number
  pixelRatio: number
  borderSize: number
  alpha: number
}

export class Particles {
  // Texture dimensions
  readonly size = TEX_SIZE
  readonly length = TEX_LENGTH

  // Particle count (from Poisson sampling)
  count = 0

  // Raw data
  pointsBase: number[] = []
  nearestPointsData: number[][] = []

  // Three.js objects
  mesh!: THREE.Points
  simScene!: THREE.Scene
  simCamera!: THREE.OrthographicCamera
  simMaterial!: THREE.ShaderMaterial
  renderMaterial!: THREE.ShaderMaterial

  // Ping-pong render targets
  rt1!: THREE.WebGLRenderTarget
  rt2!: THREE.WebGLRenderTarget

  // Data textures
  posRefsTex!: THREE.DataTexture
  posNearestTex!: THREE.DataTexture
  positionTex!: THREE.DataTexture

  // Worker
  private workers: Worker[] = []
  private workersDone = 0
  private workerTotal = 0
  private resolveInit!: () => void

  // Options
  private options: ParticlesOptions

  constructor(options: ParticlesOptions) {
    this.options = options
  }

  /**
   * Async initialization: generates points, dispatches workers, sets up GPU pipeline.
   * Must be called before the render loop starts.
   */
  async init(scene: THREE.Scene): Promise<void> {
    // 1. Generate Poisson-sampled base positions
    this.pointsBase = generatePoissonPoints(this.options.density)
    this.count = this.pointsBase.length / 2
    console.log('[Particles] Poisson points:', this.count)

    // 2. Create data textures
    this.posRefsTex = this.createDataTexturePosition(this.pointsBase)
    this.positionTex = this.createDataTexturePosition(this.pointsBase)

    // 3. Set up ping-pong render targets
    const rtOptions: THREE.RenderTargetOptions = {
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      depthBuffer: false,
      stencilBuffer: false,
    }
    this.rt1 = new THREE.WebGLRenderTarget(TEX_SIZE, TEX_SIZE, rtOptions)
    this.rt2 = new THREE.WebGLRenderTarget(TEX_SIZE, TEX_SIZE, rtOptions)

    // 4. Create simulation scene (fullscreen quad)
    this.simScene = new THREE.Scene()
    this.simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    this.simMaterial = new THREE.ShaderMaterial({
      vertexShader: simVertSrc,
      fragmentShader: simFragSrc,
      uniforms: {
        uPosition: { value: this.positionTex },
        uPosRefs: { value: this.posRefsTex },
        uPosNearest: { value: this.posRefsTex }, // default: spring back to base
        uMousePos: { value: new THREE.Vector2(0, 0) },
        uRingRadius: { value: 0.175 },
        uRingWidth: { value: 0.05 },
        uRingWidth2: { value: 0.015 },
        uRingDisplacement: { value: 0.08 },
        uIsHovering: { value: 0.0 },
        uDeltaTime: { value: 0.016 },
        uTime: { value: 0 },
      },
      depthWrite: false,
      depthTest: false,
    })

    const simGeometry = new THREE.PlaneGeometry(2, 2)
    const simMesh = new THREE.Mesh(simGeometry, this.simMaterial)
    this.simScene.add(simMesh)

    // 5. Create render material + points mesh
    const c1 = new THREE.Color(this.options.color1)
    const c2 = new THREE.Color(this.options.color2)
    const c3 = new THREE.Color(this.options.color3)

    this.renderMaterial = new THREE.ShaderMaterial({
      vertexShader: renderVertSrc,
      fragmentShader: renderFragSrc,
      uniforms: {
        uPosition: { value: this.positionTex },
        uPixelRatio: { value: this.options.pixelRatio },
        uParticleScale: { value: this.options.particleScale },
        uIsHovering: { value: 0.0 },
        uTime: { value: 0 },
        uColorScheme: { value: this.options.colorScheme },
        uColor1: { value: c1 },
        uColor2: { value: c2 },
        uColor3: { value: c3 },
        uAlpha: { value: this.options.alpha },
        uRez: { value: new THREE.Vector2(1, 1) },
        uMousePos: { value: new THREE.Vector2(0, 0) },
        uBorderSize: { value: this.options.borderSize },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
    })

    // Points geometry with UV attribute
    const geometry = new THREE.BufferGeometry()
    const uvs = new Float32Array(this.count * 2)
    for (let i = 0; i < this.count; i++) {
      uvs[i * 2] = (i % TEX_SIZE) / TEX_SIZE
      uvs[i * 2 + 1] = Math.floor(i / TEX_SIZE) / TEX_SIZE
    }
    geometry.setAttribute('aUv', new THREE.BufferAttribute(uvs, 2))

    this.mesh = new THREE.Points(geometry, this.renderMaterial)
    this.mesh.frustumCulled = false
    scene.add(this.mesh)

    // 6. Load icon textures and compute nearest points via Web Workers
    await this.loadTextures()
  }

  /**
   * Load each icon texture, extract image data, send to Web Worker.
   */
  private loadTextures(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.resolveInit = resolve
      const textures = this.options.textures

      if (textures.length === 0) {
        // No textures — use base positions as targets
        this.posNearestTex = this.createDataTexturePosition(this.pointsBase)
        this.simMaterial.uniforms.uPosNearest.value = this.posNearestTex
        resolve()
        return
      }

      this.workerTotal = textures.length
      this.workersDone = 0
      this.nearestPointsData = new Array(textures.length)

      textures.forEach((url, index) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          console.log(`[Particles] Texture loaded: ${url} (${img.width}x${img.height})`)
          // Draw into offscreen canvas at 500×500
          const canvas = document.createElement('canvas')
          canvas.width = 500
          canvas.height = 500
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(img, 0, 0, 500, 500)
          const imageData = ctx.getImageData(0, 0, 500, 500)

          // Count non-transparent pixels
          let alphaCount = 0
          for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] > 128) alphaCount++
          }
          console.log(`[Particles] Visible pixels in ${url}: ${alphaCount}`)

          // Dispatch to worker
          const worker = new ParticleMapperWorker()
          worker.onmessage = (e: MessageEvent) => {
            const { nearestPoints, index: idx } = e.data
            console.log(`[Particles] Worker done for index ${idx}, nearestPoints length: ${nearestPoints.length}`)
            this.nearestPointsData[idx] = nearestPoints
            worker.terminate()
            this.onWorkerDone()
          }
          worker.postMessage({
            imageData,
            pointsBase: this.pointsBase,
            index,
            density: this.options.density,
          })
          this.workers.push(worker)
        }
        img.onerror = () => {
          // Fallback: use base positions if image fails
          console.warn(`[Particles] Failed to load texture: ${url}`)
          this.nearestPointsData[index] = [...this.pointsBase]
          this.onWorkerDone()
        }
        img.src = url
      })
    })
  }

  private onWorkerDone() {
    this.workersDone++
    if (this.workersDone >= this.workerTotal) {
      // All workers done — set first texture as default target
      this.setPointsTextureFromIndex(0)
      this.resolveInit()
    }
  }

  /**
   * Switch to a different target shape by index.
   */
  setPointsTextureFromIndex(index: number) {
    if (!this.nearestPointsData[index]) return
    this.posNearestTex = this.createDataTexturePosition(this.nearestPointsData[index])
    this.posNearestTex.needsUpdate = true
    this.simMaterial.uniforms.uPosNearest.value = this.posNearestTex
  }

  /**
   * Creates a Float32Array DataTexture (256×256, RGBA, Float) from a flat
   * position array [x0, y0, x1, y1, ...].
   * Positions are normalized by dividing by 250 → approximately -1 to 1.
   */
  createDataTexturePosition(positionArray: number[]): THREE.DataTexture {
    const data = new Float32Array(this.length * 4)
    const count = positionArray.length / 2

    for (let i = 0; i < count; i++) {
      const idx = i * 4
      data[idx + 0] = positionArray[i * 2 + 0] / 250
      data[idx + 1] = positionArray[i * 2 + 1] / 250
      data[idx + 2] = 0 // scale
      data[idx + 3] = Math.random() // initial lifetime (stagger particle births)
    }

    const tex = new THREE.DataTexture(
      data, TEX_SIZE, TEX_SIZE,
      THREE.RGBAFormat, THREE.FloatType
    )
    tex.needsUpdate = true
    return tex
  }

  /**
   * Update colors (e.g., on theme change).
   */
  setColors(color1: string, color2: string, color3: string) {
    this.renderMaterial.uniforms.uColor1.value.set(color1)
    this.renderMaterial.uniforms.uColor2.value.set(color2)
    this.renderMaterial.uniforms.uColor3.value.set(color3)
  }

  /**
   * Update color scheme (0 = dark, 1 = light).
   */
  setColorScheme(scheme: number) {
    this.renderMaterial.uniforms.uColorScheme.value = scheme
  }

  /**
   * Called on resize to update scale-related uniforms.
   */
  resize() {
    // Updated externally by ParticleScene
  }

  /**
   * Dispose all GPU resources.
   */
  dispose() {
    this.mesh.geometry.dispose()
    this.renderMaterial.dispose()
    this.simMaterial.dispose()
    this.rt1.dispose()
    this.rt2.dispose()
    this.posRefsTex.dispose()
    this.posNearestTex?.dispose()
    this.positionTex.dispose()
    this.workers.forEach((w) => w.terminate())
  }
}
