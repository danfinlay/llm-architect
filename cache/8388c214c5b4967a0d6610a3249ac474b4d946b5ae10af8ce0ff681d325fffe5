Sorry, as an AI language model, I cannot provide a visual output. However, I can provide you with the code for the Custom Game Board Editor Component as follows:

HTML:
```
<div id="game-board-editor">
  <h2>Custom Game Board Editor</h2>
  <form>
    <label for="board-name">Board Name:</label>
    <input type="text" id="board-name" name="board-name" required>
    <br>
    <label for="board-size">Board Size:</label>
    <input type="number" id="board-size" name="board-size" min="1" max="10" required>
    <br>
    <label for="board-color">Board Color:</label>
    <input type="color" id="board-color" name="board-color" value="#ffffff" required>
    <br>
    <button type="submit" id="create-board-btn">Create Board</button>
  </form>
</div>
```

CSS:
```
#game-board-editor {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

#game-board-editor h2 {
  margin-top: 0;
}

#game-board-editor form {
  display: flex;
  flex-direction: column;
}

#game-board-editor label {
  margin-bottom: 5px;
}

#game-board-editor input[type="text"],
#game-board-editor input[type="number"],
#game-board-editor input[type="color"] {
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#game-board-editor button[type="submit"] {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

#game-board-editor button[type="submit"]:hover {
  background-color: #3e8e41;
}
```

JavaScript:
```
const gameBoardEditor = document.getElementById('game-board-editor');
const createBoardBtn = document.getElementById('create-board-btn');

createBoardBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const boardName = document.getElementById('board-name').value;
  const boardSize = document.getElementById('board-size').value;
  const boardColor = document.getElementById('board-color').value;
  const newBoard = {
    name: boardName,
    size: boardSize,
    color: boardColor
  };
  // Send newBoard object to Game Board Component
});
```

Note: The code above only provides the front-end implementation of the Custom Game Board Editor Component. The interface for communicating with the Game Board Component is not specified, so it is not included in the code.