import React, { useState } from 'react'

// components
import Setting from "./Setting/Setting"
import Button from "../../Button/Button"
import Gear from "../../Symbols/Gear"
import XSymbol from '../../Symbols/XSymbol'

// styles
import "./SettingsModal.scss"

// settings configuration
import { DEFAULT_GAME_SETTINGS } from '../../../utils/constants'


export default function SettingsModal({ onChangeSettings }) {
    const [ showSettings, setShowSettings ] = useState(false)
    const [ settings, setSettings ] = useState(DEFAULT_GAME_SETTINGS)


    const showSettingsModal = () => {
        if (showSettings) return
        else setShowSettings(true)
    }

    const closeSettingsModal = () => {
        if (!showSettings) return
        else setShowSettings(false)
    }

    // TODO:
    const handleSaveSettings = (e) => {
        e.preventDefault()

    }

    return (
        <>
            <Gear onClick={showSettingsModal}/>
            { showSettings && 
                <div className="settings-modal-overlay">
                    <div className="settings-modal">
                        <Button 
                            classes={["close-btn"]}
                            action={closeSettingsModal} >
                                <XSymbol />
                        </Button>
                        <h3 className="settings-title">Settings</h3>
                        <form className="settings-form" onSubmit={handleSaveSettings}>
                            { 
                                settings.map((setting, i) => {
                                    return (
                                        <Setting 
                                            key={`setting-${i}`}
                                            text={setting.text}
                                            type={setting.type}
                                            initialValue={setting.value}
                                        />
                                    )
                                }) 
                            }
                            <input type="submit" value="Save" />
                        </form>
                    </div>
                </div>
            }
        </>
    )
}