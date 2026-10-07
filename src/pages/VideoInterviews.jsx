import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Camera, Clock, CheckCircle, UserRound } from 'lucide-react';

const VideoInterviews = () => {
  const [activeCall, setActiveCall] = useState(false);
  const [cameraTest, setCameraTest] = useState(false);
  
  const [stream, setStream] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  
  // AI Interview State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [aiScore, setAiScore] = useState(85);
  const [feedback, setFeedback] = useState("Analyzing expressions...");
  
  const testVideoRef = useRef(null);
  const callVideoRef = useRef(null);

  const interviewQuestions = [
    "Tell me about a time you overcame a difficult challenge.",
    "How do you handle working under tight deadlines?",
    "Describe your experience with React and modern web development.",
    "Where do you see your career heading in the next 5 years?",
    "Thank you. We will review your interview and get back to you."
  ];

  // Stop any active streams when unmounting
  useEffect(() => {
    return () => {
      stopMediaTracks();
    };
  }, []);

  const stopMediaTracks = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
  };

  const startMediaStream = async (videoRef) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsVideoEnabled(mediaStream.getVideoTracks()[0]?.enabled ?? false);
      setIsAudioEnabled(mediaStream.getAudioTracks()[0]?.enabled ?? false);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      alert('Could not access camera or microphone. Please check permissions.');
    }
  };

  const startTest = async () => {
    setCameraTest(true);
  };

  // Initialize stream for the test video
  useEffect(() => {
    if (cameraTest && testVideoRef.current && !stream) {
      startMediaStream(testVideoRef);
    } else if (!cameraTest && !activeCall) {
      stopMediaTracks();
    }
  }, [cameraTest]);

  // Initialize stream for the call video
  useEffect(() => {
    if (activeCall && callVideoRef.current && !stream) {
      startMediaStream(callVideoRef);
    } else if (!activeCall && !cameraTest) {
      stopMediaTracks();
    }
  }, [activeCall]);

  // AI Interview Simulation
  useEffect(() => {
    let questionTimer;
    let analysisTimer;
    if (activeCall) {
      setCurrentQuestionIndex(0);
      setAiScore(85);
      setFeedback("Analyzing expressions...");
      
      questionTimer = setInterval(() => {
        setCurrentQuestionIndex(prev => {
          if (prev < interviewQuestions.length - 1) return prev + 1;
          return prev;
        });
      }, 15000); // Change question every 15 seconds

      const feedbacks = ["Good eye contact", "Clear articulation detected", "Positive sentiment", "Maintain posture", "Strong confidence detected", "Smiling detected"];
      analysisTimer = setInterval(() => {
        setAiScore(prev => Math.min(100, Math.max(0, prev + (Math.floor(Math.random() * 7) - 3))));
        setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
      }, 4000);
    }
    return () => {
      clearInterval(questionTimer);
      clearInterval(analysisTimer);
    };
  }, [activeCall]);

  const handleJoinRoom = () => {
    stopMediaTracks();
    setCameraTest(false);
    setActiveCall(true);
  };

  const handleEndCall = () => {
    setActiveCall(false);
    stopMediaTracks();
  };

  const handleStopTest = () => {
    setCameraTest(false);
    stopMediaTracks();
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  if (activeCall) {
    return (
      <div className="page-content animate-fade-in">
        <div className="card" style={{ height: '80vh', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden', background: '#111' }}>
          <div style={{ flexGrow: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* AI Interview Question Overlay */}
            <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '80%', zIndex: 10, background: 'rgba(0,0,0,0.8)', padding: '15px', borderRadius: '8px', border: '1px solid var(--gold-dim)', textAlign: 'center' }}>
               <h4 style={{ color: 'var(--gold-primary)', margin: 0 }}>Question {currentQuestionIndex + 1} of {interviewQuestions.length}</h4>
               <p style={{ color: '#fff', fontSize: '1.2rem', marginTop: '10px' }}>{interviewQuestions[currentQuestionIndex]}</p>
            </div>

            <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid var(--gold-dim)', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
               <UserRound size={64} style={{ color: 'var(--text-muted)' }} />
            </div>
            <h3 style={{ marginTop: '20px', color: 'var(--gold-primary)' }}>AI Interviewer</h3>
            <p style={{ color: 'var(--success)', marginTop: '5px' }}><Mic size={14} /> Voice Active</p>
            
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '240px', aspectRatio: '16/9', background: '#000', border: '2px solid #444', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
               <video 
                 ref={callVideoRef} 
                 autoPlay 
                 playsInline 
                 muted 
                 style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', display: isVideoEnabled ? 'block' : 'none' }}
               />
               {!isVideoEnabled && (
                 <div style={{ color: '#fff', fontSize: '0.8rem' }}>Camera Off</div>
               )}
            </div>

            {/* AI Real-time Feedback & Score */}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.8)', padding: '15px', borderRadius: '8px', border: '1px solid var(--gold-dim)', display: 'flex', flexDirection: 'column', gap: '5px', width: '280px' }}>
               <h4 style={{ color: '#fff', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase' }}>Live AI Analysis</h4>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                 <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Expression Score:</span>
                 <span style={{ color: aiScore >= 80 ? 'var(--success)' : aiScore >= 60 ? 'var(--gold-primary)' : 'var(--danger)', fontWeight: 'bold', fontSize: '1.2rem' }}>{aiScore}/100</span>
               </div>
               <div style={{ width: '100%', background: '#333', height: '6px', borderRadius: '3px', marginTop: '5px' }}>
                 <div style={{ width: `${aiScore}%`, background: aiScore >= 80 ? 'var(--success)' : aiScore >= 60 ? 'var(--gold-primary)' : 'var(--danger)', height: '100%', borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
               </div>
               <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <CheckCircle size={14} style={{ color: 'var(--gold-primary)' }} />
                 <span style={{ color: '#fff', fontSize: '0.85rem' }}>{feedback}</span>
               </div>
            </div>
          </div>
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', gap: '20px', background: 'var(--bg-panel)', borderTop: '1px solid #333' }}>
            <button 
              className={`btn ${!isAudioEnabled ? 'btn-danger' : ''}`} 
              style={{ borderRadius: '50%', width: '50px', height: '50px', padding: '0' }} 
              onClick={toggleAudio}
            >
              {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
            <button 
              className={`btn ${!isVideoEnabled ? 'btn-danger' : ''}`} 
              style={{ borderRadius: '50%', width: '50px', height: '50px', padding: '0' }} 
              onClick={toggleVideo}
            >
              {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
            </button>
            <button className="btn btn-danger" style={{ borderRadius: '50%', width: '50px', height: '50px', padding: '0' }} onClick={handleEndCall}><PhoneOff size={20} /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content animate-fade-in">
      <div className="card">
        <h3 style={{ textTransform: 'uppercase' }}><Video size={20} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> Video Interviews</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
          Connect with recruiters through integrated video interviews. Practice and record your answers here.
        </p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
        <div className="flex justify-between items-center">
          <div>
            <h4 style={{ color: '#fff', letterSpacing: '1px', textTransform: 'uppercase' }}>Upcoming: Technical Round</h4>
            <p style={{ color: 'var(--gold-primary)' }}>TechNova Inc.</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}><Clock size={14} style={{ marginRight: '5px' }} /> Starting in 10 minutes</p>
          </div>
          <button className="btn btn-filled" onClick={handleJoinRoom}>Join Room</button>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        {!cameraTest ? (
          <div>
            <VideoOff size={64} style={{ color: 'var(--text-muted)', marginBottom: '20px' }} />
            <h4 style={{ color: '#fff', letterSpacing: '1px', textTransform: 'uppercase' }}>Equipment Check</h4>
            <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px' }}>Ensure your camera and microphone are working before joining.</p>
            <button className="btn" onClick={startTest}><Camera size={18} style={{ marginRight: '8px' }} /> Test Camera</button>
          </div>
        ) : (
          <div style={{ padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '500px', height: '300px', background: '#000', borderRadius: '8px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
              <video 
                ref={testVideoRef} 
                autoPlay 
                playsInline 
                muted 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
              />
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '5px 10px', borderRadius: '15px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}>
                <CheckCircle size={14} /> System Ready
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
               <button className="btn btn-danger" onClick={handleStopTest}>Stop Test</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoInterviews;
