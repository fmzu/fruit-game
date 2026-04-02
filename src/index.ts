#!/usr/bin/env bun
import type { GameState, Action } from "./types"
import { createInitialState } from "./create-initial-state"
import { updateState } from "./update-state"
import { renderTitle } from "./render-title"
import { renderFrame } from "./render-frame"
import { renderGameover } from "./render-gameover"
import { gameLoop } from "./game-loop"
import { createCliRenderer, TextRenderable } from "@opentui/core"
import type { KeyEvent } from "@opentui/core"

function render(state: GameState): string {
  switch (state.phase) {
    case "title": return renderTitle(state.field.width)
    case "playing": return renderFrame(state)
    case "gameover": return renderGameover(state.score, state.field.width)
  }
}

function mapKeyToAction(key: KeyEvent): Action {
  if (key.name === "left") return "left"
  if (key.name === "right") return "right"
  if (key.name === "return" || key.name === "space") return "start"
  if (key.name === "r") return "restart"
  return "none"
}

const KEY_RELEASE_DELAY = 150
const timers: { left?: ReturnType<typeof setTimeout>; right?: ReturnType<typeof setTimeout> } = {}

async function main() {
  const renderer = await createCliRenderer({
    exitOnCtrlC: true,
    screenMode: "alternate-screen",
    targetFps: 60,
    useMouse: false,
  })

  const display = new TextRenderable(renderer, {
    id: "game-display",
    content: "",
    width: "100%",
    height: "100%",
  })
  renderer.root.add(display)

  let state = createInitialState()
  display.content = render(state)
  renderer.requestRender()

  renderer.keyInput.on("keypress", (key: KeyEvent) => {
    const action = mapKeyToAction(key)

    if (action === "left" || action === "right") {
      state = updateState(state, action)
      display.content = render(state)
      renderer.requestRender()

      if (timers[action]) {
        clearTimeout(timers[action])
      }
      timers[action] = setTimeout(() => {
        const upAction: Action = action === "left" ? "left_up" : "right_up"
        state = updateState(state, upAction)
        display.content = render(state)
        renderer.requestRender()
        timers[action] = undefined
      }, KEY_RELEASE_DELAY)
    } else if (action !== "none") {
      state = updateState(state, action)
      display.content = render(state)
      renderer.requestRender()
    }
  })

  const loop = gameLoop(60, () => {
    state = updateState(state, "tick")
    display.content = render(state)
    renderer.requestRender()
  })

  process.on("exit", () => {
    loop.stop()
    if (timers.left) clearTimeout(timers.left)
    if (timers.right) clearTimeout(timers.right)
    renderer.destroy()
  })

  renderer.start()
}

main()
