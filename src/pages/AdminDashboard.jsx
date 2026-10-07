import React from 'react';
import { useApp } from '../context/AppContext';

const AdminDashboard = () => {
  const { jobs, applications } = useApp();

  return (
    <div className="dashboard-content animate-fade-in">
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-value">{jobs.length}</div>
          <div className="stat-label">Active Jobs</div>
        </div>
        <div className="stat-card card">
          <div className="stat-value">{applications.length}</div>
          <div className="stat-label">Total Applicants</div>
        </div>
        <div className="stat-card card">
          <div className="stat-value">12</div>
          <div className="stat-label">Partner Companies</div>
        </div>
      </div>

      <div className="card">
        <h3>Admin Controls</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
          Manage job listings, verify company accounts, and monitor placement statistics across the platform.
        </p>
      </div>

      <div className="card">
        <h3>Pending Applications</h3>
        <table className="lux-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Position</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.studentName}</td>
                <td>{jobs.find(j => j.id === app.jobId)?.title || 'N/A'}</td>
                <td>{app.date}</td>
                <td><span className="badge badge-pending">{app.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
