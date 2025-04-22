import { useEffect, useRef, useState } from 'react'
import {Game} from './game/Game.ts'

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const animationRef = useRef<number>(0)

  const [restartKey, setRestartKey] = useState(0) // trigger re-init

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
  }, [restartKey])

  const handleRestart = () => {
    setRestartKey((prev) => prev + 1)
  }

  return (
    <>
      <p className="center">
        Space Invaders destroyed this page! Take revenge on them!<br/>
        Use <span className="label label-danger">Space</span> to shoot and <span
        className="label label-danger">←</span>&#160;<span className="label label-danger">→</span> to
        move!&#160;&#160;&#160;
        <button className="btn" onClick={handleRestart}>Restart</button>
      </p>
      <canvas ref={canvasRef} id="space-invaders"/>
    </>
  )
}
