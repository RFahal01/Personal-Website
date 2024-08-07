import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.util.Iterator;

// The MusicGame class represents the main game logic and components.
public class MusicGame implements Runnable {
    // Constants for frame size and timer delay
    private static final int FRAME_WIDTH = 800;
    private static final int FRAME_HEIGHT = 600;
    private static final int TIMER_DELAY = 10;

    // Game components
    private JLabel scores; // Label to display scores
    private Background background; // The game background
    private Timer gameTimer; // Timer to control game events
    private JFrame frame; // The main game window
    private boolean gamePaused = false;
    private boolean reduced = false; //Helps prevent the paddle width from decreasing to 0
    private boolean powerUpActive = false;
    private boolean colliding = false; //Collision logic for streamlining score

    // Variable to keep track of the last power-up score and the player's score
    private int lastPowerUpScore = 0;

    @Override
    public void run() {
        // Initialize game components
        frame = createFrame(); // Create the main game window
        scores = new JLabel(); // Initialize the scores label
        background = new Background(scores); // Initialize the game background
        Player player = background.getPlayer();

        // Add KeyListener to frame after background is initialized
        addKeyListenerToFrame(); // Add keyboard controls
        Paddle.firstPaddle(player);

        // Add components to frame
        frame.add(background, BorderLayout.CENTER); // Add the game background to the center of the frame
        frame.add(Menu(), BorderLayout.NORTH); // Add the control panel to the top of the frame

        // Initialize and start game timer
        gameTimer = createGameTimer(); // Create the game timer
        gameTimer.start(); // Start the game timer

        //Centers game window
        frame.setLocationRelativeTo(null);

        // Make the frame visible and request focus
        frame.setVisible(true); // Make the game window visible
        frame.requestFocusInWindow(); // Request focus for keyboard input
    }

    private JFrame createFrame() {
        JFrame frame = new JFrame(); // Create a new JFrame
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // Set the default close operation
        frame.setSize(FRAME_WIDTH, FRAME_HEIGHT); // Set the size of the frame
        frame.setResizable(false); // Make the frame non-resizable
        return frame; // Return the created frame
    }

    private void addKeyListenerToFrame() {
        // Add a KeyListener to the frame to handle keyboard input
        frame.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                // Get the player from the background
                Player player = background.getPlayer();
                // If the left arrow key is pressed, move the player to the left
                if (e.getKeyCode() == KeyEvent.VK_LEFT) {
                    player.moveLeft();
                } 
                // If the right arrow key is pressed, move the player to the right
                else if (e.getKeyCode() == KeyEvent.VK_RIGHT) {
                    player.moveRight();
                }
            }

