export type FruitKind = "apple" | "orange" | "grape" | "melon"

export type Fruit = {
  x: number
  y: number
  kind: FruitKind
}

export type Player = {
  x: number
  width: number
}

export type GamePhase = "title" | "playing" | "gameover"

export type Action = "left" | "right" | "left_up" | "right_up" | "start" | "restart" | "tick" | "none"

export type GameState = {
  phase: GamePhase
  score: number
  missCount: number
  maxMiss: number
  fruits: Fruit[]
  player: Player
  field: { width: number; height: number }
  frameCount: number
  keysHeld: { left: boolean; right: boolean }
}
