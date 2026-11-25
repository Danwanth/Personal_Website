// Shared football geometry (unit ball, radius 1) so the canvas game and the
// SVG ball roll draw the same ball.

export type Pt = [number, number]

export function pentagon(cx: number, cy: number, radius: number, rot: number): Pt[] {
  return Array.from({ length: 5 }, (_, i) => {
    const a = rot + (i * 2 * Math.PI) / 5
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius] as Pt
  })
}

export const CENTRE_R = 0.36
export const EDGE_R = 0.3
export const EDGE_DIST = 0.95
export const SEAM_FROM = 0.36
export const SEAM_TO = 0.62

function nearest(p: Pt, pts: Pt[]): Pt {
  let best = pts[0]
  let bestD = Infinity
  for (const q of pts) {
    const d = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2
    if (d < bestD) {
      bestD = d
      best = q
    }
  }
  return best
}

/**
 * Central pentagon, five partial edge pentagons and the seam lines, at a rotation.
 * Each seam runs out from a centre-pentagon corner and then forks (a Y) to the
 * nearest corners of the two neighbouring edge pentagons, which outlines the
 * hexagon panels so it reads as a football rather than a star.
 */
export function ballShapes(rot: number) {
  const centre = pentagon(0, 0, CENTRE_R, rot - Math.PI / 2)
  const edges = Array.from({ length: 5 }, (_, i) => {
    const a = rot - Math.PI / 2 + Math.PI / 5 + (i * 2 * Math.PI) / 5
    return pentagon(Math.cos(a) * EDGE_DIST, Math.sin(a) * EDGE_DIST, EDGE_R, a + Math.PI)
  })
  const seams: [Pt, Pt][] = []
  for (let i = 0; i < 5; i++) {
    const a = rot - Math.PI / 2 + (i * 2 * Math.PI) / 5
    const from: Pt = [Math.cos(a) * SEAM_FROM, Math.sin(a) * SEAM_FROM]
    const to: Pt = [Math.cos(a) * SEAM_TO, Math.sin(a) * SEAM_TO]
    seams.push([from, to])
    seams.push([to, nearest(to, edges[i])])
    seams.push([to, nearest(to, edges[(i + 4) % 5])])
  }
  return { centre, edges, seams }
}
