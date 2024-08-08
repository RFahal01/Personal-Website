class Control {
    // Gravity constant
    static GRAVITY = 0.4;

    // Dimensions of the object
    static height;

    constructor(x, y, velocityX, velocityY, width, height) {
        // Coordinates of the object's upper left corner
        this.x = x;
        this.y = y;

        // Velocity of the object
        this.velocityX = velocityX; // Pixels to move horizontally each time move() is called
        this.velocityY = velocityY; // Pixels to move vertically each time move() is called

        // Dimensions of the object
        this.width = width;
        Control.height = height;

        // Maximum permissible x, y values
        this.rightBound = 0;
        this.bottomBound = 0;
    }

    // Set the bounds for the object within the game area
    setBounds(width, height) {
        this.rightBound = width - this.width;
        this.bottomBound = height - Control.height;
    }

    // Set the velocity of the object
    setVelocity(velocityX, velocityY) {
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    // Move the object based on its velocity
    move() {
        // Apply gravity to velocityY
        this.velocityY += Control.GRAVITY;

        this.x += this.velocityX;
        this.y += this.velocityY;

        // Clip the object's position to keep it within the bounds of the game area
        this.clip();
    }

    // Ensure the object stays within the bounds of the game area
    clip() {
        if (this.x < 0) this.x = 0;
        else if (this.x > this.rightBound) this.x = this.rightBound;

        if (this.y < 0) this.y = 0;
        else if (this.y > this.bottomBound) this.y = this.bottomBound;
    }

    intersects(control) {
        const rectangle = control.getBounds(); // Assuming getBounds() returns a Rectangle-like object

        // Check for intersection between this object and another object
        if (rectangle.x > this.x + this.width ||
            rectangle.y > this.y + Control.height ||
            rectangle.x + rectangle.width < this.x ||
            rectangle.y + rectangle.height < this.y) {
            return Intersection.NONE;
        }

        // Compute the direction of intersection
        const dx = rectangle.x + rectangle.width / 2 - (this.x + this.width / 2);
        const dy = rectangle.y + rectangle.height / 2 - (this.y + Control.height / 2);

        const theta = Math.atan2(dy, dx);
        const diagTheta = Math.atan2(Control.height, this.width);

        // If the object is a Player and it intersects with a Paddle, make it bounce
        if (this instanceof Player && control instanceof Paddle) {
            // Reverse the y velocity to make the player bounce
            this.velocityY = -Math.abs(this.velocityY);
        }

        // Determine the direction of intersection based on the angle
        // Return the corresponding Intersection value
        if (-diagTheta <= theta && theta <= diagTheta) return Intersection.RIGHT;
        if (Math.PI - diagTheta <= theta || theta <= diagTheta - Math.PI) return Intersection.LEFT;
        if (diagTheta <= theta && theta <= Math.PI - diagTheta) return Intersection.DOWN;
        if (diagTheta - Math.PI <= theta && theta <= diagTheta) return Intersection.UP;

        return Intersection.NONE;
    }

    // Abstract method to be implemented by subclasses
    draw(g) {
        throw new Error("Method 'draw()' must be implemented.");
    }

    // Method to get the bounds of the object
    getBounds() {
        return { x: this.x, y: this.y, width: this.width, height: Control.height };
    }
}

// Assuming Intersection is defined elsewhere
const Intersection = {
    NONE: 'NONE',
    UP: 'UP',
    LEFT: 'LEFT',
    DOWN: 'DOWN',
    RIGHT: 'RIGHT'
};

// Assuming Player and Paddle are defined elsewhere
class Player extends Control {
    draw(g) {
        // Implementation for drawing the player
    }
}

class Paddle extends Control {
    draw(g) {
        // Implementation for drawing the paddle
    }
}