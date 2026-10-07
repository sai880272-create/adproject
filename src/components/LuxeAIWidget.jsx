import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import './LuxeAIWidget.css';

const LuxeAIWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I am LuxeAI. How can I assist you with your career goals today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI Response
    setTimeout(() => {
      const botMsg = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: `I've analyzed your query about "${input}". Based on current market trends, I suggest focusing on building a strong portfolio and networking with industry leaders.` 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="ai-widget-container">
      {isOpen && (
        <div className="ai-chat-window animate-slide-up">
          <div className="ai-header">
            <div className="flex items-center gap-10">
              <Bot size={20} color="var(--gold-primary)" />
              <span>LuxeAI Assistant</span>
            </div>
            <X size={20} className="close-btn" onClick={() => setIsOpen(false)} />
          </div>
          
          <div className="ai-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`ai-msg ${msg.type === 'bot' ? 'ai-msg-bot' : 'ai-msg-user'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-input-area">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button className="ai-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <Bot size={28} />
      </button>
    </div>
  );
};

export default LuxeAIWidget;
