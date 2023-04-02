Let's build an extensible Chess application.
This will be a web application that will be capable of running in a web browser, and allowing users to play chess against each other over WebRTC.
It starts fully capable of providing a web interface for playing chess over the web with another person, by sharing an invitation link.
The application includes an interface for adding new custom pieces to the game, building new custom game boards, and proposing games with others using the new game board.
When a player accepts a game with a new board, that game's board and pieces are added to the receiving player's set.
There should be a standard interface that each piece implements to be incorporated into the game.
The pieces in this game will each be defined in their own module, and users will be able to add new pieces to the game, which will be sandboxed with the Compartment API from the `@agoric/ses` `Compartment` API.
There should be a piece editor view that allows customizing a piece's graphic, and the code that represents the piece.
Users should be able to save and export their custom pieces and boards.
This game has no need for an AI component at this time.
