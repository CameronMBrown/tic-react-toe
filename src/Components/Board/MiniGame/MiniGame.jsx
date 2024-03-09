import { useContext } from "react"

// context
import GameStateContext from "../../../store/GameStateContext"

// components
import Cell from "../Cell/Cell"
import XSymbol from "../../Symbols/XSymbol"
import OSymbol from "../../Symbols/OSymbol"

// styles
import "./MiniGame.scss"

export default function MiniGame({ gameID }) {
  const gameCtx = useContext(GameStateContext)

  const parentX = parseInt(gameID.substr(-2, 1))
  const parentY = parseInt(gameID.substr(-1))
  const isResolved = gameCtx.resolvedMiniGames[parentX][parentY] // false, "X", "O" or "tie"
  let classes = ["minigame-container"]

  // set classes depending on move validity
  if (
    gameCtx.nextValidMove === "all" ||
    (gameCtx.nextValidMove[0] === parentX &&
      gameCtx.nextValidMove[1] === parentY)
  ) {
    classes.push("valid-move")
  } else {
    classes.push("invalid-move")
  }

  return (
    <div id={gameID} className={classes.join(" ")}>
      {gameCtx.board[parentX][parentY].map((row, i) => {
        return row.map((cell, j) => {
          return (
            <Cell
              key={`minigame-${parentX}${parentY}__cell-${i}${j}`}
              cellID={`minigame-${parentX}${parentY}__cell-${i}${j}`}
              parentX={parentX}
              parentY={parentY}
            />
          )
        })
      })}
      {isResolved === "X" && (
        <div className="big-token">
          <XSymbol />
        </div>
      )}
      {isResolved === "O" && (
        <div className="big-token">
          <OSymbol />
        </div>
      )}
    </div>
  )
}
