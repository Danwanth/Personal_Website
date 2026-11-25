// vite.config.ts reads the shared head script from disk. The project has no
// @types/node, so declare the one function it uses.
declare module 'node:fs' {
  export function readFileSync(path: URL | string, encoding: 'utf8'): string
}
