import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Loader2, CheckCircle, X, FileText } from 'lucide-react';

const AiMatching = () => {
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const { jobs, applyToJob, currentUser, studentProfile, applications } = useApp();

  // Modal states
  const [selectedDetailJob, setSelectedDetailJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [formData, setFormData] = useState({
    studentName: currentUser?.name || 'Alice Walker',
    email: 'alice.walker@university.edu',
    phone: '+1 (555) 234-5678',
    branch: studentProfile?.branch || 'Computer Science',
    cgpa: studentProfile?.cgpa || '8.9',
    coverLetter: 'Matched via AI Matching system (98% compatibility score). Excited to apply for this position.',
    resumeName: studentProfile?.resume || 'resume_final.pdf'
  });

  const runAnalysis = () => {
    setLoading(true);
    setMatches([]);
    setTimeout(() => {
      setMatches(jobs.slice(0, 2));
      setLoading(false);
    }, 1500);
  };

  const handleOpenApplyModal = (job) => {
    setApplyingJob(job);
    setFormData({
      studentName: currentUser?.name || 'Alice Walker',
      email: 'alice.walker@university.edu',
      phone: '+1 (555) 234-5678',
      branch: studentProfile?.branch || 'Computer Science',
      cgpa: studentProfile?.cgpa || '8.9',
      coverLetter: `Matched via AI Job Matching with a 98% score for ${job.title} at ${job.company}.`,
      resumeName: studentProfile?.resume || 'resume_final.pdf'
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!applyingJob) return;

    applyToJob(applyingJob.id, formData);
    alert(`🎉 Application Submitted!\nYour AI-Matched application for "${applyingJob.title}" at ${applyingJob.company} has been forwarded to the Admin and Company portals.`);
    setApplyingJob(null);
  };

  const isAlreadyApplied = (jobId) => {
    return applications.some(app => app.jobId === jobId);
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <div className="flex items-center gap-10">
          <Sparkles color="var(--gold-primary)" />
          <h3>AI Job Matching</h3>
        </div>
        <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px' }}>
          Our AI analyzes your skills, interests, and academic performance to find your perfect career match.
        </p>

        <button 
          className="btn btn-filled" 
          onClick={runAnalysis}
          disabled={loading}
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          {loading ? 'Analyzing Profile...' : 'Find My Matches'}
        </button>
      </div>

      {matches.length > 0 && (
        <div className="animate-fade-in" style={{ marginTop: '20px' }}>
          <h4>Your Top Matched Opportunities</h4>
          <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
            {matches.map((job, idx) => {
              const applied = isAlreadyApplied(job.id);
              const matchScore = idx === 0 ? 98 : 94;
              return (
                <div key={job.id} className="card" style={{ background: 'var(--bg-panel-lighter)', borderLeft: '4px solid var(--success)' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 style={{ color: '#fff', fontSize: '1.1rem' }}>{job.title}</h5>
                      <p style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>{job.company}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>
                        Match Score: <span style={{ color: '#4caf50', fontWeight: 'bold' }}>{matchScore}% Compatibility</span>
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        className={`btn ${applied ? '' : 'btn-filled'}`}
                        disabled={applied}
                        onClick={() => handleOpenApplyModal(job)}
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
      )}

      {/* JOB DETAILS MODAL */}
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
              </p>
            </div>

            <div className="flex justify-between items-center" style={{ borderTop: '1px solid #334155', paddingTop: '15px', marginTop: '20px' }}>
              <button className="btn" onClick={() => setSelectedDetailJob(null)}>Close</button>
              <button 
                className="btn btn-filled" 
                disabled={isAlreadyApplied(selectedDetailJob.id)}
                onClick={() => {
                  const job = selectedDetailJob;
                  setSelectedDetailJob(null);
                  handleOpenApplyModal(job);
                }}
              >
                {isAlreadyApplied(selectedDetailJob.id) ? '✓ Already Applied' : 'Proceed to Apply'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOB APPLICATION FORM MODAL FOR AI MATCHING */}
      {applyingJob && (
        <div className="modal-overlay" style={overlayStyle} onClick={() => setApplyingJob(null)}>
          <div className="modal-content card" style={modalContentStyle} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: '1.3rem' }}>AI Match Application Form</h2>
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
                  <input type="text" className="lux-input" required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Email Address</label>
                  <input type="email" className="lux-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="flex gap-20" style={{ marginBottom: '15px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Phone Number</label>
                  <input type="text" className="lux-input" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Branch / Major</label>
                  <input type="text" className="lux-input" required value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} />
                </div>
              </div>

              <div className="flex gap-20" style={{ marginBottom: '15px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Current CGPA</label>
                  <input type="text" className="lux-input" required value={formData.cgpa} onChange={e => setFormData({...formData, cgpa: e.target.value})} />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Attached Resume</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-panel-lighter)', padding: '10px', borderRadius: '4px', border: '1px dashed #444' }}>
                    <FileText size={16} color="var(--gold-primary)" />
                    <span style={{ fontSize: '0.8rem', color: '#fff' }}>{formData.resumeName}</span>
                  </div>
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.85rem' }}>Cover Letter Note</label>
                <textarea className="lux-input" rows="4" required value={formData.coverLetter} onChange={e => setFormData({...formData, coverLetter: e.target.value})} />
              </div>

              <div className="flex justify-between items-center" style={{ borderTop: '1px solid #334155', paddingTop: '15px' }}>
                <button type="button" className="btn" onClick={() => setApplyingJob(null)}>Cancel</button>
                <button type="submit" className="btn btn-filled">Submit Application</button>
              </div>
            </form>
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
  width: '100%', maxWidth: '680px', backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155', padding: '25px'
};

export default AiMatching;
