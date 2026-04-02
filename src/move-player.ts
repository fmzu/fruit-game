import type { Player } from "./types"

export function movePlayer(player: Player, direction: "left" | "right", fieldWidth: number, step: number = 2): Player {
  const dx = direction === "left" ? -step : step
  const newX = Math.max(0, Math.min(fieldWidth - player.width, player.x + dx))
  return { ...player, x: newX }
}
