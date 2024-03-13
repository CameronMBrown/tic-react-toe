import { useContext } from "react"

// context
import GameStateContext from "../../store/GameStateContext"
import SettingsContext from "../../store/SettingsContext"

// styles
import "./ScoreBoard.scss"
import PlayerArea from "./PlayerArea/PlayerArea"

export default function ScoreBoard() {
  const gameCtx = useContext(GameStateContext)
  const settingsCtx = useContext(SettingsContext)

  // TODO: calculate score and display message accordingly
  // if (gameCtx.player1Score > settingsCtx.settings.pointsToWin) {

  // } else if (gameCtx.player2Score > settingsCtx.settings.pointsToWin) {

  // }

  return (
    <div className="scoreboard">
      <PlayerArea
        symbol="X"
        initialName="Player 1"
        isTurn={gameCtx.player === "X" ? true : false}
      />
      <div className="score-area">
        <h2>
          <span className="player-1-score">{gameCtx.player1Score}</span>-
          <span className="player-2-score">{gameCtx.player2Score}</span>
        </h2>
      </div>
      <PlayerArea
        symbol="O"
        initialName="Player 2"
        isTurn={gameCtx.player === "X" ? false : true}
      />
    </div>
  )
}
