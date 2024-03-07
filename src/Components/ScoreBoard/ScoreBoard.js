import React, { useState } from "react";

// components
import XSymbol from "../Symbols/XSymbol";
import OSymbol from "../Symbols/OSymbol";

// styles 
import './ScoreBoard.scss'
import NextMove from "./NextPlayer/NextPlayer";

export default function ScoreBoard({ player, score }) {
    let totalX = 0
    let totalO = 0
    score.X.forEach(num => totalX += num)
    score.O.forEach(num => totalO += num)


    return (
        <div className="scoreboard-wrapper">
            <NextMove player={player} />
            <div className="scoreboard">
                <div className="playerX-score">
                    <XSymbol />
                    <span>{totalX}</span>
                    { score.X.map((roundScore, i) => <div className="round-score">{roundScore}</div>) }
                </div>
                <hr className="scoreboard-divider"></hr>
                <div className="playerO-score">
                    <OSymbol />
                    <span>{totalO}</span>
                    { score.O.map((roundScore, i) => <div className="round-score">{roundScore}</div>) }
                </div>
            </div>
        </div>
    )
}