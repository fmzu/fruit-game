import { describe, test, expect } from "bun:test"
import { movePlayer } from "./move-player"
import type { Player } from "./types"

describe("movePlayer", () => {
  const player: Player = { x: 10, width: 4 }
  const fieldWidth = 40

  test("左に2移動する（デフォルト）", () => {
    const result = movePlayer(player, "left", fieldWidth)
    expect(result.x).toBe(8)
  })

  test("右に2移動する（デフォルト）", () => {
    const result = movePlayer(player, "right", fieldWidth)
    expect(result.x).toBe(12)
  })

  test("step引数で移動量を指定できる", () => {
    const result = movePlayer(player, "left", fieldWidth, 1)
    expect(result.x).toBe(9)
  })

  test("左端でクランプされる", () => {
    const atLeft: Player = { x: 0, width: 4 }
    const result = movePlayer(atLeft, "left", fieldWidth)
    expect(result.x).toBe(0)
  })

  test("右端でクランプされる", () => {
    const atRight: Player = { x: 36, width: 4 }
    const result = movePlayer(atRight, "right", fieldWidth)
    expect(result.x).toBe(36)
  })

  test("widthを保持する", () => {
    const result = movePlayer(player, "left", fieldWidth)
    expect(result.width).toBe(4)
  })

  test("元のplayerを変更しない", () => {
    movePlayer(player, "right", fieldWidth)
    expect(player.x).toBe(10)
  })
})
