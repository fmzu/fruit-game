import type { GameState } from "./types"
import { getFruitConfig } from "./get-fruit-config"

export function renderFrame(state: GameState): string {
  const { score, missCount, maxMiss, fruits, player, field } = state
  const { width, height } = field

  const lifeStr =
    "♥".repeat(maxMiss - missCount) + "♡".repeat(missCount)
  const header = ` Score: ${score}  ${lifeStr}`

  const topBorder = "┌" + "─".repeat(width) + "┐"
  const bottomBorder = "└" + "─".repeat(width) + "┘"

  const playerY = height - 1
  const playerStr = "[==]"
  const playerWidth = playerStr.length

  const rows: string[] = []
  for (let y = 0; y < height; y++) {
    const items: { x: number; str: string; displayWidth: number }[] = []

    for (const fruit of fruits) {
      if (fruit.y === y) {
        items.push({ x: fruit.x, str: getFruitConfig(fruit.kind).emoji, displayWidth: 2 })
      }
    }

    if (y === playerY) {
      items.push({ x: player.x, str: playerStr, displayWidth: playerWidth })
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
    if (col < width) {
      line += " ".repeat(width - col)
    }

    rows.push("│" + line + "│")
  }

  return [header, topBorder, ...rows, bottomBorder].join("\n")
}
