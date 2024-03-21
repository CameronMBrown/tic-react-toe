import { useContext, useState } from "react"

// context
import GameStateContext from "../../../../store/GameStateContext"

// components
import Button from "../../Button/Button"
import Modal from "../Modal"

// styles
import "./WonGameModal.scss"

function WonGameModal({ winner, children }) {
  const gameCtx = useContext(GameStateContext)
  const [showModal, setShowModal] = useState(true)

  winner = localStorage.getItem(winner) ?? winner

  if (!showModal) return

  // TODO: get actual winning player name
  return (
    <Modal className="won-game-modal" open={showModal}>
      <h3>{winner} is the Winner!</h3>
      {children}
      <div className="modal-buttons">
        <Button action={() => setShowModal(false)}>View Board</Button>
        <Button action={() => gameCtx.clear()}>Rematch</Button>
      </div>
    </Modal>
  )
}
export default WonGameModal
