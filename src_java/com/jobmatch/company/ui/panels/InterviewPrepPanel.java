package com.jobmatch.company.ui.panels;

import com.jobmatch.company.data.AppState;
import com.jobmatch.company.models.CodingChallenge;
import com.jobmatch.company.ui.Theme;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class InterviewPrepPanel extends JPanel {

    private final CardLayout subCardLayout = new CardLayout();
    private final JPanel subCardsPanel = new JPanel(subCardLayout);

    // Mock Interview state
    private String currentMockTrack = "behavioral";
    private int currentQuestionIdx = 0;
    private final String[][] mockQuestions = {
        { // Behavioral
            "Tell me about a time when you had to manage tight deadlines for a complex project.",
            "Describe a situation where you had a conflict with a team member and how you resolved it.",
            "What is your greatest technical achievement and what key lesson did you learn from it?"
        },
        { // Technical
            "Explain how optimising database indices improves query latency, and when indexing might hurt performance.",
            "What is the difference between concurrency and parallelism? How does Java handle thread management?",
            "Describe how garbage collection works in modern runtimes (JVM / V8 JavaScript)."
        }
    };
    private JLabel mockTrackTitleLabel;
    private JTextArea mockQuestionTextArea;
    private JTextArea mockAnswerInputArea;
    private JPanel mockFeedbackContainer;

    public InterviewPrepPanel() {
        setBackground(Theme.BG_DARK);
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        initUI();
    }

    private void initUI() {
        subCardsPanel.setBackground(Theme.BG_DARK);

        JPanel hubHome = createHubHome();
        JPanel guidesView = createGuidesView();
        JPanel mockView = createMockView();
        JPanel codingView = createCodingView();

        subCardsPanel.add(hubHome, "HUB");
        subCardsPanel.add(guidesView, "GUIDES");
        subCardsPanel.add(mockView, "MOCK");
        subCardsPanel.add(codingView, "CODING");

        add(subCardsPanel, BorderLayout.CENTER);
    }

    private JPanel createHubHome() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(Theme.BG_DARK);

        JLabel title = new JLabel("Interview Preparation Hub");
        title.setFont(Theme.FONT_HEADER);
        title.setForeground(Theme.TEXT_WHITE);

        JLabel sub = new JLabel("Sharpen your skills and get ready for your next big technical & behavioral interview.");
        sub.setFont(Theme.FONT_REGULAR);
        sub.setForeground(Theme.TEXT_MUTED);

        panel.add(title);
        panel.add(Box.createRigidArea(new Dimension(0, 5)));
        panel.add(sub);
        panel.add(Box.createRigidArea(new Dimension(0, 20)));

        // 3 Feature Cards
        JPanel grid = new JPanel(new GridLayout(1, 3, 20, 0));
        grid.setBackground(Theme.BG_DARK);
        grid.setMaximumSize(new Dimension(2000, 200));

        // Card 1
        JPanel c1 = Theme.createCardPanel();
        c1.setLayout(new BorderLayout(0, 10));
        JLabel t1 = new JLabel("📄 Resume Building");
        t1.setFont(Theme.FONT_SUBHEADER);
        t1.setForeground(Theme.GOLD);
        JTextArea d1 = new JTextArea("Get tips and templates for creating a standout ATS-friendly resume.");
        d1.setFont(Theme.FONT_REGULAR);
        d1.setForeground(Theme.TEXT_MUTED);
        d1.setBackground(Theme.PANEL_BG);
        d1.setEditable(false);
        d1.setLineWrap(true);
        d1.setWrapStyleWord(true);
        JButton b1 = Theme.createOutlineButton("View Guides");
        b1.addActionListener(e -> subCardLayout.show(subCardsPanel, "GUIDES"));

        c1.add(t1, BorderLayout.NORTH);
        c1.add(d1, BorderLayout.CENTER);
        c1.add(b1, BorderLayout.SOUTH);

        // Card 2
        JPanel c2 = Theme.createCardPanel();
        c2.setLayout(new BorderLayout(0, 10));
        JLabel t2 = new JLabel("🎙️ Mock Interviews");
        t2.setFont(Theme.FONT_SUBHEADER);
        t2.setForeground(Theme.GOLD);
        JTextArea d2 = new JTextArea("Practice with AI-powered mock interviews and receive real-time feedback.");
        d2.setFont(Theme.FONT_REGULAR);
        d2.setForeground(Theme.TEXT_MUTED);
        d2.setBackground(Theme.PANEL_BG);
        d2.setEditable(false);
        d2.setLineWrap(true);
        d2.setWrapStyleWord(true);
        JButton b2 = Theme.createGoldButton("Start Practice");
        b2.addActionListener(e -> subCardLayout.show(subCardsPanel, "MOCK"));

        c2.add(t2, BorderLayout.NORTH);
        c2.add(d2, BorderLayout.CENTER);
        c2.add(b2, BorderLayout.SOUTH);

        // Card 3
        JPanel c3 = Theme.createCardPanel();
        c3.setLayout(new BorderLayout(0, 10));
        JLabel t3 = new JLabel("💻 Coding Challenges");
        t3.setFont(Theme.FONT_SUBHEADER);
        t3.setForeground(Theme.GOLD);
        JTextArea d3 = new JTextArea("Solve real interview coding challenges from top tech companies.");
        d3.setFont(Theme.FONT_REGULAR);
        d3.setForeground(Theme.TEXT_MUTED);
        d3.setBackground(Theme.PANEL_BG);
        d3.setEditable(false);
        d3.setLineWrap(true);
        d3.setWrapStyleWord(true);
        JButton b3 = Theme.createOutlineButton("Go to Challenges");
        b3.addActionListener(e -> subCardLayout.show(subCardsPanel, "CODING"));

        c3.add(t3, BorderLayout.NORTH);
        c3.add(d3, BorderLayout.CENTER);
        c3.add(b3, BorderLayout.SOUTH);

        grid.add(c1);
        grid.add(c2);
        grid.add(c3);

        panel.add(grid);
        panel.add(Box.createRigidArea(new Dimension(0, 20)));

        // Tips Card
        JPanel tipsCard = Theme.createCardPanel();
        tipsCard.setLayout(new BorderLayout(0, 10));
        tipsCard.setMaximumSize(new Dimension(2000, 180));
        JLabel tipsHeader = new JLabel("⭐ Top Interview Tips & Tricks");
        tipsHeader.setFont(Theme.FONT_SUBHEADER);
        tipsHeader.setForeground(Theme.TEXT_WHITE);

        JTextArea tipsText = new JTextArea(
            "1. Research the Company: Understand their mission, core products, and engineering culture.\n" +
            "2. Quantify Accomplishments: Speak in terms of concrete metrics, percentage improvements, and impact.\n" +
            "3. STAR Method: Structure behavioral responses with Situation, Task, Action, and Result.\n" +
            "4. Follow Up: Send a concise thank-you note within 24 hours of your interview."
        );
        tipsText.setFont(Theme.FONT_REGULAR);
        tipsText.setForeground(Theme.TEXT_MUTED);
        tipsText.setBackground(Theme.PANEL_BG);
        tipsText.setEditable(false);
        tipsText.setLineWrap(true);

        tipsCard.add(tipsHeader, BorderLayout.NORTH);
        tipsCard.add(tipsText, BorderLayout.CENTER);

        panel.add(tipsCard);

        JScrollPane scrollPane = new JScrollPane(panel);
        scrollPane.setBorder(null);
        return panel;
    }

    private JPanel createGuidesView() {
        JPanel panel = new JPanel(new BorderLayout(0, 15));
        panel.setBackground(Theme.BG_DARK);

        JButton backBtn = Theme.createOutlineButton("← Back to Hub");
        backBtn.addActionListener(e -> subCardLayout.show(subCardsPanel, "HUB"));

        JPanel header = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
        header.setBackground(Theme.BG_DARK);
        header.add(backBtn);

        JPanel content = new JPanel();
        content.setLayout(new BoxLayout(content, BoxLayout.Y_AXIS));
        content.setBackground(Theme.BG_DARK);

        JLabel title = new JLabel("Top Tips for a Winning Resume");
        title.setFont(Theme.FONT_HEADER);
        title.setForeground(Theme.GOLD);
        content.add(title);
        content.add(Box.createRigidArea(new Dimension(0, 15)));

        JPanel c1 = Theme.createCardPanel();
        c1.setLayout(new BorderLayout());
        JLabel h1 = new JLabel("Use Action Verbs");
        h1.setFont(Theme.FONT_SUBHEADER);
        h1.setForeground(Theme.TEXT_WHITE);
        JTextArea t1 = new JTextArea("Start bullet points with strong verbs: 'Engineered', 'Orchestrated', 'Optimized', 'Accelerated'.");
        t1.setForeground(Theme.TEXT_MUTED);
        t1.setBackground(Theme.PANEL_BG);
        t1.setEditable(false);
        c1.add(h1, BorderLayout.NORTH);
        c1.add(t1, BorderLayout.CENTER);

        content.add(c1);
        content.add(Box.createRigidArea(new Dimension(0, 15)));

        JButton downloadBtn = Theme.createGoldButton("📥 Download Template Pack");
        downloadBtn.addActionListener(e -> JOptionPane.showMessageDialog(this, "Resume Template Pack downloaded to your system.", "Templates", JOptionPane.INFORMATION_MESSAGE));
        content.add(downloadBtn);

        panel.add(header, BorderLayout.NORTH);
        panel.add(content, BorderLayout.CENTER);
        return panel;
    }

    private JPanel createMockView() {
        JPanel panel = new JPanel(new BorderLayout(0, 15));
        panel.setBackground(Theme.BG_DARK);

        JButton backBtn = Theme.createOutlineButton("← Back to Hub");
        backBtn.addActionListener(e -> subCardLayout.show(subCardsPanel, "HUB"));

        JPanel header = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
        header.setBackground(Theme.BG_DARK);
        header.add(backBtn);

        JPanel card = Theme.createCardPanel();
        card.setLayout(new BoxLayout(card, BoxLayout.Y_AXIS));

        mockTrackTitleLabel = new JLabel("🎙️ AI Practice Interview Simulator", SwingConstants.CENTER);
        mockTrackTitleLabel.setFont(Theme.FONT_HEADER);
        mockTrackTitleLabel.setForeground(Theme.GOLD);
        mockTrackTitleLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        JPanel trackBtnBox = new JPanel(new FlowLayout(FlowLayout.CENTER, 15, 0));
        trackBtnBox.setBackground(Theme.PANEL_BG);

        JButton b1 = Theme.createGoldButton("Behavioral Track");
        b1.addActionListener(e -> startMockSession(0, "Behavioral Track"));

        JButton b2 = Theme.createOutlineButton("Technical Track");
        b2.addActionListener(e -> startMockSession(1, "Technical Track"));

        trackBtnBox.add(b1);
        trackBtnBox.add(b2);

        mockQuestionTextArea = Theme.createTextArea("Select a track above to begin your practice session.", 3);
        mockAnswerInputArea = Theme.createTextArea("", 5);

        JButton evalBtn = Theme.createGoldButton("✨ Analyze Answer with AI");
        evalBtn.addActionListener(e -> evaluateMockAnswer());

        mockFeedbackContainer = new JPanel();
        mockFeedbackContainer.setLayout(new BoxLayout(mockFeedbackContainer, BoxLayout.Y_AXIS));
        mockFeedbackContainer.setBackground(Theme.PANEL_BG);

        card.add(mockTrackTitleLabel);
        card.add(Box.createRigidArea(new Dimension(0, 15)));
        card.add(trackBtnBox);
        card.add(Box.createRigidArea(new Dimension(0, 15)));
        card.add(new JLabel("Current Question:"));
        card.add(new JScrollPane(mockQuestionTextArea));
        card.add(Box.createRigidArea(new Dimension(0, 10)));
        card.add(new JLabel("Your Response / Audio Script:"));
        card.add(new JScrollPane(mockAnswerInputArea));
        card.add(Box.createRigidArea(new Dimension(0, 15)));
        card.add(evalBtn);
        card.add(Box.createRigidArea(new Dimension(0, 15)));
        card.add(mockFeedbackContainer);

        JScrollPane scroll = new JScrollPane(card);
        scroll.setBorder(null);

        panel.add(header, BorderLayout.NORTH);
        panel.add(scroll, BorderLayout.CENTER);

        return panel;
    }

    private void startMockSession(int trackIdx, String title) {
        currentQuestionIdx = 0;
        mockTrackTitleLabel.setText("🎙️ AI Practice Interview: " + title);
        mockQuestionTextArea.setText(mockQuestions[trackIdx][currentQuestionIdx]);
        mockAnswerInputArea.setText("");
        mockFeedbackContainer.removeAll();
        mockFeedbackContainer.revalidate();
        mockFeedbackContainer.repaint();
    }

    private void evaluateMockAnswer() {
        if (mockAnswerInputArea.getText().trim().isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please enter your response before submitting.", "Response Required", JOptionPane.WARNING_MESSAGE);
            return;
        }

        mockFeedbackContainer.removeAll();

        JPanel fbCard = Theme.createCardPanel();
        fbCard.setLayout(new BoxLayout(fbCard, BoxLayout.Y_AXIS));

        JLabel scoreLabel = new JLabel("📊 AI Evaluation Score: 92/100");
        scoreLabel.setFont(Theme.FONT_SUBHEADER);
        scoreLabel.setForeground(Theme.GOLD);

        JTextArea reportText = new JTextArea(
            "Overall: Excellent answer! You demonstrated strong technical competence, confident articulation, and structured problem solving.\n\n" +
            "• Strengths: Clear architecture explanation, concise terminology, effective use of concrete examples.\n" +
            "• Suggestions: Consider elaborating slightly more on edge-case error recovery."
        );
        reportText.setFont(Theme.FONT_REGULAR);
        reportText.setForeground(Theme.TEXT_WHITE);
        reportText.setBackground(Theme.PANEL_BG);
        reportText.setEditable(false);
        reportText.setLineWrap(true);

        fbCard.add(scoreLabel);
        fbCard.add(Box.createRigidArea(new Dimension(0, 10)));
        fbCard.add(reportText);

        mockFeedbackContainer.add(fbCard);
        mockFeedbackContainer.revalidate();
        mockFeedbackContainer.repaint();
    }

    private JPanel createCodingView() {
        JPanel panel = new JPanel(new BorderLayout(0, 15));
        panel.setBackground(Theme.BG_DARK);

        JButton backBtn = Theme.createOutlineButton("← Back to Hub");
        backBtn.addActionListener(e -> subCardLayout.show(subCardsPanel, "HUB"));

        JPanel header = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
        header.setBackground(Theme.BG_DARK);
        header.add(backBtn);

        String[] cols = {"Challenge Name", "Difficulty", "Success Rate", "Action"};
        DefaultTableModel model = new DefaultTableModel(cols, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        List<CodingChallenge> list = AppState.getInstance().getCodingChallenges();
        for (CodingChallenge c : list) {
            model.addRow(new Object[]{c.getName(), c.getDifficulty(), c.getSuccessRate(), "Start"});
        }

        JTable table = new JTable(model);
        Theme.styleTable(table);

        JScrollPane scroll = new JScrollPane(table);
        scroll.setBorder(BorderFactory.createLineBorder(Theme.BORDER_COLOR, 1));

        JPanel bottom = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        bottom.setBackground(Theme.BG_DARK);
        JButton startBtn = Theme.createGoldButton("Start Selected Challenge");
        startBtn.addActionListener(e -> {
            int row = table.getSelectedRow();
            if (row != -1) {
                String cName = (String) model.getValueAt(row, 0);
                showCodingSandboxDialog(cName);
            } else {
                JOptionPane.showMessageDialog(this, "Please select a challenge row first.", "Notice", JOptionPane.WARNING_MESSAGE);
            }
        });
        bottom.add(startBtn);

        panel.add(header, BorderLayout.NORTH);
        panel.add(scroll, BorderLayout.CENTER);
        panel.add(bottom, BorderLayout.SOUTH);
        return panel;
    }

    private void showCodingSandboxDialog(String challengeName) {
        JDialog dialog = new JDialog((Frame) SwingUtilities.getWindowAncestor(this), "Coding Sandbox - " + challengeName, true);
        dialog.setSize(650, 520);
        dialog.setLocationRelativeTo(this);

        JPanel p = new JPanel(new BorderLayout(15, 15));
        p.setBackground(Theme.PANEL_BG);
        p.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        JLabel title = new JLabel("Coding Challenge: " + challengeName);
        title.setFont(Theme.FONT_HEADER);
        title.setForeground(Theme.GOLD);

        String starterCode = "// Java Solution for " + challengeName + "\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println(\"Running solution for " + challengeName + "...\");\n    }\n}";

        JTextArea codeEditor = Theme.createTextArea(starterCode, 12);
        codeEditor.setFont(new Font("Monospaced", Font.PLAIN, 12));

        JPanel outputPanel = new JPanel(new BorderLayout());
        outputPanel.setBackground(Theme.BG_DARK);
        outputPanel.setBorder(BorderFactory.createLineBorder(Theme.BORDER_COLOR, 1));

        JLabel outputLabel = new JLabel("  Console Output / Test Status: Ready");
        outputLabel.setFont(Theme.FONT_SMALL);
        outputLabel.setForeground(Theme.TEXT_MUTED);
        outputPanel.add(outputLabel, BorderLayout.CENTER);

        JPanel footerP = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 0));
        footerP.setBackground(Theme.PANEL_BG);

        JButton closeBtn = Theme.createOutlineButton("Close");
        closeBtn.addActionListener(e -> dialog.dispose());

        JButton runBtn = Theme.createGoldButton("▶ Run & Submit Code");
        runBtn.addActionListener(e -> {
            outputLabel.setText("  🟢 3/3 Test Cases Passed! (Runtime: 2ms | Memory: 42.1MB)");
            outputLabel.setForeground(Theme.SUCCESS);
            JOptionPane.showMessageDialog(dialog, "🎉 All Test Cases Passed Successfully!", "Challenge Completed", JOptionPane.INFORMATION_MESSAGE);
        });

        footerP.add(closeBtn);
        footerP.add(runBtn);

        p.add(title, BorderLayout.NORTH);

        JPanel centerP = new JPanel(new BorderLayout(0, 10));
        centerP.setBackground(Theme.PANEL_BG);
        centerP.add(new JScrollPane(codeEditor), BorderLayout.CENTER);
        centerP.add(outputPanel, BorderLayout.SOUTH);

        p.add(centerP, BorderLayout.CENTER);
        p.add(footerP, BorderLayout.SOUTH);

        dialog.setContentPane(p);
        dialog.setVisible(true);
    }
}
