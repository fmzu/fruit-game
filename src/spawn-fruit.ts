import type { Fruit } from "./types"
import { getAvailableFruits } from "./get-available-fruits"
import { pickFruitKind } from "./pick-fruit-kind"

export function spawnFruit(score: number, fieldWidth: number, random?: number): Fruit {
  const available = getAvailableFruits(score)
  const kind = pickFruitKind(available, random)
  const r = random ?? Math.random()
  const x = Math.floor(r * (fieldWidth - 1))
  return { x, y: 0, kind }
}
