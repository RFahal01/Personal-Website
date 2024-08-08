class PowerUp {
    // Constants
    static DIAMETER = 20;
    static SPEED = 3.5; // Speed of the power-up
    static FRAME_WIDTH = 800;
    static FRAME_HEIGHT = 600;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.timeFreeze = Math.floor(Math.random() * 25) + 1;
    }

    // Draw the power-up
    draw(ctx) {
        ctx.fillStyle = 'rgb(0, 206, 209)'; // teal
        ctx.beginPath();
        ctx.arc(this.x, this.y, PowerUp.DIAMETER / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    // Move the power-up downwards
    move() {
        this.y += PowerUp.SPEED; // Move the power-up down by increasing its y coordinate

        // If the power-up has moved off the bottom of the screen, reset its position to the top
        if (this.y > PowerUp.FRAME_HEIGHT) {
            this.y = 0;
            this.x = Math.random() * PowerUp.FRAME_WIDTH; // Generate a new random x coordinate
        }
    }

    moveDown(bottomBound, gameWidth) {
        this.y += PowerUp.SPEED;
        if (this.y > bottomBound) {
            this.y = 0;
            this.x = Math.floor(Math.random() * (gameWidth - PowerUp.DIAMETER)); // Generate a new x position
        }
    }

    static checkSpawn(score, gameJustStarted) {
        // Spawn a power-up only if the player's score is a multiple of 75 and the game has not just started
        if (score % 75 === 0 && score !== 0 && !gameJustStarted) {
            const x = Math.floor(Math.random() * PowerUp.FRAME_WIDTH);
            const y = Math.floor(Math.random() * PowerUp.FRAME_HEIGHT);
            return new PowerUp(x, y);
        }
        return null;
    }

    isCollidingWithPlayer(player) {
        if (this.getBounds().intersects(player.getBounds())) {
            player.stopMoving();

            // Move the player to the top of the canvas
            player.setY(0);

            // Slow down the player's fall
            player.slowFall();

            setTimeout(() => {
                player.stopMoving();
            }, 5000);

            return true;
        }
        return false;
    }

    collideWithPaddles(paddles) {
        paddles.forEach(paddle => {
            if (this.getBounds().intersects(paddle.getBounds())) {
                paddle.speedUp();
                setTimeout(() => {
                    paddle.resetSpeed();
                }, 5000);
            }
        });
    }

    // Get the bounding circle of the PowerUp
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: PowerUp.DIAMETER,
            height: PowerUp.DIAMETER,
            intersects: function (rect) {
                return !(rect.x > this.x + this.width ||
                         rect.x + rect.width < this.x ||
                         rect.y > this.y + this.height ||
                         rect.y + rect.height < this.y);
            }
        };
    }

    // Getters and setters
    getTimeFreeze() {
        return this.timeFreeze;
    }

    setTimeFreeze(timeFreeze) {
        this.timeFreeze = timeFreeze;
    }

    getY() {
        return this.y;
    }

    getX() {
        return this.x;
    }
}