import { useEffect, useState } from "react"

// components
import ScoreBoard from "./Components/ScoreBoard/ScoreBoard"
import SettingsModal from "./Components/SideButtons/SettingsModal/SettingsModal"
import Board from "./Components/Board/Game"

// styles
import "./App.scss"

// utils
// import { printGameState } from './utils/utils';
import { NEW_GAME, BASIC_WIN_CASE, CATS_GAME_CASE } from "./utils/constants"

function App() {
  const [player, setPlayer] = useState("X")
  const [gameState, setGameState] = useState([...NEW_GAME])
  const [score, setScore] = useState({ X: [], O: [] })
  const [nextValidMove, setNextValidMove] = useState("all")

  // TODO: learn about useRef to get previous move

  // player's turn log
  useEffect(() => {
    console.log(`it is ${player}'s turn`)
  }, [player])

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

  const handleTurn = (bigX, bigY, miniX, miniY) => {
    updateGameState(bigX, bigY, miniX, miniY)
    setNextValidMove({ row: miniX, cell: miniY })

    // next player's turn
    setPlayer((prev) => {
      return prev === "X" ? "O" : "X"
    })
  }

  const updateGameState = (bigX, bigY, miniX, miniY) => {
    // console.log(`${bigX}, ${bigY}, ${miniX}, ${miniY}`) // debug

    // find the element in the 4-D gameState arr to replace, then update state
    const nextGameState = gameState.map((bigGameRow, index) => {
      if (index === bigX) {
        return gameState[bigX].map((bigGameCell, index) => {
          if (index === bigY && Array.isArray(gameState[bigX][bigY])) {
            return gameState[bigX][bigY].map((miniGameRow, index) => {
              if (index === miniX) {
                return gameState[bigX][bigY][miniX].map(
                  (miniGameCell, index) => {
                    if (index === miniY) {
                      return player
                    } else return miniGameCell
                  }
                )
              } else return miniGameRow
            })
          } else return bigGameCell
        })
      } else return bigGameRow
    })

    setGameState(nextGameState)
  }

  // TODO:
  const resetGame = () => {}

  // TODO:
  const handleChangeSettings = (newSettings) => {}

  return (
    <div className="App">
      <div className="top-section-wrapper">
        <ScoreBoard player={player} score={score} />
        <div className="side-buttons-wrapper">
          <SettingsModal onChangeSettings={handleChangeSettings} />
        </div>
      </div>
      <Board
        gameState={gameState}
        nextMove={nextValidMove}
        onMakeMove={handleTurn}
        onCatsGame={handleCatsGame}
        onWin={handleWin}
      />
    </div>
  )
}

export default App
