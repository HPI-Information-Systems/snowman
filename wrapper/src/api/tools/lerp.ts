export function lerp(from: number, to: number, by: number): number {
  return to * by + from * (1 - by);
}
