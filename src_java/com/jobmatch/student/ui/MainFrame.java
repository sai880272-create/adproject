package com.jobmatch.student.ui;

import com.jobmatch.student.data.AppState;
import com.jobmatch.student.ui.panels.*;

import javax.swing.*;
import java.awt.*;
import java.util.HashMap;
import java.util.Map;

public class MainFrame extends JFrame implements AppState.StateChangeListener {

    private final CardLayout cardLayout = new CardLayout();
    private final JPanel contentCardPanel = new JPanel(cardLayout);
    private final Map<String, JButton> navButtons = new HashMap<>();

    private JLabel notificationBadgeLabel;

    public MainFrame() {
        setTitle("Job Match - Student Portal (Java Edition)");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1280, 800);
        setMinimumSize(new Dimension(1024, 700));
        setLocationRelativeTo(null);

        AppState.getInstance().addListener(this);

        initUI();
    }

    private void initUI() {
        JPanel rootPanel = new JPanel(new BorderLayout());
        rootPanel.setBackground(Theme.BG_DARK);

        // 1. Sidebar Navigation (Left)
        JPanel sidebar = createSidebar();
        rootPanel.add(sidebar, BorderLayout.WEST);

        // 2. Right Main Section (Header + Content)
        JPanel rightSection = new JPanel(new BorderLayout());
        rightSection.setBackground(Theme.BG_DARK);

        JPanel headerBar = createHeaderBar();
        rightSection.add(headerBar, BorderLayout.NORTH);

        // Content Panels Registration
        contentCardPanel.setBackground(Theme.BG_DARK);
        contentCardPanel.add(new StudentDashboardPanel(), "DASHBOARD");
        contentCardPanel.add(new StudentJobsPanel(), "JOBS");
        contentCardPanel.add(new StudentApplicationsPanel(), "APPLICATIONS");
        contentCardPanel.add(new StudentProfilePanel(), "PROFILE");
        contentCardPanel.add(new StudentReviewsPanel(), "REVIEWS");
        contentCardPanel.add(new AiMatchingPanel(), "AI_MATCHING");
        contentCardPanel.add(new InterviewPrepPanel(), "INTERVIEW_PREP");
        contentCardPanel.add(new ResumeBuilderPanel(), "RESUME_BUILDER");
        contentCardPanel.add(new OfferManagementPanel(), "OFFERS");
        contentCardPanel.add(new VideoInterviewsPanel(), "VIDEO_INTERVIEWS");

        rightSection.add(contentCardPanel, BorderLayout.CENTER);

        rootPanel.add(rightSection, BorderLayout.CENTER);

        setContentPane(rootPanel);

        // Default view
        switchView("DASHBOARD");
    }

    private JPanel createSidebar() {
        JPanel sidebar = new JPanel();
        sidebar.setLayout(new BoxLayout(sidebar, BoxLayout.Y_AXIS));
        sidebar.setBackground(Theme.PANEL_BG);
        sidebar.setPreferredSize(new Dimension(240, 800));
        sidebar.setBorder(BorderFactory.createMatteBorder(0, 0, 0, 1, Theme.BORDER_COLOR));

        // Logo & Title
        JPanel logoPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 15, 20));
        logoPanel.setBackground(Theme.PANEL_BG);
        logoPanel.setMaximumSize(new Dimension(240, 70));

        JLabel logoLabel = new JLabel("JOB MATCH");
        logoLabel.setFont(new Font("Segoe UI", Font.BOLD, 18));
        logoLabel.setForeground(Theme.GOLD);

        JLabel subTitleLabel = new JLabel("STUDENT PORTAL");
        subTitleLabel.setFont(new Font("Segoe UI", Font.PLAIN, 10));
        subTitleLabel.setForeground(Theme.TEXT_MUTED);

        JPanel logoTextP = new JPanel(new GridLayout(2, 1));
        logoTextP.setBackground(Theme.PANEL_BG);
        logoTextP.add(logoLabel);
        logoTextP.add(subTitleLabel);

        logoPanel.add(logoTextP);
        sidebar.add(logoPanel);
        sidebar.add(Box.createRigidArea(new Dimension(0, 10)));

        // Navigation Items
        addNavItem(sidebar, "📊 Dashboard", "DASHBOARD");
        addNavItem(sidebar, "💼 Opportunities", "JOBS");
        addNavItem(sidebar, "📋 Applications", "APPLICATIONS");
        addNavItem(sidebar, "🎓 Academic Profile", "PROFILE");
        addNavItem(sidebar, "⭐ Company Reviews", "REVIEWS");
        addNavItem(sidebar, "✨ AI Job Matching", "AI_MATCHING");
        addNavItem(sidebar, "📚 Interview Prep", "INTERVIEW_PREP");
        addNavItem(sidebar, "📄 Resume Builder", "RESUME_BUILDER");
        addNavItem(sidebar, "💰 Offer Management", "OFFERS");
        addNavItem(sidebar, "📹 Video Interviews", "VIDEO_INTERVIEWS");

        sidebar.add(Box.createVerticalGlue());

        return sidebar;
    }

    private void addNavItem(JPanel sidebar, String labelText, String viewKey) {
        JButton btn = new JButton(labelText);
        btn.setFont(Theme.FONT_BOLD);
        btn.setForeground(Theme.TEXT_MUTED);
        btn.setBackground(Theme.PANEL_BG);
        btn.setFocusPainted(false);
        btn.setHorizontalAlignment(SwingConstants.LEFT);
        btn.setBorder(BorderFactory.createEmptyBorder(12, 20, 12, 20));
        btn.setMaximumSize(new Dimension(240, 45));
        btn.setCursor(new Cursor(Cursor.HAND_CURSOR));

        btn.addActionListener(e -> switchView(viewKey));

        navButtons.put(viewKey, btn);
        sidebar.add(btn);
    }

    private void switchView(String viewKey) {
        cardLayout.show(contentCardPanel, viewKey);

        // Highlight selected nav button
        for (Map.Entry<String, JButton> entry : navButtons.entrySet()) {
            if (entry.getKey().equals(viewKey)) {
                entry.getValue().setForeground(Theme.GOLD);
                entry.getValue().setBackground(Theme.BG_DARK);
            } else {
                entry.getValue().setForeground(Theme.TEXT_MUTED);
                entry.getValue().setBackground(Theme.PANEL_BG);
            }
        }
    }

    private JPanel createHeaderBar() {
        JPanel header = new JPanel(new BorderLayout());
        header.setBackground(Theme.PANEL_BG);
        header.setPreferredSize(new Dimension(1000, 60));
        header.setBorder(BorderFactory.createMatteBorder(0, 0, 1, 0, Theme.BORDER_COLOR));

        JLabel welcomeLabel = new JLabel("  Welcome back, " + AppState.getInstance().getCurrentStudentName());
        welcomeLabel.setFont(Theme.FONT_SUBHEADER);
        welcomeLabel.setForeground(Theme.TEXT_WHITE);

        JPanel rightActions = new JPanel(new FlowLayout(FlowLayout.RIGHT, 15, 12));
        rightActions.setBackground(Theme.PANEL_BG);

        notificationBadgeLabel = Theme.createBadge(AppState.getInstance().getNotifications().size() + " New Alerts", Theme.GOLD, Color.BLACK);
        notificationBadgeLabel.setCursor(new Cursor(Cursor.HAND_CURSOR));
        notificationBadgeLabel.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                showNotificationsDialog();
            }
        });

        JButton logoutBtn = Theme.createOutlineButton("Logout");
        logoutBtn.setFont(Theme.FONT_SMALL);
        logoutBtn.addActionListener(e -> {
            int confirm = JOptionPane.showConfirmDialog(this, "Are you sure you want to log out?", "Logout", JOptionPane.YES_NO_OPTION);
            if (confirm == JOptionPane.YES_OPTION) {
                System.exit(0);
            }
        });

        rightActions.add(notificationBadgeLabel);
        rightActions.add(logoutBtn);

        header.add(welcomeLabel, BorderLayout.WEST);
        header.add(rightActions, BorderLayout.EAST);

        return header;
    }

    private void showNotificationsDialog() {
        JDialog dialog = new JDialog(this, "Notifications", true);
        dialog.setSize(400, 300);
        dialog.setLocationRelativeTo(this);

        JPanel p = new JPanel(new BorderLayout());
        p.setBackground(Theme.PANEL_BG);
        p.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        DefaultListModel<String> model = new DefaultListModel<>();
        for (String n : AppState.getInstance().getNotifications()) {
            model.addElement("• " + n);
        }

        JList<String> list = new JList<>(model);
        list.setBackground(Theme.BG_DARK);
        list.setForeground(Theme.TEXT_WHITE);
        list.setFont(Theme.FONT_REGULAR);

        p.add(new JScrollPane(list), BorderLayout.CENTER);

        JButton close = Theme.createGoldButton("Close");
        close.addActionListener(e -> dialog.dispose());
        p.add(close, BorderLayout.SOUTH);

        dialog.setContentPane(p);
        dialog.setVisible(true);
    }

    @Override
    public void onStateChanged() {
        notificationBadgeLabel.setText(AppState.getInstance().getNotifications().size() + " New Alerts");
    }
}
