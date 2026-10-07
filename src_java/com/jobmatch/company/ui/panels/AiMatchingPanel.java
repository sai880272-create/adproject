package com.jobmatch.company.ui.panels;

import com.jobmatch.company.data.AppState;
import com.jobmatch.company.models.Job;
import com.jobmatch.company.models.CompanyProfile;
import com.jobmatch.company.ui.Theme;

import javax.swing.*;
import java.awt.*;
import java.util.List;

public class AiMatchingPanel extends JPanel {

    private JButton analyzeBtn;
    private JProgressBar progressBar;
    private JPanel resultsContainer;

    public AiMatchingPanel() {
        setBackground(Theme.BG_DARK);
        setLayout(new BorderLayout(0, 20));
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        initUI();
    }

    private void initUI() {
        JPanel mainContent = new JPanel();
        mainContent.setLayout(new BoxLayout(mainContent, BoxLayout.Y_AXIS));
        mainContent.setBackground(Theme.BG_DARK);

        // Header Card
        JPanel headerCard = Theme.createCardPanel();
        headerCard.setLayout(new BorderLayout(0, 15));
        headerCard.setMaximumSize(new Dimension(2000, 180));
        headerCard.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel titleLabel = new JLabel("✨ AI Job Matching");
        titleLabel.setFont(Theme.FONT_HEADER);
        titleLabel.setForeground(Theme.GOLD);

        JTextArea desc = new JTextArea("Our AI algorithms analyze your skills, academic transcript, CGPA, and project portfolio to find your top 98%+ perfect career matches.");
        desc.setFont(Theme.FONT_REGULAR);
        desc.setForeground(Theme.TEXT_MUTED);
        desc.setBackground(Theme.PANEL_BG);
        desc.setEditable(false);
        desc.setLineWrap(true);
        desc.setWrapStyleWord(true);

        JPanel btnBar = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
        btnBar.setBackground(Theme.PANEL_BG);

        analyzeBtn = Theme.createGoldButton("✨ Find My Matches");
        analyzeBtn.addActionListener(e -> runAnalysis());

        progressBar = new JProgressBar();
        progressBar.setIndeterminate(true);
        progressBar.setVisible(false);
        progressBar.setPreferredSize(new Dimension(200, 28));

        btnBar.add(analyzeBtn);
        btnBar.add(Box.createRigidArea(new Dimension(15, 0)));
        btnBar.add(progressBar);

        headerCard.add(titleLabel, BorderLayout.NORTH);
        headerCard.add(desc, BorderLayout.CENTER);
        headerCard.add(btnBar, BorderLayout.SOUTH);

        mainContent.add(headerCard);
        mainContent.add(Box.createRigidArea(new Dimension(0, 20)));

        // Results Container
        resultsContainer = new JPanel();
        resultsContainer.setLayout(new BoxLayout(resultsContainer, BoxLayout.Y_AXIS));
        resultsContainer.setBackground(Theme.BG_DARK);
        resultsContainer.setAlignmentX(Component.LEFT_ALIGNMENT);

        mainContent.add(resultsContainer);

        JScrollPane scrollPane = new JScrollPane(mainContent);
        scrollPane.setBorder(null);
        scrollPane.getVerticalScrollBar().setUnitIncrement(16);
        add(scrollPane, BorderLayout.CENTER);
    }

    private void runAnalysis() {
        analyzeBtn.setEnabled(false);
        analyzeBtn.setText("Analyzing Profile...");
        progressBar.setVisible(true);
        resultsContainer.removeAll();
        resultsContainer.revalidate();
        resultsContainer.repaint();

        SwingWorker<Void, Void> worker = new SwingWorker<>() {
            @Override
            protected Void doInBackground() throws Exception {
                Thread.sleep(1500); // Simulate AI compute execution
                return null;
            }

            @Override
            protected void done() {
                analyzeBtn.setEnabled(true);
                analyzeBtn.setText("✨ Find My Matches");
                progressBar.setVisible(false);
                displayMatches();
            }
        };
        worker.execute();
    }

