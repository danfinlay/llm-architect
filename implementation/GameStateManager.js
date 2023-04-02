class GameStateComponent:
    def __init__(self):
        self.board = None
        self.pieces = None
        self.game_over = False
        self.winner = None

    def update_board(self, board):
        self.board = board

    def update_pieces(self, pieces):
        self.pieces = pieces

    def check_game_over(self):
        # logic for determining if game is over
        self.game_over = True

    def determine_winner(self):
        # logic for determining winner
        self.winner = "Player 1"

    def update_game_state(self):
        self.check_game_over()
        if self.game_over:
            self.determine_winner()