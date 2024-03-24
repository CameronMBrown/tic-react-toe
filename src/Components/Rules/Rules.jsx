import "./Rules.scss"

import Heading from "../UI/Heading/Heading"

function Rules() {
  return (
    <section id="rules-section" className="rules-section">
      <Heading headingLvl="h2" className="rules-title">
        Rules
      </Heading>
      <div className="board-explaination">
        <Heading headingLvl="h3">Understanding the Board</Heading>
        <p>
          <strong>Cell: </strong>the smallest division of the board.
        </p>
        <p>
          <strong>Small Game: </strong>refers to one of the nine smaller games
          or its result.
        </p>
        <p>
          <strong>Big Game: </strong> the overall game, usually without
          considering cells, only the state of "small" games.
        </p>
        <p>
          <strong>Token: </strong>the symbol that represents your past moves,
          either "X" or "O".
        </p>
        <p>
          <strong>Tic-Tac-Toe: </strong>any arrangement of three tokens in a
          row, belonging to the same player.
        </p>
      </div>
      <Heading headingLvl="h3">Moves</Heading>
      <Heading headingLvl="h4">The Basic Pattern</Heading>
      <p>
        Each turn, you should choose a cell within a small game to place your
        token, with the goal of working toward a tic-tac-toe.
      </p>
      <p>
        But think ahead! Which game cell you chose to play in will have an
        effect on the next player's turn.
      </p>
      <p>
        For example, there are nine center cells in the game (the cell in the
        middle row and middle column), one for each "small" game. When a player
        fills any of the center cells, the following player must choose any of
        the available cells that make up the center "small" game.
      </p>
      <p>
        Also remember to think quick! Each player only has a limited time to
        make their move on their turn. Otherwise, the game will choose a random
        available move for you. The move timer can be adjusted in the settings.
      </p>
      <Heading headingLvl="h4">Exceptions</Heading>
      <p>
        Whenever there is an exception to the basic move pattern, the following
        player is not restricted, and can choose any cell on the board, then the
        pattern resumes.
      </p>
      <p>These exceptions include: </p>
      <ul>
        <li>
          A player has just made a move that <i>wins</i> a small game.
        </li>
        <li>
          The pattern would normally require you to make a move in a small game
          that is already resolved.
        </li>
      </ul>
      <div className="ways-to-win">
        <Heading headingLvl="h3">Ways to Win</Heading>
        <Heading headingLvl="h4">Tic-Tac-Toe</Heading>
        <p>
          Regardless of the current score, if a player that achieves a
          "tic-tac-toe" on the overall "big" game, they are the winner.
        </p>
        <Heading headingLvl="h4">Points</Heading>
        <p>
          When a game board has been filled, and there is no clear winner
          through a big game tic-tac-toe, points are awarded based on the number
          of won small games.
        </p>
        <p>
          In this scenario, only the player that achieved more wins gets points.
          Their points are equal to the number of small game wins they have over
          their opponent.
        </p>
        <p>
          For example, if the game ends with two small game ties, three won by
          Player 1, and four won by Player 2. This would mean that Player 2 gets
          one point, since they had one more small win over Player 1.
        </p>
        <p>
          Afterwords, the game will prompt you to play another round until a
          player gets a tic-tac-toe or hits the required points to win.
        </p>
        <p>
          Remember, you can change the required number of points to win the game
          in the game settings. The default is three points.
        </p>
      </div>
    </section>
  )
}

export default Rules
