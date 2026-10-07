import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Eye, Check, X, FileText } from 'lucide-react';

const CompanyApplicants = () => {
  const { applications, jobs, updateApplicationStatus, addNotification, currentUser } = useApp();
  const [viewingCandidate, setViewingCandidate] = useState(null);

  // Filter apps matching jobs for company (default to TechNova if not specified)
  const currentCompName = currentUser?.companyName || "TechNova";
  const companyApps = applications.filter(app => {
    const job = jobs.find(j => j.id === app.jobId);
    return app.company === currentCompName || job?.company === currentCompName || true; // Show apps for company review
  });

  const handleAction = (id, status, name) => {
    updateApplicationStatus(id, status);
    addNotification({
      type: status === 'Accepted' ? 'success' : 'error',
      text: `Candidate ${name} has been ${status.toLowerCase()}.`
    });
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3><Users size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Recent Applicants ({currentCompName})</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Review and manage student applications submitted for your active company positions.
        </p>
      </div>

      <div className="card">
        <table className="lux-table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Position Applied</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companyApps.length > 0 ? companyApps.map(app => {
              const job = jobs.find(j => j.id === app.jobId) || { title: app.jobTitle || 'Unknown' };
              return (
                <tr key={app.id}>
                  <td>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setViewingCandidate(app); }} 
                      style={{ color: 'var(--gold-primary)', fontWeight: 'bold', textDecoration: 'underline' }}
                    >
                      {app.studentName}
                    </a>
                  </td>
                  <td>{job.title}</td>
                  <td>{app.date}</td>
                  <td>
                    <span className={`badge ${app.status === 'Accepted' ? 'badge-accepted' : (app.status === 'Rejected' ? 'badge-rejected' : 'badge-pending')}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn" 
                      style={{ padding: '5px 10px', fontSize: '0.75rem', marginRight: '5px' }} 
                      onClick={() => setViewingCandidate(app)}
                    >
                      <Eye size={14} style={{ marginRight: '4px' }} /> View Profile
                    </button>
                    <button 
                      className="btn btn-filled" 
                      style={{ padding: '5px 10px', fontSize: '0.75rem', marginRight: '5px' }} 
                      onClick={() => handleAction(app.id, 'Accepted', app.studentName)}
                    >
                      Accept
                    </button>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '5px 10px', fontSize: '0.75rem' }} 
                      onClick={() => handleAction(app.id, 'Rejected', app.studentName)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>No applicants found for your jobs.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CANDIDATE PROFILE MODAL FOR COMPANY */}
      {viewingCandidate && (
        <div className="modal-overlay" style={overlayStyle} onClick={() => setViewingCandidate(null)}>
          <div className="modal-content card" style={modalContentStyle} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '15px' }}>
              <h3 style={{ color: '#fff' }}>Applicant Profile: {viewingCandidate.studentName}</h3>
              <button className="btn" style={{ padding: '5px 10px', borderRadius: '50%' }} onClick={() => setViewingCandidate(null)}><X size={18} /></button>
            </div>

            <div style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              <p><strong>Position Applied:</strong> <span style={{ color: '#fff' }}>{viewingCandidate.jobTitle || 'Senior Frontend Engineer'}</span></p>
              <p><strong>Company:</strong> <span style={{ color: 'var(--gold-primary)' }}>{viewingCandidate.company || 'TechNova'}</span></p>
              <p><strong>Email Address:</strong> {viewingCandidate.email || 'alice.walker@university.edu'}</p>
              <p><strong>Phone:</strong> {viewingCandidate.phone || '+1 (555) 234-5678'}</p>
              <p><strong>Branch / Major:</strong> {viewingCandidate.branch || 'Computer Science'}</p>
              <p><strong>Academic CGPA:</strong> <span style={{ color: '#4caf50', fontWeight: 'bold' }}>{viewingCandidate.cgpa || '8.9'}</span></p>
              <p><strong>Resume Document:</strong> <span style={{ color: 'var(--gold-primary)' }}>{viewingCandidate.resumeName || 'resume_final.pdf'}</span></p>

              <div style={{ marginTop: '15px', background: 'var(--bg-panel-lighter)', padding: '12px', borderRadius: '6px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Cover Letter Note:</strong>
                <p style={{ margin: 0, fontStyle: 'italic' }}>"{viewingCandidate.coverLetter || 'I am eager to contribute to building high performance engineering solutions.'}"</p>
              </div>
            </div>

            <div className="flex justify-between items-center" style={{ borderTop: '1px solid #334155', paddingTop: '15px', marginTop: '20px' }}>
              <button className="btn" onClick={() => setViewingCandidate(null)}>Close</button>
              <div className="flex gap-10">
                <button className="btn btn-filled" onClick={() => { handleAction(viewingCandidate.id, 'Accepted', viewingCandidate.studentName); setViewingCandidate(null); }}>Accept Candidate</button>
                <button className="btn btn-danger" onClick={() => { handleAction(viewingCandidate.id, 'Rejected', viewingCandidate.studentName); setViewingCandidate(null); }}>Reject Candidate</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)',
  zIndex: 1000, display: 'flex', items: 'center', justifyContent: 'center', padding: '20px'
};

const modalContentStyle = {
  width: '100%', maxWidth: '600px', backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155', padding: '25px'
};

export default CompanyApplicants;
