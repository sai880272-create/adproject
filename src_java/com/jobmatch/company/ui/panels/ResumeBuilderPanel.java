package com.jobmatch.company.ui.panels;

import com.jobmatch.company.data.AppState;
import com.jobmatch.company.models.ResumeData;
import com.jobmatch.company.ui.Theme;

import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;

public class ResumeBuilderPanel extends JPanel {

    private final JTextField nameField;
    private final JTextField titleField;
    private final JTextField emailField;
    private final JTextField phoneField;
    private final JTextField websiteField;
    private final JTextField linkedinField;
    private final JTextArea summaryArea;
    private final JTextField skillsField;

    private final JTextArea previewArea;

    public ResumeBuilderPanel() {
        setBackground(Theme.BG_DARK);
        setLayout(new BorderLayout(0, 15));
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        ResumeData data = AppState.getInstance().getResumeData();

        nameField = Theme.createTextField(data.getName());
        titleField = Theme.createTextField(data.getTitle());
        emailField = Theme.createTextField(data.getEmail());
        phoneField = Theme.createTextField(data.getPhone());
        websiteField = Theme.createTextField(data.getWebsite());
        linkedinField = Theme.createTextField(data.getLinkedin());
        summaryArea = Theme.createTextArea(data.getSummary(), 3);
        skillsField = Theme.createTextField(String.join(", ", data.getSkills()));

        previewArea = new JTextArea();
        previewArea.setFont(new Font("Monospaced", Font.PLAIN, 12));
        previewArea.setForeground(Color.BLACK);
        previewArea.setBackground(Color.WHITE);
        previewArea.setEditable(false);
        previewArea.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        initUI();
    }

