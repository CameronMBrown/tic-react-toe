import { createContext, useReducer } from "react"

// util
import {
  WINS,
  DEFAULT_GAME_DATA,
  BASIC_WIN_CASE,
  NEW_GAME,
  NEW_MINIGAMES,
} from "../utils/constants"
import { checkForWin, isCatsGame, loadSavedGame } from "../utils/utils"

const GameStateContext = createContext({
  underway: true,
  board: [...NEW_GAME],
  player: "X",
  nextValidMove: "all",
  resolvedMiniGames: [...NEW_MINIGAMES],
  win: false,
  insert: (bigX, bigY, miniX, miniY) => {},
  clear: () => {},
})

function gameReducer(state, action) {
  if (action.type === "CLEAR") {
    localStorage.removeItem("gamestate")
    return {
      ...state,
      ...DEFAULT_GAME_DATA,
    }
  } else if (action.type === "INSERT") {
    const { bigX, bigY, miniX, miniY } = action.move
    let nextValidMove = "all"
    const player = state.player === "X" ? "O" : "X"
    const newGameState = [...state.board]
    const resolvedMiniGames = [...state.resolvedMiniGames]
    let win = state.win

    // update game state
    newGameState[bigX][bigY][miniX][miniY] = state.player

    // check for minigame win or tie
    const miniGameWin = checkForWin(newGameState[bigX][bigY], state.player)
    if (miniGameWin) {
      resolvedMiniGames[bigX][bigY] = {
        winner: state.player,
        arrangement: WINS[miniGameWin - 1],
      }
    } else if (isCatsGame(newGameState[bigX][bigY])) {
      resolvedMiniGames[bigX][bigY] = { winner: "tie", arrangement: null }
    }

    // update next valid move
    if (!resolvedMiniGames[miniX][miniY]) {
      nextValidMove = [miniX, miniY]
    }

    // check for overall win
    win = checkForWin(newGameState, state.player)
    if (win) {
      // TODO: handle win
      nextValidMove = "all"
      console.log("WINNER!!!")
    }

    // save gamestate to localStorage
    localStorage.setItem(
      "gamestate",
      JSON.stringify({
        board: JSON.stringify([...BASIC_WIN_CASE]),
        player,
        nextValidMove: JSON.stringify(nextValidMove),
        resolvedMiniGames: JSON.stringify(resolvedMiniGames),
        win,
      })
    )

    return {
      ...state,
      board: newGameState,
      player,
      nextValidMove,
      resolvedMiniGames,
      win,
    }
  }
}

export function GameStateContextProvider({ children }) {
  // restore previous game if found
  let { board, player, nextValidMove, resolvedMiniGames, win } = loadSavedGame()
  const [game, dispatchGameAction] = useReducer(gameReducer, {
    underway: true, // TODO: play/pause game states. Modals cause pause, page does not load an underway game
    board,
    player,
    nextValidMove,
    resolvedMiniGames,
    win,
  })

  const gameContext = {
    underway: game.underway,
    board: game.board,
    player: game.player,
    nextValidMove: game.nextValidMove,
    resolvedMiniGames: game.resolvedMiniGames,
    win: game.win,
    insert,
    clear,
  }

  function insert(bigX, bigY, miniX, miniY) {
    dispatchGameAction({ type: "INSERT", move: { bigX, bigY, miniX, miniY } })
  }

  function clear() {
    dispatchGameAction({ type: "CLEAR" })
  }

  return (
    <GameStateContext.Provider value={gameContext}>
      {children}
    </GameStateContext.Provider>
  )
}

export default GameStateContext
