import { createContext, useState } from "react"

const SettingsContext = createContext({
  settings: {
    pointsToWin: 3,
    points3InARow: 3,
    moveTimer: 10000,
    missedMoveConsequence: "random",
  },
  setPointsToWin: (points) => {},
  setPointsFor3InARow: (points) => {},
  setMoveTimer: (ms) => {},
  setMissedMoveConsequence: (consequence) => {},
})

export function SettingsContextProvider({ children }) {
  const [settings, setSettings] = useState({
    pointsToWin: 3,
    points3InARow: 3,
    moveTimer: 10000,
    missedMoveConsequence: "random",
  })

  function setPointsToWin(points) {
    setSettings({ ...settings, pointsToWin: points })
  }

  function setPointsFor3InARow(points) {
    setSettings({ ...settings, points3InARow: points })
  }

  function setMoveTimer(ms) {
    setSettings({ ...settings, moveTimer: ms })
  }

  function setMissedMoveConsequence(consequence) {
    setSettings({ ...settings, missedMoveConsequence: consequence })
  }

  const settingsCtx = {
    settings: {
      pointsToWin: settings.pointsToWin,
      points3InARow: settings.points3InARow,
      moveTimer: settings.moveTimer,
      missedMoveConsequence: settings.missedMoveConsequence,
    },
    setPointsToWin,
    setPointsFor3InARow,
    setMoveTimer,
    setMissedMoveConsequence,
  }

  return (
    <SettingsContext.Provider value={settingsCtx}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContext
