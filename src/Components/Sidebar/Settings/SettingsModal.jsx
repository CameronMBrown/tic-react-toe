import React, { useContext, useState } from "react"

// context
import SettingsContext from "../../../store/SettingsContext"

// components
import Setting from "./Setting/Setting"
import Button from "../../UI/Button/Button"
import Gear from "../../Symbols/Gear"
import XSymbol from "../../Symbols/XSymbol"
import Modal from "../../UI/Modal/Modal"

// styles
import "./SettingsModal.scss"

// settings configuration
import { DEFAULT_GAME_SETTINGS } from "../../../utils/constants"

export default function SettingsModal({ onChangeSettings }) {
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState(DEFAULT_GAME_SETTINGS)
  const settingsCtx = useContext(SettingsContext)

  const showSettingsModal = () => {
    // console.log(showSettings)
    if (showSettings) return
    setShowSettings(true)
  }

  const closeSettingsModal = () => {
    if (!showSettings) return
    else setShowSettings(false)
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
          <Button classes={["close-btn"]} action={closeSettingsModal}>
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
            <input type="submit" value="Save" />
          </form>
        </Modal>
      )}
    </>
  )
}
