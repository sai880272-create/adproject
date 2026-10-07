import React from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Calendar, CheckCircle, Clock } from 'lucide-react';

const StudentDashboard = () => {
  const { jobs, applications } = useApp();

  return (
    <div className="dashboard-content animate-fade-in">
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-value">{applications.length}</div>
          <div className="stat-label">Applications Sent</div>
        </div>
        <div className="stat-card card">
          <div className="stat-value">2</div>
          <div className="stat-label">Interviews Scheduled</div>
        </div>
        <div className="stat-card card">
          <div className="stat-value">1</div>
          <div className="stat-label">Offers Received</div>
        </div>
      </div>

      <div className="card">
        <h3><InfoIcon /> Career Overview</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
          Welcome to your career hub. Here you can track your applications, prepare for interviews, and explore elite opportunities.
        </p>
      </div>

      <div className="card">
        <h3>Recent Job Openings</h3>
        <div className="job-list" style={{ marginTop: '20px' }}>
          {jobs.slice(0, 2).map(job => (
            <div key={job.id} className="job-item flex justify-between items-center" style={{ padding: '15px', background: 'var(--bg-panel-lighter)', marginBottom: '10px' }}>
              <div>
                <h4 style={{ color: '#fff' }}>{job.title}</h4>
                <p style={{ color: 'var(--gold-primary)', fontSize: '0.85rem' }}>{job.company}</p>
              </div>
              <button className="btn btn-filled" style={{ fontSize: '0.7rem' }}>Quick Apply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', verticalAlign: 'middle' }}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

export default StudentDashboard;
