import React from 'react';
import { useApp } from '../context/AppContext';

const CompanyDashboard = () => {
  const { jobs, applications } = useApp();
  
  // Filter apps for company (mock: show all for demo if needed, but here we'll filter)
  const myApps = applications.filter(app => {
    const job = jobs.find(j => j.id === app.jobId);
    return job?.company === "TechNova"; // Simulating TechNova context
  });

  return (
    <div className="dashboard-content animate-fade-in">
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-value">2</div>
          <div className="stat-label">Your Active Jobs</div>
        </div>
        <div className="stat-card card">
          <div className="stat-value">{myApps.length}</div>
          <div className="stat-label">New Applicants</div>
        </div>
        <div className="stat-card card">
          <div className="stat-value">5</div>
          <div className="stat-label">Interviews Done</div>
        </div>
      </div>

      <div className="card">
        <h3>Recruiter Dashboard</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
          Review candidates, schedule technical rounds, and send offer letters to top-tier talent.
        </p>
      </div>

      <div className="card">
        <h3>Applicant Queue</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {myApps.length > 0 ? myApps.map(app => (
            <div key={app.id} className="job-item flex justify-between items-center" style={{ padding: '15px', background: 'var(--bg-panel-lighter)' }}>
              <div>
                <h4 style={{ color: '#fff' }}>{app.studentName}</h4>
                <p style={{ color: 'var(--gold-primary)', fontSize: '0.85rem' }}>
                   Applied for: {jobs.find(j => j.id === app.jobId)?.title}
                </p>
              </div>
              <div className="flex gap-10">
                <button className="btn btn-filled" style={{ fontSize: '0.7rem' }}>View Resume</button>
                <button className="btn" style={{ fontSize: '0.7rem' }}>Schedule</button>
              </div>
            </div>
          )) : <p>No applicants in your queue yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
