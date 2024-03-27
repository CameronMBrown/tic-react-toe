import { useState, useContext, useEffect } from "react"

import GameStateContext from "../../store/GameStateContext"

import Pause from "../Symbols/Pause"
import Play from "../Symbols/Play"
import SettingsModal from "../UI/Modal/SettingsModal/SettingsModal"
import PausedGameModal from "../UI/Modal/PausedGameModal/PausedGameModal"

import "./Sidebar.scss"
import InfoModal from "../UI/Modal/InfoModal/InfoModal"

function Sidebar() {
  const [showPause, setShowPause] = useState(false)
  const gameCtx = useContext(GameStateContext)

  useEffect(() => {
    if (gameCtx.underway) {
      setShowPause(false)
    }
  }, [gameCtx.underway])

  const handlePause = () => {
    setShowPause(true)
    gameCtx.pause()
  }

  const handlePlay = () => {
    setShowPause(false)
    if (!gameCtx.win) gameCtx.unpause()
  }

  return (
    <div className="game-buttons">
      {gameCtx.underway && <Pause onClick={handlePause} />}
      {!gameCtx.underway && <Play onClick={handlePlay} />}
      <InfoModal />
      <SettingsModal />
      {showPause && <PausedGameModal />}
    </div>
  )
}
export default Sidebar
