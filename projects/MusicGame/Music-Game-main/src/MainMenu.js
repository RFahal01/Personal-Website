class MainMenu {
    constructor() {
        this.myColor = 'rgb(245, 245, 220)';
        this.buttonColor = 'rgb(90, 114, 255)';
        this.init();
    }

    init() {
        document.title = "LET'S PLAY MUSIC GAME!!";
        document.body.style.backgroundColor = this.myColor;
        document.body.style.textAlign = 'center';
        document.body.style.fontFamily = 'Serif';

        const title = this.createLabel("MUSIC GAME", 48, this.buttonColor);
        const buttonspace = this.createLabel(" ", 48, this.buttonColor);
        const instructions = this.createLabel("INSTRUCTIONS:", 48, this.buttonColor);
        const inst1 = this.createLabel("1.) Press the Play Button", 19, this.buttonColor);
        const inst2 = this.createLabel("2.) Hit the Left and Right Arrow Keys to move", 19, this.buttonColor);
        const inst3 = this.createLabel("3.) Land on Platforms to Play Notes", 19, this.buttonColor);
        const inst4 = this.createLabel("4.) Run into Power Ups for a New Experience", 19, this.buttonColor);
        const inst5 = this.createLabel("5.) DON'T FALL DOWN!!!!!", 19, this.buttonColor);

        const playButton = document.createElement('button');
        playButton.innerText = "LET'S PLAY!!!";
        playButton.style.backgroundColor = this.buttonColor;
        playButton.style.color = 'white';
        playButton.style.fontSize = '24px';
        playButton.style.padding = '10px 20px';
        playButton.style.border = 'none';
        playButton.style.cursor = 'pointer';
        playButton.addEventListener('click', this.actionPerformed.bind(this));

        document.body.appendChild(title);
        document.body.appendChild(buttonspace);
        document.body.appendChild(playButton);
        document.body.appendChild(instructions);
        document.body.appendChild(inst1);
        document.body.appendChild(inst2);
        document.body.appendChild(inst3);
        document.body.appendChild(inst4);
        document.body.appendChild(inst5);
    }

    createLabel(text, fontSize, color) {
        const label = document.createElement('div');
        label.innerText = text;
        label.style.fontSize = `${fontSize}px`;
        label.style.color = color;
        label.style.margin = '10px 0';
        return label;
    }

    actionPerformed() {
        // Start the MusicGame
        new MusicGame();
        // Hide the main menu
        document.body.style.display = 'none';
    }
}

// Assuming MusicGame is defined elsewhere
class MusicGame {
    constructor() {
        console.log("Music Game Started!");
    }
}

// Initialize the main menu
new MainMenu();