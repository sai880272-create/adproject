import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileSignature } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CompanyOfferGenerator = () => {
  const { currentUser, addNotification } = useApp();
  const [formData, setFormData] = useState({
    name: 'Alice Walker',
    email: 'alice.walker@example.com',
    position: 'Software Engineer',
    salary: '$120,000',
    startDate: '',
    template: 'Standard Engineering Offer',
    message: ''
  });

  const handleGenerateOffer = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.position || !formData.salary || !formData.startDate) {
      addNotification({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    addNotification({ type: 'info', text: 'Generating offer document...' });

    // Create a temporary hidden container to render the PDF content
    const letterContainer = document.createElement('div');
    letterContainer.style.width = '8.5in';
    letterContainer.style.padding = '0.75in';
    letterContainer.style.backgroundColor = 'white';
    letterContainer.style.color = '#333';
    letterContainer.style.fontFamily = 'Times, serif';
    letterContainer.style.fontSize = '12pt';
    letterContainer.style.position = 'absolute';
    letterContainer.style.left = '-9999px';
    letterContainer.style.lineHeight = '1.5';
    letterContainer.style.boxSizing = 'border-box';

    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const companyName = 'TechNova';

    letterContainer.innerHTML = `
      <div style="text-align: right; margin-bottom: 40px;">
          <h1 style="font-family: 'Cinzel', serif; color: #111; margin: 0; text-transform: uppercase;">${companyName}</h1>
          <p style="margin: 0;">123 Tech Avenue, Silicon Valley, CA 94105</p>
          <p style="margin: 0;">${dateStr}</p>
      </div>
      <div style="margin-bottom: 30px;">
          <p style="margin: 0;"><strong>Candidate:</strong> ${formData.name}</p>
          <p style="margin: 0;"><strong>Email:</strong> ${formData.email}</p>
      </div>
      <h2 style="text-align: center; font-family: 'Cinzel', serif; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; margin-bottom: 30px; text-transform: uppercase;">
          Offer of Employment
      </h2>
      <p>Dear ${formData.name},</p>
      <p>We are thrilled to offer you the position of <strong>${formData.position}</strong> at ${companyName}. We were extremely impressed by your skills and believe you will be a valuable addition to our team.</p>
      <p><strong>Compensation & Benefits:</strong><br>
      Your annual base salary will be <strong>${formData.salary}</strong>, paid in accordance with our standard payroll schedule. You will also be eligible for our comprehensive benefits package.</p>
      <p><strong>Start Date:</strong><br>
      Your anticipated start date will be <strong>${formData.startDate}</strong>.</p>
      ${formData.message ? `<p><strong>A personal note:</strong><br><em>"${formData.message}"</em></p>` : ''}
      <p>Please review this offer and let us know if you have any questions. We look forward to welcoming you to the team.</p>
      <div style="margin-top: 60px;">
          <p style="margin-bottom: 40px;">Sincerely,</p>
          <div style="width: 250px; border-bottom: 1px solid #333; margin-bottom: 5px;"></div>
          <p style="margin: 0;"><strong>${currentUser?.name || 'Hiring Manager'}</strong></p>
          <p style="margin: 0;">${companyName}</p>
      </div>
    `;

    document.body.appendChild(letterContainer);

    try {
      const canvas = await html2canvas(letterContainer, { scale: 2 });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'letter');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Offer_${formData.name.replace(/\s+/g, '_')}.pdf`);
      
      addNotification({ type: 'success', text: 'Offer generated and downloaded!' });
    } catch (err) {
      console.error(err);
      addNotification({ type: 'error', text: 'Failed to generate PDF' });
    } finally {
      document.body.removeChild(letterContainer);
    }
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3><FileSignature size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Generate Offer Letter</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Create and send official offer letters to selected candidates.
        </p>
      </div>
      <div className="card" style={{ maxWidth: '800px', margin: '20px auto' }}>
        <form onSubmit={handleGenerateOffer}>
          <div className="flex gap-20" style={{ marginBottom: '20px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Candidate Name</label>
              <input type="text" className="lux-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Candidate Email</label>
              <input type="email" className="lux-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
          <div className="flex gap-20" style={{ marginBottom: '20px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Position</label>
              <input type="text" className="lux-input" required value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Annual Salary</label>
              <input type="text" className="lux-input" required value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
            </div>
          </div>
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label>Proposed Start Date</label>
            <input type="date" className="lux-input" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
          </div>
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label>Offer Letter Template</label>
            <select className="lux-input" value={formData.template} onChange={e => setFormData({...formData, template: e.target.value})}>
              <option>Standard Engineering Offer</option>
              <option>Internship Offer Template</option>
              <option>Senior Role Offer Template</option>
            </select>
          </div>
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label>Custom Message</label>
            <textarea className="lux-input" rows="3" placeholder="Add a personal welcome message..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
          </div>
          <button type="submit" className="btn btn-filled" style={{ width: '100%' }}>Generate & Download Offer</button>
        </form>
      </div>
    </div>
  );
};

export default CompanyOfferGenerator;
