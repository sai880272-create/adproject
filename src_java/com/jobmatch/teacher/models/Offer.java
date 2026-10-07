package com.jobmatch.teacher.models;

public class Offer {
    private int id;
    private String company;
    private String title;
    private String salary;
    private String date;
    private String status;

    public Offer(int id, String company, String title, String salary, String date, String status) {
        this.id = id;
        this.company = company;
        this.title = title;
        this.salary = salary;
        this.date = date;
        this.status = status;
    }

    public int getId() { return id; }
    public String getCompany() { return company; }
    public String getTitle() { return title; }
    public String getSalary() { return salary; }
    public String getDate() { return date; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
