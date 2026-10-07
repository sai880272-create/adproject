import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Contact, Building, ChevronRight, ArrowLeft } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useApp();
  const [step, setStep] = useState('role');
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    setStep('auth');
    // Default mock usernames
    const defaults = { admin: 'admin_officer', company: 'company_rep', student: 'student_user' };
    setUsername(defaults[selectedRole]);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) return;
    login(username, role);
  };

  return (
    <div className="login-view">
      <div className="login-card">
        <h1 className="brand-logo">JOB MATCH</h1>
        <p className="brand-tagline">Elite Career Management</p>

        {step === 'role' ? (
          <div className="role-selector">
            <div className="role-card" onClick={() => selectRole('student')}>
              <GraduationCap size={40} className="role-icon" />
              <span>Student</span>
            </div>
            <div className="role-card" onClick={() => selectRole('admin')}>
              <Contact size={40} className="role-icon" />
              <span>Admin</span>
            </div>
            <div className="role-card" onClick={() => selectRole('company')}>
              <Building size={40} className="role-icon" />
              <span>Company</span>
            </div>
          </div>
        ) : (
          <form className="login-form animate-fade-in" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input 
                type="text" 
                className="lux-input" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                className="lux-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-filled sign-in-btn">
              Enter System <ChevronRight size={18} />
            </button>
            <button type="button" className="back-btn" onClick={() => setStep('role')}>
              <ArrowLeft size={16} /> Back to Role Selection
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
