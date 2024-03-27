import { useContext, useState } from "react"

// context
import GameStateContext from "../../../../store/GameStateContext"

// components
import Info from "../../../Symbols/Info"
import XSymbol from "../../../Symbols/XSymbol"
import Github from "../../../Symbols/Github"
import Button from "../../Button/Button"
import Modal from "../Modal"

// styles
import "./InfoModal.scss"
import LinkedIn from "../../../Symbols/LinkedIn"

function InfoModal() {
  const gameCtx = useContext(GameStateContext)
  const [showInfo, setShowInfo] = useState(false)

  // opening the info modal pauses an underway game
  const showInfoModal = () => {
    if (showInfo) return

    setShowInfo(true)
    gameCtx.pause()
  }

  // closing the info modal resumes an underway game
  const closeInfoModal = () => {
    if (!showInfo) return
    else setShowInfo(false)

    if (!gameCtx.win) gameCtx.unpause()
  }

  return (
    <>
      <Info onClick={showInfoModal} />
      {showInfo && (
        <Modal className="info-modal" open={showInfo}>
          <Button className="close-btn" action={closeInfoModal}>
            <XSymbol />
          </Button>
          <div className="modal-content">
            <h3>Hey, I'm Cameron 👋</h3>
            <p>Thanks for checking out my site!</p>
            <p>
              For a while I have been thinking about how this version of the
              game would make for a perfect react project, so I made it!
            </p>
            <p>
              For a more detailed explaination, checkout my github and the
              README.
            </p>
            <p>
              I am currently looking for work in the web-development space, find
              me on LinkedIn and lets talk about how I can help with your
              project.
            </p>
          </div>
          <div className="modal-buttons">
            <a
              className="link linkedin-link"
              href="https://www.linkedin.com/in/cameronmagyarbrown/"
            >
              <Button className="linkedin-btn">
                <LinkedIn />
                LinkedIn
              </Button>
            </a>
            <a
              className="link github-link"
              href="https://github.com/CameronMBrown/tic-react-toe"
            >
              <Button className="github-btn">
                <Github />
                Github
              </Button>
            </a>
          </div>
        </Modal>
      )}
    </>
  )
}

export default InfoModal
