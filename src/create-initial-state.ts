import type { GameState } from "./types";

export function createInitialState(): GameState {
  return {
    field: { width: 40, height: 20 },
    player: { x: 18, width: 4 },
    score: 0,
    missCount: 0,
    maxMiss: 3,
    fruits: [],
    phase: "title",
    frameCount: 0,
    keysHeld: { left: false, right: false },
  };
}
