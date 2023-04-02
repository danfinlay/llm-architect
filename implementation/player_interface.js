class PlayerComponent:
    def __init__(self):
        self.game_state = None

    def receive_game_state(self, game_state):
        self.game_state = game_state

    def make_move(self):
        # implementation of move logic
        pass

class UserInterface:
    def __init__(self):
        self.player_component = PlayerComponent()

    def input_move(self, move):
        self.player_component.make_move(move)

    def view_game_state(self):
        return self.player_component.game_state