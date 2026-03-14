/**
 * ParticleCanvas — now wraps the GPU-accelerated particle system.
 * Preserves the same public API so existing imports work unchanged.
 */
import GPUParticleCanvas from './GPUParticleCanvas'

const ParticleCanvas = ({ className = '' }: { className?: string }) => {
  // Read current theme from DOM attribute
  const theme =
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-theme') === 'light'
      ? 'light'
      : 'dark'

  return (
    <GPUParticleCanvas
      className={className}
      theme={theme}
      density={150}
      particlesScale={0.5}
      cameraZoom={3.5}
      textures={['/particle-icon.svg', '/particle-icon-code.svg']}
      alpha={1.0}
      interactive={true}
    />
  )
}

export default ParticleCanvas
