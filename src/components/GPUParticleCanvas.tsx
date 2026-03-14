/**
 * GPUParticleCanvas — React wrapper for the GPU-accelerated particle system.
 *
 * Renders a Three.js canvas with thousands of particles that:
 *  - Are evenly distributed via Poisson Disk Sampling
 *  - Form into icon/image shapes
 *  - React to mouse with ripple displacement, spring physics, color shifts
 *  - Morph between target shapes
 *  - Run simulation entirely on the GPU via GLSL fragment shaders
 */
import { useEffect, useRef } from 'react'
import { ParticleScene, type ParticleSceneOptions } from '../particles'

interface GPUParticleCanvasProps {
  /** CSS class for the outer container */
  className?: string
  /** Current theme */
  theme?: 'dark' | 'light'
  /** Particle density: 50–250 (default 150) */
  density?: number
  /** Visual size of each particle: 0.1–4.0 (default 0.5) */
  particlesScale?: number
  /** Camera Z distance: 3.5–8.8 (default 3.5) */
  cameraZoom?: number
  /** Base particle color */
  color1?: string
  /** Mid velocity color */
  color2?: string
  /** Accent color (near cursor) */
  color3?: string
  /** Icon texture paths for shape morphing */
  textures?: string[]
  /** Global alpha: 0–1 (default 1) */
  alpha?: number
  /** Particle border softness (default 0.05) */
  borderSize?: number
  /** Displacement strength (default 0.08) */
  ringDisplacement?: number
  /** Active shape index for morphing */
  activeShapeIndex?: number
  /** Whether mouse interaction is enabled */
  interactive?: boolean
}

const GPUParticleCanvas = ({
  className = '',
  theme = 'dark',
  density = 150,
  particlesScale = 0.5,
  cameraZoom = 3.5,
  color1,
  color2,
  color3,
  textures = ['/particle-icon.svg', '/particle-icon-code.svg'],
  alpha = 1.0,
  borderSize = 0.05,
  ringDisplacement = 0.08,
  activeShapeIndex = 0,
  interactive = true,
}: GPUParticleCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<ParticleScene | null>(null)
  const prevShapeIndex = useRef(activeShapeIndex)

  // Resolve theme-aware default colors
  const resolvedColor1 = color1 ?? (theme === 'dark' ? '#6388ff' : '#2563eb')
  const resolvedColor2 = color2 ?? (theme === 'dark' ? '#93b4ff' : '#3b82f6')
  const resolvedColor3 = color3 ?? (theme === 'dark' ? '#c49dff' : '#7c3aed')

  // Initialize scene
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const options: ParticleSceneOptions = {
      container,
      theme,
      density,
      particlesScale,
      cameraZoom,
      color1: resolvedColor1,
      color2: resolvedColor2,
      color3: resolvedColor3,
      textures,
      alpha,
      borderSize,
      ringDisplacement,
    }

    const scene = new ParticleScene(options)
    sceneRef.current = scene

    scene.init().then(() => {
      console.log('[GPUParticleCanvas] Scene initialized successfully')
    }).catch((err) => {
      console.error('[GPUParticleCanvas] Failed to initialize:', err)
    })

    return () => {
      scene.destroy()
      sceneRef.current = null
    }
    // Only re-init if density or textures change (these require full rebuild)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density, textures.join(',')])

  // Respond to theme changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setTheme(theme)
      sceneRef.current.setColors(resolvedColor1, resolvedColor2, resolvedColor3)
    }
  }, [theme, resolvedColor1, resolvedColor2, resolvedColor3])

  // Respond to shape index changes (morphing)
  useEffect(() => {
    if (sceneRef.current && activeShapeIndex !== prevShapeIndex.current) {
      sceneRef.current.setPointsTextureFromIndex(activeShapeIndex)
      prevShapeIndex.current = activeShapeIndex
    }
  }, [activeShapeIndex])

  return (
    <div
      ref={containerRef}
      className={`particle-gpu-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    />
  )
}

export default GPUParticleCanvas
