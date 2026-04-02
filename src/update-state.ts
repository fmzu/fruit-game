import type { GameState, Action } from "./types"
import { movePlayer } from "./move-player"
import { moveFruits } from "./move-fruits"
import { spawnFruit } from "./spawn-fruit"
import { checkCatch } from "./check-catch"
import { checkMiss } from "./check-miss"
import { getFruitConfig } from "./get-fruit-config"
import { createInitialState } from "./create-initial-state"

export function updateState(state: GameState, action: Action): GameState {
  if (action === "none") {
    return state
  }

  if (action === "left" || action === "right") {
    if (state.phase !== "playing") return state
    return { ...state, keysHeld: { ...state.keysHeld, [action]: true } }
  }

  if (action === "left_up" || action === "right_up") {
    if (state.phase !== "playing") return state
    const dir = action === "left_up" ? "left" : "right"
    return { ...state, keysHeld: { ...state.keysHeld, [dir]: false } }
  }

  if (action === "start") {
    if (state.phase !== "title") return state
    const fruit = spawnFruit(0, state.field.width)
    return { ...state, phase: "playing", fruits: [fruit] }
  }

  if (action === "restart") {
    if (state.phase !== "gameover") return state
    const fresh = createInitialState()
    const fruit = spawnFruit(0, fresh.field.width)
    return { ...fresh, phase: "playing", fruits: [fruit], keysHeld: { left: false, right: false } }
  }

  // action === "tick"
  if (state.phase !== "playing") return state

  const frameCount = state.frameCount + 1

  // Move player every 2 frames at 60fps, 1 step at a time for smoothness
  let player = state.player
  if (frameCount % 2 === 0) {
    if (state.keysHeld.left) {
      player = movePlayer(player, "left", state.field.width, 1)
    }
    if (state.keysHeld.right) {
      player = movePlayer(player, "right", state.field.width, 1)
    }
  }
  // Move fruits every 8 frames at 60fps (same speed as 2 frames at 15fps)
  let fruits = frameCount % 8 === 0 ? moveFruits(state.fruits) : state.fruits

  // Spawn fruit every 80 frames at 60fps (same interval as 20 frames at 15fps)
  if (frameCount % 80 === 0) {
    fruits = [...fruits, spawnFruit(state.score, state.field.width)]
  }

  // Catch check: fruits at player's y (field.height - 1)
  let score = state.score
  const catchY = state.field.height - 1
  const caught: Set<number> = new Set()
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].y === catchY && checkCatch(player, fruits[i])) {
      score += getFruitConfig(fruits[i].kind).points
      caught.add(i)
    }
  }
  fruits = fruits.filter((_, i) => !caught.has(i))

  // Miss check: fruits beyond field
  let missCount = state.missCount
  const missed: Set<number> = new Set()
  for (let i = 0; i < fruits.length; i++) {
    if (checkMiss(fruits[i], state.field.height)) {
      missCount++
      missed.add(i)
    }
  }
  fruits = fruits.filter((_, i) => !missed.has(i))

  const phase = missCount >= state.maxMiss ? "gameover" : "playing"

  return { ...state, phase, score, missCount, fruits, frameCount, player }
}
