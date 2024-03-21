import { useContext } from "react"

// context
import GameStateContext from "../../store/GameStateContext"

// components
import WonGameModal from "../UI/Modal/WonGameModal/WonGameModal"

// styles
import "./ScoreBoard.scss"
import PlayerArea from "./PlayerArea/PlayerArea"

export default function ScoreBoard() {
  const gameCtx = useContext(GameStateContext)

  // check for overall win by points
  // let winner = false
  // let winningPoints
  // if (gameCtx.player1Score >= settingsCtx.pointsToWin) {
  //   winner = "Player 1"
  //   winningPoints = gameCtx.player1Score
  //   // gameCtx.pause()
  // } else if (gameCtx.player2Score >= settingsCtx.pointsToWin) {
  //   winner = "Player 2"
  //   winningPoints = gameCtx.player2Score
  //   // gameCtx.pause()
  // }

  return (
    <div className="scoreboard">
      {/* <WonGameModal winner={winner}>
        <p>
          {localStorage.getItem(winner)} won with
          <strong>{winningPoints}</strong> points
        </p>
        <p>
          Points required to win: <strong>{settingsCtx.pointsToWin}</strong>
        </p>
      </WonGameModal> */}
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
