package com.jobmatch.student.ui.panels;

import com.jobmatch.student.data.AppState;
import com.jobmatch.student.models.ApplicationItem;
import com.jobmatch.student.ui.Theme;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class StudentApplicationsPanel extends JPanel implements AppState.StateChangeListener {

    private JTable table;
    private DefaultTableModel tableModel;

    public StudentApplicationsPanel() {
        setBackground(Theme.BG_DARK);
        setLayout(new BorderLayout(0, 20));
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        AppState.getInstance().addListener(this);

        initUI();
    }

    private void initUI() {
        JPanel headerPanel = new JPanel();
        headerPanel.setLayout(new BoxLayout(headerPanel, BoxLayout.Y_AXIS));
        headerPanel.setBackground(Theme.BG_DARK);

        JLabel titleLabel = new JLabel("My Applications");
        titleLabel.setFont(Theme.FONT_HEADER);
        titleLabel.setForeground(Theme.TEXT_WHITE);

        JLabel subLabel = new JLabel("Track the status of your recent placement applications.");
        subLabel.setFont(Theme.FONT_REGULAR);
        subLabel.setForeground(Theme.TEXT_MUTED);

        headerPanel.add(titleLabel);
        headerPanel.add(Box.createRigidArea(new Dimension(0, 5)));
        headerPanel.add(subLabel);

        add(headerPanel, BorderLayout.NORTH);

        // Table
        String[] columnNames = {"ID", "Position", "Company", "Applied Date", "Status"};
        tableModel = new DefaultTableModel(columnNames, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        table = new JTable(tableModel);
        Theme.styleTable(table);

        JScrollPane tableScroll = new JScrollPane(table);
        tableScroll.getViewport().setBackground(Theme.PANEL_BG);
        tableScroll.setBorder(BorderFactory.createLineBorder(Theme.BORDER_COLOR, 1));

        add(tableScroll, BorderLayout.CENTER);

        updateTable();
    }

    private void updateTable() {
        tableModel.setRowCount(0);
        List<ApplicationItem> apps = AppState.getInstance().getApplications();

        for (ApplicationItem app : apps) {
            tableModel.addRow(new Object[]{
                "#" + app.getId(),
                app.getJobTitle(),
                app.getCompany(),
                app.getDate(),
                app.getStatus()
            });
        }
    }

    @Override
    public void onStateChanged() {
        updateTable();
    }
}
