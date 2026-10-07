package com.jobmatch.admin.data;

import com.jobmatch.admin.models.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AppState {
    private static AppState instance;

    public interface StateChangeListener {
        void onStateChanged();
    }

    private final List<StateChangeListener> listeners = new ArrayList<>();

    private String currentAdminName = "Alice Walker";
    private AdminProfile AdminProfile;
    private List<Job> jobs;
    private List<ApplicationItem> applications;
    private List<Company> companies;
    private List<Review> reviews;
    private List<Offer> offers;
    private List<CodingChallenge> codingChallenges;
    private ResumeData resumeData;
    private List<String> notifications;

    private AppState() {
        initInitialData();
    }

    public static synchronized AppState getInstance() {
        if (instance == null) {
            instance = new AppState();
        }
        return instance;
    }

    private void initInitialData() {
        AdminProfile = new AdminProfile(
            "Alice Walker",
            "Computer Science",
            "4",
            "8.9",
            new ArrayList<>(Arrays.asList("React", "Java", "Python", "SQL")),
            "resume_final.pdf"
        );

        jobs = new ArrayList<>();
        jobs.add(new Job(1, "Senior Frontend Engineer", "TechNova", "$120k - $160k", "Full-time", "2 hours ago", "Looking for a React and UI performance expert."));
        jobs.add(new Job(2, "Backend Architect", "CyberSafe", "$140k - $180k", "Contract", "5 hours ago", "Expertise in Java Spring Boot and cloud microservices required."));
        jobs.add(new Job(3, "Product Designer", "CreativeMinds", "$90k - $130k", "Full-time", "1 day ago", "Design UI/UX for next generation financial software."));
        jobs.add(new Job(4, "Data Engineer", "Goldman Sachs", "$130k - $170k", "Full-time", "2 days ago", "Scale data pipelines using Spark, SQL, and Python."));

        applications = new ArrayList<>();
        applications.add(new ApplicationItem(1, 1, currentAdminName, "Senior Frontend Engineer", "TechNova", "2026-04-20", "Pending"));
        applications.add(new ApplicationItem(2, 3, currentAdminName, "Product Designer", "CreativeMinds", "2026-04-18", "Accepted"));

        companies = new ArrayList<>();
        companies.add(new Company(1, "TechNova", "Software", 12, "Verified", 4.5, 12));
        companies.add(new Company(2, "Goldman Sachs", "Finance", 8, "Verified", 4.2, 8));
        companies.add(new Company(3, "LuxeCorp", "Luxury Goods", 5, "Pending", 3.9, 5));
        companies.add(new Company(4, "CyberSafe", "Cybersecurity", 3, "Verified", 5.0, 3));
        companies.add(new Company(5, "CreativeMinds", "Digital Agency", 7, "Verified", 4.0, 7));

        reviews = new ArrayList<>();
        reviews.add(new Review(1, "TechNova", "Great Work Culture", 5, "TechNova has an amazing environment for learning and growth. The mentorship program is top-notch.", "Alice Walker"));
        reviews.add(new Review(2, "TechNova", "Good Benefits", 4, "Decent salary and great health benefits. High pressure sometimes.", "Bob Smith"));
        reviews.add(new Review(3, "Goldman Sachs", "Elite Experience", 4, "Hard work but very rewarding. You get to work on high-stakes projects.", "Charlie Brown"));

        offers = new ArrayList<>();
        offers.add(new Offer(1, "TechNova", "Senior Frontend Engineer", "$130k", "2026-04-15", "Pending"));
        offers.add(new Offer(2, "CyberSafe", "Security Analyst", "$110k", "2026-04-12", "Pending"));

        codingChallenges = new ArrayList<>();
        codingChallenges.add(new CodingChallenge("Two Sum", "Easy", "48.5%"));
        codingChallenges.add(new CodingChallenge("Reverse a Linked List", "Easy", "72.1%"));
        codingChallenges.add(new CodingChallenge("Validate Binary Search Tree", "Medium", "35.9%"));

        resumeData = new ResumeData();

        notifications = new ArrayList<>();
        notifications.add("Welcome to JOB MATCH! Complete your profile to get better matches.");
        notifications.add("Your application for TechNova was received.");
    }

    public void addListener(StateChangeListener listener) {
        listeners.add(listener);
    }

    public void notifyListeners() {
        for (StateChangeListener l : listeners) {
            l.onStateChanged();
        }
    }

    // Actions
    public void applyToJob(Job job) {
        for (ApplicationItem app : applications) {
            if (app.getJobId() == job.getId()) {
                return; // Already applied
            }
        }
        int newId = applications.size() + 1;
        ApplicationItem newApp = new ApplicationItem(
            newId,
            job.getId(),
            currentAdminName,
            job.getTitle(),
            job.getCompany(),
            LocalDate.now().toString(),
            "Pending"
        );
        applications.add(0, newApp);
        notifications.add(0, "Application submitted for position: " + job.getTitle() + " at " + job.getCompany());
        notifyListeners();
    }

    public void updateOfferStatus(int offerId, String newStatus) {
        for (Offer offer : offers) {
            if (offer.getId() == offerId) {
                offer.setStatus(newStatus);
                notifications.add(0, "Offer from " + offer.getCompany() + " " + newStatus.toLowerCase() + ".");
                break;
            }
        }
        notifyListeners();
    }

    public void updateAdminProfile(String branch, String year, String cgpa) {
        AdminProfile.setBranch(branch);
        AdminProfile.setYear(year);
        AdminProfile.setCgpa(cgpa);
        notifications.add(0, "Profile updated successfully.");
        notifyListeners();
    }

    // Getters
    public String getCurrentAdminName() { return currentAdminName; }
    public AdminProfile getAdminProfile() { return AdminProfile; }
    public List<Job> getJobs() { return jobs; }
    public List<ApplicationItem> getApplications() { return applications; }
    public List<Company> getCompanies() { return companies; }
    public List<Review> getReviews() { return reviews; }
    public List<Offer> getOffers() { return offers; }
    public List<CodingChallenge> getCodingChallenges() { return codingChallenges; }
    public ResumeData getResumeData() { return resumeData; }
    public List<String> getNotifications() { return notifications; }
}
