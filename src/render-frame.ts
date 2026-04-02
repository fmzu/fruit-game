import type { GameState } from "./types"
import { getFruitConfig } from "./get-fruit-config"

export function renderFrame(state: GameState): string {
  const lifeStr =
    "♥".repeat(state.maxMiss - state.missCount) + "♡".repeat(state.missCount)
  const header = ` Score: ${state.score}  ${lifeStr}`

  const topBorder = "┌" + "─".repeat(state.field.width) + "┐"
  const bottomBorder = "└" + "─".repeat(state.field.width) + "┘"

  const playerY = state.field.height - 1
  const playerStr = "[==]"
  const playerWidth = playerStr.length

  const rows: string[] = []
  for (let y = 0; y < state.field.height; y++) {
    const cellUsed = new Set<number>()

    const items: { x: number; str: string; displayWidth: number }[] = []

    for (const fruit of state.fruits) {
      if (fruit.y === y) {
        items.push({ x: fruit.x, str: getFruitConfig(fruit.kind).emoji, displayWidth: 2 })
      }
    }

    if (y === playerY) {
      items.push({ x: state.player.x, str: playerStr, displayWidth: playerWidth })
    }

    items.sort((a, b) => a.x - b.x)

    let line = ""
    let col = 0
    for (const item of items) {
      if (item.x > col) {
        line += " ".repeat(item.x - col)
        col = item.x
      }
      line += item.str
      col += item.displayWidth
    }
    if (col < state.field.width) {
      line += " ".repeat(state.field.width - col)
    }

    rows.push("│" + line + "│")
  }

  return [header, topBorder, ...rows, bottomBorder].join("\n")
}
