package com.jobmatch.teacher.models;

import java.util.ArrayList;
import java.util.List;

public class ResumeData {
    private String name;
    private String title;
    private String email;
    private String phone;
    private String website;
    private String linkedin;
    private String summary;
    private List<String> skills;
    private List<ExperienceItem> experience;
    private List<EducationItem> education;

    public static class ExperienceItem {
        public String company;
        public String role;
        public String dates;
        public String desc;

        public ExperienceItem(String company, String role, String dates, String desc) {
            this.company = company;
            this.role = role;
            this.dates = dates;
            this.desc = desc;
        }
    }

    public static class EducationItem {
        public String school;
        public String degree;
        public String dates;

        public EducationItem(String school, String degree, String dates) {
            this.school = school;
            this.degree = degree;
            this.dates = dates;
        }
    }

    public ResumeData() {
        this.name = "Alice Walker";
        this.title = "Software Engineer";
        this.email = "alice.walker@university.edu";
        this.phone = "+1 234 567 890";
        this.website = "yourportfolio.com";
        this.linkedin = "linkedin.com/in/alicewalker";
        this.summary = "Highly motivated Teacher with a strong foundation in computer science and a passion for building innovative solutions. Seeking to leverage my technical skills and academic background to contribute to a dynamic engineering team.";
        
        this.skills = new ArrayList<>(List.of("React", "JavaScript", "Java", "Python", "SQL"));
        
        this.experience = new ArrayList<>();
        this.experience.add(new ExperienceItem(
            "Tech Solutions Inc.",
            "Software Engineer Intern",
            "Jun 2023 - Aug 2023",
            "• Developed and maintained frontend components using React.\n• Assisted in optimizing API response times by 15%.\n• Collaborated with senior engineers on system architecture."
        ));
        
        this.education = new ArrayList<>();
        this.education.add(new EducationItem(
            "University of Excellence",
            "B.S. in Computer Science",
            "2020 - 2024"
        ));
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public List<ExperienceItem> getExperience() { return experience; }
    public void setExperience(List<ExperienceItem> experience) { this.experience = experience; }

    public List<EducationItem> getEducation() { return education; }
    public void setEducation(List<EducationItem> education) { this.education = education; }
}
