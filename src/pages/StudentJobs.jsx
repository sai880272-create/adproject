import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, DollarSign, Clock, Calendar, X, FileText, CheckCircle, Briefcase, Award, Building, User, Mail, Phone, BookOpen, Upload } from 'lucide-react';

const StudentJobs = () => {
  const { jobs, applyToJob, currentUser, studentProfile, applications } = useApp();

  // Modal states
  const [selectedDetailJob, setSelectedDetailJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);

  // Application Form state
  const [formData, setFormData] = useState({
    studentName: currentUser?.name || 'Alice Walker',
    email: 'alice.walker@university.edu',
    phone: '+1 (555) 234-5678',
    branch: studentProfile?.branch || 'Computer Science',
    cgpa: studentProfile?.cgpa || '8.9',
    coverLetter: 'I am extremely enthusiastic about this position. My background in software development and problem solving makes me a strong fit for your team.',
    resumeName: studentProfile?.resume || 'resume_final.pdf'
  });

  const handleOpenApplyModal = (job) => {
    setSelectedDetailJob(null);
    setApplyingJob(job);
    setFormData({
      studentName: currentUser?.name || 'Alice Walker',
      email: 'alice.walker@university.edu',
      phone: '+1 (555) 234-5678',
      branch: studentProfile?.branch || 'Computer Science',
      cgpa: studentProfile?.cgpa || '8.9',
      coverLetter: 'I am extremely enthusiastic about this position. My background in software development and problem solving makes me a strong fit for your team.',
      resumeName: studentProfile?.resume || 'resume_final.pdf'
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!applyingJob) return;

    applyToJob(applyingJob.id, formData);
    alert(`🎉 Application Submitted Successfully!\nYour application for "${applyingJob.title}" at ${applyingJob.company} has been forwarded to the Admin and Company portals.`);
    setApplyingJob(null);
  };

  const isAlreadyApplied = (jobId) => {
    return applications.some(app => app.jobId === jobId);
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3>Available Opportunities</h3>
        <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px' }}>
          Explore elite positions curated specially for your academic profile. Click "View Details" or "Apply Now".
        </p>

        <div className="jobs-container" style={{ display: 'grid', gap: '20px' }}>
          {jobs.map(job => {
            const applied = isAlreadyApplied(job.id);
            return (
              <div key={job.id} className="card job-card-detailed" style={{ marginBottom: 0, padding: '20px' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>{job.title}</h3>
                    <p style={{ color: 'var(--gold-primary)', margin: '5px 0', fontWeight: 'bold' }}>{job.company}</p>
                    
                    <div className="flex gap-20" style={{ marginTop: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <span className="flex items-center gap-10"><DollarSign size={14} /> {job.salary}</span>
                      <span className="flex items-center gap-10"><Clock size={14} /> {job.type}</span>
                      <span className="flex items-center gap-10"><Calendar size={14} /> Posted {job.posted}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-10">
                    <button 
                      className={`btn ${applied ? '' : 'btn-filled'}`}
                      disabled={applied}
                      onClick={() => handleOpenApplyModal(job)}
                      style={{ opacity: applied ? 0.7 : 1 }}
                    >
                      {applied ? '✓ Applied' : 'Apply Now'}
                    </button>
                    <button className="btn" onClick={() => setSelectedDetailJob(job)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 1. JOB DETAILS MODAL */}
      {selectedDetailJob && (
        <div className="modal-overlay" style={overlayStyle} onClick={() => setSelectedDetailJob(null)}>
          <div className="modal-content card" style={modalContentStyle} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: '1.4rem' }}>{selectedDetailJob.title}</h2>
                <p style={{ color: 'var(--gold-primary)', fontSize: '1rem', marginTop: '4px' }}>{selectedDetailJob.company}</p>
              </div>
              <button className="btn" style={{ padding: '5px 10px', borderRadius: '50%' }} onClick={() => setSelectedDetailJob(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
              <div className="flex gap-20" style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', background: 'var(--bg-panel-lighter)', padding: '12px', borderRadius: '6px' }}>
                <span>💰 <strong>Salary:</strong> {selectedDetailJob.salary}</span>
                <span>⏱️ <strong>Type:</strong> {selectedDetailJob.type}</span>
                <span>📅 <strong>Posted:</strong> {selectedDetailJob.posted}</span>
              </div>

              <h4 style={{ color: '#fff', marginBottom: '10px' }}>📌 Role Description</h4>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                We are looking for a skilled {selectedDetailJob.title} to join our engineering team at {selectedDetailJob.company}. 
                In this role, you will be responsible for building high-scale features, collaborating with cross-functional teams, 
                and contributing to key software architecture decisions.
              </p>

              <h4 style={{ color: '#fff', marginBottom: '10px' }}>🎯 Key Responsibilities</h4>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '20px', lineHeight: '1.8', marginBottom: '20px' }}>
                <li>Design, develop, and test scalable production software components.</li>
                <li>Collaborate with product management and designers to craft seamless user experiences.</li>
                <li>Write clean, maintainable, well-documented code with strong test coverage.</li>
                <li>Participate in code reviews and tech sharing sessions with team members.</li>
              </ul>

              <h4 style={{ color: '#fff', marginBottom: '10px' }}>🎓 Candidate Qualifications</h4>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '20px', lineHeight: '1.8', marginBottom: '20px' }}>
                <li>Pursuing or completed B.S./M.S. in Computer Science or related STEM field.</li>
                <li>Strong foundation in Data Structures, Algorithms, and System Design.</li>
                <li>Experience with Modern Frameworks (React, Node.js, Java Spring Boot, SQL, Python).</li>
                <li>Minimum CGPA of 7.5+ preferred.</li>
              </ul>
            </div>

            <div className="flex justify-between items-center" style={{ borderTop: '1px solid #334155', paddingTop: '15px', marginTop: '20px' }}>
              <button className="btn" onClick={() => setSelectedDetailJob(null)}>Close</button>
              <button 
                className="btn btn-filled" 
                disabled={isAlreadyApplied(selectedDetailJob.id)}
                onClick={() => handleOpenApplyModal(selectedDetailJob)}
              >
                {isAlreadyApplied(selectedDetailJob.id) ? '✓ Already Applied' : 'Proceed to Apply'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. JOB APPLICATION FORM MODAL */}
      {applyingJob && (
        <div className="modal-overlay" style={overlayStyle} onClick={() => setApplyingJob(null)}>
          <div className="modal-content card" style={modalContentStyle} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: '1.3rem' }}>Job Application Form</h2>
                <p style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  Applying for <strong>{applyingJob.title}</strong> at <strong>{applyingJob.company}</strong>
                </p>
              </div>
              <button className="btn" style={{ padding: '5px 10px', borderRadius: '50%' }} onClick={() => setApplyingJob(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '10px' }}>
              <div className="flex gap-20" style={{ marginBottom: '15px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Full Name</label>
                  <input 
                    type="text" 
                    className="lux-input" 
                    required 
                    value={formData.studentName} 
                    onChange={e => setFormData({...formData, studentName: e.target.value})} 
                  />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Email Address</label>
                  <input 
                    type="email" 
                    className="lux-input" 
                    required 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </div>

              <div className="flex gap-20" style={{ marginBottom: '15px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Phone Number</label>
                  <input 
                    type="text" 
                    className="lux-input" 
                    required 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Branch / Major</label>
                  <input 
                    type="text" 
                    className="lux-input" 
                    required 
                    value={formData.branch} 
                    onChange={e => setFormData({...formData, branch: e.target.value})} 
                  />
                </div>
              </div>

              <div className="flex gap-20" style={{ marginBottom: '15px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Current CGPA</label>
                  <input 
                    type="text" 
                    className="lux-input" 
                    required 
                    value={formData.cgpa} 
                    onChange={e => setFormData({...formData, cgpa: e.target.value})} 
                  />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Attached Resume</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-panel-lighter)', padding: '10px', borderRadius: '4px', border: '1px dashed #444' }}>
                    <FileText size={16} color="var(--gold-primary)" />
                    <span style={{ fontSize: '0.8rem', color: '#fff', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{formData.resumeName}</span>
                  </div>
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Cover Letter / Personal Statement</label>
                <textarea 
                  className="lux-input" 
                  rows="4" 
                  required 
                  value={formData.coverLetter} 
                  onChange={e => setFormData({...formData, coverLetter: e.target.value})} 
                />
              </div>

              <div className="flex justify-between items-center" style={{ borderTop: '1px solid #334155', paddingTop: '15px' }}>
                <button type="button" className="btn" onClick={() => setApplyingJob(null)}>Cancel</button>
                <button type="submit" className="btn btn-filled">Submit Application to Recruiter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// CSS inline styles for modal overlay & container
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(5px)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
};

const modalContentStyle = {
  width: '100%',
  maxWidth: '680px',
  backgroundColor: '#1E293B',
  borderRadius: '12px',
  border: '1px solid #334155',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  padding: '25px'
};

export default StudentJobs;
