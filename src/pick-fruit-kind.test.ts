import { describe, expect, test } from "bun:test"
import { pickFruitKind } from "./pick-fruit-kind"

describe("pickFruitKind", () => {
  test("random=0で最初の要素を返す", () => {
    expect(pickFruitKind(["apple", "orange", "grape"], 0)).toBe("apple")
  })

  test("random=0.5で中間の要素を返す", () => {
    expect(pickFruitKind(["apple", "orange", "grape"], 0.5)).toBe("orange")
  })

  test("random=0.99で最後の要素を返す", () => {
    expect(pickFruitKind(["apple", "orange", "grape"], 0.99)).toBe("grape")
  })

  test("要素が1つの場合はその要素を返す", () => {
    expect(pickFruitKind(["melon"], 0.5)).toBe("melon")
  })

  test("randomを省略してもエラーにならない", () => {
    const result = pickFruitKind(["apple", "orange"])
    expect(["apple", "orange"]).toContain(result)
  })

  test("空配列を渡すとエラーになる", () => {
    expect(() => pickFruitKind([], 0.5)).toThrow("available must not be empty")
  })

  test("random=1.0でも最後の要素を返す（境界値）", () => {
    expect(pickFruitKind(["apple", "orange", "grape"], 1.0)).toBe("grape")
  })
})
