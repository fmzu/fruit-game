import { describe, expect, test } from "bun:test";
import { createInitialState } from "./create-initial-state";
import type { GameState } from "./types";
import { updateState } from "./update-state";

function playingState(overrides?: Partial<GameState>): GameState {
  return {
    ...createInitialState(),
    phase: "playing",
    keysHeld: { left: false, right: false },
    ...overrides,
  };
}

describe("updateState", () => {
  test('"none" action returns state unchanged', () => {
    const state = createInitialState();
    const result = updateState(state, "none");
    expect(result).toBe(state);
  });

  test('"left" sets keysHeld.left to true during playing', () => {
    const state = playingState();
    const result = updateState(state, "left");
    expect(result.keysHeld.left).toBe(true);
    expect(result.keysHeld.right).toBe(false);
  });

  test('"right" sets keysHeld.right to true during playing', () => {
    const state = playingState();
    const result = updateState(state, "right");
    expect(result.keysHeld.right).toBe(true);
    expect(result.keysHeld.left).toBe(false);
  });

  test('"left_up" sets keysHeld.left to false', () => {
    const state = playingState({ keysHeld: { left: true, right: false } });
    const result = updateState(state, "left_up");
    expect(result.keysHeld.left).toBe(false);
  });

  test('"right_up" sets keysHeld.right to false', () => {
    const state = playingState({ keysHeld: { left: false, right: true } });
    const result = updateState(state, "right_up");
    expect(result.keysHeld.right).toBe(false);
  });

  test('"left"/"right" does nothing when not playing', () => {
    const state = createInitialState(); // phase: "title"
    const result = updateState(state, "left");
    expect(result).toBe(state);
  });

  test('"tick" moves player left 1 step on even frame', () => {
    const state = playingState({
      player: { x: 10, width: 4 },
      keysHeld: { left: true, right: false },
      fruits: [],
      frameCount: 1, // +1=2 (even), player moves
    });
    const result = updateState(state, "tick");
    expect(result.player.x).toBe(9);
  });

  test('"tick" moves player right 1 step on even frame', () => {
    const state = playingState({
      player: { x: 10, width: 4 },
      keysHeld: { left: false, right: true },
      fruits: [],
      frameCount: 1, // +1=2 (even), player moves
    });
    const result = updateState(state, "tick");
    expect(result.player.x).toBe(11);
  });

  test('"tick" does not move player on odd frame', () => {
    const state = playingState({
      player: { x: 10, width: 4 },
      keysHeld: { left: true, right: false },
      fruits: [],
      frameCount: 0, // +1=1 (odd), no move
    });
    const result = updateState(state, "tick");
    expect(result.player.x).toBe(10);
  });

  test('"start" transitions from title to playing', () => {
    const state = createInitialState();
    expect(state.phase).toBe("title");
    const result = updateState(state, "start");
    expect(result.phase).toBe("playing");
    expect(result.fruits.length).toBe(1);
  });

  test('"start" does nothing when not on title', () => {
    const state = playingState();
    const result = updateState(state, "start");
    expect(result).toBe(state);
  });

  test('"tick" increments frameCount', () => {
    const state = playingState({ frameCount: 0, fruits: [] });
    const result = updateState(state, "tick");
    expect(result.frameCount).toBe(1);
  });

  test('"tick" moves fruits down every 8 frames', () => {
    const state = playingState({
      fruits: [{ x: 3, y: 5, kind: "apple" }],
      frameCount: 7, // frameCount+1=8, so fruits move
    });
    const result = updateState(state, "tick");
    expect(result.fruits[0].y).toBe(6);
  });

  test('"tick" does not move fruits on non-8th frame', () => {
    const state = playingState({
      fruits: [{ x: 3, y: 5, kind: "apple" }],
      frameCount: 0, // frameCount+1=1, so fruits don't move
    });
    const result = updateState(state, "tick");
    expect(result.fruits[0].y).toBe(5);
  });

  test('"tick" spawns fruit when frameCount % 80 === 0', () => {
    const state = playingState({ frameCount: 79, fruits: [] });
    const result = updateState(state, "tick");
    expect(result.frameCount).toBe(80);
    expect(result.fruits.length).toBe(1);
  });

  test('"tick" does not spawn fruit when frameCount % 80 !== 0', () => {
    const state = playingState({ frameCount: 0, fruits: [] });
    const result = updateState(state, "tick");
    expect(result.fruits.length).toBe(0);
  });

  test("catch: score increases when fruit reaches player", () => {
    // field.height = 20, so catchY = 19. fruit at y=18 will move to y=19 on even frame
    const state = playingState({
      player: { x: 3, width: 3 },
      fruits: [{ x: 3, y: 18, kind: "apple" }],
      score: 0,
      frameCount: 7, // +1=8, fruits move
    });
    const result = updateState(state, "tick");
    expect(result.score).toBe(5); // apple = 5 points
    expect(result.fruits.length).toBe(0);
  });

  test("miss: missCount increases when fruit falls beyond field", () => {
    // field.height = 20. fruit at y=19 will move to y=20, which is >= fieldHeight
    const state = playingState({
      player: { x: 0, width: 3 },
      fruits: [{ x: 8, y: 19, kind: "apple" }],
      missCount: 0,
      frameCount: 7, // +1=8, fruits move
    });
    const result = updateState(state, "tick");
    expect(result.missCount).toBe(1);
    expect(result.fruits.length).toBe(0);
  });

  test("3 misses triggers gameover", () => {
    const state = playingState({
      player: { x: 0, width: 3 },
      fruits: [{ x: 8, y: 19, kind: "apple" }],
      missCount: 2,
      maxMiss: 3,
      frameCount: 7, // +1=8, fruits move
    });
    const result = updateState(state, "tick");
    expect(result.phase).toBe("gameover");
    expect(result.missCount).toBe(3);
  });

  test('"restart" resets from gameover to playing', () => {
    const state: GameState = {
      ...createInitialState(),
      phase: "gameover",
      score: 100,
      missCount: 3,
      frameCount: 500,
      keysHeld: { left: true, right: false },
    };
    const result = updateState(state, "restart");
    expect(result.phase).toBe("playing");
    expect(result.score).toBe(0);
    expect(result.missCount).toBe(0);
    expect(result.frameCount).toBe(0);
    expect(result.fruits.length).toBe(1);
    expect(result.keysHeld).toEqual({ left: false, right: false });
  });

  test('"restart" does nothing when not gameover', () => {
    const state = playingState();
    const result = updateState(state, "restart");
    expect(result).toBe(state);
  });

  test('"tick" does nothing when not playing', () => {
    const state = createInitialState(); // phase: "title"
    const result = updateState(state, "tick");
    expect(result).toBe(state);
  });
});
