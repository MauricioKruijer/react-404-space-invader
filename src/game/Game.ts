import {Player} from './Player.ts'

export class Game {
  width: number
  height: number
  ctx: CanvasRenderingContext2D
  player: Player

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width
    this.height = height
    this.ctx = ctx

    this.player = new Player(width / 2 - 8, height - 20)
  }

  update() {
    this.player.update()
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.player.draw(this.ctx)
  }
}
