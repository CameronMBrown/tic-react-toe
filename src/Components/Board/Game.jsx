import { useContext, useEffect } from "react"

// context
import GameStateContext from "../../store/GameStateContext"

// components
import MiniGame from "./MiniGame/MiniGame"
import PausedGameModal from "../UI/PausedGameModal/PausedGameModal"

// styles
import "./Game.scss"

export default function Game() {
  const gameCtx = useContext(GameStateContext)

  // add classes depending on winning configuration
  let classes = ["board__container"]
  if (gameCtx.win) {
    classes.push("has-winner")
    classes.push(`win-${gameCtx.win - 1}`)
  }

  return (
    <div className="game-wrapper">
      {/* pause game on page load, show a modal for unpause */}
      <PausedGameModal />
      <div className={classes.join(" ")}>
        {gameCtx.board.map((row, i) => {
          return gameCtx.board[i].map((minigame, j) => {
            return (
              <MiniGame
                key={`minigame-${i}${j}`}
                gameID={`minigame-${i}${j}`}
              />
            )
          })
        })}
      </div>
    </div>
  )
}
