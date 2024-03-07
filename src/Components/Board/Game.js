import React, { useState } from 'react'

// components
import MiniGame from './MiniGame/MiniGame'

// utils
import { checkForWin } from '../../utils/utils'

// styles 
import './Game.scss'

export default function Game( props ) {
   const { gameState, nextMove, onMakeMove, onCatsGame, onWin } = props

   // state
   const [winner, setWinner] = useState(false)
   const [classes, setClasses] = useState(["board__container"])

   const [resolvedMiniGames, setResolvedMiniGames] 
      = useState([
            [false, false, false],
            [false, false, false],
            [false, false, false]
         ])

   let nextVerifiedMove

   const handleWonMiniGame = (player, Xpos, Ypos) => {
      console.log("hwmg")
      const nextResolvedMiniGames = resolvedMiniGames.map((row, i) => {
         if (i === Xpos) {
            return row.map((minigame, j) => {
               if (j === Ypos) return player
               else return minigame
            })
         } else return row
      })
      setResolvedMiniGames(nextResolvedMiniGames)

      // after a minigame is won, the next player can play anywhere
      nextVerifiedMove = "all"
      console.log(nextVerifiedMove)
   }

   const handleMiniGameTie = (Xpos, Ypos) => {
      const nextResolvedMiniGames = resolvedMiniGames.map((row, i) => {
         if (i === Xpos) {
            return row.map((minigame, j) => {
               if (j === Ypos) return "tie"
               else return minigame
            })
         } else return row
      })
      setResolvedMiniGames(nextResolvedMiniGames)
   }

   const isCatsGame = () => {
      if (winner === "X" || winner === "O") return false

      for (const miniGameRow of resolvedMiniGames) {
         for (const miniGame of miniGameRow) {
            if (miniGame === false) return false
         }
      }
      return true
   }

   // check for win
   if (!winner) {
      let arrangementNum = checkForWin(gameState, "X")
      if (typeof(arrangementNum) === "number") {
         // does checkForWin return an arrangement index with player "X"
         setWinner("X")
         setClasses((prev) => [...prev, "has-winner", `win-${arrangementNum}`])
         onWin("X")
      } else {
         // distinctly check the same for "O"
         arrangementNum = checkForWin(gameState, "O")
         if (typeof(arrangementNum) === "number") {
            setWinner("O")
            setClasses((prev) => [...prev, "has-winner", `win-${arrangementNum}`])
            onWin("O")
         }
      }
   } 

   // check for "cat's game"
   if (isCatsGame()) {
      // detirmine who won more minigames overall
      let winsX, winsO = 0;
      for (let miniGameRow in resolvedMiniGames) {
         for (let minigame in miniGameRow) {
            if (minigame === "X") winsX++
            else if (minigame === "O") winsO++
         }
      }
      // get score differential
      if (winsX === winsO) onCatsGame(0)
      else if (winsX > winsO) onCatsGame(winsX - winsO, "X")
      else if (winsO > winsX) onCatsGame(winsO - winsX, "O")
   }

   // verify next valid move
   if (nextMove === "all" || nextVerifiedMove === "all" || resolvedMiniGames[nextMove.row][nextMove.cell] !== false) {
      // the very first turn, or the typical next move is already a resolved game
      nextVerifiedMove = "all"
      if (!classes.includes("open-board")) setClasses(prev => [...prev, "open-board"])
   } else {
      nextVerifiedMove = nextMove
   }

   console.log(nextVerifiedMove)

   return (
      <div className="game-wrapper">
         <div className={classes.join(' ')}>
            {
               gameState.map((row, i) => {
                  return gameState[i].map((minigame, j) => {
                     return (
                        <MiniGame 
                           key={`minigame-${i}${j}`}
                           gameID={`minigame-${i}${j}`}
                           localGameState={gameState[i][j]}
                           validPlay={
                              (nextVerifiedMove === "all" || 
                              (i === nextVerifiedMove.row && j === nextVerifiedMove.cell)) ? true : false
                           }
                           onMiniGameTie={handleMiniGameTie}
                           onMiniGameWin={handleWonMiniGame}
                           onMakeMove={onMakeMove}
                        />
                     )
                  })
               })
            }
         </div>
      </div>
   )
}
