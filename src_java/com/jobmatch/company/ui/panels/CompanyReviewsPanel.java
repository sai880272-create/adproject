package com.jobmatch.company.ui.panels;

import com.jobmatch.company.data.AppState;
import com.jobmatch.company.models.Company;
import com.jobmatch.company.models.Review;
import com.jobmatch.company.ui.Theme;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;
import java.util.stream.Collectors;

public class CompanyReviewsPanel extends JPanel implements AppState.StateChangeListener {

    private final CardLayout cardLayout = new CardLayout();
    private final JPanel cardsPanel = new JPanel(cardLayout);

    // List View
    private JTable companyTable;
    private DefaultTableModel tableModel;

    // Detail View
    private JLabel detailTitleLabel;
    private JPanel reviewsContainer;

    public CompanyReviewsPanel() {
        setBackground(Theme.BG_DARK);
        setLayout(new BorderLayout());
        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        AppState.getInstance().addListener(this);

        initUI();
    }

    private void initUI() {
        cardsPanel.setBackground(Theme.BG_DARK);

        // 1. All Companies Panel
        JPanel allCompaniesPanel = new JPanel(new BorderLayout(0, 15));
        allCompaniesPanel.setBackground(Theme.BG_DARK);

        JPanel header = new JPanel();
        header.setLayout(new BoxLayout(header, BoxLayout.Y_AXIS));
        header.setBackground(Theme.BG_DARK);

        JLabel title = new JLabel("Browse Company Reviews");
        title.setFont(Theme.FONT_HEADER);
        title.setForeground(Theme.TEXT_WHITE);

        JLabel sub = new JLabel("Read reviews from fellow Companys to learn about company culture and interview experiences.");
        sub.setFont(Theme.FONT_REGULAR);
        sub.setForeground(Theme.TEXT_MUTED);

        header.add(title);
        header.add(Box.createRigidArea(new Dimension(0, 5)));
        header.add(sub);

        allCompaniesPanel.add(header, BorderLayout.NORTH);

        String[] cols = {"Company", "Industry", "Rating", "Review Count", "Action"};
        tableModel = new DefaultTableModel(cols, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        companyTable = new JTable(tableModel);
        Theme.styleTable(companyTable);

        JScrollPane tableScroll = new JScrollPane(companyTable);
        tableScroll.setBorder(BorderFactory.createLineBorder(Theme.BORDER_COLOR, 1));
        allCompaniesPanel.add(tableScroll, BorderLayout.CENTER);

        JPanel bottomP = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        bottomP.setBackground(Theme.BG_DARK);
        JButton viewSelectedBtn = Theme.createGoldButton("View Reviews for Selected Company");
        viewSelectedBtn.addActionListener(e -> {
            int selectedRow = companyTable.getSelectedRow();
            if (selectedRow != -1) {
                String compName = (String) tableModel.getValueAt(selectedRow, 0);
                showCompanyReviews(compName);
            } else {
                JOptionPane.showMessageDialog(this, "Please select a company row first.", "Select Company", JOptionPane.WARNING_MESSAGE);
            }
        });
        bottomP.add(viewSelectedBtn);
        allCompaniesPanel.add(bottomP, BorderLayout.SOUTH);

        // 2. Detail Reviews Panel
        JPanel detailPanel = new JPanel(new BorderLayout(0, 15));
        detailPanel.setBackground(Theme.BG_DARK);

        JPanel detailHeader = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
        detailHeader.setBackground(Theme.BG_DARK);

        JButton backBtn = Theme.createOutlineButton("← Back to All Reviews");
        backBtn.addActionListener(e -> cardLayout.show(cardsPanel, "ALL"));

        detailTitleLabel = new JLabel("Reviews for Company");
        detailTitleLabel.setFont(Theme.FONT_HEADER);
        detailTitleLabel.setForeground(Theme.TEXT_WHITE);
        detailTitleLabel.setBorder(BorderFactory.createEmptyBorder(0, 20, 0, 0));

        detailHeader.add(backBtn);
        detailHeader.add(detailTitleLabel);

        detailPanel.add(detailHeader, BorderLayout.NORTH);

        reviewsContainer = new JPanel();
        reviewsContainer.setLayout(new BoxLayout(reviewsContainer, BoxLayout.Y_AXIS));
        reviewsContainer.setBackground(Theme.BG_DARK);

        JScrollPane detailScroll = new JScrollPane(reviewsContainer);
        detailScroll.setBorder(null);
        detailScroll.getVerticalScrollBar().setUnitIncrement(16);
        detailPanel.add(detailScroll, BorderLayout.CENTER);

        cardsPanel.add(allCompaniesPanel, "ALL");
        cardsPanel.add(detailPanel, "DETAIL");

        add(cardsPanel, BorderLayout.CENTER);

        updateCompanyTable();
    }

    private void updateCompanyTable() {
        tableModel.setRowCount(0);
        List<Company> companies = AppState.getInstance().getCompanies();
        for (Company comp : companies) {
            tableModel.addRow(new Object[]{
                comp.getName(),
                comp.getIndustry(),
                comp.getRating() + " / 5.0 ⭐",
                comp.getReviewCount() + " reviews",
                "View"
            });
        }
    }

    private void showCompanyReviews(String companyName) {
        detailTitleLabel.setText("Reviews for " + companyName);
        reviewsContainer.removeAll();

        List<Review> filtered = AppState.getInstance().getReviews().stream()
                .filter(r -> r.getCompany().equalsIgnoreCase(companyName))
                .collect(Collectors.toList());

        if (filtered.isEmpty()) {
            JPanel card = Theme.createCardPanel();
            card.add(new JLabel("No reviews found for " + companyName + " yet."));
            reviewsContainer.add(card);
        } else {
            for (Review r : filtered) {
                JPanel card = Theme.createCardPanel();
                card.setLayout(new BorderLayout(10, 10));
                card.setMaximumSize(new Dimension(2000, 140));
                card.setAlignmentX(Component.LEFT_ALIGNMENT);

                JLabel tLabel = new JLabel(r.getTitle() + " (" + r.getRating() + "/5 ⭐)");
                tLabel.setFont(Theme.FONT_SUBHEADER);
                tLabel.setForeground(Theme.GOLD);

                JTextArea commentArea = new JTextArea("\"" + r.getComment() + "\"");
                commentArea.setFont(Theme.FONT_REGULAR);
                commentArea.setForeground(Theme.TEXT_WHITE);
                commentArea.setBackground(Theme.PANEL_BG);
                commentArea.setEditable(false);
                commentArea.setLineWrap(true);
                commentArea.setWrapStyleWord(true);

                JLabel authorLabel = new JLabel("- " + r.getAuthor(), SwingConstants.RIGHT);
                authorLabel.setFont(Theme.FONT_SMALL);
                authorLabel.setForeground(Theme.TEXT_MUTED);

                card.add(tLabel, BorderLayout.NORTH);
                card.add(commentArea, BorderLayout.CENTER);
                card.add(authorLabel, BorderLayout.SOUTH);

                reviewsContainer.add(card);
                reviewsContainer.add(Box.createRigidArea(new Dimension(0, 15)));
            }
        }

        reviewsContainer.revalidate();
        reviewsContainer.repaint();
        cardLayout.show(cardsPanel, "DETAIL");
    }

    @Override
    public void onStateChanged() {
        updateCompanyTable();
    }
}
