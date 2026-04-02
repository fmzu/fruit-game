import { renderCenteredScreen } from "./render-centered-screen"

export function renderTitle(fieldWidth: number): string {
  const lines: { text: string; displayWidth: number }[] = [
    { text: "🍎 FRUIT GAME 🍎", displayWidth: 16 },
    { text: "", displayWidth: 0 },
    { text: "← → でフルーツをキャッチ！", displayWidth: 26 },
    { text: "", displayWidth: 0 },
    { text: "Press ENTER to start", displayWidth: 20 },
  ]

  return renderCenteredScreen(lines, fieldWidth, 20)
}
