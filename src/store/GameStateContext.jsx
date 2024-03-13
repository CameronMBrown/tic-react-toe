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
  board: structuredClone(NEW_GAME),
  player: "X",
  nextValidMove: "all",
  resolvedMiniGames: structuredClone(NEW_MINIGAMES),
  win: false,
  insert: (bigX, bigY, miniX, miniY) => {},
  autoMove: () => {},
  clear: () => {},
  pause: () => {},
  unpause: () => {},
})

function gameReducer(state, action) {
  if (action.type === "CLEAR") {
    localStorage.removeItem("gamestate")
    return {
      ...state,
      underway: false,
      board: structuredClone(NEW_GAME),
      player: "X",
      nextValidMove: "all",
      resolvedMiniGames: structuredClone(NEW_MINIGAMES),
      win: false,
    }
  } else if (action.type === "INSERT") {
    const { bigX, bigY, miniX, miniY } = action.move
    let underway = true
    const newGameState = [...state.board]
    const player = state.player === "X" ? "O" : "X"
    let nextValidMove = "all"
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
      underway = false
      console.log("WINNER!!!")
    }

    // save gamestate to localStorage
    localStorage.setItem(
      "gamestate",
      JSON.stringify({
        board: JSON.stringify(newGameState),
        player,
        nextValidMove: JSON.stringify(nextValidMove),
        resolvedMiniGames: JSON.stringify(resolvedMiniGames),
        win,
      })
    )

    return {
      ...state,
      underway,
      board: newGameState,
      player,
      nextValidMove,
      resolvedMiniGames,
      win,
    }
  } else if (action.type === "PAUSE") {
    return {
      ...state,
      underway: false,
    }
  } else if (action.type === "UNPAUSE") {
    return {
      ...state,
      underway: true,
    }
  }
}

export function GameStateContextProvider({ children }) {
  // restore previous game if found
  const [game, dispatchGameAction] = useReducer(gameReducer, {
    ...loadSavedGame(),
  })

  const gameContext = {
    underway: game.underway,
    board: game.board,
    player: game.player,
    nextValidMove: game.nextValidMove,
    resolvedMiniGames: game.resolvedMiniGames,
    win: game.win,
    insert,
    autoMove,
    clear,
    pause,
    unpause,
  }

  function insert(bigX, bigY, miniX, miniY) {
    dispatchGameAction({ type: "INSERT", move: { bigX, bigY, miniX, miniY } })
  }

  /**
   * get all possible valid moves, and choose a random move
   */
  function autoMove() {
    let bigX, bigY, miniX, miniY

    // choose the minigame
    if (gameContext.nextValidMove !== "all") {
      ;[bigX, bigY] = gameContext.nextValidMove
    } else {
      // board is open, playable minigames are the ones not resolved
      let validGameIndexes = []
      for (let i = 0; i < gameContext.resolvedMiniGames.length; i++) {
        for (let j = 0; j < gameContext.resolvedMiniGames[i].length; j++) {
          if (!gameContext.resolvedMiniGames[i][j]) {
            validGameIndexes.push([i, j])
          }
        }
      }

      // chose random valid minigame
      ;[bigX, bigY] =
        validGameIndexes[Math.floor(Math.random() * validGameIndexes.length)]
    }

    // choose a random cell given the minigame
    let validCellIndexes = []
    for (let i = 0; i < gameContext.board[bigX][bigY].length; i++) {
      for (let j = 0; j < gameContext.board[bigX][bigY][i].length; j++) {
        if (gameContext.board[bigX][bigY][i][j] === " ") {
          validCellIndexes.push([i, j])
        }
      }
    }
    ;[miniX, miniY] =
      validCellIndexes[Math.floor(Math.random() * validCellIndexes.length)]

    console.log(`auto move - ${bigX}, ${bigY}, ${miniX}, ${miniY}`)

    // do an insert with the randomly selected coordinates
    dispatchGameAction({ type: "INSERT", move: { bigX, bigY, miniX, miniY } })
  }

  function clear() {
    dispatchGameAction({ type: "CLEAR" })
  }

  function pause() {
    dispatchGameAction({ type: "PAUSE" })
  }

  function unpause() {
    dispatchGameAction({ type: "UNPAUSE" })
  }

  return (
    <GameStateContext.Provider value={gameContext}>
      {children}
    </GameStateContext.Provider>
  )
}

export default GameStateContext
