precision highp float;

varying float vScale;
varying float vVelocity;
varying vec2 vScreenPos;
varying vec2 vLocalPos;

uniform vec3 uColor1;      // base color
uniform vec3 uColor2;      // mid color
uniform vec3 uColor3;      // accent color (near cursor)
uniform float uAlpha;      // global alpha
uniform float uTime;
uniform vec2 uRez;         // canvas resolution
uniform vec2 uMousePos;
uniform int uColorScheme;
uniform float uBorderSize; // ~0.05

void main() {
  vec2 uv = gl_PointCoord - 0.5;

  // ── Velocity-based color mixing (3-color gradient) ──
  float h = 0.8;
  float progress = vVelocity;
  vec3 col = mix(
    mix(uColor1, uColor2, progress / h),
    mix(uColor2, uColor3, (progress - h) / (1.0 - h)),
    step(h, progress)
  );

  // ── Soft circle shape ──
  float dist = length(uv);
  float dr = 0.5;
  float t = smoothstep(dr + uBorderSize + 0.0001, dr - uBorderSize, dist);
  t = clamp(t, 0.0, 1.0);

  // ── Disc falloff ──
  float disc = smoothstep(0.5, 0.45, length(uv));

  if (t < 0.01) discard;

  float finalAlpha = t * uAlpha * clamp(vScale, 0.15, 1.0);
  gl_FragColor = vec4(col, finalAlpha);
}
