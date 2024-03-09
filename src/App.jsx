import { useEffect, useState } from "react"

// context
import { GameStateContextProvider } from "./store/GameStateContext"
import { SettingsContextProvider } from "./store/SettingsContext"

// components
import ScoreBoard from "./Components/ScoreBoard/ScoreBoard"
import SettingsModal from "./Components/Sidebar/Settings/SettingsModal"
import Board from "./Components/Board/Game"

// styles
import "./App.scss"

// utils
// import { printGameState } from './utils/utils';
import { NEW_GAME, BASIC_WIN_CASE, CATS_GAME_CASE } from "./utils/constants"

function App() {
  const [score, setScore] = useState({ X: [], O: [] })
  const [nextValidMove, setNextValidMove] = useState("all")

  // TODO:
  const handleWin = () => {}

  const handleCatsGame = (differential, player) => {
    // score game
    if (differential === 0) {
      // reset game
      // resetGame()
      return
    } else if (player === "X") {
      setScore((prevScore) => {
        prevScore.X.push(differential)
        prevScore.O.push(0)
      })
    } else if (player === "O") {
      setScore((prevScore) => {
        prevScore.X.push(0)
        prevScore.O.push(differential)
      })
    }
    // TODO: check for enough overall score to win
  }

  // TODO:
  const resetGame = () => {}

  // TODO:
  const handleChangeSettings = (newSettings) => {}

  return (
    <div className="App">
      <GameStateContextProvider>
        <SettingsContextProvider>
          <div className="top-section-wrapper">
            <ScoreBoard score={score} />
            <div className="side-buttons">
              <SettingsModal onChangeSettings={handleChangeSettings} />
            </div>
          </div>
          <Board
            nextMove={nextValidMove}
            onCatsGame={handleCatsGame}
            onWin={handleWin}
          />
        </SettingsContextProvider>
      </GameStateContextProvider>
    </div>
  )
}

export default App
