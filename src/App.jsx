// context
import { GameStateContextProvider } from "./store/GameStateContext"

// components
import Main from "./Components/Main"

// styles
import "./App.scss"

function App() {
  return (
    <div className="App">
      <GameStateContextProvider>
        <Main />
      </GameStateContextProvider>
    </div>
  )
}

export default App
