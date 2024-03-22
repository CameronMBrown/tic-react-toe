// TODO: maybe refactor move timer into its own component

import { useState, useRef, useEffect, useContext } from "react"

// context
import GameStateContext from "../../../store/GameStateContext"

// components
import XSymbol from "../../Symbols/XSymbol"
import OSymbol from "../../Symbols/OSymbol"

// styles
import "./PlayerArea.scss"

// how often the progress element (move timer) recalculates in ms
const TICK_RATE = 100

function PlayerArea({ symbol, initialName, isTurn }) {
  const gameCtx = useContext(GameStateContext)
  const [name, setName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)
  const input = useRef()
  const classes = ["player-area"]
  const timeout = gameCtx.moveTimer

  const [remainingMoveTime, setRemainingMoveTime] = useState(timeout)

  // move timer
  useEffect(() => {
    let timer
    if (gameCtx.player === symbol) {
      setRemainingMoveTime(timeout)
      timer = setTimeout(() => {
        if (gameCtx.underway) {
          // if the player does not make a move before the end of the timer,
          // the consequence is a randomly made valid move
          gameCtx.autoMove()
        }
      }, timeout)
    }

    return () => {
      clearTimeout(timer)
    }
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

  if (isTurn) classes.push("your-turn")

  // add classes for win case
  if (
    (gameCtx.win && !isTurn) || // the last move won the game
    (gameCtx.win.points &&
      !gameCtx.win.rematch &&
      gameCtx.win.player === initialName) // win by points
  ) {
    classes.push("winner")
  }

  // give immediate focus to name input when clicked
  useEffect(() => {
    const name = input.current

    if (isEditing) {
      name.focus()
    }
  }, [isEditing])

  // get previously saved player name
  useEffect(() => {
    let loadedName = localStorage.getItem(initialName)
    if (loadedName) {
      setName(loadedName)
    }
  }, [initialName])

  const handleChangeName = (e) => {
    setName(e.target.value)
    localStorage.setItem(initialName, e.target.value)
  }

  const handleFinishEditing = () => {
    setIsEditing(false)
    if (name === "") {
      setName(initialName)
    }
  }

  let nameContent = (
    <div className="player-name-wrapper" onClick={() => setIsEditing(true)}>
      <p className="player-name">{name}</p>
      <p className="name-prompt">Change Name</p>
    </div>
  )

  if (isEditing) {
    nameContent = (
      <input
        ref={input}
        type="text"
        className="player-name"
        value={name}
        onBlur={handleFinishEditing}
        maxLength="50"
        onKeyUp={(e) => {
          e.key === "Enter" && handleFinishEditing()
        }}
        onChange={handleChangeName}
      />
    )
  }

  return (
    <div className={classes.join(" ")}>
      {gameCtx.player === symbol && gameCtx.underway && (
        <progress
          id="move-timer"
          className="move-timer"
          max={timeout}
          value={remainingMoveTime}
        />
      )}
      {symbol === "X" ? <XSymbol /> : <OSymbol />}
      {nameContent}
    </div>
  )
}
export default PlayerArea
