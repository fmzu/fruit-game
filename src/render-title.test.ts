import { describe, test, expect } from "bun:test"
import { renderTitle } from "./render-title"

describe("renderTitle", () => {
  const fieldWidth = 40
  const result = renderTitle(fieldWidth)
  const lines = result.split("\n")

  test("returns a string", () => {
    expect(typeof result).toBe("string")
  })

  test("contains border characters", () => {
    expect(result).toContain("┌")
    expect(result).toContain("┐")
    expect(result).toContain("└")
    expect(result).toContain("┘")
  })

  test("contains game title", () => {
    expect(result).toContain("FRUIT GAME")
  })

  test("contains fruit emoji in title", () => {
    expect(result).toContain("🍎")
  })

  test("contains instruction text", () => {
    expect(result).toContain("← →")
    expect(result).toContain("Press ENTER to start")
  })

  test("has correct number of lines (top border + 20 rows + bottom border)", () => {
    expect(lines.length).toBe(22)
  })

  test("first line is top border", () => {
    expect(lines[0]).toBe("┌" + "─".repeat(fieldWidth) + "┐")
  })

  test("last line is bottom border", () => {
    expect(lines[lines.length - 1]).toBe("└" + "─".repeat(fieldWidth) + "┘")
  })
})
