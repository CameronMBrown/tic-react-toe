import { useContext, useEffect, useState } from "react"

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

  // show info modal on first visit
  useEffect(() => {
    if (!localStorage.getItem("gamestate")) showInfoModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              For a while I have been thinking about how this spin on the
              classic tic-tac-toe game would make for a perfect react project,
              so I made it!
            </p>
            <p>
              For a more detailed explanation, checkout my github and the
              README.
            </p>
            <p>
              I am currently looking for work in the web-development space, find
              me on LinkedIn and let's talk about how I can help with your
              project.
            </p>
          </div>
          <div className="modal-buttons">
            <Button
              className="linkedin-btn"
              action={() =>
                window.open(
                  "https://www.linkedin.com/in/cameronmagyarbrown/",
                  "_blank"
                )
              }
            >
              <LinkedIn />
              LinkedIn
            </Button>
            <Button
              className="github-btn"
              action={() =>
                window.open(
                  "https://github.com/CameronMBrown/tic-react-toe",
                  "_blank"
                )
              }
            >
              <Github />
              Github
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default InfoModal