    private void displayMatches() {
        resultsContainer.removeAll();

        JLabel sectionTitle = new JLabel("Your Top Matched Opportunities");
        sectionTitle.setFont(Theme.FONT_SUBHEADER);
        sectionTitle.setForeground(Theme.TEXT_WHITE);
        sectionTitle.setAlignmentX(Component.LEFT_ALIGNMENT);
        resultsContainer.add(sectionTitle);
        resultsContainer.add(Box.createRigidArea(new Dimension(0, 15)));

        List<Job> jobs = AppState.getInstance().getJobs();
        int[] scores = {98, 94, 91};
        int count = Math.min(jobs.size(), 3);

        for (int i = 0; i < count; i++) {
            Job job = jobs.get(i);
            int score = scores[i];

            JPanel card = Theme.createCardPanel();
            card.setLayout(new BorderLayout(15, 0));
            card.setMaximumSize(new Dimension(2000, 110));
            card.setAlignmentX(Component.LEFT_ALIGNMENT);

            JPanel infoPanel = new JPanel();
            infoPanel.setLayout(new BoxLayout(infoPanel, BoxLayout.Y_AXIS));
            infoPanel.setBackground(Theme.PANEL_BG);

            JLabel tLabel = new JLabel(job.getTitle());
            tLabel.setFont(Theme.FONT_SUBHEADER);
            tLabel.setForeground(Theme.TEXT_WHITE);

            JLabel cLabel = new JLabel(job.getCompany());
            cLabel.setFont(Theme.FONT_BOLD);
            cLabel.setForeground(Theme.GOLD);

            JLabel scoreLabel = new JLabel("Match Score: " + score + "% 🔥");
            scoreLabel.setFont(Theme.FONT_BOLD);
            scoreLabel.setForeground(Theme.SUCCESS);

            infoPanel.add(tLabel);
            infoPanel.add(cLabel);
            infoPanel.add(Box.createRigidArea(new Dimension(0, 4)));
            infoPanel.add(scoreLabel);

            JPanel btnPanel = new JPanel(new GridLayout(2, 1, 0, 8));
            btnPanel.setBackground(Theme.PANEL_BG);

            JButton applyBtn = Theme.createGoldButton("Apply Now");
            applyBtn.addActionListener(e -> showApplicationFormDialog(job));

            JButton detailsBtn = Theme.createOutlineButton("View Details");
            detailsBtn.addActionListener(e -> showJobDetailsModal(job));

            btnPanel.add(applyBtn);
            btnPanel.add(detailsBtn);

            card.add(infoPanel, BorderLayout.CENTER);
            card.add(btnPanel, BorderLayout.EAST);

            resultsContainer.add(card);
            resultsContainer.add(Box.createRigidArea(new Dimension(0, 15)));
        }

        resultsContainer.revalidate();
        resultsContainer.repaint();
    }

