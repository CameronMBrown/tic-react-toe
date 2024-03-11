// context
import { GameStateContextProvider } from "./store/GameStateContext"
import { SettingsContextProvider } from "./store/SettingsContext"

// components
import ScoreBoard from "./Components/ScoreBoard/ScoreBoard"
import SettingsModal from "./Components/Sidebar/Settings/SettingsModal"
import Board from "./Components/Board/Game"

// styles
import "./App.scss"

function App() {
  return (
    <div className="App">
      <GameStateContextProvider>
        <SettingsContextProvider>
          <div className="top-section-wrapper">
            <ScoreBoard />
            <div className="side-buttons">
              <SettingsModal />
            </div>
          </div>
          <Board />
        </SettingsContextProvider>
      </GameStateContextProvider>
    </div>
  )
}

export default App
