// context
import { GameStateContextProvider } from "./store/GameStateContext"

// components
import Background from "./Components/Background/Background"
import Main from "./Components/Main/Main"
import Rules from "./Components/Rules/Rules"

// styles
import "./App.scss"
import Header from "./Components/Header/Header"
import { ThemeContextProvider } from "./store/ThemeContext"

function App() {
  return (
    <ThemeContextProvider>
      <Background>
        <GameStateContextProvider>
          <Header />
          <Main />
        </GameStateContextProvider>
        <Rules />
      </Background>
    </ThemeContextProvider>
  )
}

export default App
