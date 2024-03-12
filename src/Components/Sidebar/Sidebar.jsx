import { useState, useContext, useEffect } from "react"

import GameStateContext from "../../store/GameStateContext"

import Pause from "../Symbols/Pause"
import SettingsModal from "./Settings/SettingsModal"
import PausedGameModal from "../UI/PausedGameModal/PausedGameModal"

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

  return (
    <div className="side-buttons">
      <Pause onClick={handlePause} />
      <SettingsModal />
      {showPause && <PausedGameModal />}
    </div>
  )
}
export default Sidebar
