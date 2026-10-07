import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building } from 'lucide-react';

const AdminCompanies = () => {
  const { addNotification } = useApp();
  
  // Initial placeholder data based on ADD.html state
  const [companies, setCompanies] = useState([
    { id: 1, name: 'TechNova Inc.', industry: 'Software', jobs: 5, status: 'Verified' },
    { id: 2, name: 'Global Finance', industry: 'Finance', jobs: 2, status: 'Verified' },
    { id: 3, name: 'HealthPlus', industry: 'Healthcare', jobs: 0, status: 'Pending' }
  ]);

  const toggleCompanyStatus = (id, newStatus) => {
    setCompanies(prev => prev.map(comp => 
      comp.id === id ? { ...comp, status: newStatus } : comp
    ));
    addNotification({
      type: newStatus === 'Verified' ? 'success' : (newStatus === 'Suspended' ? 'error' : 'info'),
      text: `Company status changed to ${newStatus}`
    });
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3><Building size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Partner Companies</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Manage your partner companies and their verification statuses.
        </p>
      </div>

      <div className="card">
        <table className="lux-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Industry</th>
              <th>Jobs Posted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.length > 0 ? companies.map(comp => {
              let badge = comp.status === 'Verified' ? 'badge-accepted' : (comp.status === 'Pending' ? 'badge-pending' : 'badge-rejected');
              return (
                <tr key={comp.id}>
                  <td>{comp.name}</td>
                  <td>{comp.industry}</td>
                  <td>{comp.jobs}</td>
                  <td><span className={`badge ${badge}`}>{comp.status}</span></td>
                  <td>
                    {comp.status !== 'Verified' && (
                      <button 
                        className="btn btn-filled" 
                        style={{ padding: '5px 10px', fontSize: '0.7rem', marginRight: '5px' }} 
                        onClick={() => toggleCompanyStatus(comp.id, 'Verified')}
                      >
                        Verify
                      </button>
                    )}
                    {comp.status !== 'Suspended' && (
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '5px 10px', fontSize: '0.7rem' }} 
                        onClick={() => toggleCompanyStatus(comp.id, 'Suspended')}
                      >
                        Suspend
                      </button>
                    )}
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>No partner companies found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCompanies;
