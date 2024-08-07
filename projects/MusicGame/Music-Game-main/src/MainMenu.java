
import javax.swing.*;
import java.awt.event.*;
import java.awt.*;

public class MainMenu extends JFrame implements ActionListener{
    private JPanel scene;
    private Color myColor = new Color(245,245,220);
    private Color buttonColor = new Color(90,114,255);
    @Override
    public void actionPerformed(ActionEvent e){
        SwingUtilities.invokeLater(new MusicGame());
        //Closes main menu window after starting game
        setVisible(false);
    }
    
    public MainMenu(){
        setTitle("LET'S PLAY MUSIC GAME!!");
        setSize(600,400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        //JPanel set up
        scene = new JPanel();
        add(scene);
        scene.setBackground(myColor);
        //Strings to print and font
        JLabel title = new JLabel("     MUSIC GAME");
        JLabel buttonspace = new JLabel("                           ");
        JLabel instructions = new JLabel("     INSTRUCTIONS:     ");
        JLabel inst1 =  new JLabel("1.) Press the Play Button                                    ");
        JLabel inst2 =  new JLabel("2.) Hit the Letf and Right Arrow Keys to move");
        JLabel inst3 =  new JLabel("3.) Land on Platforms to Play Notes                  ");
        JLabel inst4 =  new JLabel("4.) Run into Power Ups for a New Experience  ");
        JLabel inst5 =  new JLabel("5.) DON'T FALL DOWN!!!!!                              ");
        Font newfont = new Font("Serif", Font.BOLD, 48);
        Font otherfont = new Font("Serif",Font.BOLD, 19);
        //Create button
        JButton b = new JButton("LET'S PLAY!!!");
        //Print stuff and button edits 
        title.setFont(newfont);
        title.setForeground(buttonColor);
        scene.add(title);
        scene.add(buttonspace);
        scene.add(b);
        instructions.setFont(newfont);
        instructions.setForeground(buttonColor);
        scene.add(instructions);
        inst1.setFont(otherfont);
        inst1.setForeground(buttonColor);
        scene.add(inst1);
        inst2.setFont(otherfont);
        inst2.setForeground(buttonColor);
        scene.add(inst2);
        inst3.setFont(otherfont);
        inst3.setForeground(buttonColor);
        scene.add(inst3);
        inst4.setFont(otherfont);
        inst4.setForeground(buttonColor);
        scene.add(inst4);
        inst5.setFont(otherfont);
        inst5.setForeground(buttonColor);
        scene.add(inst5);
        b.setBackground(buttonColor);
        b.addActionListener(this);
        
        //Centers main menu window
        setLocationRelativeTo(null);
        
        setVisible(true);
    }
    
}