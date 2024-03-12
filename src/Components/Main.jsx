import ScoreBoard from "./ScoreBoard/ScoreBoard"
import Board from "./Board/Game"
import Sidebar from "./Sidebar/Sidebar"

function Main() {
  return (
    <>
      <div className="top-section-wrapper">
        <ScoreBoard />
        <Sidebar />
      </div>
      <Board />
    </>
  )
}
export default Main
