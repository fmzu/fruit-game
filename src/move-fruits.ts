import type { Fruit } from "./types"

export function moveFruits(fruits: Fruit[]): Fruit[] {
  return fruits.map((fruit) => ({ ...fruit, y: fruit.y + 1 }))
}
