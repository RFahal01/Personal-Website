import java.awt.*;
import javax.swing.Timer; // Import for Timer
import java.awt.event.ActionListener; // Import for ActionListener
import java.awt.event.ActionEvent; // Import for ActionEvent

// The Player class represents the player in the game.
public class Player extends Control {
    // Constants for the player's size, gravity, jump strength, and speed
    public static final int SIZE = 21;
    private static final double GRAVITY = 0.35;
    static final double JUMP_STRENGTH = 7.5;
    private static final int SPEED = 4;

    // Variables for the player's fall speed for after powerUp collision
    private double fallSpeed = GRAVITY;

    //PowerUp constants
    private static final int BOOSTED_SPEED = 7;
    private boolean canCollideWithPaddle = true; // boolean to check if the player can collide with the paddle for the PowerUp logic

    // Variables for the player's vertical velocity, score, direction, and color
    private double velocityY;
    private int score = 0;
    private int direction = 0;

    // Constructor for the Player class
    public Player(int x, int y, int velocityX, int velocityY) {
        super(x, y, velocityX, velocityY, SIZE, SIZE);
        this.velocityY = velocityY;
    }

    // Method to increase the player's score
    public void increaseScore() {
        score++;
    }

    // Method to apply gravity to the player
    public void applyGravity() {
        velocityY += GRAVITY;
    }

    public void slowFall() {
        fallSpeed = GRAVITY - .1; // Slow fall speed

        // Create a timer to reset the fall speed after 5 seconds
        Timer resetFallSpeedTimer = new Timer(2000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                fallSpeed = GRAVITY; // Reset to default fall speed
            }
        });
        resetFallSpeedTimer.setRepeats(false);
        resetFallSpeedTimer.start();
    }

    // Method to reverse the player's vertical velocity to simulate a bounce
    public void bounce() {
        velocityY = -JUMP_STRENGTH;
    }

    // Method to move the player based on velocity and direction
    public void move() {
        setY((int) (getY() + velocityY));
        setX(getX() + direction * SPEED);
    }

    // Method to move the player to the left
    public void moveLeft() {
        direction = -1;
    }

    // Method to move the player to the right
    public void moveRight() {
        direction = 1;
    }

    // Method to stop the player's horizontal movement
    public void stopMoving() {
        direction = 0;
    }

    // Method to draw the player
    @Override
    public void draw(Graphics g) {
        g.setColor(new Color(0x664321));
        g.fillRect(x, y, SIZE, SIZE);
    }

    // Method to check if the player is colliding with a paddle
    public boolean isCollidingWithPaddle(Paddle paddle) {
        boolean isColliding = getBounds().intersects(paddle.getBounds());
        if (isColliding && canCollideWithPaddle) {
            bounce();
        }
        return isColliding;
    }

    // Method to check if the player has fallen off the screen
    public boolean isOutOfBounds(int gameHeight) {
        return getY() > gameHeight;
    }
    // Method to check if player went off the left side
    public boolean wentoffscreenLeft(){
        return getX() < 0;
    }
    // Method to check if player went off the right side
    public boolean wentoffscreenRight(int gameWidth){
        return getX() > gameWidth;
    }

    // Method to handle a collision with a platform
    public void handleCollision() {
        increaseScore();
    }

    // Method to get the player's score
    public int getScore() {
        return score;
    }

    // Method to get the player's bounding rectangle
    public Rectangle getBounds() {
        return new Rectangle(getX(), getY(), SIZE, SIZE);
    }

    // Getter and setter methods for the player's x and y coordinates
    public int getX() {
        return x;
    }
    
    public int getY() {
        return y;
    }
    
    public void setX(int newX) {
        this.x = newX;
    }
    
    public void setY(int newY) {
        this.y = newY;
    }
    
    public void addScore(int score) {
        this.score += score;
    }

    //PowerUp methods
    public void speedUp() {
        this.velocityX = BOOSTED_SPEED;
        this.canCollideWithPaddle = false;
    }
    
    public void resetSpeed() {
        this.velocityX = SPEED;
        this.canCollideWithPaddle = true;
    }
    
    public void stopVerticalMovement() {
        this.velocityY = 0;
    }
    
    public void resumeVerticalMovement() {
        this.velocityY = SPEED;
    }

    public int setScore(int i) {
        return this.score;
    }
}