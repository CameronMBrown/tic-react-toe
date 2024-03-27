// context
import { GameStateContextProvider } from "./store/GameStateContext"

// components
import Main from "./Components/Main"
import Rules from "./Components/Rules/Rules"

// styles
import "./App.scss"
import Header from "./Components/Header/Header"

function App() {
  return (
    <div className="App">
      <GameStateContextProvider>
        <Header />
        <Main />
      </GameStateContextProvider>
      <Rules />
    </div>
  )
}

export default App
