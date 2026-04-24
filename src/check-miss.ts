import type { Fruit } from "./types.js";

export function checkMiss(fruit: Fruit, fieldHeight: number): boolean {
  return fruit.y >= fieldHeight;
}
