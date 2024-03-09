import React, { useContext, useState } from "react"

// context
import GameStateContext from "../../store/GameStateContext"

// components
import MiniGame from "./MiniGame/MiniGame"

// styles
import "./Game.scss"

export default function Game() {
  const gameCtx = useContext(GameStateContext)

  // TODO: add classes for winning situations
  let classes = ["board__container"]

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
