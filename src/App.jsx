import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';

// Layouts
import Layout from './layouts/Layout';

// Pages
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import StudentJobs from './pages/StudentJobs';
import StudentApplications from './pages/StudentApplications';
import StudentProfile from './pages/StudentProfile';
import StudentReviews from './pages/StudentReviews';
import AiMatching from './pages/AiMatching';
import ResumeBuilder from './pages/ResumeBuilder';
import InterviewPrepHub from './pages/InterviewPrepHub';
import OfferManagement from './pages/OfferManagement';
import VideoInterviews from './pages/VideoInterviews';
import AdminPostJob from './pages/AdminPostJob';
import AdminApplications from './pages/AdminApplications';
import AdminCompanies from './pages/AdminCompanies';
import AdminTechnologies from './pages/AdminTechnologies';
import CompanyApplicants from './pages/CompanyApplicants';
import CompanySmartSearch from './pages/CompanySmartSearch';
import CompanyScheduler from './pages/CompanyScheduler';
import CompanyOfferGenerator from './pages/CompanyOfferGenerator';

const App = () => {
  const { currentUser } = useApp();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to={`/${currentUser.role}/dashboard`} />} />
        
        {/* Protected Routes */}
        <Route path="/student" element={
          currentUser?.role === 'student' ? <Layout /> : <Navigate to="/login" />
        }>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="jobs" element={<StudentJobs />} />
          <Route path="applications" element={<StudentApplications />} />
          <Route path="reviews" element={<StudentReviews />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="ai-matching" element={<AiMatching />} />
          <Route path="interview-prep" element={<InterviewPrepHub />} />
          <Route path="resume-builder" element={<ResumeBuilder />} />
          <Route path="offers" element={<OfferManagement />} />
          <Route path="video-interviews" element={<VideoInterviews />} />
          <Route path="" element={<Navigate to="dashboard" />} />
        </Route>
        
        <Route path="/admin" element={
          currentUser?.role === 'admin' ? <Layout /> : <Navigate to="/login" />
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="post-job" element={<AdminPostJob />} />
          <Route path="manage-apps" element={<AdminApplications />} />
          <Route path="companies" element={<AdminCompanies />} />
          <Route path="technologies" element={<AdminTechnologies />} />
          <Route path="" element={<Navigate to="dashboard" />} />
        </Route>
        
        <Route path="/company" element={
          currentUser?.role === 'company' ? <Layout /> : <Navigate to="/login" />
        }>
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="applicants" element={<CompanyApplicants />} />
          <Route path="smart-search" element={<CompanySmartSearch />} />
          <Route path="scheduler" element={<CompanyScheduler />} />
          <Route path="offer-generator" element={<CompanyOfferGenerator />} />
          <Route path="" element={<Navigate to="dashboard" />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
