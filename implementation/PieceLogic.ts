// Piece interface
interface Piece {
  color: string;
  type: string;
  position: [number, number];
  validMoves: [number, number][];
  movePiece: (newPosition: [number, number]) => boolean;
}

// Piece module
export default class ChessPiece implements Piece {
  color: string;
  type: string;
  position: [number, number];
  validMoves: [number, number][];

  constructor(color: string, type: string, position: [number, number]) {
    this.color = color;
    this.type = type;
    this.position = position;
    this.validMoves = [];
  }

  movePiece(newPosition: [number, number]): boolean {
    // Check if new position is a valid move
    if (this.validMoves.some(move => move[0] === newPosition[0] && move[1] === newPosition[1])) {
      this.position = newPosition;
      return true;
    }
    return false;
  }
}