<div id="game-proposal-component">
  <h2>Propose a Game</h2>
  <form>
    <label for="game-name">Game Name:</label>
    <input type="text" id="game-name" name="game-name" required>
    <br>
    <label for="game-description">Game Description:</label>
    <textarea id="game-description" name="game-description" required></textarea>
    <br>
    <label for="game-board-size">Game Board Size:</label>
    <input type="number" id="game-board-size" name="game-board-size" min="1" max="10" required>
    <br>
    <button type="submit" id="submit-proposal">Submit Proposal</button>
  </form>
</div>

<script>
  const gameProposalComponent = document.getElementById('game-proposal-component');
  const submitButton = gameProposalComponent.querySelector('#submit-proposal');
  const gameBoardComponent = document.getElementById('game-board-component');

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const gameName = gameProposalComponent.querySelector('#game-name').value;
    const gameDescription = gameProposalComponent.querySelector('#game-description').value;
    const gameBoardSize = gameProposalComponent.querySelector('#game-board-size').value;
    gameBoardComponent.proposeGame(gameName, gameDescription, gameBoardSize);
  });
</script>

<style>
  #game-proposal-component {
    border: 1px solid black;
    padding: 10px;
  }
  #game-proposal-component label {
    display: inline-block;
    width: 150px;
  }
  #game-proposal-component input[type="text"],
  #game-proposal-component input[type="number"],
  #game-proposal-component textarea {
    width: 300px;
    padding: 5px;
    margin-bottom: 10px;
  }
  #game-proposal-component button {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  #game-proposal-component button:hover {
    background-color: #3e8e41;
  }
</style>