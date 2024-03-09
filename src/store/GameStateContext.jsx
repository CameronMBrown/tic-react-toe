import { createContext, useReducer } from "react"

import { NEW_GAME } from "../utils/constants"
import { checkForWin, isCatsGame } from "../utils/utils"

const GameStateContext = createContext({
  board: [...NEW_GAME],
  player: "X",
  nextValidMove: "all",
  resolvedMiniGames: [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ],
  insert: (bigX, bigY, miniX, miniY) => {},
  clear: () => {},
})

function gameReducer(state, action) {
  if (action.type === "CLEAR") {
    return { ...state, board: [...NEW_GAME] }
  } else if (action.type === "INSERT") {
    const { bigX, bigY, miniX, miniY } = action.move
    let nextValidMove = "all"
    const player = state.player === "X" ? "O" : "X"
    const newGameState = [...state.board]
    const resolvedMiniGames = [...state.resolvedMiniGames]

    // update game state
    newGameState[bigX][bigY][miniX][miniY] = state.player

    // check for minigame win or tie
    if (checkForWin(newGameState[bigX][bigY])) {
      resolvedMiniGames[bigX][bigY] = state.player
    } else if (isCatsGame(newGameState[bigX][bigY])) {
      resolvedMiniGames[bigX][bigY] = "tie"
    }

    // update next valid move
    if (!resolvedMiniGames[bigX][bigY]) {
      nextValidMove = [miniX, miniY]
    }

    // check for overall win
    if (checkForWin(newGameState)) {
      // TODO: handle win
      console.log("WINNER!!!")
    }

    return {
      ...state,
      board: newGameState,
      player,
      nextValidMove,
      resolvedMiniGames,
    }
  }
}

export function GameStateContextProvider({ children }) {
  const [game, dispatchGameAction] = useReducer(gameReducer, {
    board: [...NEW_GAME],
    player: "X",
    nextValidMove: "all",
    resolvedMiniGames: [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  })

  const gameContext = {
    board: game.board,
    player: game.player,
    nextValidMove: game.nextValidMove,
    resolvedMiniGames: game.resolvedMiniGames,
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
