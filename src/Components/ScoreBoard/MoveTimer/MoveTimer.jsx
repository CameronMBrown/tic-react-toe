import { useState, useContext, useEffect } from "react"

// context
import GameStateContext from "../../../store/GameStateContext"

// how often the progress element recalculates in ms
const TICK_RATE = 100

function MoveTimer({ symbol }) {
  const gameCtx = useContext(GameStateContext)
  const timeout = gameCtx.moveTimer
  const [remainingMoveTime, setRemainingMoveTime] = useState(timeout)

  const createMoveTimer = (timeout) => {
    return setTimeout(() => {
      if (gameCtx.underway) {
        // if the player does not make a move before the end of the timer,
        // the consequence is a randomly made valid move
        gameCtx.autoMove()
      }
    }, timeout)
  }

  // move timer
  useEffect(() => {
    let timer
    if (gameCtx.player === symbol) {
      if (symbol === "X" || (!gameCtx.vsComputer && symbol === "O")) {
        // Player 1 "X" is never a computer
        setRemainingMoveTime(timeout)
        timer = createMoveTimer(timeout)
      } else if (symbol === "O" && gameCtx.vsComputer) {
        // the computer always "thinks" for 1 second
        setRemainingMoveTime(1000)
        timer = createMoveTimer(1000)
      }
    }

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCtx.player, gameCtx.underway, symbol])

  // update timer visual indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMoveTime((prev) => {
        if (gameCtx.underway) {
          return prev - TICK_RATE
        } else {
          return prev
        }
      })
    }, TICK_RATE)

    return () => {
      clearInterval(interval)
    }
  }, [gameCtx.underway])

  return (
    <progress
      id="move-timer"
      className="move-timer"
      max={symbol === "O" && gameCtx.vsComputer ? 1000 : timeout}
      value={remainingMoveTime}
    />
  )
}

export default MoveTimer
