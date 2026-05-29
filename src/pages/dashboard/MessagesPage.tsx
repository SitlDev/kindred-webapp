import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { mockServer } from '../../services/mockData';
import type { User, Message } from '../../types';
import { Send, CheckCircle, Award, UserX, X, PenTool } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export default function MessagesPage() {
  const { user } = useAuthStore();
  const [searchParams] = useSearchParams();
  const targetUserId = searchParams.get('userId') || '';
  const initialAction = searchParams.get('action') || '';

  // State
  const [threads, setThreads] = useState<{ otherUser: User; lastMsg: Message }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsgContent, setNewMsgContent] = useState('');
  const [loadingThreads, setLoadingThreads] = useState(false);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Premium Covenant Builder States
  const [showCovenantPanel, setShowCovenantPanel] = useState(false);
  const [covTeach, setCovTeach] = useState('');
  const [covLearn, setCovLearn] = useState('');
  const [covFrequency, setCovFrequency] = useState('Weekly');
  const [covDuration, setCovDuration] = useState('3 Months');
  const [senderSignature, setSenderSignature] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Recipient Covenant Signing States
  const [activeSigningMessageId, setActiveSigningMessageId] = useState<string | null>(null);
  const recipientCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecipientDrawing, setIsRecipientDrawing] = useState(false);
  const [recipientSignature, setRecipientSignature] = useState('');

  // Auto fill covenant details on selection
  useEffect(() => {
    if (user && user.skills) {
      setCovTeach(user.skills.slice(0, 3).join(', '));
    }
    const otherUser = threads.find(t => t.otherUser.id === selectedUserId)?.otherUser;
    if (otherUser && otherUser.skills) {
      setCovLearn(otherUser.skills.slice(0, 3).join(', '));
    } else {
      setCovLearn('');
    }
    setSenderSignature('');
    setRecipientSignature('');
    setActiveSigningMessageId(null);
  }, [selectedUserId, user, threads.length]);

  // Proposer Signature Handlers
  const handleStartDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#1D2B1E'; // Dark Sage
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const rect = canvas.getBoundingClientRect();
    let x = 0;
    let y = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x = 0;
    let y = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
      if (e.cancelable) e.preventDefault();
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleStopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    if (canvas) {
      setSenderSignature(canvas.toDataURL());
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSenderSignature('');
  };

  // Recipient Signature Handlers
  const handleStartRecipientDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = recipientCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#3D5941'; // Sage Accent
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const rect = canvas.getBoundingClientRect();
    let x = 0;
    let y = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsRecipientDrawing(true);
  };

  const handleRecipientDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isRecipientDrawing) return;
    const canvas = recipientCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x = 0;
    let y = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
      if (e.cancelable) e.preventDefault();
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleStopRecipientDrawing = () => {
    if (!isRecipientDrawing) return;
    setIsRecipientDrawing(false);
    
    const canvas = recipientCanvasRef.current;
    if (canvas) {
      setRecipientSignature(canvas.toDataURL());
    }
  };

  const handleClearRecipientCanvas = () => {
    const canvas = recipientCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setRecipientSignature('');
  };

  const handleSendCovenant = async () => {
    if (!user || !selectedUserId) return;
    if (!covTeach.trim() || !covLearn.trim()) {
      toast.error('Please specify both skills to teach and skills to learn.');
      return;
    }
    if (!senderSignature) {
      toast.error('Please sign on the signature pad to bind your covenant proposal.');
      return;
    }

    setSending(true);
    try {
      const skillsFocus = [
        ...covTeach.split(',').map(s => s.trim()).filter(Boolean),
        ...covLearn.split(',').map(s => s.trim()).filter(Boolean)
      ];

      // Propose relationship first
      const rel = await mockServer.requestMentoring(selectedUserId, user.id, skillsFocus);

      // Create covenant message
      const agreement_data = {
        relationship_id: rel.id,
        skills: skillsFocus,
        frequency: `${covFrequency} (${covDuration})`,
        status: 'pending' as const,
        sender_signature: senderSignature
      };

      await mockServer.sendMessage(
        user.id,
        selectedUserId,
        `I proposed a new reciprocal mentoring covenant! Nurturing our mutual development in ${skillsFocus.slice(0, 4).join(', ')}.`,
        agreement_data
      );

      toast.success('Reciprocity Covenant proposed!');
      setShowCovenantPanel(false);
      setSenderSignature('');
      await loadThreads();
      await loadMessages();
    } catch (err) {
      toast.error('Failed to propose reciprocity covenant.');
    } finally {
      setSending(false);
    }
  };

  // Load all threads
  const loadThreads = async () => {
    if (!user) return;
    setLoadingThreads(true);
    try {
      const allMsgs = await mockServer.getMessages(user.id);
      const mentorsList = await mockServer.getMentors({});
      
      // Filter distinct other users who we have messages with
      const distinctUsersMap = new Map<string, { otherUser: User; lastMsg: Message }>();
      
      allMsgs.forEach(msg => {
        const otherId = msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
        // Find other user details
        const details = mentorsList.find(m => m.id === otherId) || (otherId === 'user-guest' ? {
          id: 'user-guest',
          display_name: 'Jane D. (Guest)',
          profile_photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          job_title: 'Junior Developer',
          company_name: 'Kindred Guest'
        } as User : null);
        
        if (details) {
          const existing = distinctUsersMap.get(otherId);
          if (!existing || new Date(msg.created_at) > new Date(existing.lastMsg.created_at)) {
            distinctUsersMap.set(otherId, { otherUser: details, lastMsg: msg });
          }
        }
      });

      const threadList = Array.from(distinctUsersMap.values()).sort(
        (a, b) => new Date(b.lastMsg.created_at).getTime() - new Date(a.lastMsg.created_at).getTime()
      );
      
      setThreads(threadList);
      
      // Auto select thread if specified in search params
      if (targetUserId) {
        setSelectedUserId(targetUserId);
        
        // Check if there is already a thread, if not create a temporary listing
        const exists = threadList.some(t => t.otherUser.id === targetUserId);
        if (!exists) {
          const details = mentorsList.find(m => m.id === targetUserId);
          if (details) {
            setThreads(prev => [{ otherUser: details, lastMsg: { id: 'tmp', sender_id: user.id, recipient_id: targetUserId, content: 'Propose swap...', created_at: new Date().toISOString() } }, ...prev]);
          }
        }
      } else if (threadList.length > 0 && !selectedUserId) {
        setSelectedUserId(threadList[0].otherUser.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingThreads(false);
    }
  };

  // Load messages for the selected thread
  const loadMessages = async () => {
    if (!user || !selectedUserId) return;
    setLoadingMsgs(true);
    try {
      const list = await mockServer.getMessages(user.id);
      const threadMsgs = list
        .filter(m => (m.sender_id === user.id && m.recipient_id === selectedUserId) || (m.sender_id === selectedUserId && m.recipient_id === user.id))
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      
      setMessages(threadMsgs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMsgs(false);
    }
  };

  // Triggers once on page mount
  useEffect(() => {
    loadThreads();
  }, [targetUserId]);

  // Triggers whenever thread selection changes
  useEffect(() => {
    loadMessages();
  }, [selectedUserId, user]);

  // Scroll to bottom helper
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Register real-time reply event triggers
  useEffect(() => {
    const handleNewMessageEvent = () => {
      loadThreads();
      loadMessages();
    };
    window.addEventListener('kindred_new_message', handleNewMessageEvent);
    return () => window.removeEventListener('kindred_new_message', handleNewMessageEvent);
  }, [selectedUserId]);

  // Auto trigger a proposal if search param action=propose is present
  useEffect(() => {
    if (initialAction === 'propose' && selectedUserId && messages.length === 0) {
      const autoPropose = async () => {
        setSending(true);
        await mockServer.sendMessage(
          user!.id,
          selectedUserId,
          `Hi! I would love to establish a values-aligned mentoring swap with you. I\'m focusing on learning your core skills. Let\'s stays rooted!`
        );
        setSending(false);
        loadThreads();
        loadMessages();
      };
      autoPropose();
    }
  }, [initialAction, selectedUserId, messages.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedUserId || !newMsgContent.trim()) return;

    setSending(true);
    const content = newMsgContent;
    setNewMsgContent('');
    
    try {
      await mockServer.sendMessage(user.id, selectedUserId, content);
      await loadThreads();
      await loadMessages();
    } catch (err) {
      toast.error('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  // AGREEMENT CLICK CALL BACK
  const handleAcceptAgreement = async (messageId: string, sig?: string) => {
    const success = await mockServer.handleAgreement(messageId, 'accepted', sig);
    if (success) {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#3D5941', '#C4956D', '#D4A574', '#FAF8F3']
      });
      toast.success('Mentoring Agreement Sealed! Reciprocal swaps incremented.');
      setActiveSigningMessageId(null);
      setRecipientSignature('');
      loadMessages();
    }
  };

  const handleDeclineAgreement = async (messageId: string) => {
    const success = await mockServer.handleAgreement(messageId, 'declined');
    if (success) {
      toast.success('Agreement proposal declined.');
      loadMessages();
    }
  };

  const selectedThread = threads.find(t => t.otherUser.id === selectedUserId);

  return (
    <div className="bg-white border border-charcoal/8 rounded-3xl overflow-hidden shadow-sm h-[calc(100vh-140px)] grid grid-cols-1 md:grid-cols-12 select-none text-left">
      
      {/* LEFT PANEL: ACTIVE THREAD SELECTOR */}
      <div className="md:col-span-4 border-r border-charcoal/10 flex flex-col h-full bg-cream/15">
        <div className="p-5 border-b border-charcoal/10 bg-white">
          <h3 className="font-serif text-lg font-bold text-charcoal">Conversations</h3>
          <p className="text-[11px] text-charcoal-muted mt-0.5">Your values-aligned mentoring circles.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {loadingThreads ? (
            <div className="py-10 text-center text-charcoal/30 text-xs animate-pulse">Loading threads...</div>
          ) : threads.length === 0 ? (
            <div className="py-10 text-center text-charcoal/40 text-xs">No active mentoring swaps. Connect with mentors on the Discover page.</div>
          ) : (
            threads.map(t => (
              <button
                key={t.otherUser.id}
                onClick={() => setSelectedUserId(t.otherUser.id)}
                className={`w-full flex gap-3 p-3.5 rounded-2xl transition-all items-center text-left ${
                  selectedUserId === t.otherUser.id
                    ? 'bg-sage text-white shadow-md shadow-sage/10'
                    : 'bg-transparent text-charcoal hover:bg-cream'
                }`}
              >
                <img
                  src={t.otherUser.profile_photo_url}
                  alt={t.otherUser.display_name}
                  className="w-10 h-10 rounded-full object-cover border border-clay shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-serif font-bold text-xs truncate leading-normal">
                      {t.otherUser.display_name}
                    </h4>
                    <span className={`text-[9px] font-mono shrink-0 ${selectedUserId === t.otherUser.id ? 'text-white/60' : 'text-charcoal/40'}`}>
                      {t.lastMsg.id !== 'tmp' ? new Date(t.lastMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <p className={`text-[10px] truncate leading-relaxed mt-0.5 ${selectedUserId === t.otherUser.id ? 'text-white/80' : 'text-charcoal/60'}`}>
                    {t.lastMsg.id === 'tmp' ? 'New Proposal swap request...' : t.lastMsg.content}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* RIGHT PANEL: CHAT AREA CONTAINER */}
      <div className="md:col-span-8 flex flex-col h-full bg-cream/5 justify-between relative overflow-hidden">
        {selectedThread ? (
          <>
            {/* Header info */}
            <div className="p-4 bg-white border-b border-charcoal/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedThread.otherUser.profile_photo_url}
                  alt={selectedThread.otherUser.display_name}
                  className="w-10 h-10 rounded-full object-cover border border-clay"
                />
                <div>
                  <h3 className="font-serif font-bold text-charcoal text-sm leading-normal flex items-center gap-1.5">
                    {selectedThread.otherUser.display_name}
                    {selectedThread.otherUser.is_founding_member && <span className="text-[11px] title='Founding Member'">🏆</span>}
                  </h3>
                  <p className="text-[10px] text-charcoal/60 leading-tight -mt-0.5">
                    {selectedThread.otherUser.job_title} @ {selectedThread.otherUser.company_name || selectedThread.otherUser.university_name}
                  </p>
                </div>
              </div>
              <div className="bg-ochre/15 text-ochre text-[10px] font-bold px-2 py-0.5 rounded border border-ochre/25">
                ⭐ {selectedThread.otherUser.trust_score} Trust Score
              </div>
            </div>

            {/* Messages List Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loadingMsgs ? (
                <div className="py-10 text-center text-charcoal/30 text-xs animate-pulse">Syncing encrypted chat logs...</div>
              ) : (
                messages.map(msg => {
                  const isMe = msg.sender_id === user?.id;
                  
                  if (msg.agreement_data) {
                    /* Rendering the Special Mentoring Agreement Proposal Card */
                    const agreement = msg.agreement_data;
                    const proposerName = isMe ? 'You' : selectedThread.otherUser.display_name;
                    const isRecipient = !isMe;
                    
                    return (
                      <div key={msg.id} className="flex justify-center my-4 animate-scale-in w-full">
                        <div className="w-full max-w-[460px] bg-white border-2 border-sage/20 rounded-3xl p-6 shadow-md space-y-4 hover:border-sage hover:shadow-lg transition-all text-left">
                          
                          {/* Card Header */}
                          <div className="flex justify-between items-start">
                            <div className="flex gap-2.5">
                              <div className="w-9 h-9 bg-sage/10 text-sage rounded-xl flex items-center justify-center">
                                <Award className="w-5.5 h-5.5 text-sage" />
                              </div>
                              <div>
                                <h4 className="font-serif font-bold text-charcoal text-sm">Reciprocity Covenant</h4>
                                <p className="text-[10px] text-charcoal/60 mt-0.5">Proposed by {proposerName}</p>
                              </div>
                            </div>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded font-mono ${
                              agreement.status === 'accepted'
                                ? 'bg-sage/10 text-sage border border-sage/20'
                                : agreement.status === 'declined'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-ochre/15 text-ochre border border-ochre/20 animate-pulse'
                            }`}>
                              {agreement.status}
                            </span>
                          </div>

                          {/* Agreement Content details */}
                          <div className="space-y-3 border-t border-b border-charcoal/5 py-4">
                            <div className="text-xs">
                              <strong className="text-charcoal/70 uppercase text-[9px] tracking-wider block mb-1">Focus Topics</strong>
                              <div className="flex flex-wrap gap-1">
                                {agreement.skills.map((s: string) => (
                                  <span key={s} className="bg-cream px-2 py-0.5 rounded text-[10px] font-mono text-charcoal border border-charcoal/5">{s}</span>
                                ))}
                              </div>
                            </div>
                            <div className="text-xs flex items-center gap-1.5 text-charcoal/80">
                              <strong className="text-charcoal/70 uppercase text-[9px] tracking-wider block shrink-0">Frequency:</strong>
                              <span className="font-medium font-mono text-xs text-charcoal">{agreement.frequency}</span>
                            </div>

                            {/* Covenant Text */}
                            <div className="bg-cream/20 border border-clay/10 rounded-xl p-3 text-[11px] leading-relaxed italic text-charcoal/70 font-serif">
                              "We pledge our skills, time, and trust to this reciprocal learning exchange, nurturing our mutual growth and the strength of our community circle."
                            </div>

                            {/* Rendered Signatures */}
                            <div className="grid grid-cols-2 gap-4 pt-2">
                              <div className="text-center space-y-1">
                                <div className="h-14 bg-cream/35 border border-charcoal/5 rounded-xl flex items-center justify-center overflow-hidden p-1">
                                  {agreement.sender_signature ? (
                                    <img src={agreement.sender_signature} alt="Proposer Signature" className="max-h-full max-w-full object-contain" />
                                  ) : (
                                    <span className="text-[10px] font-mono text-charcoal/40 italic">Signed</span>
                                  )}
                                </div>
                                <div className="text-[8px] font-mono uppercase tracking-wider text-charcoal/50">Proposer Signature</div>
                              </div>
                              
                              <div className="text-center space-y-1">
                                <div className="h-14 bg-cream/35 border border-charcoal/5 rounded-xl flex items-center justify-center overflow-hidden p-1">
                                  {agreement.recipient_signature ? (
                                    <img src={agreement.recipient_signature} alt="Recipient Signature" className="max-h-full max-w-full object-contain" />
                                  ) : (
                                    <span className="text-[10px] font-mono text-charcoal/30 italic">Awaiting Signature</span>
                                  )}
                                </div>
                                <div className="text-[8px] font-mono uppercase tracking-wider text-charcoal/50">Recipient Signature</div>
                              </div>
                            </div>
                          </div>

                          {/* Action States */}
                          {agreement.status === 'pending' ? (
                            isRecipient ? (
                              activeSigningMessageId === msg.id ? (
                                <div className="space-y-3 animate-scale-in">
                                  <div className="text-xs font-bold text-charcoal flex justify-between items-center">
                                    <span>Draw your signature to accept:</span>
                                    <button 
                                      type="button"
                                      onClick={handleClearRecipientCanvas}
                                      className="text-[10px] text-ochre hover:underline font-mono font-bold"
                                    >
                                      Clear
                                    </button>
                                  </div>
                                  <div className="border border-sage/30 rounded-xl overflow-hidden bg-cream/30">
                                    <canvas
                                      ref={recipientCanvasRef}
                                      width={372}
                                      height={90}
                                      className="w-full bg-cream/20 cursor-crosshair"
                                      style={{ touchAction: 'none' }}
                                      onMouseDown={handleStartRecipientDrawing}
                                      onMouseMove={handleRecipientDrawing}
                                      onMouseUp={handleStopRecipientDrawing}
                                      onMouseLeave={handleStopRecipientDrawing}
                                      onTouchStart={handleStartRecipientDrawing}
                                      onTouchMove={handleRecipientDrawing}
                                      onTouchEnd={handleStopRecipientDrawing}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveSigningMessageId(null);
                                        setRecipientSignature('');
                                      }}
                                      className="bg-cream hover:bg-cream-dark text-charcoal text-xs font-semibold py-2.5 rounded-xl border border-charcoal/10 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleAcceptAgreement(msg.id, recipientSignature)}
                                      disabled={!recipientSignature}
                                      className="bg-sage text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-sage-hover transition-colors flex items-center justify-center gap-1 disabled:opacity-40"
                                    >
                                      <CheckCircle className="w-3.5 h-3.5" />
                                      <span>Sign & Accept</span>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-2 gap-3">
                                  <button
                                    type="button"
                                    onClick={() => handleDeclineAgreement(msg.id)}
                                    className="bg-cream hover:bg-cream-dark text-charcoal text-xs font-semibold py-2.5 rounded-xl border border-charcoal/10 transition-colors"
                                  >
                                    Decline Swap
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setActiveSigningMessageId(msg.id)}
                                    className="bg-sage text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-sage-hover transition-colors flex items-center justify-center gap-1"
                                  >
                                    <PenTool className="w-3.5 h-3.5" />
                                    <span>Accept Swap</span>
                                  </button>
                                </div>
                              )
                            ) : (
                              <div className="bg-ochre/5 border border-ochre/15 rounded-xl p-3 text-xs text-ochre font-bold text-center animate-pulse">
                                ⏳ Propose Sent • Awaiting signature from {selectedThread.otherUser.display_name}
                              </div>
                            )
                          ) : agreement.status === 'accepted' ? (
                            <div className="bg-sage/5 border border-sage/15 rounded-xl p-3 text-xs text-sage font-bold flex items-center gap-1.5 justify-center">
                              <CheckCircle className="w-4 h-4 fill-sage text-white" />
                              <span>Covenant Active • Mutual Swap Sealed</span>
                            </div>
                          ) : (
                            <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-xs text-red-700 font-bold flex items-center gap-1.5 justify-center">
                              <UserX className="w-4 h-4" />
                              <span>Covenant Declined</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-slide-up`}
                    >
                      <div className="max-w-[70%] space-y-1">
                        <div
                          className={`px-4.5 py-3 rounded-2xl text-xs leading-relaxed ${
                            isMe
                              ? 'bg-sage text-white rounded-tr-none shadow-md shadow-sage/5 text-right'
                              : 'bg-white text-charcoal rounded-tl-none border border-charcoal/8'
                          }`}
                        >
                          {msg.content}
                        </div>
                        <span className={`text-[9px] font-mono block ${isMe ? 'text-right' : 'text-left'} text-charcoal/40`}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Message Form */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-charcoal/10 flex gap-3 items-center">
              <button
                type="button"
                onClick={() => setShowCovenantPanel(true)}
                className="bg-sage/10 hover:bg-sage/20 text-sage px-3 py-3 rounded-xl hover:scale-102 transition-all flex items-center gap-1.5 text-xs font-bold font-mono border border-sage/15 shrink-0"
                title="Propose Reciprocity Covenant"
              >
                📜 Propose Covenant
              </button>
              <input
                type="text"
                value={newMsgContent}
                onChange={e => setNewMsgContent(e.target.value)}
                placeholder="Type a secure message... (Try typing 'mentor' to request a swap!)"
                className="flex-1 px-4 py-3 bg-cream/20 border border-charcoal/10 rounded-xl text-xs focus:border-sage focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending || !newMsgContent.trim()}
                className="bg-sage text-white p-3 rounded-xl hover:bg-sage-hover hover:scale-102 transition-all disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Sliding Reciprocity Covenant Panel */}
            <div 
              className={`absolute top-0 right-0 h-full w-full max-w-[400px] z-30 bg-white border-l border-charcoal/10 shadow-2xl transition-transform duration-300 transform ${
                showCovenantPanel ? 'translate-x-0' : 'translate-x-full'
              } flex flex-col select-none text-left`}
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-charcoal/10 flex items-center justify-between bg-cream/15">
                <div>
                  <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-1.5">
                    📜 Reciprocity Covenant
                  </h3>
                  <p className="text-[10px] text-charcoal/60 mt-0.5">Seal a sacred, bilateral mentoring exchange.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCovenantPanel(false)}
                  className="p-1.5 rounded-full hover:bg-charcoal/5 text-charcoal/60 hover:text-charcoal transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content Form */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 animate-fade-in">
                {/* Inputs */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block">
                    What skills will you teach?
                  </label>
                  <input
                    type="text"
                    value={covTeach}
                    onChange={e => setCovTeach(e.target.value)}
                    placeholder="e.g. React, UX Writing, Pottery"
                    className="w-full px-3 py-2 text-xs bg-cream/20 border border-charcoal/10 rounded-xl focus:border-sage focus:outline-none font-medium"
                  />
                  <p className="text-[9px] text-charcoal/40 font-mono">Separated by commas. We populated this from your profile.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block">
                    What skills will you learn?
                  </label>
                  <input
                    type="text"
                    value={covLearn}
                    onChange={e => setCovLearn(e.target.value)}
                    placeholder="e.g. Product Strategy, French, Breadmaking"
                    className="w-full px-3 py-2 text-xs bg-cream/20 border border-charcoal/10 rounded-xl focus:border-sage focus:outline-none font-medium"
                  />
                  <p className="text-[9px] text-charcoal/40 font-mono">Separated by commas. We populated this from their profile.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block">
                      Cadence
                    </label>
                    <select
                      value={covFrequency}
                      onChange={e => setCovFrequency(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-cream/20 border border-charcoal/10 rounded-xl focus:border-sage focus:outline-none font-medium text-charcoal"
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block">
                      Duration
                    </label>
                    <select
                      value={covDuration}
                      onChange={e => setCovDuration(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-cream/20 border border-charcoal/10 rounded-xl focus:border-sage focus:outline-none font-medium text-charcoal"
                    >
                      <option value="1 Month">1 Month</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                      <option value="12 Months">12 Months</option>
                    </select>
                  </div>
                </div>

                {/* Covenant Document pledge */}
                <div className="border border-ochre/20 bg-ochre/5 rounded-2xl p-4 text-[11px] font-serif italic text-charcoal/70 leading-relaxed relative">
                  <span className="absolute top-1 left-2 text-ochre/30 text-2xl font-serif">“</span>
                  <p className="px-3">
                    We pledge our skills, time, and trust to this reciprocal learning exchange, nurturing our mutual growth and the strength of our community circle.
                  </p>
                  <span className="absolute bottom-1 right-2 text-ochre/30 text-2xl font-serif">”</span>
                </div>

                {/* Signature Pad */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-charcoal/60">
                    <span>Draw your initials/signature below</span>
                    <button
                      type="button"
                      onClick={handleClearCanvas}
                      className="text-ochre hover:underline text-[9px] font-bold font-mono"
                    >
                      Clear Pad
                    </button>
                  </div>
                  <div className="border border-sage/30 rounded-2xl overflow-hidden bg-cream/40 relative">
                    <canvas
                      ref={canvasRef}
                      width={360}
                      height={120}
                      className="w-full bg-cream/20 cursor-crosshair h-[120px]"
                      style={{ touchAction: 'none' }}
                      onMouseDown={handleStartDrawing}
                      onMouseMove={handleDrawing}
                      onMouseUp={handleStopDrawing}
                      onMouseLeave={handleStopDrawing}
                      onTouchStart={handleStartDrawing}
                      onTouchMove={handleDrawing}
                      onTouchEnd={handleStopDrawing}
                    />
                    {!senderSignature && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-charcoal/30 text-[10px] font-serif italic select-none">
                        Use mouse/finger to draw here
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-charcoal/10 bg-white grid grid-cols-2 gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowCovenantPanel(false)}
                  className="bg-cream hover:bg-cream-dark text-charcoal text-xs font-semibold py-3 rounded-xl border border-charcoal/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendCovenant}
                  disabled={sending || !covTeach.trim() || !covLearn.trim() || !senderSignature}
                  className="bg-sage text-white text-xs font-semibold py-3 rounded-xl hover:bg-sage-hover transition-colors flex items-center justify-center gap-1.5 disabled:opacity-40 font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Propose Covenant</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-charcoal/40 space-y-2.5">
            <span className="text-4xl">💬</span>
            <h4 className="font-serif font-bold text-charcoal text-base">Select a Circle to Chat</h4>
            <p className="text-xs max-w-[280px]">Select any values-aligned contact on the left to review messages and active agreements.</p>
          </div>
        )}
      </div>
    </div>
  );
}
