import { Player } from "./Player"
import { Invader } from "./Invader"
import { Projectile } from "./Projectile"
import {createInvaders} from './createInvaders.ts'

export class Game {
  width: number
  height: number
  ctx: CanvasRenderingContext2D
  player: Player
  invaders: Invader[] = []
  invaderShots: Projectile[] = []
  invaderAttackRate = 0.995
  invaderSpeed = 1
  kills = 0
  lost = false

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width
    this.height = height
    this.ctx = ctx

    this.player = new Player(width / 2 - 8, height - 20)

    this.spawnInvaders()
  }

  spawnInvaders() {
    const multiplier = this.width > 1000 ? 3 : this.width > 700 ? 2 : 1
    const invaderSize = 20

    this.invaders = createInvaders(invaderSize, multiplier, this.invaderSpeed)
  }

  invadersBelow(invader: Invader): boolean {
    return this.invaders.some(
      (other) =>
        other !== invader &&
        other.x === invader.x &&
        other.y > invader.y &&
        other.active
    )
  }

  update() {
    this.player.update(this)

    this.invaders.forEach((invader) => {
      if (!this.lost && invader.active) {
        invader.update(this)
        invader.move(this)
      }
    })

    this.invaderShots.forEach((shot) => shot.update(this.height))
    this.invaderShots = this.invaderShots.filter((shot) => shot.active)

    this.invaders = this.invaders.filter((invader) => invader.active)
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.player.draw(this.ctx)

    this.invaders.forEach((invader) => {
      if (invader.active) invader.draw(this.ctx)
    })

    this.invaderShots.forEach((shot) => {
      if (shot.active) shot.draw(this.ctx)
    })

    this.ctx.fillStyle = "white"
    this.ctx.font = "14px monospace"
    this.ctx.textAlign = "left"
    this.ctx.fillText(`Points: ${this.kills}`, 10, this.height - 10)

    if (this.lost) {
      this.ctx.fillStyle = "rgba(0,0,0,0.7)"
      this.ctx.fillRect(0, 0, this.width, this.height)
      this.ctx.fillStyle = "white"
      this.ctx.textAlign = "center"
      this.ctx.font = "40px monospace"
      this.ctx.fillText("You lost", this.width / 2, this.height / 2)
    }
  }
}
