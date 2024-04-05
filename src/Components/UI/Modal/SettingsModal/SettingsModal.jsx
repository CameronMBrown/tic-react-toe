import { useCallback, useContext, useState } from "react"

// context
import GameStateContext from "../../../../store/GameStateContext"
import ThemeContext from "../../../../store/ThemeContext"

// components
import Setting from "./Setting/Setting"
import Button from "../../Button/Button"
import Gear from "../../../Symbols/Gear"
import XSymbol from "../../../Symbols/XSymbol"
import Modal from "../Modal"

// styles
import "./SettingsModal.scss"

export default function SettingsModal() {
  const gameCtx = useContext(GameStateContext)
  const themeCtx = useContext(ThemeContext)
  const [showSettings, setShowSettings] = useState(false)
  const [confirmChange, setConfirmChange] = useState(false)
  const [settings, setSettings] = useState({
    vsComputer: gameCtx.vsComputer,
    pointsToWin: gameCtx.pointsToWin,
    moveTimer: gameCtx.moveTimer,
  })
  let modalContent

  // opening the settings pauses an underway game
  const showSettingsModal = () => {
    if (showSettings) return

    setShowSettings(true)
    gameCtx.pause()
  }

  // closing the settings resumes an underway game
  const closeSettingsModal = () => {
    if (!showSettings) return
    else setShowSettings(false)

    if (!gameCtx.win) gameCtx.unpause()
  }

  const onIncrement = useCallback((setting, newValue) => {
    setSettings((prev) => ({ ...prev, [setting]: newValue }))
  }, [])

  const handleSaveSettings = () => {
    setShowSettings(false)
    setConfirmChange(false)

    // clear game & apply settings
    gameCtx.updateSettings({
      vsComputer: settings.vsComputer,
      pointsToWin: settings.pointsToWin,
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
            type="checkbox"
            name="darkMode"
            text="Dark Mode"
            value={themeCtx.darkMode}
            onChange={(e) => {
              themeCtx.handleChangeTheme(e.target.checked)
            }}
          />
          <Setting
            type="checkbox"
            name="vsComputer"
            text="Play against computer"
            value={settings.vsComputer}
            onChange={(e) => {
              setSettings((prev) => ({ ...prev, vsComputer: e.target.checked }))
            }}
          />
          <Setting
            type="number"
            name="pointsToWin"
            text="Points to win"
            value={settings.pointsToWin}
            onIncrement={onIncrement}
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
            name="moveTimer"
            text="Move Timer (seconds)"
            value={settings.moveTimer / 1000}
            onIncrement={onIncrement}
            onChange={(e) => {
              if (e.target.value > 0) {
                setSettings((prev) => ({
                  ...prev,
                  moveTimer: e.target.value * 1000,
                }))
              }
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
          {confirmChange.message && (
            <p className="heading">{confirmChange.message}</p>
          )}
          <p>Are you sure?</p>
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
