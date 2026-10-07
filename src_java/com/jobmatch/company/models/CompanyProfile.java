package com.jobmatch.company.models;

import java.util.ArrayList;
import java.util.List;

public class CompanyProfile {
    private String name;
    private String branch;
    private String year;
    private String cgpa;
    private List<String> skills;
    private String resumeFileName;

    public CompanyProfile(String name, String branch, String year, String cgpa, List<String> skills, String resumeFileName) {
        this.name = name;
        this.branch = branch;
        this.year = year;
        this.cgpa = cgpa;
        this.skills = skills != null ? skills : new ArrayList<>();
        this.resumeFileName = resumeFileName;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getCgpa() { return cgpa; }
    public void setCgpa(String cgpa) { this.cgpa = cgpa; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public String getResumeFileName() { return resumeFileName; }
    public void setResumeFileName(String resumeFileName) { this.resumeFileName = resumeFileName; }
}
