/*
Useful project constants

Remember, most of these constants are multi-dimentional arrays, so you likely need to use the structuredClone
method to avoid assigning new values to the constants.

ex. board: structuredClone(NEW_GAME)
*/

export const WINS = [
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ],
  [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 1 },
    { x: 2, y: 0 },
  ],
]

export const NEW_GAME = [
  [
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
  ],
  [
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
  ],
  [
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
  ],
]

export const NEW_MINIGAMES = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
]

export const DEFAULT_GAME_DATA = {
  underway: false,
  board: structuredClone(NEW_GAME),
  player: "X",
  nextValidMove: "all",
  resolvedMiniGames: structuredClone(NEW_MINIGAMES),
  win: false,
  player1Score: 0,
  player2Score: 0,
  pointsToWin: 3,
  moveTimer: 20000,
}

export const BASIC_WIN_CASE = [
  [
    [
      ["X", " ", " "],
      ["X", " ", " "],
      ["X", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
  ],
  [
    [
      ["X", " ", " "],
      ["X", " ", " "],
      ["X", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
  ],
  [
    [
      ["X", " ", " "],
      ["X", " ", " "],
      [" ", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
    [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
  ],
]

export const CATS_GAME_CASE = [
  [
    [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["X", "X", "O"],
    ],
    [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["X", "X", "O"],
    ],
    [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["X", "X", "O"],
    ],
  ],
  [
    [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["X", "X", "O"],
    ],
    [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["X", "X", "O"],
    ],
    [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["X", "X", "O"],
    ],
  ],
  [
    [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["X", "X", "O"],
    ],
    [
      ["X", "O", "O"],
      ["O", "X", "X"],
      ["X", "X", "O"],
    ],
    [
      [" ", "O", "O"],
      ["O", "X", "X"],
      ["X", "X", "O"],
    ],
  ],
]
