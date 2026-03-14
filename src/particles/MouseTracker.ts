/**
 * MouseTracker — Global singleton that captures mouse position
 * and screen dimensions, shared across all particle scenes.
 *
 * Listens on `window` so it works even when canvas has pointer-events: none.
 */
export class MouseTracker {
  cursor = { x: -9999, y: -9999 } // Off-screen initially
  screenWidth = window.innerWidth
  screenHeight = window.innerHeight
  hasMoved = false // True after first mousemove

  private onMove = (e: MouseEvent) => {
    this.cursor.x = e.clientX
    this.cursor.y = e.clientY
    this.hasMoved = true
  }

  private onResize = () => {
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
  }

  constructor() {
    window.addEventListener('mousemove', this.onMove, { passive: true })
    window.addEventListener('resize', this.onResize, { passive: true })
  }

  destroy() {
    window.removeEventListener('mousemove', this.onMove)
    window.removeEventListener('resize', this.onResize)
  }
}

// Shared singleton instance
export const mouseTracker = new MouseTracker()