            @Override
            public void keyReleased(KeyEvent e) {
                // If the left or right arrow key is released, stop moving the player
                if (e.getKeyCode() == KeyEvent.VK_LEFT || e.getKeyCode() == KeyEvent.VK_RIGHT) {
                    background.getPlayer().stopMoving();
                }
            }
        });
    }

    private JPanel Menu() {
        // Create a new JPanel for the control panel
        JPanel panel = new JPanel();
        // Add buttons to the control panel
        panel.add(createButton("Start", e -> gameResume())); // Add a "Start" button
        panel.add(createButton("Pause", e -> gamePause())); // Add a "Pause" button
        panel.add(createButton("New Game", e -> background.reset())); // Add a "New Game" button
        panel.add(scores); // Add the scores label to the control panel
        return panel; // Return the created control panel
    }

    private JButton createButton(String text, ActionListener action) {
        // Create a new JButton with the given text
        JButton button = new JButton(text);
        // Add the given ActionListener to the button
        button.addActionListener(action);

        //Fixes input problem, but may/will cause problems if
        //keyboard input is ever used for any buttons
        button.setFocusable(false);

        return button; // Return the created button
    }

    private void gamePause(){
        background.pauseGame(); //stops timer in Background.java
        gameTimer.stop();
        gamePaused = true;
    }

    private void gameResume(){
        background.resumeGame(); //resumes timer in Background.java
        gameTimer.start();
        gamePaused = false;
    }

    //Main Game Loop
    private Timer createGameTimer() {
        // Create a new Timer with the given delay and ActionListener
        return new Timer(TIMER_DELAY, e -> {
            Player player = background.getPlayer();

            if (!gamePaused){
                // Get the player from the background
                player.applyGravity(); // Apply gravity to the player
                player.move(); // Move the player

                // Check for collisions between the player and the paddles
                for (Paddle paddle : background.getPaddleList()) {
                    if (player.isCollidingWithPaddle(paddle) && colliding == false) {
                        player.handleCollision(); // Handle the collision
                        colliding = true;
                    }
                    else if(!player.isCollidingWithPaddle(paddle)){
                        colliding = false;
                    }
                }

                // Check if the player is out of bounds
                if (player.isOutOfBounds(frame.getHeight())) {
                    handleGameOver(player); // Handle the game over scenario
                }

                if(player.wentoffscreenLeft()){
                    player.setX(frame.getWidth());
                }

                if(player.wentoffscreenRight(frame.getWidth())){
                    player.setX(0);
                }

                ArrayList<PowerUp> powerUps = background.getPowerUps();

                // Create a timer to reset the speed after 5 seconds
                Timer timer = new Timer(5000, new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        player.resetSpeed();
                    }
                });
                timer.setRepeats(false);

                // Check for collisions between the player and the power-ups
                Iterator<PowerUp> iterator = background.getPowerUps().iterator();
                while (iterator.hasNext()){
                    PowerUp currentPowerUp = iterator.next();
                    if (currentPowerUp.isCollidingWithPlayer(player)){
                        player.addScore(15); // Add 10 to player's score
                        player.speedUp(); // Speed up the player

                        // Increase the speed of all paddles
                        for (Paddle paddle : background.getPaddleList()) {
                            paddle.speedUp();
                        }

                        // Create a timer to reset the speed after 4 seconds
                        Timer resetSpeedTimer = new Timer(4000, new ActionListener() {
                            @Override
                            public void actionPerformed(ActionEvent e) {
                                for (Paddle paddle : background.getPaddleList()) {
                                    paddle.resetSpeed();
                                }
                            }
                        });
                        resetSpeedTimer.setRepeats(false);
                        resetSpeedTimer.start();

                        iterator.remove();
                        Sound.playPowerUpSound();
                    }
                }

                /* OLD GAME PROGRESSION
                Did not work as intended, score would increase to fast
                and miss the modulo check, therefore not reducing paddle width
                and dimming background.                
                //Insures progression is reverted after new game
                if (player.getScore() <= 99){
                    Paddle.setPWidth(70);
                    background.resetColor();
                    reduced = false;
                }
                //Reduce paddle width, change background, every 100 score
                else if (player.getScore() % 100 != 0){
                    reduced = false;
                }
                else if (player.getScore() % 100 == 0 && reduced == false){
                    background.dimColors(50);
                    Paddle.setPWidth(Paddle.getPWidth() * 4/5);
                    reduced = true;
                }*/

                //NEW GAME PROGRESSION
                //REST IN PEACE OLD GAME PROGRESSION :*(
                if (player.getScore() < 100){
                    Paddle.setPWidth(70);
                    background.resetColor();
                }
                else if (player.getScore() < 200){
                    Paddle.setPWidth(60);
                    background.setColors(195, 195, 170);
                }
                else if (player.getScore() < 300){
                    Paddle.setPWidth(50);
                    background.setColors(145,145,120);
                }
                else if (player.getScore() < 400){
                    Paddle.setPWidth(40);
                    background.setColors(95,95,70);
                }
                else if (player.getScore() < 500){
                    Paddle.setPWidth(30);
                    background.setColors(45,45,20);
                }
                else if (player.getScore() >= 500){
                    Paddle.setPWidth(20);
                    background.setColors(0,0,0);
                }
                
                if ((player.getScore() - lastPowerUpScore) % 75 == 0 && player.getScore() != 0 && powerUpActive == false){
                    // Spawn only 1 power-up
                    int powerUpsToSpawn = 1;
                    powerUpActive = true;
                    for (int i = 0; i < powerUpsToSpawn; i++) {
                        // Define the position and velocity variables
                        int x = (int) (Math.random() * FRAME_WIDTH);
                        int y = 0;

                        PowerUp newPowerUp = new PowerUp(x, y); // Create a new PowerUp
                        powerUps.add(newPowerUp); // Add it to the powerUps list
                    }
                    lastPowerUpScore = player.getScore(); // Update the last power-up score
                }
                else if ((player.getScore() - lastPowerUpScore) % 75 != 0){
                    powerUpActive = false;
                }                
                
                // Make the powerUp move
                for (PowerUp powerUp : powerUps) {
                    powerUp.move(); // Move the power-up
                }

                background.repaint(); // Repaint the background
            }
        });
    }


    public ArrayList<PowerUp> getPowerUps() {
        return background.getPowerUps();
    }

    // Handle game over scenario
    private void handleGameOver(Player player) {
        gameTimer.stop(); // Stop the game timer

        //Temporarily commented to make debugging faster
        Sound.gameOverJingle(); // Play the game over jingle

        // Show a dialog with the player's score and ask if they want to play again
        int option = JOptionPane.showConfirmDialog(frame, "Game Over! Your score is: " + player.getScore() + ". Play again?", "Game Over", JOptionPane.YES_NO_OPTION);
        if (option == JOptionPane.YES_OPTION) {
            restart(); // If the player wants to play again, restart the game
        } else {
            // If the player doesn't want to play again, show an encouragement message and close the game
            background.setGameOver(true); // Set the game over flag
            showEncouragementMessage(player.getScore()); // Show an encouragement message
            System.exit(0); // Close the game window
        }
    }

    //Messages to encourage the player to keep playing or not
    //Using HTML to format the message makes it look nice
    private void showEncouragementMessage(int score) {
        // Show an encouragement message based on the player's score
        if (score < 43) {
            JOptionPane.showMessageDialog(frame, "<html><body style='width: 200px;'>Well, darling, perhaps it's time to explore some other gaming realms, you know, spread those wings a bit. I mean, let's be real, you're not exactly hitting the high score charts here. But hey, thanks for giving it a whirl! Maybe next time, hmm?</body></html>");
        } else if (score < 87) {
            JOptionPane.showMessageDialog(frame, "<html><body style='width: 200px;'>You held your own out there. Room for improvement, but hey, we all start somewhere. Keep practicing, and you'll be leveling up in no time. Looking forward to seeing your progress next time!</body></html>");
        } else if (score < 175) {
            JOptionPane.showMessageDialog(frame, "<html><body style='width: 200px;'>You crushed it! Can't wait to see you back for more action! Game on!</body></html>");
        }
    }

    public void restart() {
        // Restart the game
        if (!gameTimer.isRunning() && !background.isGameOver()) {
            // Reset the game components
            background.reset(); // Reset the background
            background.resetPowerUps(); // Reset the power-ups
            gameTimer.restart(); // Restart the game timer
            gamePaused = false; // Set gamePaused to false
            lastPowerUpScore = 0; // Reset the last power-up score
            powerUpActive = false; // Reset the powerUpActive flag
            reduced = false; // Reset the reduced flag
            frame.requestFocusInWindow(); // Request focus for keyboard input

            Sound.resetSound();
        }
    }
   

        public static void main(String[] args) {
            // Start the game
            new MainMenu();
        }
    } 
