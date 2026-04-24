import { describe, expect, test } from "bun:test";
import { spawnFruit } from "./spawn-fruit";

describe("spawnFruit", () => {
  test("y=0で生成される", () => {
    const fruit = spawnFruit(0, 40, 0.5, 0.5);
    expect(fruit.y).toBe(0);
  });

  test("スコア0ではappleが生成される", () => {
    const fruit = spawnFruit(0, 40, 0.5, 0.5);
    expect(fruit.kind).toBe("apple");
  });

  test("x座標がfieldWidth-1の範囲内に収まる", () => {
    const fruit = spawnFruit(0, 40, 0.5, 0.99);
    expect(fruit.x).toBeLessThan(40);
    expect(fruit.x).toBeGreaterThanOrEqual(0);
  });

  test("randomX=0でx=0になる", () => {
    const fruit = spawnFruit(0, 40, 0.5, 0);
    expect(fruit.x).toBe(0);
  });

  test("スコア20以上でorangeも候補に入る", () => {
    const fruit = spawnFruit(20, 40, 0.5, 0.5);
    expect(["apple", "orange"]).toContain(fruit.kind);
  });

  test("randomKindとrandomXが独立して動作する", () => {
    const fruit1 = spawnFruit(20, 40, 0.0, 0.9);
    expect(fruit1.kind).toBe("apple");
    expect(fruit1.x).toBe(35);

    const fruit2 = spawnFruit(20, 40, 0.9, 0.0);
    expect(fruit2.kind).toBe("orange");
    expect(fruit2.x).toBe(0);
  });
});
