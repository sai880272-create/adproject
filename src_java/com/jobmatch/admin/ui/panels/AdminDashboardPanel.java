package com.jobmatch.admin.ui.panels;

import com.jobmatch.admin.data.AppState;
import com.jobmatch.admin.models.Job;
import com.jobmatch.admin.ui.Theme;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class AdminDashboardPanel extends JPanel implements AppState.StateChangeListener {

    private final JPanel statsContainer = new JPanel(new GridLayout(1, 3, 20, 0));
    private final JPanel recentJobsContainer = new JPanel();
    private JLabel appsCountLabel;
    private JLabel offersCountLabel;

    public AdminDashboardPanel() {
        setBackground(Theme.BG_DARK);
        setLayout(new BorderLayout(0, 20));
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        AppState.getInstance().addListener(this);

        initUI();
    }

    private void initUI() {
        // Main scrollable content
        JPanel mainContent = new JPanel();
        mainContent.setLayout(new BoxLayout(mainContent, BoxLayout.Y_AXIS));
        mainContent.setBackground(Theme.BG_DARK);

        // Header Title
        JLabel titleLabel = new JLabel("Admin Dashboard");
        titleLabel.setFont(Theme.FONT_HEADER);
        titleLabel.setForeground(Theme.TEXT_WHITE);
        titleLabel.setAlignmentX(Component.LEFT_ALIGNMENT);
        mainContent.add(titleLabel);
        mainContent.add(Box.createRigidArea(new Dimension(0, 15)));

        // 1. Stats Grid
        statsContainer.setBackground(Theme.BG_DARK);
        statsContainer.setAlignmentX(Component.LEFT_ALIGNMENT);
        statsContainer.setMaximumSize(new Dimension(2000, 100));

        appsCountLabel = new JLabel("0", SwingConstants.CENTER);
        JPanel card1 = createStatCard(appsCountLabel, "Applications Sent");

        JLabel interviewsLabel = new JLabel("2", SwingConstants.CENTER);
        JPanel card2 = createStatCard(interviewsLabel, "Interviews Scheduled");

        offersCountLabel = new JLabel("0", SwingConstants.CENTER);
        JPanel card3 = createStatCard(offersCountLabel, "Offers Received");

        statsContainer.add(card1);
        statsContainer.add(card2);
        statsContainer.add(card3);

        mainContent.add(statsContainer);
        mainContent.add(Box.createRigidArea(new Dimension(0, 20)));

        // 2. Career Overview Card
        JPanel overviewCard = Theme.createCardPanel();
        overviewCard.setLayout(new BorderLayout());
        overviewCard.setAlignmentX(Component.LEFT_ALIGNMENT);
        overviewCard.setMaximumSize(new Dimension(2000, 120));

        JLabel overviewHeader = new JLabel("Career Overview");
        overviewHeader.setFont(Theme.FONT_SUBHEADER);
        overviewHeader.setForeground(Theme.GOLD);

        JTextArea overviewText = new JTextArea("Welcome to your career hub. Here you can track your applications, prepare for interviews, and explore elite placement opportunities tailored to your profile.");
        overviewText.setFont(Theme.FONT_REGULAR);
        overviewText.setForeground(Theme.TEXT_MUTED);
        overviewText.setBackground(Theme.PANEL_BG);
        overviewText.setEditable(false);
        overviewText.setLineWrap(true);
        overviewText.setWrapStyleWord(true);

        overviewCard.add(overviewHeader, BorderLayout.NORTH);
        overviewCard.add(overviewText, BorderLayout.CENTER);

        mainContent.add(overviewCard);
        mainContent.add(Box.createRigidArea(new Dimension(0, 20)));

        // 3. Recent Job Openings Card
        JPanel recentJobsCard = Theme.createCardPanel();
        recentJobsCard.setLayout(new BorderLayout(0, 10));
        recentJobsCard.setAlignmentX(Component.LEFT_ALIGNMENT);
        recentJobsCard.setMaximumSize(new Dimension(2000, 300));

        JLabel rjHeader = new JLabel("Recent Job Openings");
        rjHeader.setFont(Theme.FONT_SUBHEADER);
        rjHeader.setForeground(Theme.TEXT_WHITE);
        recentJobsCard.add(rjHeader, BorderLayout.NORTH);

        recentJobsContainer.setLayout(new BoxLayout(recentJobsContainer, BoxLayout.Y_AXIS));
        recentJobsContainer.setBackground(Theme.PANEL_BG);
        recentJobsCard.add(recentJobsContainer, BorderLayout.CENTER);

        mainContent.add(recentJobsCard);

        JScrollPane scrollPane = new JScrollPane(mainContent);
        scrollPane.setBorder(null);
        scrollPane.getVerticalScrollBar().setUnitIncrement(16);
        add(scrollPane, BorderLayout.CENTER);

        updateData();
    }

    private JPanel createStatCard(JLabel valLabel, String labelText) {
        JPanel card = Theme.createCardPanel();
        card.setLayout(new BorderLayout());
        valLabel.setFont(new Font("Segoe UI", Font.BOLD, 28));
        valLabel.setForeground(Theme.GOLD);

        JLabel subLabel = new JLabel(labelText, SwingConstants.CENTER);
        subLabel.setFont(Theme.FONT_REGULAR);
        subLabel.setForeground(Theme.TEXT_MUTED);

        card.add(valLabel, BorderLayout.CENTER);
        card.add(subLabel, BorderLayout.SOUTH);
        return card;
    }

    private void updateData() {
        AppState state = AppState.getInstance();
        appsCountLabel.setText(String.valueOf(state.getApplications().size()));
        offersCountLabel.setText(String.valueOf(state.getOffers().size()));

        recentJobsContainer.removeAll();
        List<Job> jobs = state.getJobs();
        int limit = Math.min(jobs.size(), 2);
        for (int i = 0; i < limit; i++) {
            Job job = jobs.get(i);
            JPanel jobRow = new JPanel(new BorderLayout(15, 0));
            jobRow.setBackground(Theme.BG_DARK);
            jobRow.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(Theme.BORDER_COLOR, 1),
                BorderFactory.createEmptyBorder(12, 15, 12, 15)
            ));

            JPanel infoPanel = new JPanel();
            infoPanel.setLayout(new BoxLayout(infoPanel, BoxLayout.Y_AXIS));
            infoPanel.setBackground(Theme.BG_DARK);

            JLabel title = new JLabel(job.getTitle());
            title.setFont(Theme.FONT_BOLD);
            title.setForeground(Theme.TEXT_WHITE);

            JLabel company = new JLabel(job.getCompany() + " • " + job.getSalary());
            company.setFont(Theme.FONT_SMALL);
            company.setForeground(Theme.GOLD);

            infoPanel.add(title);
            infoPanel.add(company);

            JButton applyBtn = Theme.createGoldButton("Quick Apply");
            applyBtn.setFont(Theme.FONT_SMALL);
            applyBtn.addActionListener(e -> {
                state.applyToJob(job);
                JOptionPane.showMessageDialog(this, "Application submitted for " + job.getTitle() + " at " + job.getCompany(), "Success", JOptionPane.INFORMATION_MESSAGE);
            });

            jobRow.add(infoPanel, BorderLayout.CENTER);
            jobRow.add(applyBtn, BorderLayout.EAST);

            recentJobsContainer.add(jobRow);
            recentJobsContainer.add(Box.createRigidArea(new Dimension(0, 10)));
        }

        recentJobsContainer.revalidate();
        recentJobsContainer.repaint();
    }

    @Override
    public void onStateChanged() {
        updateData();
    }
}
