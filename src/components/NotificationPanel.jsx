import React from 'react';
import { useApp } from '../context/AppContext';
import { Info, CheckCircle, AlertTriangle, X } from 'lucide-react';
import './NotificationPanel.css';

const NotificationPanel = ({ onClose }) => {
  const { notifications } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} color="#4caf50" />;
      case 'warning': return <AlertTriangle size={18} color="#ff9800" />;
      case 'error': return <AlertTriangle size={18} color="#ef5350" />;
      default: return <Info size={18} color="#D4AF37" />;
    }
  };

  return (
    <div className="notification-panel card">
      <div className="notification-header">
        <h4>Notifications</h4>
        <X size={18} className="close-btn" onClick={onClose} />
      </div>

      <div className="notification-list">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div key={n.id} className={`notification-item ${n.read ? '' : 'unread'}`}>
              <div className="notification-content">
                <div className="notif-icon-wrap">{getIcon(n.type)}</div>
                <div className="notif-text-wrap">
                  <p className="notif-text">{n.text}</p>
                  <span className="notif-time">{n.time}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-notif">No new notifications</p>
        )}
      </div>

      <div className="notification-footer">
        <button className="view-all-btn">Mark all as read</button>
      </div>
    </div>
  );
};

export default NotificationPanel;
