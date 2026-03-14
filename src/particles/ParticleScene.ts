/**
 * ParticleScene — Full Three.js scene orchestrator.
 *
 * Manages renderer, camera, raycasting, render loop, resize,
 * IntersectionObserver visibility, and GSAP hover animations.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { Particles, type ParticlesOptions } from './Particles'
import { mouseTracker } from './MouseTracker'

export interface ParticleSceneOptions {
  container: HTMLElement
  theme?: 'dark' | 'light'
  density?: number
  particlesScale?: number
  cameraZoom?: number
  color1?: string
  color2?: string
  color3?: string
  textures?: string[]
  pixelRatio?: number
  alpha?: number
  borderSize?: number
  ringDisplacement?: number
}

export class ParticleScene {
  // Config
  container: HTMLElement
  theme: 'dark' | 'light'
  density: number
  particlesScale: number
  cameraZoom: number
  color1: string
  color2: string
  color3: string
  textures: string[]
  pixelRatioVal: number
  alpha: number
  borderSize: number
  ringDisplacement: number

  // State
  hoverProgress = 0
  pushProgress = 0
  isHovering = false
  isIntersecting = false
  mouseIsOver = false
  isPaused = false
  private particleScale = 0.5

  // Smooth mouse lerp targets
  private smoothMouse = new THREE.Vector2()
  private targetMouse = new THREE.Vector2()
  private mouseSmoothing = 0.08 // Lerp speed — lower = more lag

  // Three.js
  canvas!: HTMLCanvasElement
  renderer!: THREE.WebGLRenderer
  camera!: THREE.PerspectiveCamera
  scene!: THREE.Scene
  raycastPlane!: THREE.Mesh
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()
  mousePos = new THREE.Vector2()
  intersectionPoint = new THREE.Vector3()
  clock = new THREE.Clock()
  time = 0
  lastTime = 0
  dt = 0

  // Particles
  particles!: Particles

  // Animation
  private animationFrameId = 0
  private observer?: IntersectionObserver
  private isVisible = true

  constructor(options: ParticleSceneOptions) {
    this.container = options.container
    this.theme = options.theme ?? 'dark'
    this.density = options.density ?? 150
    this.particlesScale = options.particlesScale ?? 0.5
    this.cameraZoom = options.cameraZoom ?? 3.5
    this.color1 = options.color1 ?? '#aecbfa'
    this.color2 = options.color2 ?? '#aecbfa'
    this.color3 = options.color3 ?? '#93bbfc'
    this.textures = options.textures ?? []
    this.pixelRatioVal = options.pixelRatio ?? Math.min(window.devicePixelRatio, 2)
    this.alpha = options.alpha ?? 1.0
    this.borderSize = options.borderSize ?? 0.05
    this.ringDisplacement = options.ringDisplacement ?? 0.08
  }

  /**
   * Initialize: create canvas, renderer, camera, scene, particles.
   * Returns a promise that resolves when all textures are loaded.
   */
  async init(): Promise<void> {
    // Canvas
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)

    // Ensure container has dimensions (wait a frame if needed)
    let w = this.container.offsetWidth
    let h = this.container.offsetHeight
    if (w === 0 || h === 0) {
      await new Promise((r) => requestAnimationFrame(r))
      w = this.container.offsetWidth || window.innerWidth
      h = this.container.offsetHeight || window.innerHeight
    }
    this.canvas.width = w
    this.canvas.height = h
    console.log('[ParticleScene] Canvas size:', w, 'x', h)

    // Renderer
    THREE.ColorManagement.enabled = false
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
      stencil: false,
      precision: 'highp',
    })

    const gl = this.renderer.getContext()
    const floatExt = gl.getExtension('EXT_color_buffer_float')
    console.log('[ParticleScene] WebGL float ext:', !!floatExt)

    this.renderer.setSize(w, h)
    this.renderer.setPixelRatio(this.pixelRatioVal)

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      40,
      this.canvas.width / this.canvas.height,
      0.1,
      1000
    )
    this.camera.position.z = this.cameraZoom

    // Scene
    this.scene = new THREE.Scene()
    // Transparent background — let the page background show through
    // scene.background is not set so alpha works

    // Invisible raycast plane
    this.raycastPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshBasicMaterial({ visible: false })
    )
    this.scene.add(this.raycastPlane)

    // Particles
    const colorScheme = this.theme === 'dark' ? 0 : 1
    this.particleScale =
      this.renderer.domElement.width / this.pixelRatioVal / 2000 * this.particlesScale

    const particleOpts: ParticlesOptions = {
      density: this.density,
      textures: this.textures,
      color1: this.color1,
      color2: this.color2,
      color3: this.color3,
      colorScheme,
      particleScale: this.particleScale,
      pixelRatio: this.pixelRatioVal,
      borderSize: this.borderSize,
      alpha: this.alpha,
    }

    this.particles = new Particles(particleOpts)
    await this.particles.init(this.scene)

    // Set initial resolution uniform
    this.particles.renderMaterial.uniforms.uRez.value.set(
      this.canvas.width, this.canvas.height
    )

    // Events
    window.addEventListener('resize', this.onWindowResize)

    // Intersection observer — pause when off-screen
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true
            this.resume()
          } else {
            this.isVisible = false
            this.stop()
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    )
    this.observer.observe(this.container)

    console.log('[ParticleScene] Init complete. particleScale:', this.particleScale, 'count:', this.particles.count)

    // Start render loop
    this.animate()
  }

  // ── Mouse ──

  preRender() {
    const mt = mouseTracker

    // Don't track until first mousemove (avoids snapping to 0,0)
    if (!mt.hasMoved) return

    const rect = this.canvas.getBoundingClientRect()

    // Normalize mouse to NDC [-1, 1] relative to the canvas bounds
    // MouseTracker captures global window mousemove — no pointer-events needed
    this.mouse.x = ((mt.cursor.x - rect.left) / rect.width) * 2 - 1
    this.mouse.y = -((mt.cursor.y - rect.top) / rect.height) * 2 + 1

    // Mouse is "over" if cursor is within the viewport
    // (canvas is full-screen fixed with pointer-events:none, so check viewport)
    this.mouseIsOver =
      mt.cursor.x >= 0 && mt.cursor.x <= mt.screenWidth &&
      mt.cursor.y >= 0 && mt.cursor.y <= mt.screenHeight

    // Raycast against invisible plane
    this.raycaster.setFromCamera(this.mouse, this.camera)
    const hits = this.raycaster.intersectObject(this.raycastPlane)

    if (hits.length > 0) {
      this.intersectionPoint.copy(hits[0].point)
      this.isIntersecting = true
    } else {
      this.isIntersecting = false
    }
  }

  // ── Simulation Update ──

  update() {
    if (!this.particles) return

    // Update target mouse position from raycast
    if (this.isIntersecting) {
      this.targetMouse.set(
        this.intersectionPoint.x * 0.175,
        this.intersectionPoint.y * 0.175
      )
    }

    // Smooth lerp toward target (creates the fluid lag like Antigravity)
    this.smoothMouse.lerp(this.targetMouse, this.mouseSmoothing)
    this.mousePos.copy(this.smoothMouse)

    // Auto-hover: activate when mouse is inside canvas bounds
    // This mimics Antigravity which always reacts to cursor
    const targetHover = this.mouseIsOver ? 1.0 : 0.0
    this.hoverProgress += (targetHover - this.hoverProgress) * 0.06

    const elapsed = this.clock.getElapsedTime()

    // Simulation uniforms
    this.particles.simMaterial.uniforms.uMousePos.value = this.mousePos
    this.particles.simMaterial.uniforms.uIsHovering.value = this.hoverProgress
    this.particles.simMaterial.uniforms.uTime.value = elapsed
    this.particles.simMaterial.uniforms.uDeltaTime.value = this.dt
    this.particles.simMaterial.uniforms.uRingDisplacement.value = this.ringDisplacement

    // Oscillating ring radius for organic feel
    this.particles.simMaterial.uniforms.uRingRadius.value =
      0.175 + Math.sin(this.time * 1) * 0.03 + Math.cos(this.time * 3) * 0.02

    // Render uniforms
    this.particles.renderMaterial.uniforms.uPosition.value = this.particles.rt2.texture
    this.particles.renderMaterial.uniforms.uTime.value = elapsed
    this.particles.renderMaterial.uniforms.uMousePos.value = this.mousePos
    this.particles.renderMaterial.uniforms.uIsHovering.value = this.hoverProgress
    this.particles.renderMaterial.uniforms.uParticleScale.value = this.particleScale
  }

  // ── Render Loop ──

  private _frameCount = 0

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate)

    if (!this.isVisible || this.isPaused) return

    this._frameCount++
    if (this._frameCount === 1) {
      console.log('[ParticleScene] First frame rendering')
      console.log('[ParticleScene] particleScale:', this.particleScale)
      console.log('[ParticleScene] particles.count:', this.particles?.count)
      console.log('[ParticleScene] isVisible:', this.isVisible, 'isPaused:', this.isPaused)
    }

    // Delta time
    const now = this.clock.getElapsedTime()
    this.dt = now - this.lastTime
    this.lastTime = now
    this.time += this.dt

    // Raycast every frame for smooth continuous tracking (like Antigravity)
    if (this.raycastPlane) {
      this.preRender()
    }

    // Update simulation uniforms
    this.update()

    // Render simulation pass to FBO
    this.particles.simMaterial.uniforms.uPosition.value = this.particles.rt1.texture
    this.renderer.setRenderTarget(this.particles.rt2)
    this.renderer.render(this.particles.simScene, this.particles.simCamera)
    this.renderer.setRenderTarget(null)

    // Update render material with new simulation result
    this.particles.renderMaterial.uniforms.uPosition.value =
      this.particles.rt2.texture

    // Render particles to screen
    this.renderer.autoClear = false
    this.renderer.clear()
    this.renderer.render(this.scene, this.camera)

    // Swap ping-pong targets
    const temp = this.particles.rt1
    this.particles.rt1 = this.particles.rt2
    this.particles.rt2 = temp
  }

  // ── Hover Animations ──
  // These are now optional — the particle system auto-detects mouse presence.
  // Call these to force-trigger hover state (e.g., from a parent component).

  onHoverStart() {
    this.isHovering = true
  }

  onHoverEnd() {
    this.isHovering = false
  }

  // ── Shape Morphing ──

  setPointsTextureFromIndex(index: number) {
    gsap.delayedCall(0.1, () => {
      this.particles.setPointsTextureFromIndex(index)
    })
    gsap.fromTo(
      this,
      { pushProgress: 0 },
      { pushProgress: 1, duration: 2, ease: 'power2.out' }
    )
  }

  // ── Theme ──

  setTheme(theme: 'dark' | 'light') {
    this.theme = theme
    const scheme = theme === 'dark' ? 0 : 1
    this.particles.setColorScheme(scheme)
  }

  setColors(c1: string, c2: string, c3: string) {
    this.color1 = c1
    this.color2 = c2
    this.color3 = c3
    this.particles.setColors(c1, c2, c3)
  }

  // ── Resize ──

  onWindowResize = () => {
    this.canvas.width = this.container.offsetWidth
    this.canvas.height = this.container.offsetHeight
    this.renderer.setSize(this.canvas.width, this.canvas.height)
    this.camera.aspect = this.canvas.width / this.canvas.height
    this.camera.updateProjectionMatrix()

    // Update particle scale based on new canvas width
    this.particleScale =
      this.renderer.domElement.width / this.pixelRatioVal / 2000 * this.particlesScale

    // Update pixel ratio + resolution uniforms
    if (this.particles) {
      this.particles.renderMaterial.uniforms.uPixelRatio.value = this.pixelRatioVal
      this.particles.renderMaterial.uniforms.uRez.value.set(
        this.canvas.width, this.canvas.height
      )
    }
  }

  // ── Pause/Resume ──

  stop() {
    this.isPaused = true
    this.clock.stop()
  }

  resume() {
    this.isPaused = false
    this.clock.start()
  }

  // ── Cleanup ──

  destroy() {
    this.observer?.disconnect()
    cancelAnimationFrame(this.animationFrameId)
    window.removeEventListener('resize', this.onWindowResize)

    // Dispose raycast plane
    this.scene.remove(this.raycastPlane)
    this.raycastPlane.geometry.dispose()
    ;(this.raycastPlane.material as THREE.Material).dispose()

    // Dispose particles
    if (this.particles) {
      this.scene.remove(this.particles.mesh)
      this.particles.dispose()
    }

    // Dispose renderer
    this.renderer.dispose()

    // Remove canvas
    if (this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas)
    }
  }
}
