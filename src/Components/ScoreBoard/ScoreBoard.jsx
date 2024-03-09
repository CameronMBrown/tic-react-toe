import { useContext } from "react"

// context
import GameStateContext from "../../store/GameStateContext"

// styles
import "./ScoreBoard.scss"
import PlayerArea from "./PlayerArea/PlayerArea"

export default function ScoreBoard({ score }) {
  const gameCtx = useContext(GameStateContext)
  let totalX = 0
  let totalO = 0
  score.X.forEach((num) => (totalX += num))
  score.O.forEach((num) => (totalO += num))

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
