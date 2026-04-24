import { describe, expect, test } from "bun:test";
import { moveFruits } from "./move-fruits";
import type { Fruit } from "./types";

describe("moveFruits", () => {
  test("全フルーツのyを+1する", () => {
    const fruits: Fruit[] = [
      { x: 5, y: 0, kind: "apple" },
      { x: 10, y: 3, kind: "orange" },
    ];
    const result = moveFruits(fruits);
    expect(result[0].y).toBe(1);
    expect(result[1].y).toBe(4);
  });

  test("x座標とkindは変わらない", () => {
    const fruits: Fruit[] = [{ x: 7, y: 2, kind: "grape" }];
    const result = moveFruits(fruits);
    expect(result[0].x).toBe(7);
    expect(result[0].kind).toBe("grape");
  });

  test("空配列を返す", () => {
    const result = moveFruits([]);
    expect(result).toEqual([]);
  });

  test("元の配列を変更しない", () => {
    const fruits: Fruit[] = [{ x: 5, y: 0, kind: "apple" }];
    moveFruits(fruits);
    expect(fruits[0].y).toBe(0);
  });
});
