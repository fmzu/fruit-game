import type { Fruit, Player } from "./types.js";

export function checkCatch(player: Player, fruit: Fruit): boolean {
  const playerLeft = player.x;
  const playerRight = player.x + player.width;
  const fruitLeft = fruit.x;
  const fruitRight = fruit.x + 2;
  return playerLeft < fruitRight && fruitLeft < playerRight;
}
