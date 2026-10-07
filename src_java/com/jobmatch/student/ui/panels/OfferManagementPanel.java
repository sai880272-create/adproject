package com.jobmatch.student.ui.panels;

import com.jobmatch.student.data.AppState;
import com.jobmatch.student.models.Offer;
import com.jobmatch.student.ui.Theme;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class OfferManagementPanel extends JPanel implements AppState.StateChangeListener {

    private JTable table;
    private DefaultTableModel model;

    public OfferManagementPanel() {
        setBackground(Theme.BG_DARK);
        setLayout(new BorderLayout(0, 20));
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        AppState.getInstance().addListener(this);

        initUI();
    }

    private void initUI() {
        JPanel headerP = new JPanel();
        headerP.setLayout(new BoxLayout(headerP, BoxLayout.Y_AXIS));
        headerP.setBackground(Theme.BG_DARK);

        JLabel title = new JLabel("Your Job Offers");
        title.setFont(Theme.FONT_HEADER);
        title.setForeground(Theme.TEXT_WHITE);

        JLabel sub = new JLabel("Manage all your job placement offers in one place. Congratulations on your success!");
        sub.setFont(Theme.FONT_REGULAR);
        sub.setForeground(Theme.TEXT_MUTED);

        headerP.add(title);
        headerP.add(Box.createRigidArea(new Dimension(0, 5)));
        headerP.add(sub);

        add(headerP, BorderLayout.NORTH);

        String[] cols = {"ID", "Company", "Position", "Salary", "Date Received", "Status"};
        model = new DefaultTableModel(cols, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        table = new JTable(model);
        Theme.styleTable(table);

        JScrollPane scrollPane = new JScrollPane(table);
        scrollPane.setBorder(BorderFactory.createLineBorder(Theme.BORDER_COLOR, 1));
        add(scrollPane, BorderLayout.CENTER);

        JPanel btnPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 15, 0));
        btnPanel.setBackground(Theme.BG_DARK);

        JButton acceptBtn = Theme.createGoldButton("Accept Selected Offer");
        acceptBtn.addActionListener(e -> handleAction("Accepted"));

        JButton declineBtn = Theme.createDangerButton("Decline Selected Offer");
        declineBtn.addActionListener(e -> handleAction("Declined"));

        btnPanel.add(acceptBtn);
        btnPanel.add(declineBtn);

        add(btnPanel, BorderLayout.SOUTH);

        updateTable();
    }

    private void handleAction(String actionStr) {
        int selectedRow = table.getSelectedRow();
        if (selectedRow != -1) {
            String idStr = (String) model.getValueAt(selectedRow, 0);
            int id = Integer.parseInt(idStr.replace("#", ""));
            String comp = (String) model.getValueAt(selectedRow, 1);

            AppState.getInstance().updateOfferStatus(id, actionStr);
            JOptionPane.showMessageDialog(this, "Offer from " + comp + " marked as " + actionStr + ".", "Offer Update", JOptionPane.INFORMATION_MESSAGE);
        } else {
            JOptionPane.showMessageDialog(this, "Please select an offer from the table first.", "Notice", JOptionPane.WARNING_MESSAGE);
        }
    }

    private void updateTable() {
        model.setRowCount(0);
        List<Offer> offers = AppState.getInstance().getOffers();
        for (Offer offer : offers) {
            model.addRow(new Object[]{
                "#" + offer.getId(),
                offer.getCompany(),
                offer.getTitle(),
                offer.getSalary(),
                offer.getDate(),
                offer.getStatus()
            });
        }
    }

    @Override
    public void onStateChanged() {
        updateTable();
    }
}
