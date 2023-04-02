class UserLibrary {
  constructor() {
    this.savedPieces = [];
  }

  getSavedPieces() {
    return this.savedPieces;
  }

  deletePiece(piece) {
    const index = this.savedPieces.indexOf(piece);
    if (index !== -1) {
      this.savedPieces.splice(index, 1);
    }
  }
}

class Piece {
  constructor(title, composer, year) {
    this.title = title;
    this.composer = composer;
    this.year = year;
  }
}

// Example usage:
const userLibrary = new UserLibrary();
const piece1 = new Piece("Moonlight Sonata", "Ludwig van Beethoven", 1801);
const piece2 = new Piece("Für Elise", "Ludwig van Beethoven", 1810);
userLibrary.savedPieces.push(piece1, piece2);
console.log(userLibrary.getSavedPieces()); // [Piece {title: "Moonlight Sonata", composer: "Ludwig van Beethoven", year: 1801}, Piece {title: "Für Elise", composer: "Ludwig van Beethoven", year: 1810}]
userLibrary.deletePiece(piece1);
console.log(userLibrary.getSavedPieces()); // [Piece {title: "Für Elise", composer: "Ludwig van Beethoven", year: 1810}]