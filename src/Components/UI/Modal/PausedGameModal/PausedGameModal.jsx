// TODO: retire this component???
// clicking on the board should unpause the game

import { useContext, useState } from "react"

// context
import GameStateContext from "../../../../store/GameStateContext"

// components
import Modal from "../Modal"
import Button from "../../Button/Button"
import Play from "../../../Symbols/Play"

// styles
import "./PausedGameModal.scss"

function PausedGameModal() {
  const [showModal, setShowModal] = useState(true)
  const gameCtx = useContext(GameStateContext)

  const handleUnpauseGame = () => {
    setShowModal(false)
    if (!gameCtx.win) gameCtx.unpause()
  }

  if (!showModal) return

  return (
    <Modal className="paused-modal" open={showModal}>
      <h3>Game Paused</h3>
      <Button className="play-btn" action={handleUnpauseGame}>
        <strong>Play</strong>
        <Play solid={false} />
      </Button>
    </Modal>
  )
}
export default PausedGameModal
