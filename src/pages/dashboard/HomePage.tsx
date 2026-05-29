import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useCheckInStore } from '../../store/checkInStore';
import { Coffee, MapPin, Sparkles, Flame, Eye, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';
import type { CheckIn } from '../../types';

export default function HomePage() {
  const { user } = useAuthStore();
  const { activeCheckIn, checkIns, startCheckIn, endCheckIn, fetchCheckIns, loadMyCheckIn } = useCheckInStore();

  const [locationName, setLocationName] = useState('');
  const [note, setNote] = useState('');
  const [visibility, setVisibility] = useState<'visible' | 'mentors_only' | 'private'>('visible');
  const [checkingIn, setCheckingIn] = useState(false);
  const [showCheckInForm, setShowCheckInForm] = useState(false);

  // Initialize and load checkins
  useEffect(() => {
    if (user) {
      loadMyCheckIn(user.id);
      fetchCheckIns();
    }
  }, [user]);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!locationName) {
      toast.error('Please specify a location name.');
      return;
    }

    setCheckingIn(true);
    const success = await startCheckIn(user.id, locationName, 'San Francisco, CA', note, visibility);
    setCheckingIn(false);

    if (success) {
      // Confetti burst for show-up celebration!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3D5941', '#C4956D', '#D4A574', '#FAF8F5']
      });
      toast.success('Successfully Checked In! Your reciprocity contract is active.');
      setLocationName('');
      setNote('');
      setShowCheckInForm(false);
    }
  };

  const handleEndCheckIn = async () => {
    if (!user) return;
    const success = await endCheckIn(user.id);
    if (success) {
      toast.success('Check-in ended. Stay rooted!');
    }
  };

  // Filter out ourselves from nearby check-ins
  const nearbyCheckIns = checkIns.filter((c: CheckIn) => c.user_id !== user?.id);

  // Simulated checked-in list when locked (blurred representation from screenshot)
  const lockedSprouts = [
    { name: 'Liam P.', date: 'July 29, 2023', text: 'Mentoring local check-in swap at Sightglass coffee...', avatar: '/avatars/liam.png' },
    { name: 'Aisha K.', date: 'May 17, 2023', text: 'Hello, working on frontend systems design today!', avatar: '/avatars/maya.png' },
    { name: 'Noah B.', date: 'May 17, 2023', text: 'Stripe API implementations and payment infrastructure...', avatar: '/avatars/marcus.png' },
    { name: 'Chloe L.', date: 'May 17, 2023', text: 'Calm tech layouts and typography review.', avatar: '/avatars/sarah.png' }
  ];

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-10">
      
      {/* Redesigned Layout: Top Section with Reciprocity Covenant & Activity Side Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT/CENTER: The Reciprocity Covenant Block (Premium Dark Sage Panel) */}
        <div className="lg:col-span-8 bg-[#1D2B1E] rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          
          {/* Header */}
          <div className="z-10">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-glow-sage">
              Reciprocity Covenant
            </h2>
            <p className="text-xs text-white/60 mt-1">
              Kindred protects community transparency. Under our covenant, active show-ups are reciprocal.
            </p>
          </div>

          {/* Inner Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 flex-1 z-10 items-stretch">
            
            {/* Left Panel: Nearby check-ins */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4 relative">
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">
                  Nearby local check-ins
                </span>
                
                {/* Visual List */}
                <div className="space-y-3.5">
                  {(activeCheckIn ? nearbyCheckIns : lockedSprouts).map((sprout: any, idx: number) => {
                    const isReal = activeCheckIn && sprout.user;
                    const name = isReal ? sprout.user.display_name : sprout.name;
                    const date = isReal ? new Date(sprout.created_at).toLocaleDateString() : sprout.date;
                    const noteText = isReal ? sprout.note : sprout.text;
                    const avatar = isReal ? sprout.user.profile_photo_url : sprout.avatar;

                    return (
                      <div key={idx} className="flex items-start gap-3 text-left">
                        <img
                          src={avatar}
                          alt={name}
                          className="w-9 h-9 rounded-full object-cover border border-[#C4956D]/45"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-white/95 truncate">{name}</h4>
                            <span className="text-[9px] text-[#C4956D] font-medium flex items-center gap-0.5">
                              🔄 Reciprocity
                            </span>
                          </div>
                          <p className="text-[10px] text-white/40">{date}</p>
                          <p className={`text-[11px] mt-0.5 leading-snug truncate ${!activeCheckIn ? 'blur-[3px] select-none' : 'text-white/80'}`}>
                            {noteText}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel: Stylized Map Component */}
            <div className="md:col-span-7 bg-[#FCFAF6] border border-white/10 rounded-2xl relative overflow-hidden min-h-[220px]">
              {/* Custom SVG Stylized Map */}
              <svg className="w-full h-full object-cover" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Land Base */}
                <rect width="300" height="200" fill="#F4F0E6" />
                
                {/* Parks / Green Areas */}
                <path d="M180 20 C220 30, 240 60, 230 90 C220 110, 190 120, 170 100 C150 80, 150 30, 180 20 Z" fill="#D3DEC9" opacity="0.8" />
                <path d="M40 140 C80 145, 90 170, 70 190 C50 200, 20 190, 15 170 C10 150, 20 135, 40 140 Z" fill="#D3DEC9" opacity="0.8" />
                <rect x="235" y="130" width="45" height="50" rx="10" fill="#CDE1C4" opacity="0.7" />

                {/* Street Lines */}
                <path d="M0 50 L300 50" stroke="#E2D4C1" strokeWidth="6" />
                <path d="M0 120 L300 120" stroke="#E2D4C1" strokeWidth="6" />
                <path d="M120 0 L120 200" stroke="#E2D4C1" strokeWidth="6" />
                <path d="M230 0 L230 200" stroke="#E2D4C1" strokeWidth="4" />
                <path d="M50 0 C80 50, 60 120, 80 200" stroke="#E2D4C1" strokeWidth="3" strokeDasharray="2 2" />

                {/* Label text styled elegantly */}
                <text x="130" y="35" fill="#5A4E3B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Roeenthern</text>
                <text x="14" y="90" fill="#5A4E3B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Location</text>
                <text x="195" y="48" fill="#2C3E35" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Parks</text>
                <text x="238" y="122" fill="#2C3E35" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Neighborhood</text>
                <text x="190" y="165" fill="#5A4E3B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Goren Park</text>
                <text x="242" y="190" fill="#5A4E3B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Lecatiens</text>
                
                {/* Active Checkin Pins */}
                <circle cx="120" cy="50" r="4" fill="#3D5941" />
                <circle cx="120" cy="50" r="8" stroke="#3D5941" strokeWidth="1.5" opacity="0.5" className="animate-ping" />
                
                <circle cx="80" cy="120" r="4" fill="#C4956D" />
                <circle cx="230" cy="120" r="4" fill="#D4A574" />
              </svg>
            </div>
          </div>

          {/* Secured Padlock Overlay */}
          {!activeCheckIn && (
            <div className="absolute inset-0 bg-[#1D2B1E]/60 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-48 h-48 glass-panel-dark rounded-3xl flex flex-col items-center justify-center border border-white/10 shadow-2xl relative hover:scale-[1.02] transition-transform">
                {/* Gold Lock */}
                <div className="w-16 h-16 bg-[#D4A574]/15 border border-[#D4A574]/35 text-[#D4A574] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,165,116,0.2)]">
                  <Lock className="w-8 h-8" />
                </div>
                <span className="text-white font-bold text-sm tracking-wider uppercase mt-4">Secured</span>
              </div>
              <div className="text-xs text-[#D4A574] font-bold flex items-center gap-1.5 bg-[#D4A574]/10 border border-[#D4A574]/20 px-4 py-2 rounded-xl text-glow-ochre">
                <Eye className="w-4 h-4" />
                <span>Check in to unlock and lift contract blur</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: Streaks Panel, Actions, & Updates */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          
          {/* Active Streak Widget (Dark-Sage Card) */}
          <div className="bg-[#1D2B1E] rounded-[32px] p-6 text-white text-center flex flex-col items-center justify-center shadow-lg border border-white/5 flex-1 min-h-[220px]">
            <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest block mb-2">Active Streak</span>
            
            {/* Clay Orange Flame */}
            <div className="w-16 h-16 bg-[#C4956D]/15 border border-[#C4956D]/30 text-[#C4956D] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(196,149,109,0.35)] animate-pulse">
              <Flame className="w-8 h-8 fill-[#C4956D]" />
            </div>

            <h3 className="text-4xl font-extrabold text-white mt-3 leading-none tracking-tight">
              {user?.check_in_streak || 12}
            </h3>
            <span className="text-[11px] font-bold text-[#C4956D] uppercase tracking-wider mt-1">Day Streak</span>

            {/* Streak Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-5">
              <div className="bg-[#C4956D] h-1.5 rounded-full" style={{ width: '80%' }}></div>
            </div>
            
            <p className="text-[10px] text-white/50 mt-2 font-medium">
              Next Goal: 15 Days. You're inspiring the community!
            </p>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white border border-[#1D2B1E]/8 rounded-[24px] p-5 shadow-sm space-y-3.5">
            <span className="text-[10px] font-bold text-[#1D2B1E]/40 uppercase tracking-widest block">Quick Actions</span>
            
            <div className="space-y-2">
              <button
                onClick={() => setShowCheckInForm(!showCheckInForm)}
                className="w-full border border-[#1D2B1E]/15 hover:border-[#3D5941] hover:bg-[#3D5941]/5 text-[#1D2B1E] font-semibold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{showCheckInForm ? '✕ Close Portal' : '+ New Check-in'}</span>
              </button>
              <Link
                to="/discover"
                className="w-full border border-[#1D2B1E]/15 hover:border-[#C4956D] hover:bg-[#C4956D]/5 text-[#1D2B1E] font-semibold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center block"
              >
                <span>🔍 Request Support</span>
              </Link>
            </div>
          </div>

          {/* Community Updates Panel */}
          <div className="bg-white border border-[#1D2B1E]/8 rounded-[24px] p-5 shadow-sm space-y-3.5">
            <span className="text-[10px] font-bold text-[#1D2B1E]/40 uppercase tracking-widest block">Community Updates</span>
            
            <div className="space-y-3">
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#1D2B1E]/5 flex items-center justify-center text-xs">🏡</div>
                <div className="text-left leading-tight">
                  <h5 className="text-[11px] font-bold text-[#1D2B1E]">New Neighborhood</h5>
                  <p className="text-[10px] text-[#1D2B1E]/60">Community Updates are live!</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#1D2B1E]/5 flex items-center justify-center text-xs">🤝</div>
                <div className="text-left leading-tight">
                  <h5 className="text-[11px] font-bold text-[#1D2B1E]">New Reviewers's rein</h5>
                  <p className="text-[10px] text-[#1D2B1E]/60">Community's inspiring the community.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* COLLAPSIBLE CHECK-IN HUB FORM (Light-Mode Card) */}
      {showCheckInForm && (
        <div className="bg-white border border-[#1D2B1E]/8 rounded-[28px] p-6.5 shadow-md space-y-5 animate-scale-in">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#3D5941]/10 text-[#3D5941] rounded-xl flex items-center justify-center">
                <MapPin className="w-5.5 h-5.5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1D2B1E]">Check-In Hub</h3>
                <p className="text-xs text-[#1D2B1E]/60">Tell the community where you are working right now.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleCheckIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#1D2B1E]/75 uppercase tracking-wider block">Where are you working?</label>
              <input
                type="text"
                required
                placeholder="Sightglass Coffee SOMA, Blue Bottle SOMA, Stanford Library..."
                value={locationName}
                onChange={e => setLocationName(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1D2B1E]/10 rounded-xl text-sm focus:border-[#3D5941] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1D2B1E]/75 uppercase tracking-wider block">Visibility Contract</label>
                <select
                  value={visibility}
                  onChange={e => setVisibility(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#1D2B1E]/10 rounded-xl text-sm focus:border-[#3D5941] focus:outline-none font-medium"
                >
                  <option value="visible">Visible to All Members</option>
                  <option value="mentors_only">Values Aligned Mentors Only</option>
                  <option value="private">Private (Invisible)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#1D2B1E]/75 uppercase tracking-wider block">What are you up to? (Optional)</label>
                <input
                  type="text"
                  placeholder="Studying React / reviewing design systems..."
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#1D2B1E]/10 rounded-xl text-sm focus:border-[#3D5941] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={checkingIn}
              className="w-full bg-[#3D5941] text-white font-semibold py-3 rounded-xl hover:bg-[#2d4230] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer text-xs"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              {checkingIn ? 'Checking In...' : 'Check In & Show Up'}
            </button>
          </form>
        </div>
      )}

      {/* ACTIVE CHECKIN STATUS BAR (Rendered beautifully when activeCheckIn is set) */}
      {activeCheckIn && (
        <div className="bg-white border border-[#3D5941]/20 rounded-[28px] p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-slide-up">
          <div className="flex gap-3 items-start text-left">
            <div className="w-10 h-10 bg-[#3D5941]/10 text-[#3D5941] rounded-xl flex items-center justify-center mt-0.5">
              <Coffee className="w-5.5 h-5.5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#3D5941] uppercase tracking-wider">Active Check-In</span>
              <h4 className="text-base font-bold text-[#1D2B1E]">{activeCheckIn.location_name}</h4>
              <p className="text-xs text-[#1D2B1E]/60 italic mt-0.5">"{activeCheckIn.note || 'Sharing skills today'}"</p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 border-[#1D2B1E]/5 pt-3 md:pt-0">
            <span className="text-[10px] text-[#1D2B1E]/50 font-mono">Expires in: 4 hours</span>
            <button
              onClick={handleEndCheckIn}
              className="bg-[#C4956D]/15 text-[#C4956D] hover:bg-[#C4956D]/25 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              End Session
            </button>
          </div>
        </div>
      )}

      {/* MAIN TWO-COLUMN COMMUNITY FEED & MATCHES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Community Feed (Redesigned Posts Card layout matching Figma spec) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Post Card 1: Maria L. (Grateful for Help) */}
          <div className="bg-white border border-[#1D2B1E]/8 rounded-[28px] p-6.5 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <img
                  src="/avatars/maya.png"
                  alt="Maria L."
                  className="w-10 h-10 rounded-full object-cover border border-[#C4956D]"
                />
                <div className="text-left">
                  <h4 className="font-bold text-sm text-[#1D2B1E]">Maria L.</h4>
                  <p className="text-[10px] text-[#1D2B1E]/50">Aoy T4, at 1:13 pm</p>
                </div>
              </div>
              <button className="text-[#1D2B1E]/40 hover:text-[#1D2B1E]">•••</button>
            </div>

            <div className="text-left space-y-1.5">
              <h3 className="text-lg font-bold text-[#1D2B1E]">Grateful for Help</h3>
              <p className="text-xs text-[#1D2B1E]/75 leading-relaxed">
                Thank you for penano, grateful for help. Less me help me someone reoswny community, and more...
              </p>
            </div>

            {/* Visual Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              <div className="h-28 bg-[#FAF8F5] border border-[#1D2B1E]/5 rounded-2xl overflow-hidden relative group">
                <img src="/events/coffee.png" alt="Hands swap" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#1D2B1E]/10 group-hover:opacity-0 transition-opacity"></div>
              </div>
              <div className="h-28 bg-[#FAF8F5] border border-[#1D2B1E]/5 rounded-2xl overflow-hidden relative group">
                <img src="/logo.png" alt="Giving support" className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#1D2B1E]/5 group-hover:opacity-0 transition-opacity"></div>
              </div>
              <div className="h-28 bg-[#FAF8F5] border border-[#1D2B1E]/5 rounded-2xl overflow-hidden relative group">
                <img src="/hero.png" alt="Coffee flower" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#1D2B1E]/10 group-hover:opacity-0 transition-opacity"></div>
              </div>
            </div>

            {/* Tag Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] font-medium text-[#3D5941] px-2 py-0.5 rounded-full bg-[#3D5941]/5">#Community</span>
              <span className="text-[10px] font-medium text-[#3D5941] px-2 py-0.5 rounded-full bg-[#3D5941]/5">#Gratitude</span>
            </div>

            {/* Interactivity Bar */}
            <div className="flex items-center justify-between border-t border-[#1D2B1E]/5 pt-3.5 mt-2">
              <button className="bg-[#C4956D]/10 hover:bg-[#C4956D]/20 text-[#C4956D] font-bold text-[10px] px-4 py-2 rounded-xl transition-all cursor-pointer">
                Reciprocate
              </button>
              <div className="flex gap-4 text-xs text-[#1D2B1E]/50">
                <button className="hover:text-[#1D2B1E] flex items-center gap-1">💬 Comment</button>
                <button className="hover:text-[#1D2B1E] flex items-center gap-1">🔗 Share</button>
              </div>
            </div>
          </div>

          {/* Post Card 2: Sam T. (Morning Park Share) */}
          <div className="bg-white border border-[#1D2B1E]/8 rounded-[28px] p-6.5 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <img
                  src="/avatars/marcus.png"
                  alt="Sam T."
                  className="w-10 h-10 rounded-full object-cover border border-[#C4956D]"
                />
                <div className="text-left">
                  <h4 className="font-bold text-sm text-[#1D2B1E]">Sam T.</h4>
                  <p className="text-[10px] text-[#1D2B1E]/50">Just at 3:47 pm</p>
                </div>
              </div>
              <button className="text-[#1D2B1E]/40 hover:text-[#1D2B1E]">•••</button>
            </div>

            <div className="text-left space-y-1.5">
              <h3 className="text-lg font-bold text-[#1D2B1E]">Morning Park Share</h3>
              <p className="text-xs text-[#1D2B1E]/75 leading-relaxed">
                Morning Park share known w be now more from morning, in opportunitiens, and ewnc morning...
              </p>
            </div>

            {/* Visual Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              <div className="h-28 bg-[#FAF8F5] border border-[#1D2B1E]/5 rounded-2xl overflow-hidden relative group">
                <img src="/events/seminar.png" alt="Morning sunlight" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#1D2B1E]/10 group-hover:opacity-0 transition-opacity"></div>
              </div>
              <div className="h-28 bg-[#FAF8F5] border border-[#1D2B1E]/5 rounded-2xl overflow-hidden relative group">
                <img src="/hero.png" alt="Walking in park" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#1D2B1E]/10 group-hover:opacity-0 transition-opacity"></div>
              </div>
              <div className="h-28 bg-[#FAF8F5] border border-[#1D2B1E]/5 rounded-2xl overflow-hidden relative group">
                <img src="/events/coffee.png" alt="Flowers blooming" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#1D2B1E]/10 group-hover:opacity-0 transition-opacity"></div>
              </div>
            </div>

            {/* Tag Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] font-medium text-[#3D5941] px-2 py-0.5 rounded-full bg-[#3D5941]/5">#Community</span>
              <span className="text-[10px] font-medium text-[#3D5941] px-2 py-0.5 rounded-full bg-[#3D5941]/5">#Gratitude</span>
            </div>

            {/* Interactivity Bar */}
            <div className="flex items-center justify-between border-t border-[#1D2B1E]/5 pt-3.5 mt-2">
              <button className="bg-[#C4956D]/10 hover:bg-[#C4956D]/20 text-[#C4956D] font-bold text-[10px] px-4 py-2 rounded-xl transition-all cursor-pointer">
                Reciprocate
              </button>
              <div className="flex gap-4 text-xs text-[#1D2B1E]/50">
                <button className="hover:text-[#1D2B1E] flex items-center gap-1">💬 Comment</button>
                <button className="hover:text-[#1D2B1E] flex items-center gap-1">🔗 Share</button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Values-Aligned Recommendations */}
        <div className="lg:col-span-4 bg-white border border-[#1D2B1E]/8 rounded-[28px] p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-[#1D2B1E]">Values-Aligned Mentors</h3>
            <p className="text-[11px] text-[#1D2B1E]/60">Sprouts recommended based on mutual core principles.</p>
          </div>

          <div className="space-y-4">
            {/* Mentor 1 */}
            <div className="border border-[#1D2B1E]/8 rounded-2xl p-4.5 space-y-3.5 hover-premium bg-[#FAF8F5]/50">
              <div className="flex gap-3">
                <img
                  src="/avatars/sarah.png"
                  alt="Sarah Chen"
                  className="w-10 h-10 rounded-full object-cover border border-[#C4956D]"
                />
                <div className="text-left min-w-0">
                  <h4 className="font-bold text-sm text-[#1D2B1E] truncate">Sarah Chen</h4>
                  <p className="text-[10px] text-[#1D2B1E]/50 truncate">Senior Staff Engineer @ Google</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-[#3D5941]/10 text-[#3D5941] text-[9px] font-bold px-1.5 py-0.5 rounded">✓ Verified Sprout</span>
                <span className="bg-[#D4A574]/15 text-[#D4A574] text-[9px] font-bold px-1.5 py-0.5 rounded">⭐ 4.9 Trust</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1.5 border-t border-[#1D2B1E]/5">
                <span className="bg-[#FAF8F5] text-[9px] font-medium text-[#1D2B1E] px-1.5 py-0.5 rounded">Continuous Learning</span>
                <span className="bg-[#FAF8F5] text-[9px] font-medium text-[#1D2B1E] px-1.5 py-0.5 rounded">Empathy</span>
              </div>
              <Link
                to="/discover"
                className="w-full bg-[#FAF8F5] text-[#1D2B1E] hover:bg-[#3D5941] hover:text-white text-[11px] font-semibold py-2 rounded-lg text-center block transition-all mt-2"
              >
                View Mentor Profile
              </Link>
            </div>

            {/* Mentor 2 */}
            <div className="border border-[#1D2B1E]/8 rounded-2xl p-4.5 space-y-3.5 hover-premium bg-[#FAF8F5]/50">
              <div className="flex gap-3">
                <img
                  src="/avatars/maya.png"
                  alt="Maya Patel"
                  className="w-10 h-10 rounded-full object-cover border border-[#C4956D]"
                />
                <div className="text-left min-w-0">
                  <h4 className="font-bold text-sm text-[#1D2B1E] truncate">Maya Patel</h4>
                  <p className="text-[10px] text-[#1D2B1E]/50 truncate">Design Director @ Airbnb</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="bg-[#3D5941]/10 text-[#3D5941] text-[9px] font-bold px-1.5 py-0.5 rounded">✓ Verified Sprout</span>
                <span className="bg-[#D4A574]/15 text-[#D4A574] text-[9px] font-bold px-1.5 py-0.5 rounded">🏆 Founding</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1.5 border-t border-[#1D2B1E]/5">
                <span className="bg-[#FAF8F5] text-[9px] font-medium text-[#1D2B1E] px-1.5 py-0.5 rounded">Aesthetic Calm</span>
                <span className="bg-[#FAF8F5] text-[9px] font-medium text-[#1D2B1E] px-1.5 py-0.5 rounded">Integrity</span>
              </div>
              <Link
                to="/discover"
                className="w-full bg-[#FAF8F5] text-[#1D2B1E] hover:bg-[#3D5941] hover:text-white text-[11px] font-semibold py-2 rounded-lg text-center block transition-all mt-2"
              >
                View Mentor Profile
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
