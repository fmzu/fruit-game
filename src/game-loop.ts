export function gameLoop(
  fps: number,
  onTick: () => void,
): { stop: () => void } {
  const id = setInterval(onTick, 1000 / fps);
  return {
    stop: () => clearInterval(id),
  };
}
