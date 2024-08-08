const { WebMidi } = require('webmidi');

class Sound {
  static synth = null;
  static channels = [];
  static semaphore = 1;
  static currentNoteIndex = 0;
  static shouldInterrupt = false;
  static playingThread = null;

  static scaleNotes = [
    64, 71, 73, 64, 71, 73, 64, 71, 73, 71, 69, 67, 71, 69, 67,
    71, 64, 64, 71, 73, 64, 71, 73, 64, 71, 73, 71, 69, 67, 71,
    69, 67, 71, 64, 64, 71, 73, 64, 71, 73, 64, 71, 73, 71, 69,
    67, 71, 69, 67, 71
  ];

  static scaleNotesHard = [
    50, 53, 55, 56, 58, 50, 53, 55, 56, 58, 50, 53, 55, 56, 58,
    50, 53, 55, 56, 58
  ];

  static async initialize() {
    try {
      await WebMidi.enable();
      this.synth = WebMidi.outputs[0];
      this.channels = this.synth.channels;
    } catch (e) {
      console.error(e);
    }
  }

  static playNote(player) {
    const selectedScale = (player.getScore() > 99) ? this.scaleNotesHard : this.scaleNotes;

    this.shouldInterrupt = (selectedScale === this.scaleNotesHard);

    if ((player.getScore() > 99 && this.currentNoteIndex >= this.scaleNotesHard.length) ||
        (player.getScore() <= 99 && this.currentNoteIndex >= this.scaleNotes.length)) {
      this.currentNoteIndex = 0;
    }

    const note = selectedScale[this.currentNoteIndex];
    const velocity = (this.currentNoteIndex % 8 === 0) ? 127 : 90;
    const duration = (this.currentNoteIndex % 2 === 0) ? 500 : 250;

    this.playSound(note, velocity, duration);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % selectedScale.length;
  }

  static playSound(note, velocity, duration) {
    if (this.playingThread && this.shouldInterrupt) {
      clearTimeout(this.playingThread);
    }

    this.playingThread = setTimeout(async () => {
      if (this.semaphore > 0) {
        this.semaphore--;
        this.channels[0].stopAllNotes();
        this.channels[0].playNote(note, { velocity });
        await this.sleep(duration);
        this.channels[0].stopNote(note);
        this.semaphore++;
      }
    }, 0);
  }

  static stopAllNotes() {
    if (this.playingThread) {
      clearTimeout(this.playingThread);
    }

    this.channels.forEach(channel => channel.stopAllNotes());
  }

  static gameOverJingle() {
    this.shouldInterrupt = true;
    this.stopAllNotes();
    const jingleNotes = [45, 57, 41, 52, 36];
    jingleNotes.forEach(async (note) => {
      this.playSound(note, 127, 400);
      await this.sleep(400);
    });
  }

  static playPowerUpSound() {
    this.shouldInterrupt = true;
    this.stopAllNotes();
    this.playSound(90, 127, 500);
  }

  static resetSound() {
    this.shouldInterrupt = true;
    this.stopAllNotes();
    this.currentNoteIndex = 0;
    this.semaphore = 1;
  }

  static sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }
}

module.exports = Sound;