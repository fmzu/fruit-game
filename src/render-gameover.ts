export function renderGameover(score: number, fieldWidth: number): string {
  const height = 20
  const topBorder = "┌" + "─".repeat(fieldWidth) + "┐"
  const bottomBorder = "└" + "─".repeat(fieldWidth) + "┘"
  const emptyRow = "│" + " ".repeat(fieldWidth) + "│"

  const scoreText = `Score: ${score}`

  const lines: { text: string; displayWidth: number }[] = [
    { text: "GAME OVER", displayWidth: 9 },
    { text: "", displayWidth: 0 },
    { text: scoreText, displayWidth: scoreText.length },
    { text: "", displayWidth: 0 },
    { text: "Press R to restart", displayWidth: 18 },
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
