import { useEffect, useRef } from "react"
import {Game} from './game/Game.ts'

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = 1200
    const height = 600
    canvas.width = width
    canvas.height = height

    const game = new Game(width, height, ctx)
    gameRef.current = game

    let animationFrameId: number
    const loop = () => {
      game.update()
      game.draw()
      animationFrameId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ background: "red" }} id="space-invaders" />
}
