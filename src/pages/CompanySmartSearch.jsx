import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ClipboardCheck } from 'lucide-react';

const CompanySmartSearch = () => {
  const { addNotification } = useApp();
  const [skillInput, setSkillInput] = useState('');
  const [cgpaInput, setCgpaInput] = useState('');
  
  // Dummy candidates since AppContext currently might not have candidates
  const initialCandidates = [
    { id: 1, name: 'Alice Walker', branch: 'Computer Science', cgpa: 8.5, skills: 'React, Node.js, Python' },
    { id: 2, name: 'Bob Smith', branch: 'Information Technology', cgpa: 7.8, skills: 'Java, Spring, SQL' },
    { id: 3, name: 'Charlie Davis', branch: 'Data Science', cgpa: 9.1, skills: 'Python, Machine Learning, AWS' },
    { id: 4, name: 'Diana Prince', branch: 'Computer Science', cgpa: 8.8, skills: 'React, TypeScript, UI/UX' },
  ];
  
  const [results, setResults] = useState(initialCandidates);

  const handleSearch = () => {
    const skill = skillInput.toLowerCase();
    const cgpa = parseFloat(cgpaInput) || 0;
    
    const filtered = initialCandidates.filter(c => 
      (c.skills.toLowerCase().includes(skill) || c.branch.toLowerCase().includes(skill)) && 
      c.cgpa >= cgpa
    );
    setResults(filtered);
  };

  const handleBulkShortlist = () => {
    addNotification({ type: 'success', text: 'Selected candidates have been shortlisted!' });
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3><Search size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Find Top Talent</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Use filters to search our database of skilled students.
        </p>
        <div className="flex gap-20" style={{ marginTop: '20px' }}>
          <input 
            type="text" 
            className="lux-input" 
            style={{ flex: 2 }} 
            placeholder="Search by skill (e.g., Python, React)..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <input 
            type="number" 
            className="lux-input" 
            style={{ flex: 1 }} 
            placeholder="Min. CGPA (e.g., 8.0)"
            value={cgpaInput}
            onChange={(e) => setCgpaInput(e.target.value)}
            step="0.1"
            min="0"
            max="10"
          />
          <button className="btn btn-filled" onClick={handleSearch}>Search</button>
        </div>
      </div>
      
      <div className="card">
        <div className="flex justify-between items-center" style={{ marginBottom: '15px' }}>
          <h4>Search Results</h4>
          <button className="btn" onClick={handleBulkShortlist}>
            <ClipboardCheck size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Bulk Shortlist Selected
          </button>
        </div>
        <table className="lux-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Candidate</th>
              <th>Branch</th>
              <th>CGPA</th>
              <th>Key Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? results.map(c => (
              <tr key={c.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('View Profile Simulation'); }} style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>
                    {c.name}
                  </a>
                </td>
                <td>{c.branch}</td>
                <td>{c.cgpa}</td>
                <td>{c.skills}</td>
                <td>
                  <button className="btn" style={{ padding: '5px 10px', fontSize: '0.7rem' }} onClick={() => alert('View Profile Simulation')}>
                    View Profile
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>No candidates found matching criteria.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanySmartSearch;
