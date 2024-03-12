import { useContext } from "react"

// context
import GameStateContext from "../../../store/GameStateContext"

// components
import XSymbol from "../../Symbols/XSymbol"
import OSymbol from "../../Symbols/OSymbol"

// styles
import "./Cell.scss"

export default function Cell({ cellID, parentX, parentY }) {
  const gameCtx = useContext(GameStateContext)

  const Xpos = parseInt(cellID.substr(-2, 1))
  const Ypos = parseInt(cellID.substr(-1))
  const classes = ["cell"]
  const symbolClasses = []
  let cellFill = "#000000"
  const isFilled = gameCtx.board[parentX][parentY][Xpos][Ypos] !== " "

  // turn gold if involved in minigame win
  const miniGameStatus = gameCtx.resolvedMiniGames[parentX][parentY]
  if (miniGameStatus.arrangement) {
    for (const arrangement of miniGameStatus.arrangement) {
      if (arrangement.x === Xpos && arrangement.y === Ypos) {
        cellFill = "#FFD700"
      }
    }
  }

  if (!gameCtx.resolvedMiniGames[parentX][parentY]) {
    symbolClasses.push("animate")
  }

  const moveHandler = () => {
    // do not overrite a previously made move
    if (isFilled) return
    // no new moves allowed on won game
    if (gameCtx.win) return

    gameCtx.insert(parentX, parentY, Xpos, Ypos)
  }

  return (
    <div className={classes.join(" ")} id={cellID} onClick={moveHandler}>
      {gameCtx.board[parentX][parentY][Xpos][Ypos] === "X" && (
        <XSymbol fill={cellFill} classes={symbolClasses} />
      )}
      {gameCtx.board[parentX][parentY][Xpos][Ypos] === "O" && (
        <OSymbol fill={cellFill} classes={symbolClasses} />
      )}
    </div>
  )
}
