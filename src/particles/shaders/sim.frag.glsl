precision highp float;

#include ./noise.glsl

varying vec2 vUv;

uniform sampler2D uPosition;     // Current particle state (from ping-pong rt)
uniform sampler2D uPosRefs;      // Base rest positions (Poisson-sampled)
uniform sampler2D uPosNearest;   // Target shape positions (icon mapped)
uniform vec2 uMousePos;          // Mouse in normalized particle space
uniform float uRingRadius;       // ~0.175 + sin/cos oscillation
uniform float uRingWidth;        // Primary ring width ~0.05
uniform float uRingWidth2;       // Secondary ring width ~0.015
uniform float uRingDisplacement; // Displacement strength
uniform float uIsHovering;       // 0.0 to 1.0 (GSAP animated)
uniform float uDeltaTime;        // Frame delta time
uniform float uTime;             // Total elapsed time

void main() {
  vec4 pFrame = texture2D(uPosition, vUv);
  vec2 pos = pFrame.xy;
  float scale = pFrame.z;
  float lifeTime = pFrame.w;

  vec2 refPos = texture2D(uPosRefs, vUv).xy;
  vec2 nearestPos = texture2D(uPosNearest, vUv).xy;

  // ── Lifetime management ──
  lifeTime += uDeltaTime * 0.1;
  if (lifeTime > 1.0) lifeTime = 0.0;

  // ── Distance from mouse ──
  float dist = length(pos - uMousePos);
  float distRadius = 0.3;

  // ── Ring displacement — ripple ring around cursor ──
  float ring = smoothstep(uRingRadius - uRingWidth, uRingRadius, dist)
             - smoothstep(uRingRadius, uRingRadius + uRingWidth, dist);
  float ring2 = smoothstep(uRingRadius - uRingWidth2, uRingRadius, dist)
              - smoothstep(uRingRadius, uRingRadius + uRingWidth2, dist);

  vec2 direction = normalize(pos - uMousePos + 0.0001);
  float distStrength = (ring + ring2 * 0.5) * uRingDisplacement * uIsHovering;
  pos += direction * distStrength;

  // ── Reset dead particles to base position ──
  if (lifeTime < 0.01) {
    pos = refPos;
    pFrame.xy = refPos;
    scale = 0.0;
  }

  // ── Scale animation ──
  float targetScale = smoothstep(0.01, 0.5, lifeTime)
                    - smoothstep(0.5, 1.0, lifeTime);
  targetScale += smoothstep(0.1, 0.0, smoothstep(0.001, 0.1, dist)) * 1.5 * uIsHovering;
  float scaleDiff = targetScale - scale;
  scaleDiff *= 0.1;
  scale += scaleDiff;

  // ── Noise-based organic movement ──
  float noiseX2 = snoise(pos * 1.5 + uTime * 0.2 + 200.0);
  float noiseY2 = snoise(pos * 1.5 + uTime * 0.2 + 300.0);

  // ── Displacement based on hover proximity ──
  vec2 disp = direction * smoothstep(distRadius, 0.001, dist) * 0.05 * uIsHovering;

  // ── Spring toward target position ──
  vec2 finalPos = pos + disp;
  vec2 diff = nearestPos - finalPos;
  diff *= 0.2; // spring damping factor
  finalPos += diff;

  // ── Subtle ambient noise ──
  finalPos.x += noiseX2 * 0.02;
  finalPos.y += noiseY2 * 0.02;

  // ── Velocity (used for color in render shader) ──
  float velocity = smoothstep(distRadius, 0.001, dist) * uIsHovering;

  gl_FragColor = vec4(finalPos, scale, velocity);
}
