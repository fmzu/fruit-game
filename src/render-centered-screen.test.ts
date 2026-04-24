import { describe, expect, test } from "bun:test";
import { renderCenteredScreen } from "./render-centered-screen";

describe("renderCenteredScreen", () => {
  const fieldWidth = 40;

  test("returns correct number of lines", () => {
    const lines = [{ text: "Hello", displayWidth: 5 }];
    const result = renderCenteredScreen(lines, fieldWidth, 10);
    const outputLines = result.split("\n");
    // top border + 10 rows + bottom border = 12
    expect(outputLines.length).toBe(12);
  });

  test("contains border characters", () => {
    const lines = [{ text: "Test", displayWidth: 4 }];
    const result = renderCenteredScreen(lines, fieldWidth, 10);
    expect(result).toContain("┌");
    expect(result).toContain("┐");
    expect(result).toContain("└");
    expect(result).toContain("┘");
  });

  test("centers text horizontally", () => {
    const lines = [{ text: "Hi", displayWidth: 2 }];
    const result = renderCenteredScreen(lines, 10, 3);
    // text should be centered in a 10-wide field
    expect(result).toContain("Hi");
  });

  test("empty text lines become empty rows", () => {
    const lines = [
      { text: "A", displayWidth: 1 },
      { text: "", displayWidth: 0 },
      { text: "B", displayWidth: 1 },
    ];
    const result = renderCenteredScreen(lines, fieldWidth, 5);
    expect(result).toContain("A");
    expect(result).toContain("B");
  });

  test("first line is top border", () => {
    const lines = [{ text: "X", displayWidth: 1 }];
    const result = renderCenteredScreen(lines, fieldWidth, 5);
    const outputLines = result.split("\n");
    expect(outputLines[0]).toBe(`┌${"─".repeat(fieldWidth)}┐`);
  });

  test("last line is bottom border", () => {
    const lines = [{ text: "X", displayWidth: 1 }];
    const result = renderCenteredScreen(lines, fieldWidth, 5);
    const outputLines = result.split("\n");
    expect(outputLines[outputLines.length - 1]).toBe(
      `└${"─".repeat(fieldWidth)}┘`,
    );
  });
});
