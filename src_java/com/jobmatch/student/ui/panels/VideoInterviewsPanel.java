package com.jobmatch.student.ui.panels;

import com.jobmatch.student.ui.Theme;

import javax.swing.*;
import java.awt.*;

public class VideoInterviewsPanel extends JPanel {

    private final CardLayout videoCardLayout = new CardLayout();
    private final JPanel cardsPanel = new JPanel(videoCardLayout);

    // Equipment Test state
    private boolean isCameraTesting = false;
    private JLabel testVideoBox;

    // Call Room state
    private boolean isAudioMuted = false;
    private boolean isVideoStopped = false;
    private JButton callAudioBtn;
    private JButton callVideoBtn;
    private JLabel callVideoBox;

    public VideoInterviewsPanel() {
        setBackground(Theme.BG_DARK);
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        initUI();
    }

    private void initUI() {
        cardsPanel.setBackground(Theme.BG_DARK);

        // Panel 1: Lobby View
        JPanel lobbyView = createLobbyView();
        // Panel 2: Active Room View
        JPanel roomView = createRoomView();

        cardsPanel.add(lobbyView, "LOBBY");
        cardsPanel.add(roomView, "ROOM");

        add(cardsPanel, BorderLayout.CENTER);
    }

    private JPanel createLobbyView() {
        JPanel main = new JPanel();
        main.setLayout(new BoxLayout(main, BoxLayout.Y_AXIS));
        main.setBackground(Theme.BG_DARK);

        // Header
        JLabel title = new JLabel("📹 Video Interviews");
        title.setFont(Theme.FONT_HEADER);
        title.setForeground(Theme.TEXT_WHITE);

        JLabel sub = new JLabel("Connect with recruiters through integrated video interviews. Test your audio & video gear below.");
        sub.setFont(Theme.FONT_REGULAR);
        sub.setForeground(Theme.TEXT_MUTED);

        main.add(title);
        main.add(Box.createRigidArea(new Dimension(0, 5)));
        main.add(sub);
        main.add(Box.createRigidArea(new Dimension(0, 20)));

        // Upcoming Interview Card
        JPanel upcomingCard = Theme.createCardPanel();
        upcomingCard.setLayout(new BorderLayout(15, 0));
        upcomingCard.setMaximumSize(new Dimension(2000, 110));
        upcomingCard.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createMatteBorder(0, 5, 0, 0, Theme.SUCCESS),
            BorderFactory.createEmptyBorder(15, 15, 15, 15)
        ));

        JPanel uInfo = new JPanel();
        uInfo.setLayout(new BoxLayout(uInfo, BoxLayout.Y_AXIS));
        uInfo.setBackground(Theme.PANEL_BG);

        JLabel uTitle = new JLabel("UPCOMING: TECHNICAL ROUND");
        uTitle.setFont(Theme.FONT_SUBHEADER);
        uTitle.setForeground(Theme.TEXT_WHITE);

        JLabel uComp = new JLabel("TechNova Inc. • Starting in 10 minutes");
        uComp.setFont(Theme.FONT_BOLD);
        uComp.setForeground(Theme.GOLD);

        uInfo.add(uTitle);
        uInfo.add(uComp);

        JButton joinRoomBtn = Theme.createGoldButton("Join Room Now");
        joinRoomBtn.addActionListener(e -> videoCardLayout.show(cardsPanel, "ROOM"));

        upcomingCard.add(uInfo, BorderLayout.CENTER);
        upcomingCard.add(joinRoomBtn, BorderLayout.EAST);

        main.add(upcomingCard);
        main.add(Box.createRigidArea(new Dimension(0, 20)));

        // Equipment Check Card
        JPanel equipCard = Theme.createCardPanel();
        equipCard.setLayout(new BorderLayout(0, 15));
        equipCard.setMaximumSize(new Dimension(2000, 320));

        JLabel eqTitle = new JLabel("Equipment & Camera Check", SwingConstants.CENTER);
        eqTitle.setFont(Theme.FONT_SUBHEADER);
        eqTitle.setForeground(Theme.TEXT_WHITE);

        testVideoBox = new JLabel("📷 Camera Off - Click Test Camera", SwingConstants.CENTER);
        testVideoBox.setFont(Theme.FONT_BOLD);
        testVideoBox.setForeground(Theme.TEXT_MUTED);
        testVideoBox.setOpaque(true);
        testVideoBox.setBackground(Color.BLACK);
        testVideoBox.setPreferredSize(new Dimension(500, 200));

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
        btnPanel.setBackground(Theme.PANEL_BG);

        JButton testBtn = Theme.createOutlineButton("Test Camera & Mic");
        testBtn.addActionListener(e -> toggleCameraTest());

        btnPanel.add(testBtn);

        equipCard.add(eqTitle, BorderLayout.NORTH);
        equipCard.add(testVideoBox, BorderLayout.CENTER);
        equipCard.add(btnPanel, BorderLayout.SOUTH);

        main.add(equipCard);

        JScrollPane scroll = new JScrollPane(main);
        scroll.setBorder(null);
        return main;
    }

    private void toggleCameraTest() {
        isCameraTesting = !isCameraTesting;
        if (isCameraTesting) {
            testVideoBox.setText("🟢 Camera Live - System Ready (High Quality Audio/Video Stream Active)");
            testVideoBox.setForeground(Theme.SUCCESS);
            testVideoBox.setBackground(new Color(20, 30, 40));
        } else {
            testVideoBox.setText("📷 Camera Off - Click Test Camera");
            testVideoBox.setForeground(Theme.TEXT_MUTED);
            testVideoBox.setBackground(Color.BLACK);
        }
    }

    private JPanel createRoomView() {
        JPanel panel = new JPanel(new BorderLayout(0, 10));
        panel.setBackground(Color.BLACK);

        // Header
        JPanel roomHeader = new JPanel(new BorderLayout());
        roomHeader.setBackground(Theme.BG_DARK);
        roomHeader.setBorder(BorderFactory.createEmptyBorder(10, 15, 10, 15));

        JLabel rTitle = new JLabel("Live Interview Room: Technical Round (TechNova)");
        rTitle.setFont(Theme.FONT_BOLD);
        rTitle.setForeground(Theme.GOLD);

        JLabel rStatus = new JLabel("🔴 REC • Connected");
        rStatus.setFont(Theme.FONT_BOLD);
        rStatus.setForeground(Theme.SUCCESS);

        roomHeader.add(rTitle, BorderLayout.WEST);
        roomHeader.add(rStatus, BorderLayout.EAST);

        panel.add(roomHeader, BorderLayout.NORTH);

        // Video Stage
        JPanel stage = new JPanel(new BorderLayout());
        stage.setBackground(Color.BLACK);

        JLabel mainVideoFeed = new JLabel("👤 Hiring Manager (TechNova VP of Engineering)", SwingConstants.CENTER);
        mainVideoFeed.setFont(new Font("Segoe UI", Font.BOLD, 20));
        mainVideoFeed.setForeground(Theme.TEXT_WHITE);
        mainVideoFeed.setOpaque(true);
        mainVideoFeed.setBackground(new Color(15, 23, 42));

        callVideoBox = new JLabel("Self View: Active", SwingConstants.CENTER);
        callVideoBox.setFont(Theme.FONT_SMALL);
        callVideoBox.setForeground(Theme.GOLD);
        callVideoBox.setOpaque(true);
        callVideoBox.setBackground(new Color(30, 41, 59));
        callVideoBox.setPreferredSize(new Dimension(200, 120));
        callVideoBox.setBorder(BorderFactory.createLineBorder(Theme.BORDER_COLOR, 2));

        JPanel selfContainer = new JPanel(new FlowLayout(FlowLayout.RIGHT, 15, 15));
        selfContainer.setOpaque(false);
        selfContainer.add(callVideoBox);

        stage.add(mainVideoFeed, BorderLayout.CENTER);
        stage.add(selfContainer, BorderLayout.SOUTH);

        panel.add(stage, BorderLayout.CENTER);

        // Control Toolbar
        JPanel controls = new JPanel(new FlowLayout(FlowLayout.CENTER, 20, 12));
        controls.setBackground(Theme.BG_DARK);

        callAudioBtn = Theme.createOutlineButton("🎙️ Mute Mic");
        callAudioBtn.addActionListener(e -> {
            isAudioMuted = !isAudioMuted;
            callAudioBtn.setText(isAudioMuted ? "🔇 Unmute Mic" : "🎙️ Mute Mic");
        });

        callVideoBtn = Theme.createOutlineButton("📹 Stop Video");
        callVideoBtn.addActionListener(e -> {
            isVideoStopped = !isVideoStopped;
            callVideoBtn.setText(isVideoStopped ? "📷 Start Video" : "📹 Stop Video");
            callVideoBox.setText(isVideoStopped ? "Self View: Muted" : "Self View: Active");
        });

        JButton endCallBtn = Theme.createDangerButton("🔴 End Call");
        endCallBtn.addActionListener(e -> {
            videoCardLayout.show(cardsPanel, "LOBBY");
            JOptionPane.showMessageDialog(this, "Interview call completed.", "Call Ended", JOptionPane.INFORMATION_MESSAGE);
        });

        controls.add(callAudioBtn);
        controls.add(callVideoBtn);
        controls.add(endCallBtn);

        panel.add(controls, BorderLayout.SOUTH);

        return panel;
    }
}
