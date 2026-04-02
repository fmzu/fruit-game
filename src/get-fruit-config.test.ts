import { describe, expect, test } from "bun:test"
import { getFruitConfig } from "./get-fruit-config"

describe("getFruitConfig", () => {
  test("apple: 🍎, 5点, minScore 0", () => {
    expect(getFruitConfig("apple")).toEqual({ emoji: "🍎", points: 5, minScore: 0 })
  })

  test("orange: 🍊, 10点, minScore 20", () => {
    expect(getFruitConfig("orange")).toEqual({ emoji: "🍊", points: 10, minScore: 20 })
  })

  test("grape: 🍇, 15点, minScore 50", () => {
    expect(getFruitConfig("grape")).toEqual({ emoji: "🍇", points: 15, minScore: 50 })
  })

  test("melon: 🍈, 25点, minScore 100", () => {
    expect(getFruitConfig("melon")).toEqual({ emoji: "🍈", points: 25, minScore: 100 })
  })
})
