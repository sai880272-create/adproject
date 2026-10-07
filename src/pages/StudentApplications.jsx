import React from 'react';
import { useApp } from '../context/AppContext';

const StudentApplications = () => {
  const { applications, jobs } = useApp();

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3>My Applications</h3>
        <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px' }}>
          Track the status of your recent applications.
        </p>

        <table className="lux-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Company</th>
              <th>Applied Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => {
              const job = jobs.find(j => j.id === app.jobId);
              return (
                <tr key={app.id}>
                  <td>{job?.title}</td>
                  <td>{job?.company}</td>
                  <td>{app.date}</td>
                  <td>
                    <span className={`badge badge-${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentApplications;
