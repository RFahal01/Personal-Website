import javax.sound.midi.*;
import java.util.concurrent.Semaphore;

public class Sound {
    private static Synthesizer synth;
    private static MidiChannel[] channels;
    private static Semaphore semaphore = new Semaphore(1);
    private static int currentNoteIndex = 0;

    private static boolean shouldInterrupt = false;
    private static Thread playingThread = null;

    // Scales for normal and hard modes
    private static int[] scaleNotes = {
        64, 71, 73, 64, 71, 73, 64, 71, 73, 71, 69, 67, 71, 69, 67,
        71, 64, 64, 71, 73, 64, 71, 73, 64, 71, 73, 71, 69, 67, 71,
        69, 67, 71, 64, 64, 71, 73, 64, 71, 73, 64, 71, 73, 71, 69,
        67, 71, 69, 67, 71
    };

    private static int[] scaleNotesHard = {
        50, 53, 55, 56, 58, 50, 53, 55, 56, 58, 50, 53, 55, 56, 58,
        50, 53, 55, 56, 58
    };

    static {
        try {
            synth = MidiSystem.getSynthesizer();
            synth.open();
            channels = synth.getChannels();
        } catch (MidiUnavailableException e) {
            e.printStackTrace();
        }
    }

    // Play a note based on the player's score
    public static void playNote(Player player) {
        int[] selectedScale = (player.getScore() > 99) ? scaleNotesHard : scaleNotes;

        // Set shouldInterrupt to true when scaleNotesHard is played
        shouldInterrupt = (selectedScale == scaleNotesHard);

        // Reset the note index when switching scales
        if ((player.getScore() > 99 && currentNoteIndex >= scaleNotesHard.length) ||
            (player.getScore() <= 99 && currentNoteIndex >= scaleNotes.length)) {
            currentNoteIndex = 0;
        }

        int note = selectedScale[currentNoteIndex];
        int velocity = (currentNoteIndex % 8 == 0) ? 127 : 90;
        int duration = (currentNoteIndex % 2 == 0) ? 500 : 250;

        playSound(note, velocity, duration);

        currentNoteIndex = (currentNoteIndex + 1) % selectedScale.length;
    }

    // Play a sound with the given note, velocity, and duration
    private static void playSound(int note, int velocity, int duration) {
        if (playingThread != null && shouldInterrupt) {
            playingThread.interrupt();
        }

        playingThread = new Thread(() -> {
            try {
                semaphore.acquire();
                channels[0].allNotesOff();
                channels[0].noteOn(note, velocity);
                Thread.sleep(duration);
                channels[0].noteOff(note);
            } catch (InterruptedException e) {
                // The thread was interrupted, so stop the note immediately
                channels[0].allNotesOff();
                channels[0].noteOff(note);
            } finally {
                semaphore.release();
            }
        });

        playingThread.start();
    }

    // Stop all notes that are currently playing
    private static void stopAllNotes() {
        // Interrupt the thread that's playing the note
        if (playingThread != null) {
            playingThread.interrupt();
        }

        for (MidiChannel channel : channels) {
            channel.allNotesOff();
        }
    }

    // Play a jingle when the game is over
    public static void gameOverJingle() {
        shouldInterrupt = true;
        stopAllNotes();
        int[] jingleNotes = {45, 57, 41, 52, 36};
        for (int note : jingleNotes) {
            playSound(note, 127, 400);
            sleep(400);
        }
    }

    // Play a sound when the player powers up
    public static void playPowerUpSound(){
        shouldInterrupt = true;
        stopAllNotes();
        playSound(90, 127, 500);
    }

    // Reset the sound system
    public static void resetSound() {
        shouldInterrupt = true;
        stopAllNotes();
        currentNoteIndex = 0;

        // Release all permits of the semaphore
        semaphore.release(semaphore.availablePermits());
    }

    // Sleep for the given number of milliseconds
    private static void sleep(int millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}