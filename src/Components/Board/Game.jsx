import React, { useContext, useEffect, useState } from "react"

// context
import GameStateContext from "../../store/GameStateContext"

// components
import MiniGame from "./MiniGame/MiniGame"

// styles
import "./Game.scss"

export default function Game() {
  const gameCtx = useContext(GameStateContext)

  useEffect(() => {
    // let timer = setTimeout()
  }, [gameCtx.underway])

  // add classes depending on winning configuration
  let classes = ["board__container"]
  if (gameCtx.win) {
    classes.push("has-winner")
    classes.push(`win-${gameCtx.win - 1}`)
  }

  return (
    <div className="game-wrapper">
      <div className={classes.join(" ")}>
        {gameCtx.board.map((row, i) => {
          return gameCtx.board[i].map((minigame, j) => {
            return (
              <MiniGame
                key={`minigame-${i}${j}`}
                gameID={`minigame-${i}${j}`}
              />
            )
          })
        })}
      </div>
    </div>
  )
}
