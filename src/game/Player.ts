export class Player {
  x: number
  y: number
  width = 16
  height = 8

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  update() {
    // Voor nu niets
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
