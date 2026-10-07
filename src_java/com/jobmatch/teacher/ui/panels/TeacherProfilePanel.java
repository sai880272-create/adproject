package com.jobmatch.teacher.ui.panels;

import com.jobmatch.teacher.data.AppState;
import com.jobmatch.teacher.models.TeacherProfile;
import com.jobmatch.teacher.ui.Theme;

import javax.swing.*;
import java.awt.*;
import java.io.File;

public class TeacherProfilePanel extends JPanel implements AppState.StateChangeListener {

    private JTextField branchField;
    private JComboBox<String> yearCombo;
    private JTextField cgpaField;
    private JLabel resumeLabel;

    public TeacherProfilePanel() {
        setBackground(Theme.BG_DARK);
        setLayout(new BorderLayout(0, 20));
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        AppState.getInstance().addListener(this);

        initUI();
    }

    private void initUI() {
        JPanel container = new JPanel();
        container.setLayout(new BoxLayout(container, BoxLayout.Y_AXIS));
        container.setBackground(Theme.BG_DARK);

        JLabel titleLabel = new JLabel("Academic Profile");
        titleLabel.setFont(Theme.FONT_HEADER);
        titleLabel.setForeground(Theme.TEXT_WHITE);

        JLabel subLabel = new JLabel("Keep your academic details up to date for better job matching.");
        subLabel.setFont(Theme.FONT_REGULAR);
        subLabel.setForeground(Theme.TEXT_MUTED);

        container.add(titleLabel);
        container.add(Box.createRigidArea(new Dimension(0, 5)));
        container.add(subLabel);
        container.add(Box.createRigidArea(new Dimension(0, 20)));

        // Form Card
        JPanel card = Theme.createCardPanel();
        card.setLayout(new GridBagLayout());
        card.setMaximumSize(new Dimension(800, 450));
        card.setAlignmentX(Component.LEFT_ALIGNMENT);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 1.0;

        TeacherProfile profile = AppState.getInstance().getTeacherProfile();

        // Row 1: Branch
        gbc.gridx = 0; gbc.gridy = 0;
        JLabel l1 = new JLabel("Branch / Major");
        l1.setFont(Theme.FONT_BOLD);
        l1.setForeground(Theme.TEXT_WHITE);
        card.add(l1, gbc);

        gbc.gridx = 1; gbc.gridy = 0;
        branchField = Theme.createTextField(profile.getBranch());
        card.add(branchField, gbc);

        // Row 2: Year
        gbc.gridx = 0; gbc.gridy = 1;
        JLabel l2 = new JLabel("Current Year");
        l2.setFont(Theme.FONT_BOLD);
        l2.setForeground(Theme.TEXT_WHITE);
        card.add(l2, gbc);

        gbc.gridx = 1; gbc.gridy = 1;
        yearCombo = Theme.createComboBox(new String[]{"1st Year", "2nd Year", "3rd Year", "4th Year"});
        if (profile.getYear() != null && profile.getYear().matches("\\d+")) {
            int yr = Integer.parseInt(profile.getYear()) - 1;
            if (yr >= 0 && yr < 4) yearCombo.setSelectedIndex(yr);
        }
        card.add(yearCombo, gbc);

        // Row 3: CGPA
        gbc.gridx = 0; gbc.gridy = 2;
        JLabel l3 = new JLabel("CGPA");
        l3.setFont(Theme.FONT_BOLD);
        l3.setForeground(Theme.TEXT_WHITE);
        card.add(l3, gbc);

        gbc.gridx = 1; gbc.gridy = 2;
        cgpaField = Theme.createTextField(profile.getCgpa());
        card.add(cgpaField, gbc);

        // Row 4: Resume
        gbc.gridx = 0; gbc.gridy = 3;
        JLabel l4 = new JLabel("Current Resume");
        l4.setFont(Theme.FONT_BOLD);
        l4.setForeground(Theme.TEXT_WHITE);
        card.add(l4, gbc);

        gbc.gridx = 1; gbc.gridy = 3;
        JPanel resumeBox = new JPanel(new BorderLayout(10, 0));
        resumeBox.setBackground(Theme.BG_DARK);
        resumeBox.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(Theme.BORDER_COLOR, 1),
            BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));

        resumeLabel = new JLabel(profile.getResumeFileName());
        resumeLabel.setFont(Theme.FONT_REGULAR);
        resumeLabel.setForeground(Theme.GOLD);

        JButton changeResumeBtn = Theme.createOutlineButton("Change File");
        changeResumeBtn.setFont(Theme.FONT_SMALL);
        changeResumeBtn.addActionListener(e -> chooseResumeFile());

        resumeBox.add(resumeLabel, BorderLayout.CENTER);
        resumeBox.add(changeResumeBtn, BorderLayout.EAST);
        card.add(resumeBox, gbc);

        // Row 5: Save Button
        gbc.gridx = 0; gbc.gridy = 4; gbc.gridwidth = 2;
        gbc.insets = new Insets(20, 10, 10, 10);
        JButton saveBtn = Theme.createGoldButton("Save Profile Changes");
        saveBtn.addActionListener(e -> handleSave());
        card.add(saveBtn, gbc);

        container.add(card);

        JScrollPane scrollPane = new JScrollPane(container);
        scrollPane.setBorder(null);
        add(scrollPane, BorderLayout.CENTER);
    }

    private void chooseResumeFile() {
        JFileChooser fc = new JFileChooser();
        int returnVal = fc.showOpenDialog(this);
        if (returnVal == JFileChooser.APPROVE_OPTION) {
            File selectedFile = fc.getSelectedFile();
            AppState.getInstance().getTeacherProfile().setResumeFileName(selectedFile.getName());
            resumeLabel.setText(selectedFile.getName());
        }
    }

    private void handleSave() {
        String branch = branchField.getText().trim();
        String yearStr = String.valueOf(yearCombo.getSelectedIndex() + 1);
        String cgpa = cgpaField.getText().trim();

        AppState.getInstance().updateTeacherProfile(branch, yearStr, cgpa);
        JOptionPane.showMessageDialog(this, "Profile updated successfully.", "Success", JOptionPane.INFORMATION_MESSAGE);
    }

    @Override
    public void onStateChanged() {
        TeacherProfile p = AppState.getInstance().getTeacherProfile();
        branchField.setText(p.getBranch());
        cgpaField.setText(p.getCgpa());
        resumeLabel.setText(p.getResumeFileName());
    }
}
