import type { Action } from "./types"
import { handleKey } from "./handle-key"

export function setupInput(onKey: (action: Action) => void): () => void {
  const KEY_RELEASE_DELAY = 150
  const timers: { left?: ReturnType<typeof setTimeout>; right?: ReturnType<typeof setTimeout> } = {}

  const onData = (data: Buffer) => {
    if (data.length === 1 && data[0] === 0x03) {
      cleanup()
      process.exit()
    }
    const action = handleKey(data)

    if (action === "left" || action === "right") {
      onKey(action)

      // Clear existing timer for this direction
      if (timers[action]) {
        clearTimeout(timers[action])
      }

      // Set timer to emit key-up after delay
      timers[action] = setTimeout(() => {
        const upAction: Action = action === "left" ? "left_up" : "right_up"
        onKey(upAction)
        timers[action] = undefined
      }, KEY_RELEASE_DELAY)
    } else {
      onKey(action)
    }
  }

  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on("data", onData)

  function cleanup() {
    if (timers.left) clearTimeout(timers.left)
    if (timers.right) clearTimeout(timers.right)
    process.stdin.removeListener("data", onData)
    process.stdin.setRawMode(false)
    process.stdin.pause()
  }

  return cleanup
}
