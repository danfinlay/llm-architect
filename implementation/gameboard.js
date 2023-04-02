class GameBoard {
  constructor() {
    this.pieces = [];
    this.boardState = null;
  }

  initialize(pieces) {
    this.pieces = pieces;
    this.boardState = new BoardState(pieces);
  }

  getState() {
    return this.boardState;
  }

  movePiece(from, to) {
    const piece = this.boardState.getPieceAt(from);
    if (!piece) {
      throw new Error('No piece at position ' + from);
    }
    const legalMoves = this.getLegalMoves(piece);
    if (!legalMoves.some(move => move.equals(to))) {
      throw new Error('Illegal move from ' + from + ' to ' + to);
    }
    this.boardState = this.boardState.movePiece(from, to);
  }

  getLegalMoves(piece) {
    return this.boardState.getLegalMoves(piece);
  }

  reset() {
    this.initialize(this.pieces);
  }
}

class BoardState {
  constructor(pieces) {
    this.pieces = pieces;
  }

  getPieceAt(position) {
    return this.pieces.find(piece => piece.position.equals(position));
  }

  movePiece(from, to) {
    const piece = this.getPieceAt(from);
    const newPieces = this.pieces.filter(p => !p.position.equals(from));
    newPieces.push(new Piece(piece.type, to));
    return new BoardState(newPieces);
  }

  getLegalMoves(piece) {
    const moves = [];
    const directions = piece.type === 'pawn' ? [1, -1] : [1];
    for (const direction of directions) {
      const forward = piece.position.add(new Position(0, direction));
      if (!this.getPieceAt(forward)) {
        moves.push(forward);
        if (piece.type === 'pawn' && piece.position.y === (direction === 1 ? 1 : 6)) {
          const doubleForward = forward.add(new Position(0, direction));
          if (!this.getPieceAt(doubleForward)) {
            moves.push(doubleForward);
          }
        }
      }
      for (const side of [-1, 1]) {
        const diagonal = forward.add(new Position(side, 0));
        const otherPiece = this.getPieceAt(diagonal);
        if (otherPiece && otherPiece.color !== piece.color) {
          moves.push(diagonal);
        }
      }
    }
    return moves;
  }
}

class Piece {
  constructor(type, position) {
    this.type = type;
    this.position = position;
    this.color = position.y < 4 ? 'white' : 'black';
  }
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Position(this.x + other.x, this.y + other.y);
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
}