import { describe, expect, test } from "bun:test"
import { getAvailableFruits } from "./get-available-fruits"

describe("getAvailableFruits", () => {
  test("スコア0ではappleのみ", () => {
    expect(getAvailableFruits(0)).toEqual(["apple"])
  })

  test("スコア19ではappleのみ", () => {
    expect(getAvailableFruits(19)).toEqual(["apple"])
  })

  test("スコア20でorangeが追加", () => {
    expect(getAvailableFruits(20)).toEqual(["apple", "orange"])
  })

  test("スコア50でgrapeが追加", () => {
    expect(getAvailableFruits(50)).toEqual(["apple", "orange", "grape"])
  })

  test("スコア100で全種類", () => {
    expect(getAvailableFruits(100)).toEqual(["apple", "orange", "grape", "melon"])
  })

  test("スコア999で全種類", () => {
    expect(getAvailableFruits(999)).toEqual(["apple", "orange", "grape", "melon"])
  })
})
