import { Player } from './Player.js';
import { Paddle } from './Paddle.js';
import { PowerUp } from './PowerUp.js';
import { Sound } from './Sound.js';

class Background extends JComponent {
    // Constants for the width and height of the game area
    static WIDTH = 800;
    static HEIGHT = 600;

    constructor(scores) {
        super();
        this.scores = scores;

        // Initialize player and paddles
        this.player = new Player(Background.WIDTH / 2 - Player.SIZE / 2, 0, 0, 1);
        Background.paddleList = [];
        this.initializePaddles();

        // Start the game update timer
        this.timer = setInterval(() => this.tick(), 10);
        this.gameOver = false;

        // RGB values to adjust background color as game progresses
        this.red = 245;
        this.green = 245; // Default RGB for beige color
        this.blue = 220;

        // List of power-ups
        this.powerUps = [];
    }

    // Returns the list of paddles
    getPaddleList() {
        return Background.paddleList;
    }

    // Initialize paddles at random positions
    initializePaddles() {
        const random = new Random();
        const numPaddles = 15;
        const spacing = Background.HEIGHT / (numPaddles + 1); // calculate the spacing between the paddles
        const pad = new Paddle(this.player.getX(), this.player.getY());
        Background.paddleList.push(pad);

        for (let i = 0; i < numPaddles; i++) {
            const y = spacing * (i + 1) - Paddle.HEIGHT / 2; // calculate the y-coordinate of the paddle
            const x = Math.floor(Math.random() * (Background.WIDTH - Paddle.WIDTH)); // generate a random x-coordinate
            const paddle = new Paddle(x, y);
            Background.paddleList.push(paddle);
        }
    }

    // Game logic
    tick() {
        this.player.move();
        for (const p of Background.paddleList) {
            p.moveDown(Background.HEIGHT, Background.WIDTH); // move the paddle downwards

            if (this.player.isCollidingWithPaddle(p)) {
                this.player.bounce(); // make the player bounce if it lands on a paddle
                this.player.increaseScore(); // increase the player's score

                Sound.playNote(this.player);
            }
        }

        this.repaint();

        this.scores.setText("Score " + this.player.getScore());
    }

    paintComponent(g) {
        g.setColor(new Color(this.red, this.green, this.blue)); // Light Beige
        g.fillRect(0, 0, Background.WIDTH, Background.HEIGHT);

        super.paintComponent(g);
        this.player.draw(g);

        for (const p of Background.paddleList) {
            p.draw(g);
        }
        for (const powerUp of this.powerUps) {
            powerUp.draw(g);
        }
    }

    // Reset game state
    reset() {
        this.player = new Player(Background.WIDTH / 2, 0, 0, 1);
        Background.paddleList = [];
        this.initializePaddles(); // Reinitialize paddles
        this.resetPowerUps(); // Clear power-ups
        this.resetColor();
        this.repaint(); // Repaint the JFrame
    }

    // Get the player object
    getPlayer() {
        return this.player;
    }

    // Pause game
    pauseGame() {
        clearInterval(this.timer);
    }

    // Resume game
    resumeGame() {
        this.timer = setInterval(() => this.tick(), 10);
    }

    // Check if the game is over
    isGameOver() {
        return this.gameOver;
    }

    // Set the game over state
    setGameOver(gameOver) {
        this.gameOver = gameOver;
    }

    getPowerUps() {
        return this.powerUps;
    }

    setPowerUps(powerUps) {
        this.powerUps = powerUps;
    }

    static getFrameWidth() {
        return Background.WIDTH;
    }

    static getFrameHeight() {
        return Background.HEIGHT;
    }

    getPaddleCollidingWithPlayer(player) {
        for (const paddle of this.getPaddleList()) {
            if (player.isCollidingWithPaddle(paddle)) {
                return paddle;
            }
        }
        return null;
    }

    setColors(r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
    }

    resetColor() {
        this.red = 245;
        this.green = 245; // Default RGB for beige color
        this.blue = 220;
    }

    resetPowerUps() {
        this.powerUps = [];
        this.repaint();
    }
}

export { Background };