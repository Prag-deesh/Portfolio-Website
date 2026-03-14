/**
 * Web Worker: Offloads heavy nearest-point computation from the main thread.
 * For each base Poisson-sampled point, finds the nearest non-transparent pixel
 * in the target icon image using Euclidean distance.
 */

interface WorkerInput {
  imageData: ImageData
  pointsBase: number[]
  index: number
  density: number
}

interface WorkerOutput {
  nearestPoints: number[]
  index: number
}

self.onmessage = function (event: MessageEvent<WorkerInput>) {
  const { imageData, pointsBase, index } = event.data
  const nearestPoints: number[] = []
  const points: [number, number][] = []
  const width = imageData.width
  const height = imageData.height

  // Collect non-transparent pixels from the image
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = imageData.data[(y * width + x) * 4 + 3]
      if (alpha > 128) {
        points.push([x, y])
      }
    }
  }

  // If no visible pixels, map all to center
  if (points.length === 0) {
    for (let i = 0; i < pointsBase.length; i += 2) {
      nearestPoints.push(0, 0)
    }
    self.postMessage({ nearestPoints, index } as WorkerOutput)
    return
  }

  // For each base point, find the nearest icon pixel
  for (let i = 0; i < pointsBase.length; i += 2) {
    const bx = pointsBase[i] + 250
    const by = pointsBase[i + 1] + 250
    let minDist = Infinity
    let nearest = points[0]

    for (let j = 0; j < points.length; j++) {
      const dx = bx - points[j][0]
      const dy = by - points[j][1]
      const d = dx * dx + dy * dy
      if (d < minDist) {
        minDist = d
        nearest = points[j]
      }
    }

    nearestPoints.push(nearest[0] - 250, nearest[1] - 250)
  }

  self.postMessage({ nearestPoints, index } as WorkerOutput)
}
