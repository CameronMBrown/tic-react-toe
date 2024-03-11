import { useContext } from "react"

// context
import GameStateContext from "../../store/GameStateContext"

// styles
import "./ScoreBoard.scss"
import PlayerArea from "./PlayerArea/PlayerArea"

export default function ScoreBoard() {
  const gameCtx = useContext(GameStateContext)

  return (
    <div className="scoreboard-wrapper">
      <PlayerArea
        symbol="X"
        initialName="Player 1"
        isTurn={gameCtx.player === "X" ? true : false}
      />
      <PlayerArea
        symbol="O"
        initialName="Player 2"
        isTurn={gameCtx.player === "X" ? false : true}
      />
    </div>
  )
}
