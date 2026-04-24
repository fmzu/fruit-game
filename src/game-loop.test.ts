import { afterEach, beforeEach, describe, expect, spyOn, test } from "bun:test";
import { gameLoop } from "./game-loop.js";

describe("gameLoop", () => {
  let setIntervalSpy: ReturnType<
    typeof spyOn<typeof globalThis, "setInterval">
  >;
  let clearIntervalSpy: ReturnType<
    typeof spyOn<typeof globalThis, "clearInterval">
  >;

  beforeEach(() => {
    setIntervalSpy = spyOn(globalThis, "setInterval");
    clearIntervalSpy = spyOn(globalThis, "clearInterval");
  });

  afterEach(() => {
    setIntervalSpy.mockRestore();
    clearIntervalSpy.mockRestore();
  });

  test("stop関数を持つオブジェクトを返す", () => {
    const loop = gameLoop(60, () => {});
    expect(typeof loop.stop).toBe("function");
    loop.stop();
  });

  test("setIntervalを1回呼び出す", () => {
    const loop = gameLoop(60, () => {});
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    loop.stop();
  });

  test("fps=60のときintervalは1000/60ミリ秒", () => {
    const loop = gameLoop(60, () => {});
    const args = setIntervalSpy.mock.calls[0];
    expect(args?.[1]).toBe(1000 / 60);
    loop.stop();
  });

  test("fps=30のときintervalは1000/30ミリ秒", () => {
    const loop = gameLoop(30, () => {});
    const args = setIntervalSpy.mock.calls[0];
    expect(args?.[1]).toBe(1000 / 30);
    loop.stop();
  });

  test("fps=1のときintervalは1000ミリ秒", () => {
    const loop = gameLoop(1, () => {});
    const args = setIntervalSpy.mock.calls[0];
    expect(args?.[1]).toBe(1000);
    loop.stop();
  });

  test("渡されたonTickがsetIntervalのコールバックとして使われる", () => {
    const onTick = () => {};
    const loop = gameLoop(60, onTick);
    const args = setIntervalSpy.mock.calls[0];
    expect(args?.[0]).toBe(onTick);
    loop.stop();
  });

  test("stop呼び出しでclearIntervalが実行される", () => {
    const loop = gameLoop(60, () => {});
    loop.stop();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });

  test("stopはsetIntervalが返したidをclearIntervalに渡す", () => {
    const loop = gameLoop(60, () => {});
    const intervalId = setIntervalSpy.mock.results[0]?.value;
    loop.stop();
    expect(clearIntervalSpy).toHaveBeenCalledWith(intervalId);
  });

  test("onTickが指定した間隔で実際に呼ばれる", async () => {
    // 実際のsetIntervalを使うためspyをリストア
    setIntervalSpy.mockRestore();
    clearIntervalSpy.mockRestore();

    let callCount = 0;
    const loop = gameLoop(100, () => {
      callCount++;
    });

    // 50ms待つと fps=100 (10ms間隔) で複数回呼ばれるはず
    await new Promise((resolve) => setTimeout(resolve, 50));
    loop.stop();

    expect(callCount).toBeGreaterThan(0);
  });

  test("stop後はonTickが呼ばれなくなる", async () => {
    setIntervalSpy.mockRestore();
    clearIntervalSpy.mockRestore();

    let callCount = 0;
    const loop = gameLoop(100, () => {
      callCount++;
    });

    await new Promise((resolve) => setTimeout(resolve, 30));
    loop.stop();
    const countAtStop = callCount;

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(callCount).toBe(countAtStop);
  });
});
