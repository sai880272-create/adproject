package com.jobmatch.company.models;

public class Company {
    private int id;
    private String name;
    private String industry;
    private int jobsCount;
    private String status;
    private double rating;
    private int reviewCount;

    public Company(int id, String name, String industry, int jobsCount, String status, double rating, int reviewCount) {
        this.id = id;
        this.name = name;
        this.industry = industry;
        this.jobsCount = jobsCount;
        this.status = status;
        this.rating = rating;
        this.reviewCount = reviewCount;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getIndustry() { return industry; }
    public int getJobsCount() { return jobsCount; }
    public String getStatus() { return status; }
    public double getRating() { return rating; }
    public int getReviewCount() { return reviewCount; }
}
