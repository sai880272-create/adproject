import React from 'react';
import { useApp } from '../context/AppContext';
import { DollarSign, CheckCircle, XCircle, ShieldAlert } from 'lucide-react';

const OfferManagement = () => {
  const { offers, addNotification, updateOfferStatus } = useApp();

  const handleAction = (offerId, company, action) => {
    updateOfferStatus(offerId, action);
    addNotification({
      type: action === 'Accepted' ? 'success' : 'info',
      text: `Offer from ${company} ${action.toLowerCase()}.`
    });
    alert(`Offer ${action}`);
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3><DollarSign size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Your Job Offers</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Manage all your job offers in one place. Congratulations on your success!
        </p>
      </div>

      <div className="card">
        <table className="lux-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Date Received</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.length > 0 ? offers.map(offer => (
              <tr key={offer.id}>
                <td>{offer.company}</td>
                <td>{offer.title}</td>
                <td>{offer.salary}</td>
                <td>{offer.date}</td>
                <td><span className={`badge ${offer.status === 'Accepted' ? 'badge-success' : 'badge-pending'}`}>{offer.status}</span></td>
                <td>
                   <div style={{ display: 'flex', gap: '5px' }}>
                     <button className="btn" style={{ padding: '5px 10px', fontSize: '0.7rem' }} onClick={() => handleAction(offer.id, offer.company, 'Accepted')}>Accept</button>
                     <button className="btn btn-danger" style={{ padding: '5px 10px', fontSize: '0.7rem' }} onClick={() => handleAction(offer.id, offer.company, 'Declined')}>Decline</button>
                   </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>No offers received yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfferManagement;
