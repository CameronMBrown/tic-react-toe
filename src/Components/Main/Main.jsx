// components
import ScoreBoard from "../ScoreBoard/ScoreBoard"
import Board from "../Board/Game"

// styles
import "./Main.scss"

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
