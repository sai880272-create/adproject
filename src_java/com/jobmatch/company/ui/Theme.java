package com.jobmatch.company.ui;

import javax.swing.*;
import javax.swing.border.Border;
import javax.swing.border.CompoundBorder;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.JTableHeader;
import java.awt.*;

public class Theme {
    // Palette
    public static final Color BG_DARK = new Color(11, 17, 32);       // #0B1120 Deep Dark Navy
    public static final Color PANEL_BG = new Color(30, 41, 59);      // #1E293B Card Background
    public static final Color PANEL_LIGHT = new Color(45, 59, 81);   // Lighter card panel
    public static final Color GOLD = new Color(212, 175, 55);        // #D4AF37 Gold Accent
    public static final Color GOLD_HOVER = new Color(230, 195, 75);  
    public static final Color TEXT_WHITE = new Color(248, 250, 252);  // #F8FAFC Primary Text
    public static final Color TEXT_MUTED = new Color(148, 163, 184);  // #94A3B8 Muted Text
    public static final Color BORDER_COLOR = new Color(51, 65, 85);   // #334155 Border
    public static final Color SUCCESS = new Color(34, 197, 94);       // #22C55E Green
    public static final Color DANGER = new Color(239, 68, 68);        // #EF4444 Red

    // Fonts
    public static final Font FONT_HEADER = new Font("Segoe UI", Font.BOLD, 22);
    public static final Font FONT_SUBHEADER = new Font("Segoe UI", Font.BOLD, 16);
    public static final Font FONT_BOLD = new Font("Segoe UI", Font.BOLD, 13);
    public static final Font FONT_REGULAR = new Font("Segoe UI", Font.PLAIN, 13);
    public static final Font FONT_SMALL = new Font("Segoe UI", Font.PLAIN, 11);

    public static JPanel createCardPanel() {
        JPanel panel = new JPanel();
        panel.setBackground(PANEL_BG);
        panel.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(BORDER_COLOR, 1),
            BorderFactory.createEmptyBorder(18, 18, 18, 18)
        ));
        return panel;
    }

    public static JButton createGoldButton(String text) {
        JButton button = new JButton(text);
        button.setFont(FONT_BOLD);
        button.setForeground(Color.BLACK);
        button.setBackground(GOLD);
        button.setFocusPainted(false);
        button.setBorder(BorderFactory.createEmptyBorder(10, 18, 10, 18));
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));
        button.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                button.setBackground(GOLD_HOVER);
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                button.setBackground(GOLD);
            }
        });
        return button;
    }

    public static JButton createOutlineButton(String text) {
        JButton button = new JButton(text);
        button.setFont(FONT_BOLD);
        button.setForeground(TEXT_WHITE);
        button.setBackground(PANEL_LIGHT);
        button.setFocusPainted(false);
        button.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(BORDER_COLOR, 1),
            BorderFactory.createEmptyBorder(9, 16, 9, 16)
        ));
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));
        return button;
    }

    public static JButton createDangerButton(String text) {
        JButton button = new JButton(text);
        button.setFont(FONT_BOLD);
        button.setForeground(Color.WHITE);
        button.setBackground(DANGER);
        button.setFocusPainted(false);
        button.setBorder(BorderFactory.createEmptyBorder(8, 14, 8, 14));
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));
        return button;
    }

    public static JTextField createTextField(String text) {
        JTextField tf = new JTextField(text);
        tf.setFont(FONT_REGULAR);
        tf.setForeground(TEXT_WHITE);
        tf.setBackground(BG_DARK);
        tf.setCaretColor(GOLD);
        tf.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(BORDER_COLOR, 1),
            BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));
        return tf;
    }

    public static JTextArea createTextArea(String text, int rows) {
        JTextArea ta = new JTextArea(text, rows, 20);
        ta.setFont(FONT_REGULAR);
        ta.setForeground(TEXT_WHITE);
        ta.setBackground(BG_DARK);
        ta.setCaretColor(GOLD);
        ta.setLineWrap(true);
        ta.setWrapStyleWord(true);
        ta.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(BORDER_COLOR, 1),
            BorderFactory.createEmptyBorder(8, 10, 8, 10)
        ));
        return ta;
    }

    public static JComboBox<String> createComboBox(String[] items) {
        JComboBox<String> cb = new JComboBox<>(items);
        cb.setFont(FONT_REGULAR);
        cb.setForeground(TEXT_WHITE);
        cb.setBackground(BG_DARK);
        cb.setBorder(BorderFactory.createLineBorder(BORDER_COLOR, 1));
        return cb;
    }

    public static void styleTable(JTable table) {
        table.setBackground(PANEL_BG);
        table.setForeground(TEXT_WHITE);
        table.setGridColor(BORDER_COLOR);
        table.setFont(FONT_REGULAR);
        table.setRowHeight(36);
        table.setSelectionBackground(PANEL_LIGHT);
        table.setSelectionForeground(GOLD);

        JTableHeader header = table.getTableHeader();
        header.setBackground(BG_DARK);
        header.setForeground(GOLD);
        header.setFont(FONT_BOLD);
        header.setPreferredSize(new Dimension(header.getWidth(), 36));

        DefaultTableCellRenderer centerRenderer = new DefaultTableCellRenderer();
        centerRenderer.setHorizontalAlignment(JLabel.LEFT);
        centerRenderer.setBackground(PANEL_BG);
        centerRenderer.setForeground(TEXT_WHITE);
        table.setDefaultRenderer(Object.class, centerRenderer);
    }

    public static JLabel createBadge(String text, Color bg, Color fg) {
        JLabel badge = new JLabel(text, SwingConstants.CENTER);
        badge.setFont(FONT_SMALL);
        badge.setOpaque(true);
        badge.setBackground(bg);
        badge.setForeground(fg);
        badge.setBorder(BorderFactory.createEmptyBorder(4, 10, 4, 10));
        return badge;
    }
}
