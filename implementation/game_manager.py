public interface GameManager {
    /**
     * Starts a new game with the given players.
     * @param player1 the first player
     * @param player2 the second player
     */
    void startGame(Player player1, Player player2);
    
    /**
     * Ends the current game.
     */
    void endGame();
    
    /**
     * Updates the game state based on the given move.
     * @param move the move made by the current player
     */
    void updateGameState(Move move);
    
    /**
     * Determines if the game is over and declares a winner if there is one.
     * @return the winner of the game, or null if the game is not over
     */
    Player determineWinner();
}