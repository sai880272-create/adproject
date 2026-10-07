import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Download, Plus, Trash2, Eye, FileText, User, Mail, Phone, Globe, Linkedin, Briefcase, GraduationCap, Award, Star } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeBuilder = () => {
  const { currentUser, studentProfile } = useApp();
  const resumeRef = useRef();
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    title: 'Software Engineer',
    email: `${currentUser?.name?.toLowerCase().replace(' ', '.')}@university.edu`,
    phone: '+1 234 567 890',
    website: 'yourportfolio.com',
    linkedin: 'linkedin.com/in/yourprofile',
    summary: 'Highly motivated student with a strong foundation in computer science and a passion for building innovative solutions. Seeking to leverage my technical skills and academic background to contribute to a dynamic engineering team.',
    skills: ['React', 'JavaScript', 'Node.js', 'Python', 'SQL'],
    languages: ['English (Fluent)', 'Spanish (Level B2)'],
    hobbies: ['Photography', 'Open Source Contributor'],
    experience: [
      { company: 'Tech Solutions Inc.', role: 'Software Engineer Intern', dates: 'Jun 2023 - Aug 2023', desc: '• Developed and maintained frontend components using React.\n• Assisted in optimizing API response times by 15%.\n• Collaborated with senior engineers on system architecture.' }
    ],
    education: [
      { school: 'University of Excellence', degree: 'B.S. in Computer Science', dates: '2020 - 2024' }
    ],
    projects: [
      { title: 'AI Matching Platform', desc: 'A full-stack application that matches talent with organizations using machine learning.' }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (type, index, value) => {
    const newArr = [...formData[type]];
    newArr[index] = value;
    setFormData(prev => ({ ...prev, [type]: newArr }));
  };

  const handleObjectArrayChange = (type, index, field, value) => {
    const newArr = [...formData[type]];
    newArr[index] = { ...newArr[index], [field]: value };
    setFormData(prev => ({ ...prev, [type]: newArr }));
  };

  const addItem = (type, defaultValue) => {
    setFormData(prev => ({ ...prev, [type]: [...prev[type], defaultValue] }));
  };

  const removeItem = (type, index) => {
    const newArr = formData[type].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [type]: newArr }));
  };

  const handleDownload = async () => {
    alert('Generating PDF... This may take a few seconds.');
    const element = document.getElementById('resume-pdf-content');
    const canvas = await html2canvas(element, { scale: 3, useCORS: true });
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${formData.name.replace(' ', '_')}_Resume.pdf`);
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="flex justify-between items-center mb-20">
        <div className="card" style={{ flex: 1, marginRight: '20px' }}>
          <h3><FileText size={20} style={{ marginRight: '10px' }} /> Build Your Modern Resume</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Fill in your details below. The preview updates in real-time.</p>
        </div>
        <div className="flex gap-10">
          <button className="btn" onClick={() => setShowPreview(!showPreview)}>
            <Eye size={18} style={{ marginRight: '8px' }} /> {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button className="btn btn-filled" onClick={handleDownload}>
            <Download size={18} style={{ marginRight: '8px' }} /> Download PDF
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: showPreview ? '1fr 1.2fr' : '1fr', gap: '30px' }}>
        {/* FORM SIDE */}
        <div className="resume-form-scrollable" style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '10px' }}>
          <div className="card">
            <h4><User size={18} className="text-gold mr-10" /> Personal Details</h4>
            <div className="input-group mt-15">
              <label>Full Name</label>
              <input type="text" name="name" className="lux-input" value={formData.name} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Professional Title</label>
              <input type="text" name="title" className="lux-input" value={formData.title} onChange={handleChange} />
            </div>
            <div className="flex gap-10">
              <div className="input-group" style={{ flex: 1 }}><label>Email</label><input type="email" name="email" className="lux-input" value={formData.email} onChange={handleChange} /></div>
              <div className="input-group" style={{ flex: 1 }}><label>Phone</label><input type="text" name="phone" className="lux-input" value={formData.phone} onChange={handleChange} /></div>
            </div>
            <div className="flex gap-10">
              <div className="input-group" style={{ flex: 1 }}><label>Website</label><input type="text" name="website" className="lux-input" value={formData.website} onChange={handleChange} /></div>
              <div className="input-group" style={{ flex: 1 }}><label>LinkedIn</label><input type="text" name="linkedin" className="lux-input" value={formData.linkedin} onChange={handleChange} /></div>
            </div>
          </div>

          <div className="card">
            <h4><Award size={18} className="text-gold mr-10" /> Profile Summary</h4>
            <div className="input-group mt-15">
              <textarea name="summary" className="lux-input" rows="4" value={formData.summary} onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center">
              <h4><Star size={18} className="text-gold mr-10" /> Key Skills</h4>
              <button className="btn" style={{ padding: '5px 10px' }} onClick={() => addItem('skills', '')}><Plus size={14} /></button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
              {formData.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-5">
                  <input type="text" className="lux-input" style={{ width: '120px' }} value={skill} onChange={(e) => handleArrayChange('skills', i, e.target.value)} />
                  <Trash2 size={16} className="text-danger cursor-pointer" onClick={() => removeItem('skills', i)} />
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center">
              <h4><Briefcase size={18} className="text-gold mr-10" /> Work Experience</h4>
              <button className="btn" style={{ padding: '5px 10px' }} onClick={() => addItem('experience', { company: '', role: '', dates: '', desc: '' })}><Plus size={14} /></button>
            </div>
            {formData.experience.map((exp, i) => (
              <div key={i} className="resume-section-item mt-15" style={{ padding: '15px', border: '1px solid #333' }}>
                <div className="flex justify-between"><h5>#{i + 1} Job</h5> <Trash2 size={16} className="text-danger cursor-pointer" onClick={() => removeItem('experience', i)} /></div>
                <input type="text" placeholder="Company" className="lux-input mt-10" value={exp.company} onChange={(e) => handleObjectArrayChange('experience', i, 'company', e.target.value)} />
                <div className="flex gap-10 mt-10">
                  <input type="text" placeholder="Role" className="lux-input" style={{ flex: 1 }} value={exp.role} onChange={(e) => handleObjectArrayChange('experience', i, 'role', e.target.value)} />
                  <input type="text" placeholder="Dates" className="lux-input" style={{ flex: 1 }} value={exp.dates} onChange={(e) => handleObjectArrayChange('experience', i, 'dates', e.target.value)} />
                </div>
                <textarea placeholder="Description" className="lux-input mt-10" rows="3" value={exp.desc} onChange={(e) => handleObjectArrayChange('experience', i, 'desc', e.target.value)}></textarea>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="flex justify-between items-center">
              <h4><GraduationCap size={18} className="text-gold mr-10" /> Education</h4>
              <button className="btn" style={{ padding: '5px 10px' }} onClick={() => addItem('education', { school: '', degree: '', dates: '' })}><Plus size={14} /></button>
            </div>
            {formData.education.map((edu, i) => (
              <div key={i} className="resume-section-item mt-15" style={{ padding: '15px', border: '1px solid #333' }}>
                <div className="flex justify-between"><h5>#{i + 1} Education</h5> <Trash2 size={16} className="text-danger cursor-pointer" onClick={() => removeItem('education', i)} /></div>
                <input type="text" placeholder="University" className="lux-input mt-10" value={edu.school} onChange={(e) => handleObjectArrayChange('education', i, 'school', e.target.value)} />
                <div className="flex gap-10 mt-10">
                  <input type="text" placeholder="Degree" className="lux-input" style={{ flex: 1 }} value={edu.degree} onChange={(e) => handleObjectArrayChange('education', i, 'degree', e.target.value)} />
                  <input type="text" placeholder="Dates" className="lux-input" style={{ flex: 1 }} value={edu.dates} onChange={(e) => handleObjectArrayChange('education', i, 'dates', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PREVIEW SIDE */}
        <div style={{ display: showPreview ? 'block' : 'none', position: 'sticky', top: '20px' }}>
          <div id="resume-pdf-content" style={{ background: '#fff', color: '#333', minHeight: '80vh', padding: '40px', boxShadow: '0 0 20px rgba(0,0,0,0.5)', fontFamily: 'serif' }}>
            <div style={{ display: 'flex', gap: '30px', minHeight: '100%' }}>
              {/* Left Column */}
              <div style={{ width: '35%', background: '#2c3e50', color: '#f0f0f0', padding: '25px', borderRadius: '4px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <div style={{ width: '100px', height: '100px', background: '#34495e', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={48} color="#D4AF37" />
                  </div>
                  <h2 style={{ fontSize: '1.4rem', marginTop: '15px', color: '#fff' }}>{formData.name || 'Your Name'}</h2>
                  <p style={{ color: '#D4AF37', fontSize: '0.9rem', textTransform: 'uppercase' }}>{formData.title}</p>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ borderBottom: '1px solid #D4AF37', paddingBottom: '5px', marginBottom: '10px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Contact</h4>
                  <p style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}><Mail size={12} color="#D4AF37" /> {formData.email}</p>
                  <p style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}><Phone size={12} color="#D4AF37" /> {formData.phone}</p>
                  <p style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}><Globe size={12} color="#D4AF37" /> {formData.website}</p>
                  <p style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Linkedin size={12} color="#D4AF37" /> {formData.linkedin}</p>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ borderBottom: '1px solid #D4AF37', paddingBottom: '5px', marginBottom: '10px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Skills</h4>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem' }}>
                    {formData.skills.map((s, i) => (
                      <li key={i} style={{ marginBottom: '5px' }}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div style={{ width: '65%', padding: '10px' }}>
                <h4 style={{ color: '#2c3e50', borderBottom: '2px solid #D4AF37', paddingBottom: '5px', marginBottom: '15px', textTransform: 'uppercase' }}>Professional Summary</h4>
                <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '30px', lineHeight: '1.4' }}>{formData.summary}</p>

                <h4 style={{ color: '#2c3e50', borderBottom: '2px solid #D4AF37', paddingBottom: '5px', marginBottom: '15px', textTransform: 'uppercase' }}>Work Experience</h4>
                {formData.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'baseline' }}>
                      <strong style={{ fontSize: '1rem', color: '#000' }}>{exp.role}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: 'auto' }}>{exp.dates}</span>
                    </div>
                    <div style={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 'bold' }}>{exp.company}</div>
                    <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '5px', whiteSpace: 'pre-line' }}>{exp.desc}</p>
                  </div>
                ))}

                <h4 style={{ color: '#2c3e50', borderBottom: '2px solid #D4AF37', paddingBottom: '5px', marginBottom: '15px', textTransform: 'uppercase' }}>Education</h4>
                {formData.education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'baseline' }}>
                      <strong style={{ fontSize: '1rem', color: '#000' }}>{edu.degree}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: 'auto' }}>{edu.dates}</span>
                    </div>
                    <div style={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 'bold' }}>{edu.school}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
