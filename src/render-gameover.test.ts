import { describe, expect, test } from "bun:test";
import { renderGameover } from "./render-gameover";

describe("renderGameover", () => {
  const fieldWidth = 40;
  const score = 125;
  const result = renderGameover(score, fieldWidth);
  const lines = result.split("\n");

  test("returns a string", () => {
    expect(typeof result).toBe("string");
  });

  test("contains border characters", () => {
    expect(result).toContain("┌");
    expect(result).toContain("┐");
    expect(result).toContain("└");
    expect(result).toContain("┘");
  });

  test("displays GAME OVER", () => {
    expect(result).toContain("GAME OVER");
  });

  test("displays score", () => {
    expect(result).toContain("Score: 125");
  });

  test("displays restart instruction", () => {
    expect(result).toContain("Press R to restart");
  });

  test("has correct number of lines (top border + 20 rows + bottom border)", () => {
    expect(lines.length).toBe(22);
  });

  test("first line is top border", () => {
    expect(lines[0]).toBe(`┌${"─".repeat(fieldWidth)}┐`);
  });

  test("last line is bottom border", () => {
    expect(lines[lines.length - 1]).toBe(`└${"─".repeat(fieldWidth)}┘`);
  });

  test("works with score 0", () => {
    const zeroResult = renderGameover(0, fieldWidth);
    expect(zeroResult).toContain("Score: 0");
  });
});
