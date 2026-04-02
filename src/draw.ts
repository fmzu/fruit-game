export function draw(content: string): void {
  process.stdout.write("\x1b[H" + content)
}
