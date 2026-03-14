precision highp float;

#include ./noise.glsl

attribute vec2 aUv;

uniform sampler2D uPosition;
uniform float uPixelRatio;
uniform float uParticleScale;
uniform float uIsHovering;
uniform float uTime;
uniform int uColorScheme; // 0 = dark theme, 1 = light theme

varying float vScale;
varying float vVelocity;
varying vec2 vLocalPos;
varying vec2 vScreenPos;

void main() {
  vec4 posData = texture2D(uPosition, aUv);
  vec2 pos = posData.xy;
  float scale = posData.z;
  float velocity = posData.w;

  // Noise-based subtle movement
  float noiseX = snoise(pos * 2.0 + uTime * 0.3);
  float noiseY = snoise(pos * 2.0 + uTime * 0.3 + 50.0);

  float dist = smoothstep(0.0, 0.9, velocity);
  dist = mix(0.0, dist, uIsHovering);
  pos.y += noiseY * 0.005 * dist;
  pos.x += noiseX * 0.005 * dist;

  vVelocity = velocity;
  vScale = scale;
  vLocalPos = pos;

  vec4 viewSpace = modelViewMatrix * vec4(pos, 0.0, 1.0);
  gl_Position = projectionMatrix * viewSpace;
  vScreenPos = gl_Position.xy;

  float minScale = 0.25 + float(uColorScheme) * 0.75;
  gl_PointSize = ((scale * 7.0) * (uPixelRatio * 0.5) * uParticleScale)
               + (minScale * uPixelRatio);
}
