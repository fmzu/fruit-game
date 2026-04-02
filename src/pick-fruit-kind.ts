import type { FruitKind } from "./types"

export function pickFruitKind(available: FruitKind[], random?: number): FruitKind {
  if (available.length === 0) {
    throw new Error("available must not be empty")
  }
  const r = random ?? Math.random()
  const index = Math.min(Math.floor(r * available.length), available.length - 1)
  return available[index]
}
