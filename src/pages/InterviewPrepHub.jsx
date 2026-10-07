import React, { useState } from 'react';
import { useNavigate } from 'react';
import { BookOpen, Mic, Code, Star, ArrowLeft, Download, Bot, Play, CheckCircle, FileText, X, Terminal, Sparkles, Send } from 'lucide-react';

const InterviewPrepHub = () => {
  const [view, setView] = useState('hub');

  // Mock Interview State
  const [mockType, setMockType] = useState(null); // 'behavioral' or 'technical'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [aiFeedback, setAiFeedback] = useState(null);

  // Coding Sandbox State
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [testOutput, setTestOutput] = useState(null);

  const mockQuestions = {
    behavioral: [
      "Tell me about a time when you had to manage tight deadlines for a complex project.",
      "Describe a situation where you had a conflict with a team member and how you resolved it.",
      "What is your greatest technical achievement and what key lesson did you learn from it?"
    ],
    technical: [
      "Explain how optimising database indices improves query latency, and when indexing might hurt performance.",
      "What is the difference between concurrency and parallelism? How does Java handle thread management?",
      "Describe how garbage collection works in modern runtimes (JVM / V8 JavaScript)."
    ]
  };

  const codingProblems = [
    {
      id: 'two-sum',
      name: 'Two Sum',
      diff: 'Easy',
      rate: '48.5%',
      desc: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
      starter: `// Java Solution\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[]{ map.get(diff), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`
    },
    {
      id: 'reverse-list',
      name: 'Reverse a Linked List',
      diff: 'Easy',
      rate: '72.1%',
      desc: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      starter: `// Java Solution\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n}`
    },
    {
      id: 'validate-bst',
      name: 'Validate Binary Search Tree',
      diff: 'Medium',
      rate: '35.9%',
      desc: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
      starter: `// Java Solution\nclass Solution {\n    public boolean isValidBST(TreeNode root) {\n        return validate(root, null, null);\n    }\n    private boolean validate(TreeNode node, Integer min, Integer max) {\n        if (node == null) return true;\n        if ((min != null && node.val <= min) || (max != null && node.val >= max)) return false;\n        return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n    }\n}`
    }
  ];

  const handleStartMock = (type) => {
    setMockType(type);
    setCurrentQuestionIdx(0);
    setUserResponse('');
    setAiFeedback(null);
  };

  const handleEvaluateAnswer = () => {
    if (!userResponse.trim()) {
      alert('Please enter or record your answer before submitting.');
      return;
    }
    setAiFeedback({
      score: 92,
      strengths: ['Clear structure and concise technical terminology.', 'Effectively explained key tradeoffs.'],
      improvements: ['Consider elaborating slightly more on edge-case error handling.'],
      overall: 'Excellent answer! You demonstrated strong technical competence and confident articulation.'
    });
  };

  const handleOpenSandbox = (challenge) => {
    setSelectedChallenge(challenge);
    setUserCode(challenge.starter);
    setTestOutput(null);
  };

  const handleRunCode = () => {
    setTestOutput({
      status: 'Passed',
      runtime: '2 ms',
      memory: '42.1 MB',
      cases: '3/3 Test Cases Passed Successfully! ✅'
    });
  };

  const renderHub = () => (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3><BookOpen size={20} style={{ marginRight: '10px' }} /> Preparation Resources</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Sharpen your skills and get ready for your next big interview with interactive tools.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ textAlign: 'left', padding: '25px' }}>
          <h4 style={{ color: '#fff' }}><FileText size={20} style={{ marginRight: '10px', color: 'var(--gold-primary)' }} /> Resume Building</h4>
          <p style={{ margin: '10px 0', color: 'var(--text-muted)' }}>Get tips and templates for creating a standout resume.</p>
          <button className="btn" onClick={() => setView('guides')}>View Guides</button>
        </div>
        <div className="stat-card" style={{ textAlign: 'left', padding: '25px' }}>
          <h4 style={{ color: '#fff' }}><Mic size={20} style={{ marginRight: '10px', color: 'var(--gold-primary)' }} /> Mock Interviews</h4>
          <p style={{ margin: '10px 0', color: 'var(--text-muted)' }}>Practice with AI-powered mock interviews and get instant feedback.</p>
          <button className="btn btn-filled" onClick={() => setView('mock')}>Start Practice</button>
        </div>
        <div className="stat-card" style={{ textAlign: 'left', padding: '25px' }}>
          <h4 style={{ color: '#fff' }}><Code size={20} style={{ marginRight: '10px', color: 'var(--gold-primary)' }} /> Coding Challenges</h4>
          <p style={{ margin: '10px 0', color: 'var(--text-muted)' }}>Solve challenges from real companies to test your abilities.</p>
          <button className="btn" onClick={() => setView('coding')}>Go to Challenges</button>
        </div>
      </div>

      <div className="card">
        <h3><Star size={20} style={{ marginRight: '10px' }} /> Interview Tips & Tricks</h3>
        <ul style={{ color: 'var(--text-muted)', marginTop: '15px', paddingLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>Research the Company:</strong> Understand their mission, products, and recent news.</li>
          <li><strong>Prepare Your Questions:</strong> Have thoughtful questions ready to ask the interviewer. It shows you're engaged.</li>
          <li><strong>Dress Professionally:</strong> First impressions matter, even for video calls.</li>
          <li><strong>Follow Up:</strong> Send a thank-you email within 24 hours of your interview.</li>
        </ul>
      </div>
    </div>
  );

  const renderGuides = () => (
    <div className="page-content animate-fade-in">
      <button className="btn" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setView('hub')}>
        <ArrowLeft size={16} /> Back to Hub
      </button>
      <div className="card">
        <h3><Star size={20} style={{ marginRight: '10px' }} /> Top Tips for a Winning Resume</h3>
      </div>
      <div className="stats-grid">
        <div className="stat-card" style={{ textAlign: 'left' }}>
          <h4 style={{ color: '#fff' }}>Use Action Verbs</h4>
          <p style={{ margin: '10px 0', color: 'var(--text-muted)' }}>Start bullet points with powerful verbs like "Orchestrated", "Engineered", "Accelerated".</p>
        </div>
        <div className="stat-card" style={{ textAlign: 'left' }}>
          <h4 style={{ color: '#fff' }}>Quantify Achievements</h4>
          <p style={{ margin: '10px 0', color: 'var(--text-muted)' }}>Instead of "Improved performance", write "Improved server response time by 15%".</p>
        </div>
        <div className="stat-card" style={{ textAlign: 'left' }}>
          <h4 style={{ color: '#fff' }}>Tailor to the Job</h4>
          <p style={{ margin: '10px 0', color: 'var(--text-muted)' }}>Highlight skills and experiences mentioned in the job description.</p>
        </div>
      </div>
      <div className="card flex gap-20">
        <button className="btn btn-filled" onClick={() => alert('📥 Resume Template Pack Downloaded!')}>
          <Download size={18} style={{ marginRight: '8px' }} /> Download Template Pack
        </button>
      </div>
    </div>
  );

  const renderMock = () => (
    <div className="page-content animate-fade-in">
      <button className="btn" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { setView('hub'); setMockType(null); }}>
        <ArrowLeft size={16} /> Back to Hub
      </button>

      {!mockType ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <Bot size={64} style={{ color: 'var(--gold-primary)', marginBottom: '20px' }} />
          <h3 style={{ color: '#fff' }}>Interactive AI Practice Interview</h3>
          <p style={{ color: 'var(--text-muted)', margin: '10px 0 30px' }}>Choose your interview track below to start receiving real-time questions & AI scoring.</p>
          <div className="flex gap-20" style={{ justifyContent: 'center' }}>
            <button className="btn btn-filled" style={{ padding: '15px 30px' }} onClick={() => handleStartMock('behavioral')}>Behavioral Track</button>
            <button className="btn" style={{ padding: '15px 30px' }} onClick={() => handleStartMock('technical')}>Technical Track</button>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--gold-primary)', textTransform: 'capitalize' }}>{mockType} Interview • Question {currentQuestionIdx + 1} of {mockQuestions[mockType].length}</h4>
            <button className="btn" onClick={() => setMockType(null)}>Change Track</button>
          </div>

          <div style={{ background: 'var(--bg-panel-lighter)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>"{mockQuestions[mockType][currentQuestionIdx]}"</p>
          </div>

          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px' }}>Your Response / Speech Script</label>
            <textarea 
              className="lux-input" 
              rows="5" 
              placeholder="Type your response or use voice input..." 
              value={userResponse} 
              onChange={e => setUserResponse(e.target.value)} 
            />
          </div>

          <div className="flex gap-15" style={{ marginBottom: '20px' }}>
            <button className="btn btn-filled" onClick={handleEvaluateAnswer}>
              <Sparkles size={16} style={{ marginRight: '8px' }} /> Analyze Answer with AI
            </button>
            {currentQuestionIdx < mockQuestions[mockType].length - 1 && (
              <button className="btn" onClick={() => { setCurrentQuestionIdx(prev => prev + 1); setUserResponse(''); setAiFeedback(null); }}>
                Next Question →
              </button>
            )}
          </div>

          {aiFeedback && (
            <div className="card" style={{ background: '#0F172A', border: '1px solid var(--gold-primary)', marginTop: '20px' }}>
              <h4 style={{ color: 'var(--gold-primary)', marginBottom: '10px' }}>📊 AI Evaluation Report (Score: {aiFeedback.score}/100)</h4>
              <p style={{ color: '#fff', marginBottom: '15px' }}>{aiFeedback.overall}</p>
              
              <strong style={{ color: 'var(--success)' }}>Strengths:</strong>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '20px', marginBottom: '10px' }}>
                {aiFeedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>

              <strong style={{ color: 'var(--gold-primary)' }}>Suggested Enhancements:</strong>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '20px' }}>
                {aiFeedback.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderCoding = () => (
    <div className="page-content animate-fade-in">
      <button className="btn" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setView('hub')}>
        <ArrowLeft size={16} /> Back to Hub
      </button>
      <div className="card">
        <h3><Code size={20} style={{ marginRight: '10px' }} /> Test Your Problem-Solving Skills</h3>
      </div>
      <div className="card">
        <table className="lux-table">
          <thead>
            <tr>
              <th>Challenge</th>
              <th>Difficulty</th>
              <th>Success Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {codingProblems.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td><span className={`badge ${c.diff === 'Easy' ? 'badge-success' : 'badge-pending'}`}>{c.diff}</span></td>
                <td>{c.rate}</td>
                <td>
                  <button className="btn btn-filled" style={{ padding: '5px 10px', fontSize: '0.75rem' }} onClick={() => handleOpenSandbox(c)}>
                    Start Challenge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CODING SANDBOX MODAL */}
      {selectedChallenge && (
        <div className="modal-overlay" style={overlayStyle} onClick={() => setSelectedChallenge(null)}>
          <div className="modal-content card" style={sandboxModalStyle} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ borderBottom: '1px solid #334155', paddingBottom: '15px', marginBottom: '15px' }}>
              <div>
                <h3 style={{ color: '#fff' }}>{selectedChallenge.name}</h3>
                <span className={`badge ${selectedChallenge.diff === 'Easy' ? 'badge-success' : 'badge-pending'}`} style={{ marginTop: '4px' }}>{selectedChallenge.diff}</span>
              </div>
              <button className="btn" style={{ padding: '5px 10px', borderRadius: '50%' }} onClick={() => setSelectedChallenge(null)}><X size={18} /></button>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '15px' }}>{selectedChallenge.desc}</p>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: 'var(--gold-primary)', marginBottom: '5px', fontSize: '0.85rem' }}>Code Editor (Java / JavaScript)</label>
              <textarea 
                className="lux-input" 
                rows="10" 
                style={{ fontFamily: 'monospace', fontSize: '0.9rem', background: '#0F172A' }} 
                value={userCode} 
                onChange={e => setUserCode(e.target.value)} 
              />
            </div>

            <div className="flex justify-between items-center" style={{ borderTop: '1px solid #334155', paddingTop: '15px' }}>
              <button className="btn" onClick={() => setSelectedChallenge(null)}>Close</button>
              <button className="btn btn-filled" onClick={handleRunCode}>
                <Play size={16} style={{ marginRight: '6px' }} /> Run & Submit Code
              </button>
            </div>

            {testOutput && (
              <div style={{ marginTop: '15px', background: '#090D16', padding: '15px', borderRadius: '6px', border: '1px solid var(--success)' }}>
                <div className="flex items-center gap-10" style={{ color: 'var(--success)', fontWeight: 'bold' }}>
                  <CheckCircle size={18} /> {testOutput.cases}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' }}>
                  Runtime: {testOutput.runtime} | Memory Usage: {testOutput.memory}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  switch(view) {
    case 'guides': return renderGuides();
    case 'mock': return renderMock();
    case 'coding': return renderCoding();
    default: return renderHub();
  }
};

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)',
  zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
};

const sandboxModalStyle = {
  width: '100%', maxWidth: '750px', backgroundColor: '#1E293B', borderRadius: '12px', border: '1px solid #334155', padding: '25px'
};

export default InterviewPrepHub;
