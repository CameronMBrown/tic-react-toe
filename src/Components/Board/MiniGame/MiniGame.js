import React, { useState } from 'react'

// components
import Cell from '../Cell/Cell'
import XSymbol from '../../Symbols/XSymbol'
import OSymbol from '../../Symbols/OSymbol'

// styles
import "./MiniGame.scss"

// utils
import { checkForWin } from '../../../utils/utils'

export default function MiniGame( props ) {
   const { gameID, localGameState, validPlay, onMiniGameTie, onMiniGameWin, onMakeMove } = props
   
   const [ isResolved, setIsResolved ] = useState(false);
   const [ classes, setClasses ] = useState(["minigame-container", "valid-move"])

   const parentX = parseInt(gameID.substr(-2, 1))
   const parentY = parseInt(gameID.substr(-1))

   const isLocalCatsGame = () => {
      if (isResolved === "tie") return true

      for (let localRow of localGameState) {
         for (let localCell of localRow) {
            if (localCell === " "){
               return false
            }
         }
      }

      return true
   }

   if (!isResolved) {
      if (checkForWin(localGameState, "X")) {
         setIsResolved("X")
         onMiniGameWin("X", parentX, parentY)
      } else if (checkForWin(localGameState, "O")) {
         setIsResolved("O")
         onMiniGameWin("O", parentX, parentY)
      } else if (isLocalCatsGame()) {
         setIsResolved("tie")
         setClasses((prev) => [...prev, "has-tie"])
         onMiniGameTie(parentX, parentY)
      }
   }

   // set classes depending on move validity
   if (!validPlay) {
      const nextClasses = classes.map((className, i) => {
         if (className === "valid-move") {
            return null
         } else return className
      })
      if (JSON.stringify(classes) !== JSON.stringify(nextClasses)) setClasses([...nextClasses, "invalid-move"])
   } else {
      const nextClasses = classes.map((className, i) => {
         if (className === "invalid-move") {
            return null
         } else return className
      })
      if (JSON.stringify(classes) !== JSON.stringify(nextClasses)) setClasses([...nextClasses, "valid-move"])
   }

   return (
      <div id={gameID} className={classes.join(' ')}>
         { (!isResolved || isResolved === "tie") &&
            localGameState.map((row, i) => {
               return localGameState[i].map((cell, j) => {
                  return (
                     <Cell
                        key={`minigame-${parentX}${parentY}__cell-${i}${j}`}
                        cellID={`minigame-${parentX}${parentY}__cell-${i}${j}`}
                        contents={localGameState[i][j]}
                        parentX={parentX}
                        parentY={parentY}
                        onMakeMove={onMakeMove}
                     />
                  )
               })
            })
         }
         { isResolved === "X" &&
            <div className="big-token">
               <XSymbol />
            </div>
         }
         { isResolved === "O" &&
            <div className="big-token">
               <OSymbol />
            </div>
         }
      </div>
   )
}
