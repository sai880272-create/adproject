import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [jobs, setJobs] = useState([
    { id: 1, title: "Senior Frontend Engineer", company: "TechNova", salary: "$120k - $160k", type: "Full-time", posted: "2 hours ago" },
    { id: 2, title: "Backend Architect", company: "CyberSafe", salary: "$140k - $180k", type: "Contract", posted: "5 hours ago" },
    { id: 3, title: "Product Designer", company: "CreativeMinds", salary: "$90k - $130k", type: "Full-time", posted: "1 day ago" }
  ]);
  const [applications, setApplications] = useState([
    { id: 1, jobId: 1, studentName: "Alice Walker", status: "Pending", date: "2026-04-20" },
    { id: 2, jobId: 3, studentName: "John Doe", status: "Accepted", date: "2026-04-18" }
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', text: 'Welcome to JOB MATCH! Complete your profile to get better matches.', read: false, time: '10 mins ago' },
    { id: 2, type: 'success', text: 'Your application for TechNova was received.', read: true, time: '2 hours ago' }
  ]);
  const [studentProfile, setStudentProfile] = useState({
    branch: "Computer Science",
    year: "4",
    cgpa: "8.9",
    skills: ["React", "JavaScript", "Python"],
    resume: "resume_final.pdf"
  });
  const [companies, setCompanies] = useState([
    { id: 1, name: "TechNova", industry: "Software", jobs: 12, status: "Verified", rating: 4.5, reviewCount: 12 },
    { id: 2, name: "Goldman Sachs", industry: "Finance", jobs: 8, status: "Verified", rating: 4.2, reviewCount: 8 },
    { id: 3, name: "LuxeCorp", industry: "Luxury Goods", jobs: 5, status: "Pending", rating: 3.9, reviewCount: 5 },
    { id: 4, name: "CyberSafe", industry: "Cybersecurity", jobs: 3, status: "Verified", rating: 5.0, reviewCount: 3 },
    { id: 5, name: "CreativeMinds", industry: "Digital Agency", jobs: 7, status: "Verified", rating: 4.0, reviewCount: 7 }
  ]);
  const [reviews, setReviews] = useState([
    { id: 1, company: "TechNova", title: "Great Work Culture", rating: 5, comment: "TechNova has an amazing environment for learning and growth. The mentorship program is top-notch.", author: "Alice Walker" },
    { id: 2, company: "TechNova", title: "Good Benefits", rating: 4, comment: "Decent salary and great health benefits. High pressure sometimes.", author: "Bob Smith" },
    { id: 3, company: "Goldman Sachs", title: "Elite Experience", rating: 4, comment: "Hard work but very rewarding. You get to work on high-stakes projects.", author: "Charlie Brown" }
  ]);
  const [offers, setOffers] = useState([
    { id: 1, company: "TechNova", title: "Senior Frontend Engineer", salary: "$130k", date: "2026-04-15", status: "Pending" },
    { id: 2, company: "CyberSafe", title: "Security Analyst", salary: "$110k", date: "2026-04-12", status: "Pending" }
  ]);
  const [interviews, setInterviews] = useState([
    { id: 1, date: "2026-04-25", time: '10:00 AM', candidate: 'Alice Walker', position: 'Software Engineer', status: 'Confirmed' }
  ]);
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Alice Walker", branch: "Computer Science", cgpa: "9.2", skills: "React, Node.js, Python" },
    { id: 2, name: "Bob Smith", branch: "Information Technology", cgpa: "8.5", skills: "Java, Spring, MySQL" }
  ]);

  const login = (username, role) => {
    setCurrentUser({ name: username, role: role });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addNotification = (notif) => {
    setNotifications(prev => [{ id: Date.now(), ...notif, read: false, time: 'Just now' }, ...prev]);
  };

  const applyToJob = (jobId, formData = {}) => {
    const job = jobs.find(j => j.id === jobId);
    const newApp = {
      id: Date.now(),
      jobId,
      jobTitle: job?.title || "Position #" + jobId,
      company: job?.company || "Unknown Company",
      studentName: formData.studentName || currentUser?.name || "Alice Walker",
      email: formData.email || "student@university.edu",
      phone: formData.phone || "+1 234 567 890",
      branch: formData.branch || studentProfile?.branch || "Computer Science",
      cgpa: formData.cgpa || studentProfile?.cgpa || "8.9",
      coverLetter: formData.coverLetter || "Excited to apply for this role!",
      resumeName: formData.resumeName || studentProfile?.resume || "resume_final.pdf",
      status: "Pending",
      date: new Date().toISOString().split('T')[0]
    };
    setApplications(prev => [newApp, ...prev]);
    addNotification({
      type: 'success',
      text: `Application submitted for ${newApp.jobTitle} at ${newApp.company}.`
    });
  };

  const updateApplicationStatus = (id, status) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  const updateOfferStatus = (id, status) => {
    setOffers(prev => prev.map(offer => offer.id === id ? { ...offer, status } : offer));
  };

  const value = {
    currentUser,
    jobs,
    applications,
    notifications,
    studentProfile,
    companies,
    reviews,
    offers,
    interviews,
    candidates,
    login,
    logout,
    setJobs,
    setApplications,
    setNotifications,
    setStudentProfile,
    setCompanies,
    setReviews,
    setOffers,
    setInterviews,
    setCandidates,
    addNotification,
    updateApplicationStatus,
    updateOfferStatus,
    applyToJob
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
