import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ArrowLeft } from 'lucide-react';

const StudentReviews = () => {
  const { companies, reviews } = useApp();
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleViewDetails = (companyName) => {
    setSelectedCompany(companyName);
  };

  const handleBack = () => {
    setSelectedCompany(null);
  };

  if (selectedCompany) {
    const companyReviews = reviews.filter(r => r.company === selectedCompany);
    return (
      <div className="page-content animate-fade-in">
        <button className="btn" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleBack}>
          <ArrowLeft size={16} /> Back to All Reviews
        </button>
        
        <h3>Reviews for {selectedCompany}</h3>
        
        <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
          {companyReviews.length > 0 ? companyReviews.map(review => (
            <div key={review.id} className="card">
              <div className="flex justify-between items-center">
                <h4 style={{ color: '#fff' }}>{review.title}</h4>
                <div style={{ color: 'var(--gold-primary)', display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < review.rating ? 'var(--gold-primary)' : 'none'} color="var(--gold-primary)" />
                  ))}
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', margin: '15px 0', lineHeight: '1.6' }}>"{review.comment}"</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right', fontStyle: 'italic' }}>- {review.author}</p>
            </div>
          )) : (
            <div className="card">
              <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No reviews found for {selectedCompany} yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3><Star size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Browse Reviews</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Read reviews from fellow students to learn about company culture, interview processes, and more.
        </p>
      </div>

      <div className="card">
        <table className="lux-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Overall Rating</th>
              <th>Reviews</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(comp => (
              <tr key={comp.id}>
                <td>{comp.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Star size={14} fill="var(--gold-primary)" color="var(--gold-primary)" />
                    {comp.rating} / 5
                  </div>
                </td>
                <td>{comp.reviewCount}</td>
                <td>
                  <button className="btn" style={{ padding: '5px 10px', fontSize: '0.7rem' }} onClick={() => handleViewDetails(comp.name)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentReviews;
