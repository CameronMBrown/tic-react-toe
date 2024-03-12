// context
import { GameStateContextProvider } from "./store/GameStateContext"
import { SettingsContextProvider } from "./store/SettingsContext"

// components
import Main from "./Components/Main"

// styles
import "./App.scss"

function App() {
  return (
    <div className="App">
      <GameStateContextProvider>
        <SettingsContextProvider>
          <Main />
        </SettingsContextProvider>
      </GameStateContextProvider>
    </div>
  )
}

export default App
