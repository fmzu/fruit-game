import type { Action } from "./types.js"

export function handleKey(data: Buffer): Action {
  if (data.length === 3 && data[0] === 0x1b && data[1] === 0x5b && data[2] === 0x44) {
    return "left"
  }
  if (data.length === 3 && data[0] === 0x1b && data[1] === 0x5b && data[2] === 0x43) {
    return "right"
  }
  if (data.length === 1 && data[0] === 0x0d) {
    return "start"
  }
  if (data.length === 1 && data[0] === 0x20) {
    return "start"
  }
  if (data.length === 1 && (data[0] === 0x72 || data[0] === 0x52)) {
    return "restart"
  }
  return "none"
}