    private void initUI() {
        // Top Action Bar
        JPanel topBar = new JPanel(new BorderLayout());
        topBar.setBackground(Theme.BG_DARK);

        JPanel titleP = new JPanel();
        titleP.setLayout(new BoxLayout(titleP, BoxLayout.Y_AXIS));
        titleP.setBackground(Theme.BG_DARK);

        JLabel title = new JLabel("Build Your Modern Resume");
        title.setFont(Theme.FONT_HEADER);
        title.setForeground(Theme.TEXT_WHITE);

        JLabel sub = new JLabel("Fill in your details below. The preview updates live as you type.");
        sub.setFont(Theme.FONT_REGULAR);
        sub.setForeground(Theme.TEXT_MUTED);

        titleP.add(title);
        titleP.add(sub);

        JButton downloadBtn = Theme.createGoldButton("📥 Export Resume (.txt/.pdf)");
        downloadBtn.addActionListener(e -> exportResume());

        topBar.add(titleP, BorderLayout.CENTER);
        topBar.add(downloadBtn, BorderLayout.EAST);

        add(topBar, BorderLayout.NORTH);

        // Split Pane (Form on Left, Live Preview on Right)
        JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
        splitPane.setDividerLocation(520);
        splitPane.setBackground(Theme.BG_DARK);
        splitPane.setBorder(null);

        // FORM SIDE
        JPanel formContainer = new JPanel();
        formContainer.setLayout(new BoxLayout(formContainer, BoxLayout.Y_AXIS));
        formContainer.setBackground(Theme.BG_DARK);

        JPanel card = Theme.createCardPanel();
        card.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(6, 6, 6, 6);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 1.0;

        int row = 0;
        addFormRow(card, gbc, row++, "Full Name", nameField);
        addFormRow(card, gbc, row++, "Professional Title", titleField);
        addFormRow(card, gbc, row++, "Email", emailField);
        addFormRow(card, gbc, row++, "Phone", phoneField);
        addFormRow(card, gbc, row++, "Website", websiteField);
        addFormRow(card, gbc, row++, "LinkedIn", linkedinField);

        gbc.gridx = 0; gbc.gridy = row++;
        JLabel sLabel = new JLabel("Summary");
        sLabel.setFont(Theme.FONT_BOLD);
        sLabel.setForeground(Theme.TEXT_WHITE);
        card.add(sLabel, gbc);

        gbc.gridx = 1;
        card.add(new JScrollPane(summaryArea), gbc);

        addFormRow(card, gbc, row++, "Key Skills (comma separated)", skillsField);

        formContainer.add(card);

        // Add Change listeners for Live Preview
        javax.swing.event.DocumentListener docListener = new javax.swing.event.DocumentListener() {
            public void insertUpdate(javax.swing.event.DocumentEvent e) { updatePreview(); }
            public void removeUpdate(javax.swing.event.DocumentEvent e) { updatePreview(); }
            public void changedUpdate(javax.swing.event.DocumentEvent e) { updatePreview(); }
        };

        nameField.getDocument().addDocumentListener(docListener);
        titleField.getDocument().addDocumentListener(docListener);
        emailField.getDocument().addDocumentListener(docListener);
        phoneField.getDocument().addDocumentListener(docListener);
        websiteField.getDocument().addDocumentListener(docListener);
        linkedinField.getDocument().addDocumentListener(docListener);
        summaryArea.getDocument().addDocumentListener(docListener);
        skillsField.getDocument().addDocumentListener(docListener);

        JScrollPane formScroll = new JScrollPane(formContainer);
        formScroll.setBorder(null);

        // PREVIEW SIDE
        JScrollPane previewScroll = new JScrollPane(previewArea);
        previewScroll.setBorder(BorderFactory.createTitledBorder(
            BorderFactory.createLineBorder(Theme.GOLD, 1),
            "Live Preview",
            0, 0, Theme.FONT_BOLD, Theme.GOLD
        ));

        splitPane.setLeftComponent(formScroll);
        splitPane.setRightComponent(previewScroll);

        add(splitPane, BorderLayout.CENTER);

        updatePreview();
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

    private String generateResumeContent() {
        StringBuilder sb = new StringBuilder();
        sb.append("=================================================================\n");
        sb.append("                      ").append(nameField.getText().toUpperCase()).append("\n");
        sb.append("                      ").append(titleField.getText()).append("\n");
        sb.append("=================================================================\n");
        sb.append("Email: ").append(emailField.getText()).append(" | Phone: ").append(phoneField.getText()).append("\n");
        sb.append("Web: ").append(websiteField.getText()).append(" | LinkedIn: ").append(linkedinField.getText()).append("\n");
        sb.append("-----------------------------------------------------------------\n\n");
        sb.append("PROFESSIONAL SUMMARY\n");
        sb.append(summaryArea.getText()).append("\n\n");
        sb.append("-----------------------------------------------------------------\n");
        sb.append("TECHNICAL SKILLS\n");
        sb.append(skillsField.getText()).append("\n\n");
        sb.append("-----------------------------------------------------------------\n");
        sb.append("EXPERIENCE\n");
        sb.append("Tech Solutions Inc. - Software Engineer Intern (Jun 2023 - Aug 2023)\n");
        sb.append("• Developed and maintained frontend components using React & Java.\n");
        sb.append("• Assisted in optimizing API response times by 15%.\n\n");
        sb.append("-----------------------------------------------------------------\n");
        sb.append("EDUCATION\n");
        sb.append("University of Excellence - B.S. in Computer Science (2020 - 2024)\n");
        sb.append("=================================================================\n");
        return sb.toString();
    }

    private void updatePreview() {
        previewArea.setText(generateResumeContent());
        previewArea.setCaretPosition(0);
    }

    private void exportResume() {
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setSelectedFile(new File(nameField.getText().replaceAll(" ", "_") + "_Resume.txt"));
        int userSelection = fileChooser.showSaveDialog(this);
        if (userSelection == JFileChooser.APPROVE_OPTION) {
            File fileToSave = fileChooser.getSelectedFile();
            try (PrintWriter out = new PrintWriter(new FileWriter(fileToSave))) {
                out.print(generateResumeContent());
                JOptionPane.showMessageDialog(this, "Resume exported successfully to:\n" + fileToSave.getAbsolutePath(), "Export Complete", JOptionPane.INFORMATION_MESSAGE);
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Error exporting file: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }
}
