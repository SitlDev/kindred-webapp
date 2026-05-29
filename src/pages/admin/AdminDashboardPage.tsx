import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { 
  Shield, 
  Users, 
  Clock, 
  Award, 
  Search, 
  Check, 
  X, 
  Flame, 
  Mail, 
  CheckCircle,
  FileText,
  UserCheck,
  UserX
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { mockServer } from '../../services/mockData';
import type { User } from '../../types';

export default function AdminDashboardPage() {
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'approvals' | 'domains' | 'all'>('approvals');

  // Load all users
  const loadUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await mockServer.getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      toast.error('Failed to load members directory');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Check if current user is admin
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-16 h-16 bg-clay/10 rounded-full flex items-center justify-center text-clay mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal">Unauthorized Access</h1>
        <p className="text-charcoal/60 mt-2 max-w-md">
          Only community administrators have access to the Kindred admin control panel.
        </p>
      </div>
    );
  }

  // Filter users based on search
  const filteredUsers = users.filter(u => {
    const searchString = `${u.legalNameFull} ${u.email} ${u.company_name || ''} ${u.university_name || ''}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  // Derived counts
  const totalMembers = users.filter(u => u.account_status === 'active').length;
  const pendingApprovals = users.filter(u => u.account_status === 'pending_approval');
  const pendingDomainReviews = users.filter(u => 
    u.account_status === 'active' && 
    ((u.work_email && !u.work_email_verified) || (u.school_email && !u.school_email_verified))
  );
  
  // Founding members count
  const foundingMembersCount = users.filter(u => u.is_founding_member).length;
  const foundingLimit = 500;

  // Handlers
  const handleApprove = async (userId: string, userName: string) => {
    try {
      await mockServer.approveUserAccount(userId);
      toast.success(`Account approved for ${userName}!`);
      
      // Confetti celebration burst!
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#3D5941', '#C4956D', '#D4A574', '#FAF8F5']
      });

      await loadUsers();
    } catch (error) {
      toast.error('Failed to approve account');
    }
  };

  const handleDecline = async (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to decline the request for ${userName}?`)) {
      try {
        await mockServer.declineUserAccount(userId);
        toast.success(`Request declined for ${userName}`);
        await loadUsers();
      } catch (error) {
        toast.error('Failed to decline request');
      }
    }
  };

  const handleSuspend = async (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to suspend the account for ${userName}?`)) {
      try {
        await mockServer.suspendUserAccount(userId);
        toast.success(`${userName}'s account suspended`);
        await loadUsers();
      } catch (error) {
        toast.error('Failed to suspend account');
      }
    }
  };

  const handleRestore = async (userId: string, userName: string) => {
    try {
      await mockServer.restoreUserAccount(userId);
      toast.success(`${userName}'s account restored successfully`);
      await loadUsers();
    } catch (error) {
      toast.error('Failed to restore account');
    }
  };

  const handleVerifyDomain = async (userId: string, type: 'work' | 'school', email: string) => {
    try {
      await mockServer.verifyUserDomainManually(userId, type);
      toast.success(`Domain verified for ${email}!`);
      await loadUsers();
    } catch (error) {
      toast.error('Failed to verify domain email');
    }
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-10 animate-fade-in">
      
      {/* Premium Dashboard Header Banner */}
      <div className="bg-[#1D2B1E] rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-between md:flex-row md:items-center">
        <div className="z-10 max-w-xl">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="bg-[#C4956D]/20 text-[#D4A574] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D4A574]/20 flex items-center gap-1.5 shadow-[0_0_12px_rgba(212,165,116,0.1)]">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Shield Active</span>
            </span>
          </div>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-glow-sage">
            Admin Control Panel
          </h1>
          <p className="text-sm text-white/70 mt-2 leading-relaxed">
            Review onboarding requests, perform high-trust manual work/school domain verifications, manage member accounts, and audit Founding Circle bounds.
          </p>
        </div>
        
        {/* Subtle Decorative Map-Line Background Detail */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none w-96 h-full">
          <svg className="w-full h-full" viewBox="0 0 300 200" fill="none">
            <path d="M0 50 L300 50" stroke="#E2D4C1" strokeWidth="6" />
            <path d="M0 120 L300 120" stroke="#E2D4C1" strokeWidth="6" />
            <path d="M120 0 L120 200" stroke="#E2D4C1" strokeWidth="6" />
          </svg>
        </div>
      </div>

      {/* Metrics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: Total Active Members */}
        <div className="bg-white rounded-2xl p-6 border border-charcoal/10 shadow-sm flex items-center gap-4 hover-premium">
          <div className="w-12 h-12 rounded-xl bg-sage/5 flex items-center justify-center text-sage">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-charcoal/50 uppercase tracking-wider block">Active Members</span>
            <span className="text-2xl font-bold text-charcoal font-mono">{totalMembers}</span>
          </div>
        </div>

        {/* Metric 2: Pending Approvals */}
        <div className="bg-white rounded-2xl p-6 border border-charcoal/10 shadow-sm flex items-center gap-4 hover-premium">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pendingApprovals.length > 0 ? 'bg-ochre/15 text-ochre' : 'bg-charcoal/5 text-charcoal/40'}`}>
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-charcoal/50 uppercase tracking-wider block">Pending Approvals</span>
            <span className="text-2xl font-bold text-charcoal font-mono">{pendingApprovals.length}</span>
          </div>
        </div>

        {/* Metric 3: Domain Reviews */}
        <div className="bg-white rounded-2xl p-6 border border-charcoal/10 shadow-sm flex items-center gap-4 hover-premium">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pendingDomainReviews.length > 0 ? 'bg-sage/15 text-sage' : 'bg-charcoal/5 text-charcoal/40'}`}>
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-charcoal/50 uppercase tracking-wider block">Domain Reviews</span>
            <span className="text-2xl font-bold text-charcoal font-mono">{pendingDomainReviews.length}</span>
          </div>
        </div>

        {/* Metric 4: Founding Circle Limit */}
        <div className="bg-white rounded-2xl p-6 border border-charcoal/10 shadow-sm flex items-center gap-4 hover-premium">
          <div className="w-12 h-12 rounded-xl bg-clay/10 flex items-center justify-center text-clay">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-bold text-charcoal/50 uppercase tracking-wider block">Founding Circle Limit</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-charcoal font-mono">
                {foundingMembersCount} <span className="text-xs text-charcoal/40 font-sans font-normal">/ {foundingLimit}</span>
              </span>
              <span className="text-[10px] text-clay font-bold font-mono">
                {Math.round((foundingMembersCount / foundingLimit) * 100)}%
              </span>
            </div>
            <div className="w-full bg-cream-dark h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-clay h-full rounded-full transition-all duration-500" 
                style={{ width: `${(foundingMembersCount / foundingLimit) * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Tabs Navigation and Search bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-4">
        
        {/* Elegant tab selectors */}
        <div className="flex bg-cream-dark/50 p-1.5 rounded-xl border border-charcoal/5 max-w-md w-full md:w-auto">
          <button
            onClick={() => setActiveTab('approvals')}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 ${activeTab === 'approvals' ? 'bg-[#1D2B1E] text-white shadow-sm' : 'text-charcoal/60 hover:text-charcoal'}`}
          >
            <span>Onboarding Approvals</span>
            {pendingApprovals.length > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono leading-none ${activeTab === 'approvals' ? 'bg-ochre text-[#1D2B1E] font-bold' : 'bg-charcoal/15 text-charcoal'}`}>
                {pendingApprovals.length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('domains')}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 ${activeTab === 'domains' ? 'bg-[#1D2B1E] text-white shadow-sm' : 'text-charcoal/60 hover:text-charcoal'}`}
          >
            <span>Domain Reviews</span>
            {pendingDomainReviews.length > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono leading-none ${activeTab === 'domains' ? 'bg-sage text-white font-bold' : 'bg-charcoal/15 text-charcoal'}`}>
                {pendingDomainReviews.length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${activeTab === 'all' ? 'bg-[#1D2B1E] text-white shadow-sm' : 'text-charcoal/60 hover:text-charcoal'}`}
          >
            All Members Directory
          </button>
        </div>

        {/* Directory Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search directory name, domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-charcoal/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage focus:border-sage placeholder-charcoal/45 shadow-inner-soft"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="w-5 h-5 rounded-full bg-cream-dark/80 hover:bg-cream-dark absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-charcoal/50"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>

      {/* Main Administrative Action Zones */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-10 h-10 border-2 border-sage border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-charcoal/60 font-sans text-sm">Consulting Kindred records...</p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* TAB 1: Onboarding approvals queue */}
          {activeTab === 'approvals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-charcoal">Onboarding Requests Queue</h2>
                  <p className="text-xs text-charcoal/60 mt-0.5">
                    Newly registered sprouts waiting to enter the circle. Review their background and domain alignment.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#C4956D] bg-[#f7ede4] border border-[#f7ede4] px-3 py-1 rounded-full">
                  Queue Position: #{pendingApprovals.length} pending
                </span>
              </div>

              {pendingApprovals.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 border border-charcoal/10 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 bg-sage/5 text-sage rounded-full flex items-center justify-center mx-auto border border-sage/10">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg text-charcoal">All Clear!</h3>
                  <p className="text-charcoal/60 max-w-md mx-auto text-sm">
                    No onboarding requests require review right now. All registering members have been processed.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingApprovals.map((reqUser) => (
                    <div key={reqUser.id} className="bg-white border border-charcoal/10 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-5 hover-premium relative overflow-hidden animate-scale-in">
                      
                      {/* Top identity detail */}
                      <div className="flex items-start gap-4">
                        <img
                          src={reqUser.profile_photo_url}
                          alt={reqUser.legalNameFull}
                          className="w-14 h-14 rounded-full object-cover border-2 border-cream-dark shadow-sm bg-cream-dark"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-bold text-base text-charcoal truncate">{reqUser.legalNameFull}</h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-cream-dark border border-charcoal/5 text-charcoal/70 rounded-full font-bold">
                              ID: {reqUser.id}
                            </span>
                          </div>
                          <p className="text-xs text-charcoal/50 font-mono mt-0.5">{reqUser.email}</p>
                          <p className="text-xs font-semibold text-sage-hover mt-1">
                            {reqUser.company_name ? `${reqUser.job_title} @ ${reqUser.company_name}` : reqUser.university_name ? `${reqUser.department} at ${reqUser.university_name}` : 'Independent Practitioner'}
                          </p>
                        </div>
                      </div>

                      {/* Bio review */}
                      <div className="bg-[#FAF8F5] border border-charcoal/5 rounded-2xl p-4 text-xs text-charcoal/80 leading-relaxed font-sans min-h-[64px]">
                        <p className="italic font-light">"{reqUser.bio || 'No background bio provided by the registering member.'}"</p>
                      </div>

                      {/* Skills & Values */}
                      <div className="space-y-2.5">
                        {reqUser.skills.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-wide">Skills:</span>
                            {reqUser.skills.slice(0, 3).map((s, i) => (
                              <span key={i} className="text-[10px] bg-sage-light text-sage border border-sage/15 px-2.5 py-0.5 rounded-full font-medium">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                        {reqUser.values.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-wide">Values:</span>
                            {reqUser.values.slice(0, 3).map((v, i) => (
                              <span key={i} className="text-[10px] bg-clay-light text-[#A86E43] border border-clay/15 px-2.5 py-0.5 rounded-full font-medium">
                                {v}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Associated domain review block */}
                      <div className="border-t border-charcoal/5 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                        
                        {/* Domain verification state */}
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-charcoal/40" />
                          <div>
                            <span className="font-semibold text-charcoal block">
                              {reqUser.company_domain || reqUser.university_domain || 'No domain credentials'}
                            </span>
                            <span className="text-[10px] text-clay font-bold uppercase tracking-wider">Unverified Domain</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleDecline(reqUser.id, reqUser.legalNameFull)}
                            className="px-3.5 py-2 border border-clay/20 text-clay hover:bg-clay/5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-1"
                            title="Decline registration request"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Decline</span>
                          </button>
                          <button
                            onClick={() => handleApprove(reqUser.id, reqUser.legalNameFull)}
                            className="px-4 py-2 bg-sage hover:bg-sage-hover text-white rounded-xl font-semibold shadow-sm shadow-sage/10 transition-colors flex items-center justify-center gap-1"
                            title="Approve registration request"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve Account</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Domain Review Queue */}
          {activeTab === 'domains' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-charcoal">Work / School Domain Verification Queue</h2>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Members requesting manual domain credential verification. Approve to grant trust score boosts and identity highlights.
                </p>
              </div>

              {pendingDomainReviews.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 border border-charcoal/10 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 bg-sage/5 text-sage rounded-full flex items-center justify-center mx-auto border border-sage/10">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg text-charcoal">Domain Queue Clear</h3>
                  <p className="text-charcoal/60 max-w-md mx-auto text-sm">
                    No active members have pending work or academic domain verification requests at this moment.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-charcoal/10 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-cream-dark/35 border-b border-charcoal/10">
                          <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Member</th>
                          <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Domain Email Type</th>
                          <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Organization / Domain</th>
                          <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider text-right">Verification Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-charcoal/5">
                        {pendingDomainReviews.map((mUser) => {
                          const workReviewNeeded = mUser.work_email && !mUser.work_email_verified;
                          const schoolReviewNeeded = mUser.school_email && !mUser.school_email_verified;

                          return (
                            <React.Fragment key={mUser.id}>
                              {workReviewNeeded && (
                                <tr className="hover:bg-cream/25 transition-colors">
                                  <td className="p-4">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={mUser.profile_photo_url}
                                        alt={mUser.legalNameFull}
                                        className="w-9 h-9 rounded-full object-cover border border-cream-dark"
                                      />
                                      <div>
                                        <h4 className="font-bold text-sm text-charcoal leading-none">{mUser.legalNameFull}</h4>
                                        <span className="text-[10px] text-charcoal/45 font-mono">{mUser.email}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sage-light text-sage border border-sage/10">
                                      💼 Professional
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <div className="text-xs">
                                      <p className="font-semibold text-charcoal leading-snug">{mUser.work_email}</p>
                                      <p className="text-charcoal/50 font-mono text-[10px]">{mUser.company_name} (domain: {mUser.company_domain})</p>
                                    </div>
                                  </td>
                                  <td className="p-4 text-right">
                                    <button
                                      onClick={() => handleVerifyDomain(mUser.id, 'work', mUser.work_email!)}
                                      className="px-4 py-2 bg-sage hover:bg-sage-hover text-white text-xs font-semibold rounded-xl shadow-sm transition-colors inline-flex items-center gap-1.5"
                                    >
                                      <UserCheck className="w-3.5 h-3.5" />
                                      <span>Verify Domain</span>
                                    </button>
                                  </td>
                                </tr>
                              )}

                              {schoolReviewNeeded && (
                                <tr className="hover:bg-cream/25 transition-colors">
                                  <td className="p-4">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={mUser.profile_photo_url}
                                        alt={mUser.legalNameFull}
                                        className="w-9 h-9 rounded-full object-cover border border-cream-dark"
                                      />
                                      <div>
                                        <h4 className="font-bold text-sm text-charcoal leading-none">{mUser.legalNameFull}</h4>
                                        <span className="text-[10px] text-charcoal/45 font-mono">{mUser.email}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-clay-light text-[#A86E43] border border-clay/10">
                                      🎓 Academic
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <div className="text-xs">
                                      <p className="font-semibold text-charcoal leading-snug">{mUser.school_email}</p>
                                      <p className="text-charcoal/50 font-mono text-[10px]">{mUser.university_name} (domain: {mUser.university_domain})</p>
                                    </div>
                                  </td>
                                  <td className="p-4 text-right">
                                    <button
                                      onClick={() => handleVerifyDomain(mUser.id, 'school', mUser.school_email!)}
                                      className="px-4 py-2 bg-sage hover:bg-sage-hover text-white text-xs font-semibold rounded-xl shadow-sm transition-colors inline-flex items-center gap-1.5"
                                    >
                                      <UserCheck className="w-3.5 h-3.5" />
                                      <span>Verify Domain</span>
                                    </button>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: All members control table */}
          {activeTab === 'all' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-charcoal">All Members Directory</h2>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Full list of seeded and registered members. View status, inspect profiles, and trigger account suspensions/restorations.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-charcoal/10 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-cream-dark/35 border-b border-charcoal/10">
                        <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Member Details</th>
                        <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Role</th>
                        <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Domain Affiliation</th>
                        <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Trust Score</th>
                        <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Streak</th>
                        <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider">Account Status</th>
                        <th className="p-4 text-xs font-bold text-charcoal/50 uppercase tracking-wider text-right">Moderator Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal/5">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-charcoal/60 font-sans text-sm">
                            No directory matches found for "{searchTerm}"
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((mUser) => {
                          const isSuspended = mUser.account_status === 'suspended';
                          const isPending = mUser.account_status === 'pending_approval';
                          const hasAdminPrivilege = mUser.role === 'admin';

                          return (
                            <tr key={mUser.id} className={`hover:bg-cream/25 transition-colors ${isSuspended ? 'bg-clay/5' : ''}`}>
                              
                              {/* Member detail */}
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={mUser.profile_photo_url}
                                    alt={mUser.legalNameFull}
                                    className="w-9 h-9 rounded-full object-cover border border-cream-dark bg-cream-dark"
                                  />
                                  <div>
                                    <div className="flex items-center gap-1 flex-wrap">
                                      <h4 className="font-bold text-sm text-charcoal leading-none">{mUser.legalNameFull}</h4>
                                      {mUser.is_founding_member && (
                                        <span className="text-[9px] bg-clay/10 text-clay font-bold border border-clay/10 px-1 rounded font-serif" title={`Founding Circle Member #${mUser.founding_member_number}`}>
                                          F{mUser.founding_member_number}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-charcoal/45 font-mono">{mUser.email}</span>
                                  </div>
                                </div>
                              </td>

                              {/* Role */}
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono ${hasAdminPrivilege ? 'bg-ochre-light text-[#A86E43] border border-[#D4A574]/30' : 'bg-cream-dark text-charcoal/60'}`}>
                                  {mUser.role || 'member'}
                                </span>
                              </td>

                              {/* Domain affiliation */}
                              <td className="p-4">
                                <div className="text-xs">
                                  {mUser.company_name ? (
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-charcoal font-medium truncate max-w-[120px]">{mUser.company_name}</span>
                                      {mUser.work_email_verified ? (
                                        <span className="text-[9px] font-mono bg-sage/10 text-sage font-bold px-1 rounded" title="Verified Professional Credentials">✓ Work</span>
                                      ) : (
                                        <span className="text-[9px] font-mono bg-charcoal/10 text-charcoal/40 px-1 rounded">Unverified</span>
                                      )}
                                    </div>
                                  ) : mUser.university_name ? (
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-charcoal font-medium truncate max-w-[120px]">{mUser.university_name}</span>
                                      {mUser.school_email_verified ? (
                                        <span className="text-[9px] font-mono bg-clay/10 text-clay font-bold px-1 rounded" title="Verified Academic Credentials">✓ School</span>
                                      ) : (
                                        <span className="text-[9px] font-mono bg-charcoal/10 text-charcoal/40 px-1 rounded">Unverified</span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-charcoal/40 italic">None</span>
                                  )}
                                </div>
                              </td>

                              {/* Trust Score */}
                              <td className="p-4">
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-bold text-charcoal font-mono">{mUser.trust_score.toFixed(1)}</span>
                                  <div className="w-1.5 h-1.5 rounded-full bg-sage shadow-glow-sage" />
                                </div>
                              </td>

                              {/* Streak */}
                              <td className="p-4">
                                <div className="flex items-center gap-1.5">
                                  <Flame className="w-3.5 h-3.5 text-clay" />
                                  <span className="text-xs font-bold text-charcoal font-mono">{mUser.check_in_streak}d</span>
                                </div>
                              </td>

                              {/* Status Badge */}
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-sans ${isSuspended ? 'bg-clay-light text-[#A86E43]' : isPending ? 'bg-ochre-light text-ochre' : 'bg-sage-light text-sage'}`}>
                                  {mUser.account_status}
                                </span>
                              </td>

                              {/* Moderator actions */}
                              <td className="p-4 text-right">
                                {isPending ? (
                                  <div className="flex gap-1.5 justify-end">
                                    <button
                                      onClick={() => handleDecline(mUser.id, mUser.legalNameFull)}
                                      className="p-1.5 text-clay hover:bg-clay/5 rounded-lg border border-clay/15 transition-colors"
                                      title="Decline Registration"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleApprove(mUser.id, mUser.legalNameFull)}
                                      className="px-2.5 py-1 bg-sage hover:bg-sage-hover text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                                      title="Approve Member"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Approve</span>
                                    </button>
                                  </div>
                                ) : mUser.id === currentUser.id ? (
                                  <span className="text-[10px] text-charcoal/40 italic">You (Current Admin)</span>
                                ) : isSuspended ? (
                                  <button
                                    onClick={() => handleRestore(mUser.id, mUser.legalNameFull)}
                                    className="px-3 py-1.5 bg-sage hover:bg-sage-hover text-white text-xs font-semibold rounded-xl shadow-sm transition-colors inline-flex items-center gap-1"
                                  >
                                    <UserCheck className="w-3.5 h-3.5" />
                                    <span>Restore Account</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleSuspend(mUser.id, mUser.legalNameFull)}
                                    className="px-3 py-1.5 border border-clay/35 text-clay hover:bg-clay/5 text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1"
                                  >
                                    <UserX className="w-3.5 h-3.5" />
                                    <span>Suspend Account</span>
                                  </button>
                                )}
                              </td>

                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
