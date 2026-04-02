export function renderCenteredScreen(
  lines: { text: string; displayWidth: number }[],
  fieldWidth: number,
  height: number
): string {
  const topBorder = "┌" + "─".repeat(fieldWidth) + "┐"
  const bottomBorder = "└" + "─".repeat(fieldWidth) + "┘"
  const emptyRow = "│" + " ".repeat(fieldWidth) + "│"

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
