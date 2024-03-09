import { useContext } from "react"

// context
import GameStateContext from "../../../store/GameStateContext"

// styles
import "./Cell.scss"

// components
import XSymbol from "../../Symbols/XSymbol"
import OSymbol from "../../Symbols/OSymbol"

export default function Cell({ cellID, parentX, parentY }) {
  const gameCtx = useContext(GameStateContext)

  const Xpos = parseInt(cellID.substr(-2, 1))
  const Ypos = parseInt(cellID.substr(-1))
  const isFilled = gameCtx.board[parentX][parentY][Xpos][Ypos] !== " "

  const moveHandler = () => {
    // do not overrite a previously made move
    if (isFilled) return

    gameCtx.insert(parentX, parentY, Xpos, Ypos)
  }

  return (
    <div className="cell" id={cellID} onClick={moveHandler}>
      {gameCtx.board[parentX][parentY][Xpos][Ypos] === "X" && <XSymbol />}
      {gameCtx.board[parentX][parentY][Xpos][Ypos] === "O" && <OSymbol />}
    </div>
  )
}
