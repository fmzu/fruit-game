import type { FruitKind } from "./types"
import { getFruitConfig } from "./get-fruit-config"

const allKinds: FruitKind[] = ["apple", "orange", "grape", "melon"]

export function getAvailableFruits(score: number): FruitKind[] {
  return allKinds.filter((kind) => getFruitConfig(kind).minScore <= score)
}
