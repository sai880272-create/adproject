import React from 'react';
import { useApp } from '../context/AppContext';

const StudentProfile = () => {
  const { studentProfile, setStudentProfile, addNotification } = useApp();

  const handleSave = (e) => {
    e.preventDefault();
    addNotification({ type: 'success', text: 'Profile updated successfully.' });
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3>Academic Profile</h3>
        <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px' }}>
          Keep your academic details up to date for better job matching.
        </p>

        <form onSubmit={handleSave} className="flex flex-col gap-20">
          <div className="flex gap-20">
            <div className="input-group flex-1">
              <label>Branch / Major</label>
              <input 
                className="lux-input" 
                value={studentProfile.branch}
                onChange={(e) => setStudentProfile({...studentProfile, branch: e.target.value})}
              />
            </div>
            <div className="input-group flex-1">
              <label>Current Year</label>
              <select 
                className="lux-input"
                value={studentProfile.year}
                onChange={(e) => setStudentProfile({...studentProfile, year: e.target.value})}
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>CGPA</label>
            <input 
              type="number" step="0.1" 
              className="lux-input" 
              value={studentProfile.cgpa}
              onChange={(e) => setStudentProfile({...studentProfile, cgpa: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Current Resume</label>
            <div className="flex items-center gap-20" style={{ padding: '15px', background: 'var(--bg-panel-lighter)', border: '1px dashed #444' }}>
              <div style={{ color: 'var(--gold-primary)' }}>
                <span style={{ fontSize: '0.8rem' }}>{studentProfile.resume}</span>
              </div>
              <button type="button" className="btn" style={{ fontSize: '0.7rem' }}>Change File</button>
            </div>
          </div>

          <button type="submit" className="btn btn-filled" style={{ padding: '15px' }}>Save Profile Changes</button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
