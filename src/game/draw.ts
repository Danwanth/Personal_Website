import { ballShapes } from './ball'
import type { Engine } from './engine'

export interface Palette {
  paper: string
  ink: string
  rule: string
}

/** Read the colour tokens from CSS. Call again after a theme or retro change. */
export function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement)
  const v = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback
  return { paper: v('--paper', '#f3efe6'), ink: v('--ink', '#161513'), rule: v('--rule', '#d8d1c4') }
}

function poly(ctx: CanvasRenderingContext2D, pts: [number, number][]) {
  ctx.beginPath()
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
  ctx.closePath()
}

// Deterministic grass ticks: x as a fraction of the width, height as a fraction of the ball radius.
const TICKS: [number, number][] = Array.from({ length: 28 }, (_, i) => [
  (i * 0.0377 + ((i * 7) % 5) * 0.011) % 1,
  0.22 + ((i * 13) % 7) * 0.05,
])

export function drawGame(ctx: CanvasRenderingContext2D, e: Engine, p: Palette) {
  const { w, h, r, groundY } = e
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = p.paper
  ctx.fillRect(0, 0, w, h)

  // Ground line (ink, 2px) with a few short grass ticks in the rule colour.
  ctx.lineCap = 'butt'
  ctx.strokeStyle = p.rule
  ctx.lineWidth = 1.5
  ctx.beginPath()
  for (const [fx, fh] of TICKS) {
    const x = Math.round(fx * w) + 0.5
    ctx.moveTo(x, groundY - 1)
    ctx.lineTo(x + 2, groundY - 1 - fh * r)
  }
  ctx.stroke()
  ctx.strokeStyle = p.ink
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, groundY)
  ctx.lineTo(w, groundY)
  ctx.stroke()

  // Flat shadow ellipse on the ground; shrinks and fades as the ball rises.
  const rise = Math.max(0, Math.min(1, (groundY - r - e.y) / (groundY - 2 * r)))
  ctx.globalAlpha = 0.22 * (1 - 0.7 * rise)
  ctx.fillStyle = p.ink
  ctx.beginPath()
  ctx.ellipse(e.x, groundY + 4, r * (1 - 0.55 * rise), r * 0.16 * (1 - 0.4 * rise), 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1

  // The ball: paper fill, ink outline, ink pentagons clipped to the circle.
  ctx.save()
  ctx.translate(e.x, e.y)
  ctx.scale(r, r)
  ctx.fillStyle = p.paper
  ctx.beginPath()
  ctx.arc(0, 0, 1, 0, Math.PI * 2)
  ctx.fill()
  ctx.save()
  ctx.beginPath()
  ctx.arc(0, 0, 1, 0, Math.PI * 2)
  ctx.clip()
  const s = ballShapes(e.angle)
  ctx.fillStyle = p.ink
  poly(ctx, s.centre)
  ctx.fill()
  for (const pent of s.edges) {
    poly(ctx, pent)
    ctx.fill()
  }
  ctx.strokeStyle = p.ink
  ctx.lineWidth = 0.07
  ctx.beginPath()
  for (const [a, b] of s.seams) {
    ctx.moveTo(a[0], a[1])
    ctx.lineTo(b[0], b[1])
  }
  ctx.stroke()
  ctx.restore()
  ctx.strokeStyle = p.ink
  ctx.lineWidth = 0.09
  ctx.beginPath()
  ctx.arc(0, 0, 1, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}
