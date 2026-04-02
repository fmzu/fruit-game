import { describe, expect, test } from "bun:test"
import { checkMiss } from "./check-miss.js"
import type { Fruit } from "./types.js"

describe("checkMiss", () => {
  const fieldHeight = 20

  test("フルーツが画面内なら false", () => {
    const fruit: Fruit = { x: 5, y: 10, kind: "apple" }
    expect(checkMiss(fruit, fieldHeight)).toBe(false)
  })

  test("フルーツが fieldHeight と同じなら true", () => {
    const fruit: Fruit = { x: 5, y: 20, kind: "apple" }
    expect(checkMiss(fruit, fieldHeight)).toBe(true)
  })

  test("フルーツが fieldHeight を超えたら true", () => {
    const fruit: Fruit = { x: 5, y: 25, kind: "apple" }
    expect(checkMiss(fruit, fieldHeight)).toBe(true)
  })

  test("フルーツが fieldHeight の直前なら false", () => {
    const fruit: Fruit = { x: 5, y: 19, kind: "apple" }
    expect(checkMiss(fruit, fieldHeight)).toBe(false)
  })
})
