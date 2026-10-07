import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle } from 'lucide-react';

const AdminPostJob = () => {
  const { setJobs, addNotification } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    salary: '',
    type: 'Full-time',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now(),
      ...formData,
      posted: 'Just now'
    };
    setJobs(prev => [newJob, ...prev]);
    addNotification({ type: 'success', text: `New job "${formData.title}" posted successfully.` });
    setFormData({ title: '', company: '', salary: '', type: 'Full-time', description: '' });
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="flex items-center gap-10">
          <PlusCircle color="var(--gold-primary)" />
          <h3>Post New Position</h3>
        </div>
        <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px' }}>
          Fill in the details to publish a new career opportunity.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-20">
          <div className="input-group">
            <label>Job Title</label>
            <input 
              className="lux-input" 
              placeholder="e.g. Senior Backend Developer"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="flex gap-20">
            <div className="input-group flex-1">
              <label>Company Name</label>
              <input 
                className="lux-input" 
                placeholder="e.g. Goldman Sachs"
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div className="input-group flex-1">
              <label>Salary Range</label>
              <input 
                className="lux-input" 
                placeholder="e.g. $100k - $150k"
                required
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Employment Type</label>
            <select 
              className="lux-input"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          <div className="input-group">
            <label>Job Description</label>
            <textarea 
              className="lux-input" 
              rows="5" 
              placeholder="Roles, responsibilities, and requirements..."
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-filled" style={{ padding: '15px' }}>Publish Opportunity</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPostJob;
