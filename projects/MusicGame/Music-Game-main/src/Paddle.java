import java.awt.*;
import java.util.Random;
import javax.swing.Timer;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

// The Paddle class represents the paddles in the game.
public class Paddle extends Control {
    private int x, y; // x and y coordinates of the paddle 
    static int HEIGHT = 20; // Height of the paddle
    private static final int NORMAL_SPEED = 2;
    static int WIDTH = 70; // Width of the paddle
    private int dy; // vertical speed
	private int dx; // horizontal speed
    private Random random;
	private boolean landed; // boolean to check if the paddle has landed on the player

    private Timer speedTimer;

    // Constructor
    public Paddle(int x, int y) {
        super(x, y, 0, 0, WIDTH, HEIGHT); // Call to the parent constructor with parameters
        this.x = x;
        this.y = y;
        this.dy = NORMAL_SPEED; // set the vertical speed
        this.dx = NORMAL_SPEED; // set the horizontal speed
        this.random = new Random();
        this.landed = false; // the player hasn't landed on this paddle yet
        
        //for powerUp
        this.dy = NORMAL_SPEED; // set the vertical speed
        this.dx = NORMAL_SPEED; // set the horizontal speed
        
        // Initialize the timer
        speedTimer = new Timer(5000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                resetSpeed();
            }
        });
        speedTimer.setRepeats(false);
    }

    public static void firstPaddle(Player player){
        Paddle paddle = new Paddle(350, 200);
        Background.paddleList.add(paddle);
    }

    // Method to draw the paddle
    public void draw(Graphics g) {
        g.setColor(new Color(0xD2B48C)); // Dark Beige
        g.fillRect(x, y, WIDTH, HEIGHT);
    }

	// Method to move the paddle downwards to make it look like the game is moving
	public void moveDown(int bottomBound, int gameWidth) {
		y += dy;
		if (y > bottomBound) {
			y = 0;
			x = random.nextInt(gameWidth - WIDTH); // generate a new x position
		}
	}

	// Method to move the paddle to the left
    public void moveLeft() {
        x -= this.dx;
    }

    // Getter for y-coordinate
    public int getY() {
        return this.y;
    }
    public int getX() {
        return this.x;
    }

    // Method to get the bounding rectangle of the paddle
    public Rectangle getBounds() {
        return new Rectangle(x, y, WIDTH, HEIGHT);
    }

    // Method to check if the paddle collides with the player
    public boolean collidesWith(Player player) {
        return getBounds().intersects(player.getBounds());
    }

	// Method to mark this paddle as landed
    public void land() {
        landed = true;
    }

    // Method to check whether the player has landed on this paddle
    public boolean hasLanded() {
        return landed;
    }

    public void speedUp() {
        this.dy *= 2;
        this.dx *= 2;
        speedTimer.start();
    }

    public void resetSpeed() {
        this.dy = NORMAL_SPEED;
        this.dx = NORMAL_SPEED;
    }

    public static int getPWidth(){
        return WIDTH;
    }

    public static int getPHeight(){
        return HEIGHT;
    }

    public static void setPWidth(int x){
        WIDTH = x;
    }

    public static void setPHeight(int x){
        HEIGHT = x;
    }
}
