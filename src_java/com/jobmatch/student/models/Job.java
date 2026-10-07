package com.jobmatch.student.models;

public class Job {
    private int id;
    private String title;
    private String company;
    private String salary;
    private String type;
    private String posted;
    private String description;

    public Job(int id, String title, String company, String salary, String type, String posted, String description) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.salary = salary;
        this.type = type;
        this.posted = posted;
        this.description = description;
    }

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getSalary() { return salary; }
    public String getType() { return type; }
    public String getPosted() { return posted; }
    public String getDescription() { return description; }
}
