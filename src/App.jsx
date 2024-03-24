// context
import { GameStateContextProvider } from "./store/GameStateContext"

// components
import Main from "./Components/Main"
import Rules from "./Components/Rules/Rules"

// styles
import "./App.scss"

function App() {
  return (
    <div className="App">
      <header>
        <img src="/Img/tic-react-toe-logo-nobg.png" />
      </header>
      <GameStateContextProvider>
        <Main />
      </GameStateContextProvider>
      <Rules />
    </div>
  )
}

export default App
