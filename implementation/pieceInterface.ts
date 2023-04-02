class Piece {
  constructor(type, color, position, graphic) {
    this.type = type;
    this.color = color;
    this.position = position;
    this.graphic = graphic;
  }

  getType() {
    return this.type;
  }

  getColor() {
    return this.color;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position) {
    this.position = position;
  }

  getGraphic() {
    return this.graphic;
  }

  setGraphic(graphic) {
    this.graphic = graphic;
  }
}