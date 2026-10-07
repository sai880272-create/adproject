import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalendarDays, X } from 'lucide-react';

const CompanyScheduler = () => {
  const { addNotification } = useApp();
  const [showModal, setShowModal] = useState(false);
  
  const [interviews, setInterviews] = useState([
    { id: 1, date: '2023-11-15', time: '10:00 AM', candidate: 'Alice Walker', position: 'Software Engineer', status: 'Confirmed' },
    { id: 2, date: '2023-11-16', time: '02:00 PM', candidate: 'Bob Smith', position: 'Data Analyst', status: 'Pending' }
  ]);

  const [formData, setFormData] = useState({
    candidate: '',
    position: '',
    date: '',
    time: ''
  });

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const newInt = {
      id: Date.now(),
      ...formData,
      status: 'Pending'
    };
    setInterviews([...interviews, newInt]);
    addNotification({ type: 'success', text: 'Interview Scheduled Successfully' });
    setShowModal(false);
    setFormData({ candidate: '', position: '', date: '', time: '' });
  };

  const handleReschedule = () => {
    addNotification({ type: 'info', text: 'Reschedule request sent' });
  };

  return (
    <div className="page-content animate-fade-in">
      {/* Schedule Modal */}
      {showModal && (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-content" style={{ background: 'var(--bg-panel)', border: '1px solid var(--gold-dim)', padding: '30px', width: '90%', maxWidth: '500px', borderRadius: '4px', position: 'relative' }}>
            <X className="close-modal" size={24} style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowModal(false)} />
            <h3 style={{ marginBottom: '20px' }}>Schedule Interview</h3>
            <form onSubmit={handleScheduleSubmit}>
              <div className="input-group" style={{ marginBottom: '15px' }}>
                <label>Candidate Name</label>
                <input type="text" className="lux-input" required placeholder="e.g. Alice Walker" value={formData.candidate} onChange={e => setFormData({...formData, candidate: e.target.value})} />
              </div>
              <div className="input-group" style={{ marginBottom: '15px' }}>
                <label>Position</label>
                <input type="text" className="lux-input" required placeholder="e.g. Software Engineer" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} />
              </div>
              <div className="flex gap-20" style={{ marginBottom: '20px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Date</label>
                  <input type="date" className="lux-input" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Time</label>
                  <input type="time" className="lux-input" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="btn btn-filled" style={{ width: '100%' }}>Confirm Schedule</button>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <h3><CalendarDays size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Schedule Interviews</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Coordinate interview times for your shortlisted candidates.
        </p>
        <button className="btn btn-filled" style={{ marginTop: '15px' }} onClick={() => setShowModal(true)}>+ Schedule New Interview</button>
      </div>

      <div className="card">
        <h4>Your Upcoming Interviews</h4>
        <table className="lux-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Candidate</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.length > 0 ? interviews.map(int => (
              <tr key={int.id}>
                <td>{int.date} {int.time}</td>
                <td>{int.candidate}</td>
                <td>{int.position}</td>
                <td>
                  <span className={`badge ${int.status === 'Confirmed' ? 'badge-accepted' : 'badge-pending'}`}>
                    {int.status}
                  </span>
                </td>
                <td>
                  <button className="btn" style={{ padding: '5px 10px', fontSize: '0.7rem' }} onClick={handleReschedule}>
                    Reschedule
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>No upcoming interviews scheduled.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyScheduler;
