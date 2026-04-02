export function renderTitle(fieldWidth: number): string {
  const height = 20
  const topBorder = "┌" + "─".repeat(fieldWidth) + "┐"
  const bottomBorder = "└" + "─".repeat(fieldWidth) + "┘"
  const emptyRow = "│" + " ".repeat(fieldWidth) + "│"

  const lines: { text: string; displayWidth: number }[] = [
    { text: "🍎 FRUIT GAME 🍎", displayWidth: 16 },
    { text: "", displayWidth: 0 },
    { text: "← → でフルーツをキャッチ！", displayWidth: 26 },
    { text: "", displayWidth: 0 },
    { text: "Press ENTER to start", displayWidth: 20 },
  ]

  const contentStartRow = Math.floor((height - lines.length) / 2)

  const rows: string[] = []
  for (let y = 0; y < height; y++) {
    const lineIndex = y - contentStartRow
    if (lineIndex >= 0 && lineIndex < lines.length && lines[lineIndex].text !== "") {
      const item = lines[lineIndex]
      const padding = Math.floor((fieldWidth - item.displayWidth) / 2)
      const rightPadding = fieldWidth - padding - item.displayWidth
      rows.push("│" + " ".repeat(padding) + item.text + " ".repeat(rightPadding) + "│")
    } else {
      rows.push(emptyRow)
    }
  }

  return [topBorder, ...rows, bottomBorder].join("\n")
}
