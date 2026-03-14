/**
 * Poisson Disk Sampling utility — generates evenly spaced 2D points.
 * Maps density (0–300) to minDistance/maxDistance for even particle distribution.
 */
import PoissonDiskSampling from 'poisson-disk-sampling'

const GRID_SIZE = 500

/**
 * Generates Poisson-distributed points on a 500×500 grid,
 * centered around zero (subtracts 250 from each coordinate).
 * Returns a flat array: [x0, y0, x1, y1, ...]
 */
export function generatePoissonPoints(density: number): number[] {
  // Map density 0–300 → minDistance 10–2, maxDistance 11–3
  const t = Math.max(0, Math.min(density, 300)) / 300
  const minDistance = 10 - t * 8   // 10 → 2
  const maxDistance = 11 - t * 8   // 11 → 3

  const pds = new PoissonDiskSampling({
    shape: [GRID_SIZE, GRID_SIZE],
    minDistance,
    maxDistance,
    tries: 30,
  })

  const rawPoints: number[][] = pds.fill()
  const flat: number[] = []

  for (const p of rawPoints) {
    flat.push(p[0] - 250, p[1] - 250) // center around zero
  }

  return flat
}
