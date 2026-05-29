import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { mockServer } from '../../services/mockData';
import type { User, Message } from '../../types';
import { Send, CheckCircle, Award, UserX } from 'lucide-react';
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
  const handleAcceptAgreement = async (messageId: string) => {
    const success = await mockServer.handleAgreement(messageId, 'accepted');
    if (success) {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#3D5941', '#C4956D', '#D4A574', '#FAF8F3']
      });
      toast.success('Mentoring Agreement Accepted! Help swap counter incremented.');
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
      <div className="md:col-span-8 flex flex-col h-full bg-cream/5 justify-between">
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
                    return (
                      <div key={msg.id} className="flex justify-center my-4 animate-scale-in">
                        <div className="w-full max-w-[420px] bg-white border border-ochre/25 rounded-3xl p-5.5 shadow-md space-y-4 hover:border-ochre hover:shadow-lg transition-all text-left">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-2.5">
                              <div className="w-9 h-9 bg-ochre/10 text-ochre rounded-xl flex items-center justify-center">
                                <Award className="w-5.5 h-5.5" />
                              </div>
                              <div>
                                <h4 className="font-serif font-bold text-charcoal text-sm">Mentoring Swap Agreement</h4>
                                <p className="text-[10px] text-charcoal/60 mt-0.5">Proposed by {selectedThread.otherUser.display_name}</p>
                              </div>
                            </div>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                              agreement.status === 'accepted'
                                ? 'bg-sage/10 text-sage border border-sage/20'
                                : agreement.status === 'declined'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-clay/10 text-clay border border-clay/20 animate-pulse'
                            }`}>
                              {agreement.status}
                            </span>
                          </div>

                          <div className="space-y-2.5 border-t border-b border-charcoal/5 py-3">
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
                              <span className="font-medium">{agreement.frequency}</span>
                            </div>
                          </div>

                          {agreement.status === 'pending' ? (
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                onClick={() => handleDeclineAgreement(msg.id)}
                                className="bg-cream hover:bg-cream-dark text-charcoal text-xs font-semibold py-2.5 rounded-xl border border-charcoal/10 transition-colors"
                              >
                                Decline Swap
                              </button>
                              <button
                                onClick={() => handleAcceptAgreement(msg.id)}
                                className="bg-sage text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-sage-hover transition-colors flex items-center justify-center gap-1"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Accept Swap</span>
                              </button>
                            </div>
                          ) : agreement.status === 'accepted' ? (
                            <div className="bg-sage/5 border border-sage/15 rounded-xl p-3 text-xs text-sage font-bold flex items-center gap-1.5 justify-center">
                              <CheckCircle className="w-4 h-4 fill-sage text-white" />
                              <span>Agreement Active • Mutual Swap Complete</span>
                            </div>
                          ) : (
                            <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-xs text-red-700 font-bold flex items-center gap-1.5 justify-center">
                              <UserX className="w-4 h-4" />
                              <span>Agreement Cancelled / Declined</span>
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
