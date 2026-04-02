import type { Fruit } from "./types"
import { getAvailableFruits } from "./get-available-fruits"
import { pickFruitKind } from "./pick-fruit-kind"

export function spawnFruit(score: number, fieldWidth: number, randomKind?: number, randomX?: number): Fruit {
  const available = getAvailableFruits(score)
  const kind = pickFruitKind(available, randomKind)
  const rx = randomX ?? Math.random()
  const x = Math.floor(rx * (fieldWidth - 1))
  return { x, y: 0, kind }
}
