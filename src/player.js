class Player {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "./img/rick-sanchez.png";
  }

  moveRight() {
    this.x += 25;
  }

  moveLeft() {
    this.x -= 25;
  }
}