class MusicGame {
    static FRAME_WIDTH = 800;
    static FRAME_HEIGHT = 600;
    static TIMER_DELAY = 10;

    constructor() {
        console.log("Initializing MusicGame...");
        this.initializeElements();
        this.initializeGameState();
        this.addKeyListenerToFrame();
        this.setupControls();
        this.initializePaddle();
        this.startGameTimer();
    }

    initializeElements() {
        this.scores = document.getElementById('scoreLabel');
        this.frame = document.getElementById('gameCanvas');
        this.ctx = this.frame.getContext('2d');
        console.log("Elements initialized:", this.scores, this.frame, this.ctx);
    }

    initializeGameState() {
        this.background = new Background(this.scores);
        this.gamePaused = false;
        this.reduced = false;
        this.powerUpActive = false;
        this.colliding = false;
        this.lastPowerUpScore = 0;
        this.gameTimer = null;
        console.log("Game state initialized.");
    }

    initializePaddle() {
        Paddle.firstPaddle(this.background.getPlayer());
        console.log("Paddle initialized.");
    }

    startGameTimer() {
        this.gameTimer = this.createGameTimer();
        console.log("Game timer started.");
    }

    addKeyListenerToFrame() {
        document.addEventListener('keydown', (e) => {
            const player = this.background.getPlayer();
            if (e.key === 'ArrowLeft') {
                player.moveLeft();
            } else if (e.key === 'ArrowRight') {
                player.moveRight();
            }
        });

        document.addEventListener('keyup', (e) => {
            const player = this.background.getPlayer();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                player.stopMoving();
            }
        });
        console.log("Key listeners added.");
    }

    setupControls() {
        document.getElementById('startButton').addEventListener('click', () => this.gameResume());
        document.getElementById('pauseButton').addEventListener('click', () => this.gamePause());
        document.getElementById('newGameButton').addEventListener('click', () => this.background.reset());
        console.log("Controls set up.");
    }

    gamePause() {
        this.background.pauseGame();
        clearInterval(this.gameTimer);
        this.gamePaused = true;
        console.log("Game paused.");
    }

    gameResume() {
        this.background.resumeGame();
        this.gameTimer = this.createGameTimer();
        this.gamePaused = false;
        console.log("Game resumed.");
    }

    createGameTimer() {
        return setInterval(() => {
            const player = this.background.getPlayer();

            if (!this.gamePaused) {
                player.applyGravity();
                player.move();

                for (const paddle of this.background.getPaddleList()) {
                    if (player.isCollidingWithPaddle(paddle) && !this.colliding) {
                        player.handleCollision();
                        this.colliding = true;
                    } else if (!player.isCollidingWithPaddle(paddle)) {
                        this.colliding = false;
                    }
                }

                if (player.isOutOfBounds(this.frame.height)) {
                    this.handleGameOver(player);
                }

                if (player.wentOffscreenLeft()) {
                    player.setX(this.frame.width);
                }

                if (player.wentOffscreenRight(this.frame.width)) {
                    player.setX(0);
                }

                const powerUps = this.background.getPowerUps();
                const timer = setTimeout(() => {
                    player.resetSpeed();
                }, 5000);

                for (const powerUp of powerUps) {
                    if (powerUp.isCollidingWithPlayer(player)) {
                        player.addScore(15);
                        player.speedUp();

                        for (const paddle of this.background.getPaddleList()) {
                            paddle.speedUp();
                        }

                        const resetSpeedTimer = setTimeout(() => {
                            for (const paddle of this.background.getPaddleList()) {
                                paddle.resetSpeed();
                            }
                        }, 4000);

                        powerUps.splice(powerUps.indexOf(powerUp), 1);
                        Sound.playPowerUpSound();
                    }
                }

                this.updateGameDifficulty(player);

                if ((player.getScore() - this.lastPowerUpScore) % 75 === 0 && player.getScore() !== 0 && !this.powerUpActive) {
                    this.spawnPowerUps();
                    this.lastPowerUpScore = player.getScore();
                } else if ((player.getScore() - this.lastPowerUpScore) % 75 !== 0) {
                    this.powerUpActive = false;
                }

                for (const powerUp of powerUps) {
                    powerUp.move();
                }

                this.background.repaint(this.ctx);
            }
        }, MusicGame.TIMER_DELAY);
    }

    updateGameDifficulty(player) {
        if (player.getScore() < 100) {
            Paddle.setPWidth(70);
            this.background.resetColor();
        } else if (player.getScore() < 200) {
            Paddle.setPWidth(60);
            this.background.setColors(195, 195, 170);
        } else if (player.getScore() < 300) {
            Paddle.setPWidth(50);
            this.background.setColors(145, 145, 120);
        } else if (player.getScore() < 400) {
            Paddle.setPWidth(40);
            this.background.setColors(95, 95, 70);
        } else if (player.getScore() < 500) {
            Paddle.setPWidth(30);
            this.background.setColors(45, 45, 20);
        } else if (player.getScore() >= 500) {
            Paddle.setPWidth(20);
            this.background.setColors(0, 0, 0);
        }
    }

    spawnPowerUps() {
        const powerUpsToSpawn = 1;
        this.powerUpActive = true;
        for (let i = 0; i < powerUpsToSpawn; i++) {
            const x = Math.random() * MusicGame.FRAME_WIDTH;
            const y = 0;
            const newPowerUp = new PowerUp(x, y);
            this.background.getPowerUps().push(newPowerUp);
        }
        console.log("Power-ups spawned.");
    }

    handleGameOver(player) {
        clearInterval(this.gameTimer);
        Sound.gameOverJingle();
        const option = confirm(`Game Over! Your score is: ${player.getScore()}. Play again?`);
        if (option) {
            this.restart();
        } else {
            this.background.setGameOver(true);
            this.showEncouragementMessage(player.getScore());
            window.close();
        }
    }

    showEncouragementMessage(score) {
        let message = "";
        if (score < 43) {
            message = "Well, darling, perhaps it's time to explore some other gaming realms...";
        } else if (score < 87) {
            message = "You held your own out there. Room for improvement...";
        } else if (score < 175) {
            message = "You crushed it! Can't wait to see you back for more action! Game on!";
        }
        alert(message);
    }

    restart() {
        if (this.gamePaused) {
            this.background.reset();
            this.background.resetPowerUps();
            this.gameTimer = this.createGameTimer();
            this.gamePaused = false;
            this.lastPowerUpScore = 0;
            this.powerUpActive = false;
            this.reduced = false;
            console.log("Game restarted.");
        }
    }

    static main() {
        new MusicGame();
    }
}