import { describe, test, expect } from "bun:test"
import { createInitialState } from "./create-initial-state"

describe("createInitialState", () => {
  test("フィールドサイズが40x20", () => {
    const state = createInitialState()
    expect(state.field).toEqual({ width: 40, height: 20 })
  })

  test("プレイヤーが中央に配置される", () => {
    const state = createInitialState()
    expect(state.player).toEqual({ x: 18, width: 4 })
  })

  test("スコアが0", () => {
    const state = createInitialState()
    expect(state.score).toBe(0)
  })

  test("ミスカウントが0で最大3", () => {
    const state = createInitialState()
    expect(state.missCount).toBe(0)
    expect(state.maxMiss).toBe(3)
  })

  test("フルーツが空配列", () => {
    const state = createInitialState()
    expect(state.fruits).toEqual([])
  })

  test("フェーズがtitle", () => {
    const state = createInitialState()
    expect(state.phase).toBe("title")
  })

  test("フレームカウントが0", () => {
    const state = createInitialState()
    expect(state.frameCount).toBe(0)
  })

  test("keysHeldが初期状態", () => {
    const state = createInitialState()
    expect(state.keysHeld).toEqual({ left: false, right: false })
  })
})
