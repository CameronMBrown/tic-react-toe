import { useContext } from "react"

// context
import GameStateContext from "../../../store/GameStateContext"
import ThemeContext from "../../../store/ThemeContext"

// components
import Cell from "../Cell/Cell"
import XSymbol from "../../Symbols/XSymbol"
import OSymbol from "../../Symbols/OSymbol"

// util
import { WINS } from "../../../utils/constants"

// styles
import "./MiniGame.scss"

export default function MiniGame({ gameID }) {
  const gameCtx = useContext(GameStateContext)
  const themeCtx = useContext(ThemeContext)

  const parentX = parseInt(gameID.substr(-2, 1))
  const parentY = parseInt(gameID.substr(-1))
  const isResolved = gameCtx.resolvedMiniGames[parentX][parentY].winner // false, "X", "O" or "tie"
  let classes = ["minigame"]

  // set classes depending on move validity
  if (
    (!gameCtx.resolvedMiniGames[parentX][parentY] && // the current minigame is not resolved and...
      gameCtx.nextValidMove === "all") || // the next valid move is "all" or...
    (Array.isArray(gameCtx.nextValidMove) && // the next valid move is this minigame
      gameCtx.nextValidMove[0] === parentX &&
      gameCtx.nextValidMove[1] === parentY)
  ) {
    classes.push("valid-move")
  } else {
    classes.push("invalid-move")
  }

  // set classes for win
  if (gameCtx.win && !gameCtx.win.points) {
    for (const arrangement of WINS[gameCtx.win - 1]) {
      if (arrangement.x === parentX && arrangement.y === parentY) {
        classes.push("involved-in-win")
      }
    }
  } else if (gameCtx.win.points) {
    // TODO: add minigame styles for win by points
    // highlight winners minigame wins with vibrant colour or animation?
  }

  return (
    <div id={gameID} className={classes.join(" ")}>
      <div className="minigame-container">
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
      </div>
      {isResolved === "X" && (
        <div className={`big-token ${themeCtx.darkMode ? "dark" : ""}`}>
          <XSymbol classes={["animate"]} />
        </div>
      )}
      {isResolved === "O" && (
        <div className={`big-token ${themeCtx.darkMode ? "dark" : ""}`}>
          <OSymbol classes={["animate"]} />
        </div>
      )}
    </div>
  )
}
