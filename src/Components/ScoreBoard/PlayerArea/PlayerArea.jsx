import { useState, useRef, useEffect } from "react"

// components
import XSymbol from "../../Symbols/XSymbol"
import OSymbol from "../../Symbols/OSymbol"

// styles
import "./PlayerArea.scss"

function PlayerArea({ symbol, initialName, isTurn }) {
  const [name, setName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)
  const input = useRef()

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
    <h3 className="player-name" onClick={() => setIsEditing(true)}>
      {name}
    </h3>
  )

  if (isEditing) {
    nameContent = (
      <input
        ref={input}
        type="text"
        className="player-name"
        value={name}
        onBlur={handleFinishEditing}
        onKeyUp={(e) => {
          e.key === "Enter" && handleFinishEditing()
        }}
        onChange={handleChangeName}
      />
    )
  }

  return (
    <div className={`player-area ${isTurn ? "your-turn" : ""}`}>
      {symbol === "X" ? <XSymbol /> : <OSymbol />}
      {nameContent}
    </div>
  )
}
export default PlayerArea
