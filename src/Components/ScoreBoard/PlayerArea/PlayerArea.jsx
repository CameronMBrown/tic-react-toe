import { useState, useRef, useEffect, useContext } from "react"

// context
import GameStateContext from "../../../store/GameStateContext"

// components
import MoveTimer from "../MoveTimer/MoveTimer"
import XSymbol from "../../Symbols/XSymbol"
import OSymbol from "../../Symbols/OSymbol"

// styles
import "./PlayerArea.scss"

function PlayerArea({ symbol, initialName, isTurn }) {
  const gameCtx = useContext(GameStateContext)
  const [name, setName] = useState(
    gameCtx.vsComputer && symbol === "O" ? "Computer" : initialName
  )
  const [isEditing, setIsEditing] = useState(false)
  const input = useRef()
  const classes = ["player-area"]

  if (isTurn && !gameCtx.win) classes.push("your-turn")

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
      <p className="name-prompt">Change</p>
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
        <MoveTimer symbol={symbol} />
      )}
      {symbol === "X" ? <XSymbol /> : <OSymbol />}
      {nameContent}
    </div>
  )
}
export default PlayerArea
