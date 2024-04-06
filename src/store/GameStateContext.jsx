import { createContext, useReducer } from "react"

// util
import {
  WINS,
  // DEFAULT_GAME_DATA,
  // BASIC_WIN_CASE,
  NEW_GAME,
  NEW_MINIGAMES,
} from "../utils/constants"
import {
  checkForWin,
  isCatsGame,
  isGameFinished,
  isInProgress,
  loadSavedGame,
} from "../utils/utils"

const GameStateContext = createContext({
  underway: true,
  board: structuredClone(NEW_GAME),
  player: "X",
  nextValidMove: "all",
  resolvedMiniGames: structuredClone(NEW_MINIGAMES),
  win: false,
  player1Score: 0,
  player2Score: 0,
  vsComputer: false,
  pointsToWin: 3,
  moveTimer: 20000, // 20s
  insert: (bigX, bigY, miniX, miniY) => {},
  autoMove: () => {},
  reset: () => {},
  clearBoard: () => {},
  pause: () => {},
  unpause: () => {},
  updateSettings: () => {},
})

function gameReducer(state, action) {
  if (action.type === "RESET") {
    // save "new game" data to localStorage
    localStorage.setItem(
      "gamestate",
      JSON.stringify({
        board: JSON.stringify(NEW_GAME),
        player: "X",
        nextValidMove: JSON.stringify("all"),
        resolvedMiniGames: JSON.stringify(NEW_MINIGAMES),
        win: false,
        player1Score: 0,
        player2Score: 0,
        pointsToWin: state.pointsToWin,
        moveTimer: state.moveTimer,
      })
    )

    return {
      ...state, // do not alter settings, only gamestate and score
      underway: false,
      board: structuredClone(NEW_GAME),
      player: "X",
      nextValidMove: "all",
      resolvedMiniGames: structuredClone(NEW_MINIGAMES),
      win: false,
      player1Score: 0,
      player2Score: 0,
    }
  } else if (action.type === "CLEAR") {
    // TODO: previous winner goes first in new game
    // keep the score, but set the board for a new game
    localStorage.setItem(
      "gamestate",
      JSON.stringify({
        board: JSON.stringify(NEW_GAME),
        player: "X",
        nextValidMove: JSON.stringify("all"),
        resolvedMiniGames: JSON.stringify(NEW_MINIGAMES),
        win: false,
        player1Score: state.player1Score,
        player2Score: state.player2Score,
        pointsToWin: state.pointsToWin,
        moveTimer: state.moveTimer,
      })
    )

    return {
      ...state, // same settings and score
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
    let player = state.player === "X" ? "O" : "X"
    let nextValidMove = "all"
    const resolvedMiniGames = [...state.resolvedMiniGames]
    let win = state.win
    let player1Score = state.player1Score
    let player2Score = state.player2Score

    // update board with player move
    newGameState[bigX][bigY][miniX][miniY] = state.player

    // check for minigame win or tie
    const miniGameWin = checkForWin(newGameState[bigX][bigY], state.player)
    if (miniGameWin) {
      // FIXME: a won minigame should open the board
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
      underway = false
      nextValidMove = "all"
      if (state.player === "X") {
        player1Score += state.pointsToWin
      } else {
        player2Score += state.pointsToWin
      }
    }
    // check for finished game by no moves left
    else if (isGameFinished(resolvedMiniGames)) {
      underway = false
      nextValidMove = null

      // the round score is the differential between the players minigame wins
      let xWins = 0
      let oWins = 0
      for (const row of resolvedMiniGames) {
        for (const minigame of row) {
          if (minigame.winner === "X") xWins++
          else if (minigame.winner === "O") oWins++
        }
      }

      // check for win by points
      const points = Math.abs(xWins - oWins)
      if (xWins > oWins) {
        // player 1 has more wins, add differential to playerscore
        player1Score += points
        if (player1Score >= state.pointsToWin) {
          win = { points: true, player: "Player 1" }
        } else {
          // no player has yet acheieved the number of points to win
          win = {
            points: true,
            player: "Player 1",
            rematch: true,
            roundScore: points,
          }
        }
      } else if (oWins > xWins) {
        player2Score += points
        if (player2Score >= state.pointsToWin) {
          win = { points: true, player: "Player 2" }
        } else {
          win = {
            points: true,
            player: "Player 2",
            rematch: true,
            roundScore: points,
          }
        }
      } else {
        // the game was a wash - no one gets points
        win = { points: true, player: null, rematch: true }
      }
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
        player1Score,
        player2Score,
        vsComputer: state.vsComputer,
        pointsToWin: state.pointsToWin,
        moveTimer: state.moveTimer,
      })
    )

    // console.log(localStorage.getItem("gamestate")) // debug

    return {
      ...state,
      underway,
      board: newGameState,
      player,
      nextValidMove,
      resolvedMiniGames,
      win,
      player1Score,
      player2Score,
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
  } else if (action.type === "UPDATE_GAME_SETTINGS") {
    const { vsComputer, pointsToWin, moveTimer } = action.settings

    if (vsComputer) localStorage.setItem("Player 2", "Computer")
    else localStorage.removeItem("Player 2")

    // save new settings and "new game" data to localStorage
    localStorage.setItem(
      "gamestate",
      JSON.stringify({
        board: JSON.stringify(NEW_GAME),
        player: "X",
        nextValidMove: JSON.stringify("all"),
        resolvedMiniGames: JSON.stringify(NEW_MINIGAMES),
        win: false,
        player1Score: 0,
        player2Score: 0,
        vsComputer,
        pointsToWin,
        moveTimer,
      })
    )

    return {
      ...state,
      underway: false,
      board: structuredClone(NEW_GAME),
      player: "X",
      nextValidMove: "all",
      resolvedMiniGames: structuredClone(NEW_MINIGAMES),
      win: false,
      player1Score: 0,
      player2Score: 0,
      vsComputer,
      pointsToWin,
      moveTimer,
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
    player1Score: game.player1Score,
    player2Score: game.player2Score,
    vsComputer: game.vsComputer,
    pointsToWin: game.pointsToWin,
    moveTimer: game.moveTimer,
    insert,
    autoMove,
    reset,
    clearBoard,
    pause,
    unpause,
    updateSettings,
    areNewSettings,
    isNewGame,
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

    // console.log(`auto move - ${bigX}, ${bigY}, ${miniX}, ${miniY}`) // debug

    // do an insert with the randomly selected coordinates
    dispatchGameAction({ type: "INSERT", move: { bigX, bigY, miniX, miniY } })
  }

  function reset() {
    dispatchGameAction({ type: "RESET" })
  }

  function clearBoard() {
    dispatchGameAction({ type: "CLEAR" })
  }

  function pause() {
    dispatchGameAction({ type: "PAUSE" })
  }

  function unpause() {
    dispatchGameAction({ type: "UNPAUSE" })
  }

  function areNewSettings(settings) {
    console.log(
      gameContext.vsComputer,
      gameContext.pointsToWin,
      gameContext.moveTimer
    )

    if (settings.vsComputer !== game.vsComputer) return true
    if (settings.pointsToWin !== game.pointsToWin) return true
    if (settings.moveTimer * 1000 !== game.moveTimer) return true

    return false
  }

  function updateSettings(settings) {
    dispatchGameAction({ type: "UPDATE_GAME_SETTINGS", settings })
  }

  function isNewGame() {
    if (game.player1Score > 0 || game.player2Score > 0) return false
    if (isInProgress(game.board)) return false

    return true
  }

  return (
    <GameStateContext.Provider value={gameContext}>
      {children}
    </GameStateContext.Provider>
  )
}

export default GameStateContext
