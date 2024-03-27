import { useState, useContext } from "react"
import { useInView } from "react-intersection-observer"

// context
import GameStateContext from "../../store/GameStateContext"

// components
import MiniGame from "./MiniGame/MiniGame"
import WonGameModal from "../UI/Modal/WonGameModal/WonGameModal"
import RematchModal from "../UI/Modal/RematchModal/RematchModal"
import Button from "../UI/Button/Button"

// util
import { loadSavedPlayerName } from "../../utils/utils"

// styles
import "./Game.scss"

export default function Game() {
  const gameCtx = useContext(GameStateContext)
  const { ref, inView } = useInView({ threshold: 0.5 })
  const [scrollPause, setScrollPause] = useState(false)

  // add classes depending on winning configuration
  let classes = ["board__container"]
  if (gameCtx.win && !gameCtx.win.points) {
    classes.push(`win-${gameCtx.win - 1}`)
  }

  // pause the game if the user scrolls down to read the rlues etc.
  // TODO: investigate console warning thrown by this feature
  if (inView && !gameCtx.win && !gameCtx.underway && scrollPause) {
    setScrollPause(false)
    gameCtx.unpause()
  } else if (!inView && gameCtx.underway && !scrollPause) {
    setScrollPause(true)
    gameCtx.pause()
  }

  // show a modal for winning/rematch cases
  let modalContent
  if (gameCtx.win && !gameCtx.win.points) {
    // game is over with a tic-tac-toe
    modalContent = (
      <WonGameModal
        winner={
          // the previous move won the game
          gameCtx.player === "O"
            ? loadSavedPlayerName("Player 1")
            : loadSavedPlayerName("Player 2")
        }
      >
        <p>tic-tac-toe!</p>
      </WonGameModal>
    )
  } else if (gameCtx.win.points && !gameCtx.win.rematch) {
    // game is over and won by points
    modalContent = (
      <WonGameModal winner={loadSavedPlayerName(gameCtx.win.player)}>
        <p>
          {loadSavedPlayerName(gameCtx.win.player)} won with
          <strong>
            {gameCtx.win.player === "Player 1" && gameCtx.player1Score}
            {gameCtx.win.player === "Player 2" && gameCtx.player2Score}
          </strong>{" "}
          points
        </p>
        <p>
          Points required to win: <strong>{gameCtx.pointsToWin}</strong>
        </p>
      </WonGameModal>
    )
  } else if (gameCtx.win.points && gameCtx.win.player && gameCtx.win.rematch) {
    // point threshold for win is not yet met, another round is needed.
    // one player achieved more points than the other
    modalContent = (
      <RematchModal>
        <p>
          {loadSavedPlayerName(gameCtx.win.player)} is awarded{" "}
          <strong>{gameCtx.win.roundScore}</strong> point
          {gameCtx.win.roundScore > 1 && "s"}
        </p>
      </RematchModal>
    )
  } else if (gameCtx.win.points && !gameCtx.win.player && gameCtx.win.rematch) {
    // point threshold for win is not yet met, another round is needed.
    // the round was a wash
    modalContent = (
      <RematchModal>
        <p>That round was a wash!</p>
        <div className="modal-scoreboard">
          <p>The score remains:</p>
          <p className="player-name">{loadSavedPlayerName("Player 1")}</p>
          <div className="score">
            <strong>{gameCtx.player1Score}</strong> -{" "}
            <strong>{gameCtx.player2Score}</strong>{" "}
          </div>
          <p className="player-name">{loadSavedPlayerName("Player 2")}</p>
        </div>
        <p>Keep playing to decide the winner</p>
      </RematchModal>
    )
  }

  return (
    <div ref={ref} className="game-wrapper">
      {modalContent}
      {gameCtx.win && !gameCtx.win.rematch && (
        <Button className="postgame-btn" action={gameCtx.reset}>
          New Game
        </Button>
      )}
      {gameCtx.win.rematch && (
        <Button className="postgame-btn" action={gameCtx.clearBoard}>
          Clear Board
        </Button>
      )}
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
