import { describe, expect, test } from "bun:test"
import { handleKey } from "./handle-key.js"

describe("handleKey", () => {
  test("左矢印キー → left", () => {
    expect(handleKey(Buffer.from([0x1b, 0x5b, 0x44]))).toBe("left")
  })

  test("右矢印キー → right", () => {
    expect(handleKey(Buffer.from([0x1b, 0x5b, 0x43]))).toBe("right")
  })

  test("Enter → start", () => {
    expect(handleKey(Buffer.from([0x0d]))).toBe("start")
  })

  test("Space → start", () => {
    expect(handleKey(Buffer.from([0x20]))).toBe("start")
  })

  test("r → restart", () => {
    expect(handleKey(Buffer.from([0x72]))).toBe("restart")
  })

  test("R → restart", () => {
    expect(handleKey(Buffer.from([0x52]))).toBe("restart")
  })

  test("その他のキー → none", () => {
    expect(handleKey(Buffer.from([0x61]))).toBe("none")
  })

  test("不明なエスケープシーケンス → none", () => {
    expect(handleKey(Buffer.from([0x1b, 0x5b, 0x41]))).toBe("none")
  })
})