    private void showJobDetailsModal(Job job) {
        JDialog dialog = new JDialog((Frame) SwingUtilities.getWindowAncestor(this), "Job Details - " + job.getTitle(), true);
        dialog.setSize(500, 400);
        dialog.setLocationRelativeTo(this);

        JPanel p = new JPanel(new BorderLayout(15, 15));
        p.setBackground(Theme.PANEL_BG);
        p.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        JLabel title = new JLabel(job.getTitle());
        title.setFont(Theme.FONT_HEADER);
        title.setForeground(Theme.TEXT_WHITE);

        JLabel company = new JLabel(job.getCompany() + " • " + job.getSalary() + " • " + job.getType());
        company.setFont(Theme.FONT_SUBHEADER);
        company.setForeground(Theme.GOLD);

        JPanel headerP = new JPanel(new GridLayout(2, 1, 0, 5));
        headerP.setBackground(Theme.PANEL_BG);
        headerP.add(title);
        headerP.add(company);

        JTextArea desc = new JTextArea(
            "JOB OVERVIEW:\n" + job.getDescription() + "\n\n" +
            "KEY RESPONSIBILITIES:\n" +
            "• Design and develop high performance engineering features.\n" +
            "• Collaborate across design, backend, and product teams.\n" +
            "• Optimize platform response times and deliver robust unit testing.\n\n" +
            "CANDIDATE QUALIFICATIONS:\n" +
            "• Company in Computer Science / STEM degree.\n" +
            "• Proficiency in Data Structures, Java, React, SQL & Object Oriented Programming.\n" +
            "• Minimum CGPA 7.5+"
        );
        desc.setFont(Theme.FONT_REGULAR);
        desc.setForeground(Theme.TEXT_MUTED);
        desc.setBackground(Theme.BG_DARK);
        desc.setEditable(false);
        desc.setLineWrap(true);
        desc.setWrapStyleWord(true);
        desc.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        JPanel footerP = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 0));
        footerP.setBackground(Theme.PANEL_BG);

        JButton closeBtn = Theme.createOutlineButton("Close");
        closeBtn.addActionListener(e -> dialog.dispose());

        JButton proceedApplyBtn = Theme.createGoldButton("Proceed to Application Form");
        proceedApplyBtn.addActionListener(e -> {
            dialog.dispose();
            showApplicationFormDialog(job);
        });

        footerP.add(closeBtn);
        footerP.add(proceedApplyBtn);

        p.add(headerP, BorderLayout.NORTH);
        p.add(new JScrollPane(desc), BorderLayout.CENTER);
        p.add(footerP, BorderLayout.SOUTH);

        dialog.setContentPane(p);
        dialog.setVisible(true);
    }

    private void showApplicationFormDialog(Job job) {
        JDialog dialog = new JDialog((Frame) SwingUtilities.getWindowAncestor(this), "AI Match Application Form - " + job.getTitle(), true);
        dialog.setSize(520, 480);
        dialog.setLocationRelativeTo(this);

        JPanel container = new JPanel(new BorderLayout(15, 15));
        container.setBackground(Theme.PANEL_BG);
        container.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        // Header
        JPanel header = new JPanel(new GridLayout(2, 1, 0, 4));
        header.setBackground(Theme.PANEL_BG);

        JLabel hTitle = new JLabel("AI Match Application Form");
        hTitle.setFont(Theme.FONT_HEADER);
        hTitle.setForeground(Theme.TEXT_WHITE);

        JLabel hSub = new JLabel("Applying for " + job.getTitle() + " at " + job.getCompany() + " (98% Compatibility)");
        hSub.setFont(Theme.FONT_SUBHEADER);
        hSub.setForeground(Theme.GOLD);

        header.add(hTitle);
        header.add(hSub);

        // Form Fields
        CompanyProfile profile = AppState.getInstance().getCompanyProfile();

        JPanel formGrid = new JPanel(new GridBagLayout());
        formGrid.setBackground(Theme.PANEL_BG);
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(6, 6, 6, 6);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 1.0;

        JTextField nameF = Theme.createTextField(profile.getName());
        JTextField emailF = Theme.createTextField("alice.walker@university.edu");
        JTextField phoneF = Theme.createTextField("+1 (555) 234-5678");
        JTextField branchF = Theme.createTextField(profile.getBranch());
        JTextField cgpaF = Theme.createTextField(profile.getCgpa());
        JTextArea coverArea = Theme.createTextArea("Matched via AI Job Matching algorithm with 98% score for " + job.getTitle() + ".", 3);

        addFormRow(formGrid, gbc, 0, "Candidate Name", nameF);
        addFormRow(formGrid, gbc, 1, "Email Address", emailF);
        addFormRow(formGrid, gbc, 2, "Phone Number", phoneF);
        addFormRow(formGrid, gbc, 3, "Branch / Major", branchF);
        addFormRow(formGrid, gbc, 4, "CGPA", cgpaF);

        gbc.gridx = 0; gbc.gridy = 5;
        JLabel clLabel = new JLabel("Cover Letter Note");
        clLabel.setFont(Theme.FONT_BOLD);
        clLabel.setForeground(Theme.TEXT_WHITE);
        formGrid.add(clLabel, gbc);

        gbc.gridx = 1;
        formGrid.add(new JScrollPane(coverArea), gbc);

        // Buttons
        JPanel footer = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 0));
        footer.setBackground(Theme.PANEL_BG);

        JButton cancelBtn = Theme.createOutlineButton("Cancel");
        cancelBtn.addActionListener(e -> dialog.dispose());

        JButton submitBtn = Theme.createGoldButton("Submit Application");
        submitBtn.addActionListener(e -> {
            AppState.getInstance().applyToJob(job);
            dialog.dispose();
            JOptionPane.showMessageDialog(this,
                "🎉 Application Submitted Successfully!\nYour AI Matched application for \"" + job.getTitle() + "\" at " + job.getCompany() + " has been sent to Company and Admin portals.",
                "Success", JOptionPane.INFORMATION_MESSAGE);
        });

        footer.add(cancelBtn);
        footer.add(submitBtn);

        container.add(header, BorderLayout.NORTH);
        container.add(new JScrollPane(formGrid), BorderLayout.CENTER);
        container.add(footer, BorderLayout.SOUTH);

        dialog.setContentPane(container);
        dialog.setVisible(true);
    }

    private void addFormRow(JPanel container, GridBagConstraints gbc, int row, String labelText, JComponent field) {
        gbc.gridx = 0; gbc.gridy = row;
        JLabel label = new JLabel(labelText);
        label.setFont(Theme.FONT_BOLD);
        label.setForeground(Theme.TEXT_WHITE);
        container.add(label, gbc);

        gbc.gridx = 1;
        container.add(field, gbc);
    }
}
