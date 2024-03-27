# Tic React Toe

thanks for checking out my project!
For a while I have been thinking about how this spin on the classic tic-tac-toe game would make for a perfect react project, so I made it!
The game is defined by its nested smaller tic-tac-toe games and the more interesting move pattern that allows for deeper strategies and more replayability.

### Features

##### Save Game

Each turn saves the gamestate to your browsers local storage. Refresh the page, close your browser, come back days later and your game will still be there.

##### Move Timer

Think quick! You only have a limited time to make your move, otherwise a random cell will be chosen for you. The move timer can be adjusted in the settings.

##### Vs. Computer

No one to play with? No problem, just open the settings modal and enable the "Play against computer" toggle. The computer will choose a random available valid move on its turn. The computer is still improving, and higher computer difficulties are on the roadmap.

##### Responsive Design

This app should run great on your mobile device, tablet or ultrawide monitor.
I did my best to design the game in a visually interesting way, with animations that respond to you and visual feedback on how the game is going.

### Design

This app's state management is done with a reducer function that dispatches actions to a game context provider.
You can find this in src/store/GameStateContext.jsx

### Future Roadmap

- dark mode 🌑
- disable move timer
- optimize mobile and touch events
- customize token colour
- customize token shape
- Vs. computer difficulty settings
- accidental move protection
