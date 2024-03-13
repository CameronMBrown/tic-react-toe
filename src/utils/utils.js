import { DEFAULT_GAME_DATA, NEW_GAME, NEW_MINIGAMES, WINS } from "./constants"

/**
 * Attempts to load a previous game using localStorage. If no saved game is
 * found, returns the default game data
 *
 * @returns {board, player, nextValidMove, resolvedMiniGames}
 */
export function loadSavedGame(fallback = structuredClone(DEFAULT_GAME_DATA)) {
  const saveGameData = JSON.parse(localStorage.getItem("gamestate"))
  if (saveGameData) {
    // console.log(printGameState(JSON.parse(saveGameData.board))) //debug
    return {
      board: JSON.parse(saveGameData.board),
      player: saveGameData.player,
      nextValidMove: JSON.parse(saveGameData.nextValidMove),
      resolvedMiniGames: resolveMiniGames(JSON.parse(saveGameData.board)),
      win: saveGameData.win,
    }
  } else {
    return fallback
  }
}

/**
 * Expects the game board or a minigame and the current player. Returns the index of the
 * winning configuration for the curent player if it is found, otherwise false.
 *
 * @param {Array} game
 * @param {String} player
 * @returns {Boolean}
 */
export function checkForWin(game, player) {
  if (Array.isArray(game[0][0])) {
    // this is the big game
    for (let arrangement of WINS) {
      if (
        checkForWin(game[arrangement[0].x][arrangement[0].y], player) &&
        checkForWin(game[arrangement[1].x][arrangement[1].y], player) &&
        checkForWin(game[arrangement[2].x][arrangement[2].y], player)
      ) {
        console.log(`${player} is the Winner!`)
        console.log(WINS.indexOf(arrangement) + 1)
        // add 1 so even a 0 index as evaluates as truthy
        return WINS.indexOf(arrangement) + 1
      }
    }
  } else {
    // minigame
    for (let arrangement of WINS) {
      if (
        game[arrangement[0].x][arrangement[0].y] === player &&
        game[arrangement[1].x][arrangement[1].y] === player &&
        game[arrangement[2].x][arrangement[2].y] === player
      ) {
        return WINS.indexOf(arrangement) + 1
      }
    }
  }
  return false
}

/**
 * Expects a minigame array, returns true if that game is completely populated.
 * Does not check if the game is won, only if it is filled.
 * @param {Array} miniGame
 */
export function isCatsGame(miniGame) {
  for (const row of miniGame) {
    for (const cell of row) {
      if (cell === " ") {
        return false
      }
    }
  }

  return true
}

/**
 * Given the game state, derives all resolved minigames
 *
 * @param {Array} board
 * @returns an Array of resolved minigames
 */
export function resolveMiniGames(board) {
  let resolvedMiniGames = structuredClone(NEW_MINIGAMES)

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (checkForWin(board[i][j], "X")) {
        resolvedMiniGames[i][j] = {
          winner: "X",
          arrangement: WINS[checkForWin(board[i][j], "X") - 1],
        }
      } else if (checkForWin(board[i][j], "O")) {
        resolvedMiniGames[i][j] = {
          winner: "O",
          arrangement: WINS[checkForWin(board[i][j], "O") - 1],
        }
      } else if (isCatsGame(board[i][j])) {
        resolvedMiniGames[i][j] = { winner: "tie", arrangement: null }
      }
    }
  }

  return resolvedMiniGames
}

export function printGameState(gameState) {
  const row1of9 = [gameState[0][0][0], gameState[0][1][0], gameState[0][2][0]]
  const row2of9 = [gameState[0][0][1], gameState[0][1][1], gameState[0][2][1]]
  const row3of9 = [gameState[0][0][2], gameState[0][1][2], gameState[0][2][2]]
  const row4of9 = [gameState[1][0][0], gameState[1][1][0], gameState[1][2][0]]
  const row5of9 = [gameState[1][0][1], gameState[1][1][1], gameState[1][2][1]]
  const row6of9 = [gameState[1][0][2], gameState[1][1][2], gameState[1][2][2]]
  const row7of9 = [gameState[2][0][0], gameState[2][1][0], gameState[2][2][0]]
  const row8of9 = [gameState[2][0][1], gameState[2][1][1], gameState[2][2][1]]
  const row9of9 = [gameState[2][0][2], gameState[2][1][2], gameState[2][2][2]]

  console.log(row1of9[0] + "|" + row1of9[1] + "|" + row1of9[2])
  console.log(row2of9[0] + "|" + row2of9[1] + "|" + row2of9[2])
  console.log(row3of9[0] + "|" + row3of9[1] + "|" + row3of9[2])
  console.log("-----|-----|-----")
  console.log(row4of9[0] + "|" + row4of9[1] + "|" + row4of9[2])
  console.log(row5of9[0] + "|" + row5of9[1] + "|" + row5of9[2])
  console.log(row6of9[0] + "|" + row6of9[1] + "|" + row6of9[2])
  console.log("-----|-----|-----")
  console.log(row7of9[0] + "|" + row7of9[1] + "|" + row7of9[2])
  console.log(row8of9[0] + "|" + row8of9[1] + "|" + row8of9[2])
  console.log(row9of9[0] + "|" + row9of9[1] + "|" + row9of9[2])
}
