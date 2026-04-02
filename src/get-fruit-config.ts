import type { FruitKind } from "./types"

const configs: Record<FruitKind, { emoji: string; points: number; minScore: number }> = {
  apple: { emoji: "🍎", points: 5, minScore: 0 },
  orange: { emoji: "🍊", points: 10, minScore: 20 },
  grape: { emoji: "🍇", points: 15, minScore: 50 },
  melon: { emoji: "🍈", points: 25, minScore: 100 },
}

export function getFruitConfig(kind: FruitKind): { emoji: string; points: number; minScore: number } {
  return configs[kind]
}
