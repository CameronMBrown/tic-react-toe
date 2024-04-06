import { useCallback, useContext, useState, useEffect } from "react"

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
    moveTimer: gameCtx.moveTimer / 1000,
  })
  let modalContent

  // whenever the modal is opened, display the current settings
  useEffect(() => {
    setSettings({
      vsComputer: gameCtx.vsComputer,
      pointsToWin: gameCtx.pointsToWin,
      moveTimer: gameCtx.moveTimer / 1000,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSettings])

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

  // increment setting value without re-rendering
  const onIncrement = useCallback((setting, newValue) => {
    setSettings((prev) => ({ ...prev, [setting]: newValue }))
  }, [])

  // ask user for confirmation if changing settings while a game is ongoing
  const confirmOrClose = () => {
    console.log(gameCtx.areNewSettings(settings))
    console.log(settings)

    if (gameCtx.areNewSettings(settings)) {
      if (gameCtx.isNewGame()) {
        // user changed settings at an inconsequential time
        handleSaveSettings()
      } else {
        // user changed settings during an ongoing game
        setConfirmChange({
          message: "The game must be reset for the settings to take effect.",
        })
      }
    } else {
      // user saved without changing any settings
      setShowSettings(false)
    }
  }

  // close the modal and update game settings context
  const handleSaveSettings = () => {
    setShowSettings(false)
    setConfirmChange(false)

    // clear game & apply settings
    gameCtx.updateSettings({
      vsComputer: settings.vsComputer,
      pointsToWin: settings.pointsToWin,
      moveTimer: settings.moveTimer * 1000,
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
            value={settings.moveTimer}
            onIncrement={onIncrement}
            onChange={(e) => {
              if (e.target.value > 0) {
                setSettings((prev) => ({
                  ...prev,
                  moveTimer: e.target.value,
                }))
              }
            }}
          />
          <div className="buttons-area">
            <Button type="button" action={() => setConfirmChange(true)}>
              Reset Game
            </Button>
            <Button type="button" action={() => confirmOrClose()}>
              Save
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
