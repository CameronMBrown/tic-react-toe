import React, { useContext, useState } from "react"

// context
import SettingsContext from "../../../store/SettingsContext"
import GameStateContext from "../../../store/GameStateContext"

// components
import Setting from "./Setting/Setting"
import Button from "../../UI/Button/Button"
import Gear from "../../Symbols/Gear"
import XSymbol from "../../Symbols/XSymbol"
import Modal from "../../UI/Modal/Modal"

// styles
import "./SettingsModal.scss"

export default function SettingsModal({ onChangeSettings }) {
  const [showSettings, setShowSettings] = useState(false)
  const settingsCtx = useContext(SettingsContext)
  const gameCtx = useContext(GameStateContext)

  const showSettingsModal = () => {
    if (showSettings) return

    setShowSettings(true)
    gameCtx.pause()
  }

  const closeSettingsModal = () => {
    if (!showSettings) return
    else {
      setShowSettings(false)
      gameCtx.unpause()
    }
  }

  // TODO: remove default and style custom increment/decrement buttons for number inputs

  const handleResetGame = () => {
    // TODO: confirm reset game modal
    setShowSettings(false)
    gameCtx.clear()
  }

  // TODO: handle some settings need game reset
  const handleSaveSettings = (e) => {
    e.preventDefault()
    // get form values
  }

  return (
    <>
      <Gear onClick={showSettingsModal} />
      {showSettings && (
        <Modal className="settings-modal" open={showSettings}>
          <Button className="close-btn" action={closeSettingsModal}>
            <XSymbol />
          </Button>
          <h3 className="settings-title">Settings</h3>
          <form className="settings-form" onSubmit={handleSaveSettings}>
            {/* TODO: some settings will need a game reset */}
            <Setting
              type="number"
              name="pointsToWin"
              text="Points To Win"
              value={settingsCtx.settings.pointsToWin}
              onChange={(e) => {
                settingsCtx.setPointsToWin(e.target.value)
              }}
            />
            <Setting
              type="number"
              name="points3InARow"
              text="Points Awarded for a 'Three-in-a-row'"
              value={
                settingsCtx.settings.points3InARow >=
                settingsCtx.settings.pointsToWin
                  ? settingsCtx.settings.points3InARow
                  : settingsCtx.settings.pointsToWin
              }
              onChange={(e) => {
                settingsCtx.setPointsFor3InARow(e.target.value)
              }}
            />
            <Setting
              type="number"
              name="moveTimer"
              text="Move Timer"
              value={settingsCtx.settings.moveTimer / 1000}
              onChange={(e) => {
                settingsCtx.setMoveTimer(e.target.value)
              }}
            />
            <div className="buttons-area">
              {/* <Button type="submit">Save</Button> */}
              <Button action={handleResetGame}>Reset Game</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}
