class Player extends Control {
    static SIZE = 21;
    static GRAVITY = 0.35;
    static JUMP_STRENGTH = 7.5;
    static SPEED = 4;

    constructor(x, y, velocityX, velocityY) {
        super(x, y, velocityX, velocityY, Player.SIZE, Player.SIZE);
        this.velocityY = velocityY;
        this.fallSpeed = Player.GRAVITY;
        this.canCollideWithPaddle = true;
        this.score = 0;
        this.direction = 0;
    }

    increaseScore() {
        this.score++;
    }

    applyGravity() {
        this.velocityY += Player.GRAVITY;
    }

    bounce() {
        this.velocityY = -Player.JUMP_STRENGTH;
    }

    move() {
        this.applyGravity();
        this.setY(this.getY() + this.velocityY);
        this.setX(this.getX() + this.direction * Player.SPEED);
    }

    moveLeft() {
        this.direction = -1;
    }

    moveRight() {
        this.direction = 1;
    }

    stopMoving() {
        this.direction = 0;
    }

    draw(ctx) {
        ctx.fillStyle = '#664321';
        ctx.fillRect(this.x, this.y, Player.SIZE, Player.SIZE);
    }

    isCollidingWithPaddle(paddle) {
        const isColliding = this.getBounds().intersects(paddle.getBounds());
        if (isColliding && this.canCollideWithPaddle) {
            this.canCollideWithPaddle = false;
            setTimeout(() => this.canCollideWithPaddle = true, 500);
        }
        return isColliding;
    }

    getBounds() {
        return {
            x: this.getX(),
            y: this.getY(),
            width: Player.SIZE,
            height: Player.SIZE,
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

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }
}

class Paddle extends Control {
    static HEIGHT = 20;
    static WIDTH = 70;
    static NORMAL_SPEED = 2;

    constructor(x, y) {
        super(x, y, 0, 0, Paddle.WIDTH, Paddle.HEIGHT);
        this.dy = Paddle.NORMAL_SPEED;
    }

    draw(ctx) {
        ctx.fillStyle = '#D2B48C';
        ctx.fillRect(this.x, this.y, Paddle.WIDTH, Paddle.HEIGHT);
    }

    moveDown(bottomBound, gameWidth) {
        this.y += this.dy;
        if (this.y > bottomBound) {
            this.y = 0;
            this.x = Math.floor(Math.random() * (gameWidth - Paddle.WIDTH));
        }
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
}