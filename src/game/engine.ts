// Keepy-uppy engine: pure TypeScript, no DOM, no React.
// All reference values are in CSS px at a 380px tall canvas and are scaled by
// h / 380, so the game feels the same on the 320px mobile canvas.

export type Phase = 'idle' | 'playing' | 'over'

export type EngineEvent =
  | { type: 'touch'; touches: number }
  | { type: 'over'; touches: number }
  | { type: 'restart' }

export const REF_HEIGHT = 380
const STEP = 1 / 120
const MAX_FRAME = 0.05

const GRAVITY = 1900
const KICK_VY = 880
const KICK_VY_RANDOM = 80
const KICK_VX_PER_PX = 14
const VX_MAX = 650
const KICK_KEEP = 0.6 // share of the old vx kept on a kick (spec: 1.0); stops sideways drift piling up
const HIT_START = 2.4 // hit radius in ball radii (spec: 2.0), easier first 10 touches
const HIT_STEP = 0.06 // shrink per 10 touches (spec: 0.05)
const DRAG = 0.996
const SPIN_DECAY = 0.99
const WALL_BOUNCE = 0.75
const CEILING_BOUNCE = 0.4
const GROUND_BOUNCE = 0.3
const GROUND_MARGIN = 18 // px of empty strip under the ground line (at 380px tall)

export class Engine {
  w: number
  h: number
  r = 0
  scale = 1
  groundY = 0 // y of the ground line; the ball rests with y = groundY - r

  x = 0
  y = 0
  vx = 0
  vy = 0
  angle = 0
  spin = 0

  phase: Phase = 'idle'
  touches = 0

  private acc = 0
  private readonly rng: () => number
  private readonly onEvent: (e: EngineEvent) => void

  constructor(
    w: number,
    h: number,
    onEvent: (e: EngineEvent) => void = () => {},
    rng: () => number = Math.random,
  ) {
    this.w = w
    this.h = h
    this.onEvent = onEvent
    this.rng = rng
    this.layout()
    this.toIdle()
  }

  private layout() {
    this.scale = this.h / REF_HEIGHT
    this.r = this.h * 0.058
    this.groundY = this.h - GROUND_MARGIN * this.scale
  }

  /** Keep the ball where it was, proportionally, when the canvas changes size. */
  resize(w: number, h: number) {
    const fx = this.w > 0 ? this.x / this.w : 0.5
    const above = this.groundY - this.r - this.y // distance above the resting spot
    const oldScale = this.scale
    this.w = w
    this.h = h
    this.layout()
    this.x = fx * w
    this.y = Math.max(this.r, this.groundY - this.r - above * (this.scale / oldScale))
    this.vx *= this.scale / oldScale
    this.vy *= this.scale / oldScale
  }

  toIdle() {
    this.phase = 'idle'
    this.touches = 0
    this.x = this.w / 2
    this.y = this.groundY - this.r
    this.vx = this.vy = this.spin = 0
    this.acc = 0
  }

  /** Start a fresh round: the ball drops from 40% of the canvas height. */
  restart() {
    this.phase = 'playing'
    this.touches = 0
    this.x = this.w / 2
    this.y = this.h * 0.4
    this.vx = this.vy = this.spin = 0
    this.acc = 0
    this.onEvent({ type: 'restart' })
  }

  // Difficulty ramps every 10 touches.
  private get level() {
    return Math.floor(this.touches / 10)
  }
  get gravity() {
    return GRAVITY * this.scale * (1 + Math.min(0.4, 0.04 * this.level))
  }
  get hitRadius() {
    return this.r * Math.max(1.3, HIT_START - HIT_STEP * this.level)
  }

  /** Pointer kick. `slop` is extra reach in px (used for fingers). Returns true on a hit. */
  kick(px: number, py: number, slop = 0): boolean {
    if (this.phase === 'over') return false
    const d = Math.hypot(px - this.x, py - this.y)
    if (d > this.hitRadius + slop) return false
    const s = this.scale
    this.vy = -(KICK_VY + this.rng() * KICK_VY_RANDOM) * s
    const cap = VX_MAX * s
    this.vx = Math.max(-cap, Math.min(cap, this.vx * KICK_KEEP + (this.x - px) * KICK_VX_PER_PX))
    this.spin += this.vx * 0.015
    this.registerTouch()
    return true
  }

  /** Keyboard kick: straight up, only when the ball is low and falling (or resting). */
  kickKeyboard(): boolean {
    if (this.phase === 'over') return false
    const low = this.y > this.h * 0.55
    const falling = this.vy > 0 || this.phase === 'idle'
    if (!low || !falling) return false
    const s = this.scale
    this.vy = -(KICK_VY + this.rng() * KICK_VY_RANDOM) * s
    this.vx = (this.rng() - 0.5) * 120 * s
    this.spin += this.vx * 0.015
    this.registerTouch()
    return true
  }

  private registerTouch() {
    this.phase = 'playing'
    this.touches++
    this.onEvent({ type: 'touch', touches: this.touches })
  }

  /** Advance by a frame time in seconds (fixed-step accumulator). */
  advance(frameDt: number) {
    this.acc += Math.min(Math.max(frameDt, 0), MAX_FRAME)
    while (this.acc >= STEP) {
      this.step(STEP)
      this.acc -= STEP
    }
  }

  step(dt: number) {
    if (this.phase === 'idle') return
    const r = this.r
    this.vy += this.gravity * dt
    this.vx *= DRAG
    this.x += this.vx * dt
    this.y += this.vy * dt
    this.spin = this.spin * SPIN_DECAY + (this.vx * 0.012 - this.spin) * 0.01
    this.angle += this.spin * dt

    if (this.x < r) {
      this.x = r
      this.vx = Math.abs(this.vx) * WALL_BOUNCE
    } else if (this.x > this.w - r) {
      this.x = this.w - r
      this.vx = -Math.abs(this.vx) * WALL_BOUNCE
    }
    if (this.y < r) {
      this.y = r
      this.vy = Math.abs(this.vy) * CEILING_BOUNCE
    }
    if (this.y > this.groundY - r) {
      this.y = this.groundY - r
      if (this.phase === 'playing') {
        this.phase = 'over'
        this.onEvent({ type: 'over', touches: this.touches })
      }
      // After the drop: two small damped bounces, then rest (visual only).
      if (this.vy > 0) this.vy = -this.vy * GROUND_BOUNCE
      if (Math.abs(this.vy) < 90 * this.scale) this.vy = 0
      this.vx *= 0.7
      this.spin *= 0.7
    }
  }

  /** True when nothing on screen is moving, so rendering can pause. */
  get settled(): boolean {
    if (this.phase === 'idle') return true
    if (this.phase !== 'over') return false
    return this.vy === 0 && Math.abs(this.vx) < 2 && Math.abs(this.spin) < 0.05 && this.y >= this.groundY - this.r - 0.5
  }
}
