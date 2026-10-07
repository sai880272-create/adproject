import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  BarChart2, Briefcase, FileText, Star, Bot, 
  BookOpen, FileEdit, DollarSign, Video, 
  PlusCircle, Users, Building, Cpu, LogOut, Search, Calendar, PenTool
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const getMenuItems = () => {
    if (currentUser?.role === 'student') {
      return [
        { path: '/student/dashboard', label: 'Overview', icon: <BarChart2 size={20} /> },
        { path: '/student/jobs', label: 'Available Jobs', icon: <Briefcase size={20} /> },
        { path: '/student/applications', label: 'My Applications', icon: <FileText size={20} /> },
        { path: '/student/reviews', label: 'Company Reviews', icon: <Star size={20} /> },
        { path: '/student/ai-matching', label: 'AI Job Matching', icon: <Bot size={20} /> },
        { path: '/student/interview-prep', label: 'Interview Prep', icon: <BookOpen size={20} /> },
        { path: '/student/resume-builder', label: 'Resume Builder', icon: <FileEdit size={20} /> },
        { path: '/student/offers', label: 'Offer Management', icon: <DollarSign size={20} /> },
        { path: '/student/video-interviews', label: 'Video Interviews', icon: <Video size={20} /> }
      ];
    } else if (currentUser?.role === 'admin') {
      return [
        { path: '/admin/dashboard', label: 'Overview', icon: <BarChart2 size={20} /> },
        { path: '/admin/post-job', label: 'Post New Job', icon: <PlusCircle size={20} /> },
        { path: '/admin/manage-apps', label: 'Applications', icon: <Users size={20} /> },
        { path: '/admin/companies', label: 'Companies', icon: <Building size={20} /> },
        { path: '/admin/technologies', label: 'Technologies', icon: <Cpu size={20} /> }
      ];
    } else if (currentUser?.role === 'company') {
      return [
        { path: '/company/dashboard', label: 'Dashboard', icon: <Building size={20} /> },
        { path: '/company/applicants', label: 'Applicants', icon: <Users size={20} /> },
        { path: '/company/smart-search', label: 'Smart Search', icon: <Search size={20} /> },
        { path: '/company/scheduler', label: 'Scheduler', icon: <Calendar size={20} /> },
        { path: '/company/offer-generator', label: 'Offer Gen', icon: <PenTool size={20} /> }
      ];
    }
    return [];
  };

  const menuItems = getMenuItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="brand">JOB MATCH</h2>
      </div>
      
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="user-profile">
        <img src="https://picsum.photos/seed/luxe/100/100" alt="Avatar" className="avatar" />
        <div className="user-info">
          <p className="user-name">{currentUser?.name}</p>
          <p className="user-role">{currentUser?.role}</p>
        </div>
        <button className="logout-btn" onClick={logout} title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
