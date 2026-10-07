import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, X, FileText, User, Eye } from 'lucide-react';

const AdminApplications = () => {
  const { applications, jobs, updateApplicationStatus, addNotification } = useApp();
  const [viewingApp, setViewingApp] = useState(null);

  const handleAction = (appId, status, studentName) => {
    updateApplicationStatus(appId, status);
    addNotification({
      type: status === 'Accepted' ? 'success' : 'error',
      text: `Application for ${studentName} has been ${status.toLowerCase()}.`
    });
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3><FileText size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> All Student Applications</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Review and manage all student job applications submitted across the platform.
        </p>
      </div>

      <div className="card">
        <table className="lux-table">
          <thead>
            <tr>
              <th>Student Candidate</th>
              <th>Job Position</th>
              <th>Company</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? applications.map(app => {
              const job = jobs.find(j => j.id === app.jobId) || { title: app.jobTitle || 'Unknown', company: app.company || 'Unknown' };
              return (
                <tr key={app.id}>
                  <td>
                    <a href="#" onClick={(e) => { e.preventDefault(); setViewingApp(app); }} style={{ color: 'var(--gold-primary)', fontWeight: 'bold', textDecoration: 'underline' }}>
                      {app.studentName}
                    </a>
                  </td>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
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
                      onClick={() => setViewingApp(app)}
                    >
                      <Eye size={14} style={{ marginRight: '4px' }} /> View
                    </button>
                    <button 
                      className="btn btn-filled" 
                      style={{ padding: '5px 10px', fontSize: '0.75rem', marginRight: '5px' }} 
                      onClick={() => handleAction(app.id, 'Accepted', app.studentName)}
                    >
                      <Check size={14} /> Accept
                    </button>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '5px 10px', fontSize: '0.75rem' }} 
                      onClick={() => handleAction(app.id, 'Rejected', app.studentName)}
                    >
                      <X size={14} /> Reject
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>No applications found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CANDIDATE DETAILS MODAL FOR ADMIN */}
      {viewingApp && (
        <div className="modal-overlay" style={overlayStyle} onClick={() => setViewingApp(null)}>
          <div className="modal-content card" style={modalContentStyle} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '15px' }}>
              <h3 style={{ color: '#fff' }}>Applicant Profile: {viewingApp.studentName}</h3>
              <button className="btn" style={{ padding: '5px 10px', borderRadius: '50%' }} onClick={() => setViewingApp(null)}><X size={18} /></button>
            </div>

            <div style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              <p><strong>Position Applied:</strong> <span style={{ color: '#fff' }}>{viewingApp.jobTitle || 'Software Engineer'}</span></p>
              <p><strong>Company:</strong> <span style={{ color: 'var(--gold-primary)' }}>{viewingApp.company || 'TechNova'}</span></p>
              <p><strong>Email:</strong> {viewingApp.email || 'student@university.edu'}</p>
              <p><strong>Phone:</strong> {viewingApp.phone || '+1 (555) 234-5678'}</p>
              <p><strong>Branch / Major:</strong> {viewingApp.branch || 'Computer Science'}</p>
              <p><strong>CGPA:</strong> {viewingApp.cgpa || '8.9'}</p>
              <p><strong>Resume File:</strong> <span style={{ color: 'var(--gold-primary)' }}>{viewingApp.resumeName || 'resume_final.pdf'}</span></p>
              
              <div style={{ marginTop: '15px', background: 'var(--bg-panel-lighter)', padding: '12px', borderRadius: '6px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Cover Letter / Statement:</strong>
                <p style={{ margin: 0, fontStyle: 'italic' }}>"{viewingApp.coverLetter || 'Excited to contribute to your engineering goals.'}"</p>
              </div>
            </div>

            <div className="flex justify-between items-center" style={{ borderTop: '1px solid #334155', paddingTop: '15px', marginTop: '20px' }}>
              <button className="btn" onClick={() => setViewingApp(null)}>Close</button>
              <div className="flex gap-10">
                <button className="btn btn-filled" onClick={() => { handleAction(viewingApp.id, 'Accepted', viewingApp.studentName); setViewingApp(null); }}>Accept Application</button>
                <button className="btn btn-danger" onClick={() => { handleAction(viewingApp.id, 'Rejected', viewingApp.studentName); setViewingApp(null); }}>Reject Application</button>
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
  zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
};

const modalContentStyle = {
  width: '100%', maxWidth: '600px', backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155', padding: '25px'
};

export default AdminApplications;
