class Paddle extends Control {
  static HEIGHT = 20;
  static WIDTH = 70;
  static NORMAL_SPEED = 2;

  constructor(x, y) {
    super(x, y, 0, 0, Paddle.WIDTH, Paddle.HEIGHT);
    this.x = x;
    this.y = y;
    this.dy = Paddle.NORMAL_SPEED;
    this.dx = Paddle.NORMAL_SPEED;
    this.random = Math.random;
    this.landed = false;

    this.speedTimer = null;
  }

  static firstPaddle(player) {
    const paddle = new Paddle(350, 200);
    Background.paddleList.push(paddle);
  }

  draw(ctx) {
    ctx.fillStyle = '#D2B48C'; // Dark Beige
    ctx.fillRect(this.x, this.y, Paddle.WIDTH, Paddle.HEIGHT);
  }

  moveDown(bottomBound, gameWidth) {
    this.y += this.dy;
    if (this.y > bottomBound) {
      this.y = 0;
      this.x = Math.floor(this.random() * (gameWidth - Paddle.WIDTH));
    }
  }

  moveLeft() {
    this.x -= this.dx;
  }

  getY() {
    return this.y;
  }

  getX() {
    return this.x;
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: Paddle.WIDTH,
      height: Paddle.HEIGHT,
      intersects: function (rect) {
        return (
          this.x < rect.x + rect.width &&
          this.x + this.width > rect.x &&
          this.y < rect.y + rect.height &&
          this.y + this.height > rect.y
        );
      }
    };
  }

  collidesWith(player) {
    return this.getBounds().intersects(player.getBounds());
  }

  land() {
    this.landed = true;
  }

  hasLanded() {
    return this.landed;
  }

  speedUp() {
    this.dy *= 2;
    this.dx *= 2;
    if (this.speedTimer) {
      clearTimeout(this.speedTimer);
    }
    this.speedTimer = setTimeout(() => {
      this.resetSpeed();
    }, 5000);
  }

  resetSpeed() {
    this.dy = Paddle.NORMAL_SPEED;
    this.dx = Paddle.NORMAL_SPEED;
  }

  static getPWidth() {
    return Paddle.WIDTH;
  }

  static getPHeight() {
    return Paddle.HEIGHT;
  }

  static setPWidth(width) {
    Paddle.WIDTH = width;
  }

  static setPHeight(height) {
    Paddle.HEIGHT = height;
  }
}