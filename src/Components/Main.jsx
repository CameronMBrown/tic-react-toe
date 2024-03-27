import ScoreBoard from "./ScoreBoard/ScoreBoard"
import Board from "./Board/Game"

function Main() {
  return (
    <>
      <div className="top-section-wrapper">
        <ScoreBoard />
      </div>
      <Board />
    </>
  )
}
export default Main
