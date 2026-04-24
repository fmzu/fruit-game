import { describe, expect, test } from "bun:test";
import { checkCatch } from "./check-catch.js";
import type { Fruit, Player } from "./types.js";

describe("checkCatch", () => {
  const player: Player = { x: 10, width: 4 };

  test("フルーツがプレイヤー範囲内なら true", () => {
    const fruit: Fruit = { x: 11, y: 0, kind: "apple" };
    expect(checkCatch(player, fruit)).toBe(true);
  });

  test("フルーツがプレイヤーの左端に重なれば true", () => {
    const fruit: Fruit = { x: 9, y: 0, kind: "apple" };
    expect(checkCatch(player, fruit)).toBe(true);
  });

  test("フルーツがプレイヤーの右端に重なれば true", () => {
    const fruit: Fruit = { x: 13, y: 0, kind: "apple" };
    expect(checkCatch(player, fruit)).toBe(true);
  });

  test("フルーツがプレイヤーの左側で接触なしなら false", () => {
    const fruit: Fruit = { x: 8, y: 0, kind: "apple" };
    expect(checkCatch(player, fruit)).toBe(false);
  });

  test("フルーツがプレイヤーの右側で接触なしなら false", () => {
    const fruit: Fruit = { x: 14, y: 0, kind: "apple" };
    expect(checkCatch(player, fruit)).toBe(false);
  });

  test("フルーツの右端がプレイヤーの左端にちょうど一致なら false（半開区間）", () => {
    // fruit range [8, 10), player range [10, 14) → no overlap
    const fruit: Fruit = { x: 8, y: 0, kind: "apple" };
    expect(checkCatch(player, fruit)).toBe(false);
  });

  test("プレイヤーの右端がフルーツの左端にちょうど一致なら false（半開区間）", () => {
    // player range [10, 14), fruit range [14, 16) → no overlap
    const fruit: Fruit = { x: 14, y: 0, kind: "apple" };
    expect(checkCatch(player, fruit)).toBe(false);
  });
});
