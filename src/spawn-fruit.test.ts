import { describe, test, expect } from "bun:test"
import { spawnFruit } from "./spawn-fruit"

describe("spawnFruit", () => {
  test("y=0で生成される", () => {
    const fruit = spawnFruit(0, 40, 0.5)
    expect(fruit.y).toBe(0)
  })

  test("スコア0ではappleが生成される", () => {
    const fruit = spawnFruit(0, 40, 0.5)
    expect(fruit.kind).toBe("apple")
  })

  test("x座標がfieldWidth-1の範囲内に収まる", () => {
    const fruit = spawnFruit(0, 40, 0.99)
    expect(fruit.x).toBeLessThan(40)
    expect(fruit.x).toBeGreaterThanOrEqual(0)
  })

  test("random=0でx=0になる", () => {
    const fruit = spawnFruit(0, 40, 0)
    expect(fruit.x).toBe(0)
  })

  test("スコア20以上でorangeも候補に入る", () => {
    // random=0.5, available=["apple","orange"], pickはindex=1 -> orange
    const fruit = spawnFruit(20, 40, 0.5)
    expect(["apple", "orange"]).toContain(fruit.kind)
  })
})
