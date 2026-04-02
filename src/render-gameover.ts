import { renderCenteredScreen } from "./render-centered-screen"

export function renderGameover(score: number, fieldWidth: number): string {
  const scoreText = `Score: ${score}`

  const lines: { text: string; displayWidth: number }[] = [
    { text: "GAME OVER", displayWidth: 9 },
    { text: "", displayWidth: 0 },
    { text: scoreText, displayWidth: scoreText.length },
    { text: "", displayWidth: 0 },
    { text: "Press R to restart", displayWidth: 18 },
  ]

  return renderCenteredScreen(lines, fieldWidth, 20)
}
