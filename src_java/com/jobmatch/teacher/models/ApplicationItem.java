package com.jobmatch.teacher.models;

public class ApplicationItem {
    private int id;
    private int jobId;
    private String TeacherName;
    private String jobTitle;
    private String company;
    private String date;
    private String status;

    public ApplicationItem(int id, int jobId, String TeacherName, String jobTitle, String company, String date, String status) {
        this.id = id;
        this.jobId = jobId;
        this.TeacherName = TeacherName;
        this.jobTitle = jobTitle;
        this.company = company;
        this.date = date;
        this.status = status;
    }

    public int getId() { return id; }
    public int getJobId() { return jobId; }
    public String getTeacherName() { return TeacherName; }
    public String getJobTitle() { return jobTitle; }
    public String getCompany() { return company; }
    public String getDate() { return date; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
