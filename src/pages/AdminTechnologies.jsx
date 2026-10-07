import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cpu } from 'lucide-react';

const AdminTechnologies = () => {
  const { addNotification } = useApp();
  const [techInput, setTechInput] = useState('');
  
  const [technologies, setTechnologies] = useState([
    { id: 1, name: 'Artificial Intelligence', category: 'Data Science', demand: 'High' },
    { id: 2, name: 'Blockchain', category: 'Cryptography', demand: 'Medium' },
    { id: 3, name: 'Cloud Computing', category: 'Infrastructure', demand: 'High' }
  ]);

  const addTechnology = () => {
    if (techInput.trim()) {
      const newTech = {
        id: Date.now(),
        name: techInput.trim(),
        category: 'General',
        demand: 'New'
      };
      setTechnologies([...technologies, newTech]);
      setTechInput('');
      addNotification({ type: 'success', text: `${newTech.name} added to list` });
    } else {
      addNotification({ type: 'error', text: 'Please enter a technology name' });
    }
  };

  const removeTechnology = (id, name) => {
    setTechnologies(technologies.filter(t => t.id !== id));
    addNotification({ type: 'info', text: `${name} removed from list` });
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3><Cpu size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Manage Technologies</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Update the list of trending technologies to guide students.
        </p>
        <div className="input-group" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            className="lux-input" 
            placeholder="Enter technology name..." 
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
          />
          <button className="btn btn-filled" onClick={addTechnology}>Add</button>
        </div>
      </div>

      <div className="card">
        <table className="lux-table">
          <thead>
            <tr>
              <th>Technology</th>
              <th>Category</th>
              <th>Demand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {technologies.length > 0 ? technologies.map(tech => {
              let badgeClass = 'badge-pending';
              if (tech.demand === 'High') badgeClass = 'badge-accepted';
              if (tech.demand === 'Low') badgeClass = 'badge-rejected';
              
              return (
                <tr key={tech.id}>
                  <td>{tech.name}</td>
                  <td>{tech.category}</td>
                  <td><span className={`badge ${badgeClass}`}>{tech.demand}</span></td>
                  <td>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '5px 10px', fontSize: '0.7rem' }} 
                      onClick={() => removeTechnology(tech.id, tech.name)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}>No technologies found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTechnologies;
