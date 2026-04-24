import { getFruitConfig } from "./get-fruit-config";
import type { FruitKind } from "./types";

const allKinds: FruitKind[] = ["apple", "orange", "grape", "melon"];

export function getAvailableFruits(score: number): FruitKind[] {
  return allKinds.filter((kind) => getFruitConfig(kind).minScore <= score);
}
