import { describe, test, expect } from "bun:test"
import { renderFrame } from "./render-frame"
import type { GameState } from "./types"

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    phase: "playing",
    score: 35,
    missCount: 1,
    maxMiss: 3,
    fruits: [
      { x: 14, y: 0, kind: "apple" },
      { x: 8, y: 2, kind: "orange" },
    ],
    player: { x: 12, width: 4 },
    field: { width: 40, height: 20 },
    frameCount: 0,
    ...overrides,
  }
}

describe("renderFrame", () => {
  test("returns a string", () => {
    const result = renderFrame(makeState())
    expect(typeof result).toBe("string")
  })

  test("displays score and lives", () => {
    const result = renderFrame(makeState({ score: 35, missCount: 1, maxMiss: 3 }))
    const firstLine = result.split("\n")[0]
    expect(firstLine).toContain("Score: 35")
    expect(firstLine).toContain("♥♥♡")
  })

  test("displays full lives when no misses", () => {
    const result = renderFrame(makeState({ missCount: 0, maxMiss: 3 }))
    const firstLine = result.split("\n")[0]
    expect(firstLine).toContain("♥♥♥")
    expect(firstLine).not.toContain("♡")
  })

  test("contains border characters", () => {
    const result = renderFrame(makeState())
    expect(result).toContain("┌")
    expect(result).toContain("┐")
    expect(result).toContain("└")
    expect(result).toContain("┘")
    expect(result).toContain("│")
    expect(result).toContain("─")
  })

  test("contains fruit emoji", () => {
    const result = renderFrame(makeState())
    expect(result).toContain("🍎")
    expect(result).toContain("🍊")
  })

  test("contains player", () => {
    const result = renderFrame(makeState())
    expect(result).toContain("[==]")
  })

  test("player is on the last row of the field", () => {
    const result = renderFrame(makeState())
    const lines = result.split("\n")
    // header + top border + 20 rows + bottom border = 23 lines
    // last field row is index 21 (0-indexed)
    const lastFieldRow = lines[21]
    expect(lastFieldRow).toContain("[==]")
  })

  test("each inner row has correct width", () => {
    const state = makeState()
    const result = renderFrame(state)
    const lines = result.split("\n")
    // lines[1] is top border, lines[2..21] are field rows, lines[22] is bottom border
    for (let i = 2; i <= 21; i++) {
      const line = lines[i]
      expect(line.startsWith("│")).toBe(true)
      expect(line.endsWith("│")).toBe(true)
    }
  })

  test("works with no fruits", () => {
    const result = renderFrame(makeState({ fruits: [] }))
    expect(result).toContain("[==]")
    expect(result).not.toContain("🍎")
  })
})
