package com.jobmatch.admin.models;

public class Review {
    private int id;
    private String company;
    private String title;
    private int rating;
    private String comment;
    private String author;

    public Review(int id, String company, String title, int rating, String comment, String author) {
        this.id = id;
        this.company = company;
        this.title = title;
        this.rating = rating;
        this.comment = comment;
        this.author = author;
    }

    public int getId() { return id; }
    public String getCompany() { return company; }
    public String getTitle() { return title; }
    public int getRating() { return rating; }
    public String getComment() { return comment; }
    public String getAuthor() { return author; }
}
