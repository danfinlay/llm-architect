interface GameProposalComponent {
  // Sends a game proposal to another user with a custom game board
  void sendProposal(User recipient, GameBoard gameBoard);

  // Receives a game proposal from another user
  void receiveProposal(User sender, GameBoard gameBoard);

  // Accepts a received game proposal and adds the game board and pieces to the user's set
  void acceptProposal(User sender, GameBoard gameBoard);

  // Rejects a received game proposal
  void rejectProposal(User sender, GameBoard gameBoard);
}

class User {
  String username;
  // Other user properties
}

class GameBoard {
  // Custom game board properties
}

// Example usage:
GameProposalComponent gameProposalComponent = new GameProposalComponentImpl();

User sender = new User("Alice");
User recipient = new User("Bob");
GameBoard gameBoard = new GameBoard();

gameProposalComponent.sendProposal(recipient, gameBoard);
gameProposalComponent.receiveProposal(sender, gameBoard);
gameProposalComponent.acceptProposal(sender, gameBoard);