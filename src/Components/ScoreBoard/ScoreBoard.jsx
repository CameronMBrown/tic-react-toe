import { useContext } from "react"

// context
import GameStateContext from "../../store/GameStateContext"
import ThemeContext from "../../store/ThemeContext"

// styles
import "./ScoreBoard.scss"
import PlayerArea from "./PlayerArea/PlayerArea"

export default function ScoreBoard() {
  const gameCtx = useContext(GameStateContext)
  const themeCtx = useContext(ThemeContext)

  return (
    <div className="scoreboard">
      <PlayerArea
        symbol="X"
        initialName="Player 1"
        isTurn={gameCtx.player === "X" ? true : false}
      />
      <div className="score-area">
        <p className={`player-scores ${themeCtx.darkMode ? "dark" : ""}`}>
          <span className="player-1-score">{gameCtx.player1Score}</span>-
          <span className="player-2-score">{gameCtx.player2Score}</span>
        </p>
        <p className="score-prompt">First to {gameCtx.pointsToWin}</p>
      </div>
      <PlayerArea
        symbol="O"
        initialName="Player 2"
        isTurn={gameCtx.player === "X" ? false : true}
      />
    </div>
  )
}
