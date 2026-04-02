import type { FruitKind } from "./types"

export function pickFruitKind(available: FruitKind[], random?: number): FruitKind {
  const r = random ?? Math.random()
  const index = Math.floor(r * available.length)
  return available[index]
}
