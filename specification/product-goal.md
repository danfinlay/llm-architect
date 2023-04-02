Let's build an extensible Chess application.
This will be a web application that will be capable of running in a web browser, and allowing users to play chess against each other over WebRTC.
There should be a standard interface that each piece implements to be incorporated into the game.
The pieces in this game will each be defined in their own module, and users will be able to add new pieces to the game, which will be sandboxed with the Compartment API from the `@agoric/ses` `Compartment` API.
When suggesting a new game, a player defines the layout of the board and what pieces to use. If the other player accepts, then their game will now evaluate the proposed pieces.
There should be a piece editor view that allows customizing a piece's graphic, and the code that represents the piece.
Users should be able to save and export their custom piecesA
.