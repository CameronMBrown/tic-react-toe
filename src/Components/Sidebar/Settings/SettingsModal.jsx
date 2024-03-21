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

export default function SettingsModal() {
  const settingsCtx = useContext(SettingsContext)
  const gameCtx = useContext(GameStateContext)
  const [showSettings, setShowSettings] = useState(false)
  const [confirmChange, setConfirmChange] = useState(false)
  const [settings, setSettings] = useState({
    pointsToWin: gameCtx.pointsToWin,
    pointsForThreeInARow: gameCtx.pointsForThreeInARow,
    moveTimer: gameCtx.moveTimer,
  })
  let modalContent

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

  const handleSaveSettings = () => {
    setShowSettings(false)
    setConfirmChange(false)

    // clear game & apply settings
    gameCtx.updateSettings({
      pointsToWin: settings.pointsToWin,
      pointsForThreeInARow: settings.pointsForThreeInARow,
      moveTimer: settings.moveTimer,
    })
  }

  if (!confirmChange) {
    // settings form
    modalContent = (
      <>
        <Button className="close-btn" action={closeSettingsModal}>
          <XSymbol />
        </Button>
        <h3 className="settings-title">Settings</h3>
        <form className="settings-form">
          <Setting
            type="number"
            name="pointsToWin"
            text="Points To Win"
            value={
              settings.pointsForThreeInARow > settings.pointsToWin
                ? settings.pointsForThreeInARow
                : settings.pointsToWin
            }
            onChange={(e) => {
              let val = +e.target.value
              if (val > 0) {
                setSettings((prev) => ({
                  ...prev,
                  pointsToWin: val,
                }))
              }
            }}
          />
          <Setting
            type="number"
            name="pointsForThreeInARow"
            text="Points Awarded for a 'Three-in-a-row'"
            value={settings.pointsForThreeInARow}
            onChange={(e) => {
              let val = +e.target.value
              if (val >= 3) {
                setSettings((prev) => ({
                  ...prev,
                  pointsForThreeInARow: val,
                }))
              }
            }}
          />
          <Setting
            type="number"
            name="moveTimer"
            text="Move Timer (seconds)"
            value={settings.moveTimer / 1000}
            onChange={(e) => {
              setSettings((prev) => ({
                ...prev,
                moveTimer: e.target.value * 1000,
              }))
            }}
          />
          <div className="buttons-area">
            <Button
              type="button"
              action={() =>
                setConfirmChange({
                  message:
                    "The game must be reset for the settings to take effect.",
                })
              }
            >
              Save
            </Button>
            <Button type="button" action={() => setConfirmChange(true)}>
              Reset Game
            </Button>
          </div>
        </form>
      </>
    )
  } else {
    // confirmation dialog
    modalContent = (
      <>
        <div className="message-area">
          {confirmChange.message && <p>{confirmChange.message}</p>}
          <p>Are you sure you want to reset the game?</p>
        </div>
        <div className="buttons-area">
          <Button type="button" action={() => setConfirmChange(false)}>
            Cancel
          </Button>
          <Button type="button" action={handleSaveSettings}>
            Reset Game
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <Gear onClick={showSettingsModal} />
      {showSettings && (
        <Modal className="settings-modal" open={showSettings}>
          {modalContent}
        </Modal>
      )}
    </>
  )
}
