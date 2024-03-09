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

  useEffect(() => {
    let loadedName = localStorage.getItem(initialName)
    if (loadedName) {
      setName(loadedName)
    }
  }, [initialName])

  function handleChangeName(e) {
    setName(e.target.value)
    localStorage.setItem(initialName, e.target.value)
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
        onBlur={() => {
          setIsEditing(false)
        }}
        onKeyUp={(e) => {
          e.key === "Enter" && setIsEditing(false)
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
