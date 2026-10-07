import React, { useState } from 'react';
import { Bell, Mail, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import NotificationPanel from './NotificationPanel';
import './TopBar.css';

const TopBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="top-bar">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search for opportunities..." className="lux-search" />
      </div>

      <div className="top-actions">
        <div className="notification-wrapper">
          <button 
            className="action-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
        </div>
        
        <button className="action-btn">
          <Mail size={20} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
