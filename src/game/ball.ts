// Shared football geometry (unit ball, radius 1) so the canvas game and the
// SVG ball roll draw the same ball.

export type Pt = [number, number]

export function pentagon(cx: number, cy: number, radius: number, rot: number): Pt[] {
  return Array.from({ length: 5 }, (_, i) => {
    const a = rot + (i * 2 * Math.PI) / 5
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius] as Pt
  })
}

export const CENTRE_R = 0.34
export const EDGE_R = 0.27
export const EDGE_DIST = 1.04
export const SEAM_FROM = 0.34
export const SEAM_TO = 0.74

/** Central pentagon, five partial edge pentagons and the seam lines, at a rotation. */
export function ballShapes(rot: number) {
  const centre = pentagon(0, 0, CENTRE_R, rot - Math.PI / 2)
  const edges = Array.from({ length: 5 }, (_, i) => {
    const a = rot - Math.PI / 2 + Math.PI / 5 + (i * 2 * Math.PI) / 5
    return pentagon(Math.cos(a) * EDGE_DIST, Math.sin(a) * EDGE_DIST, EDGE_R, a + Math.PI)
  })
  const seams = centre.map((_, i) => {
    const a = rot - Math.PI / 2 + (i * 2 * Math.PI) / 5
    return [
      [Math.cos(a) * SEAM_FROM, Math.sin(a) * SEAM_FROM],
      [Math.cos(a) * SEAM_TO, Math.sin(a) * SEAM_TO],
    ] as [Pt, Pt]
  })
  return { centre, edges, seams }
}
