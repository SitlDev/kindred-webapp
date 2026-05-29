import { useAuthStore } from '../../store/authStore';
import { Clock, LogOut, Award, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PendingApprovalPage() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const domain = user?.work_email || user?.school_email || 'independent_domain';
  const displayDomain = domain.includes('@') ? domain.split('@')[1] : domain;

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between py-12 px-6 lg:px-8 text-left select-none animate-fade-in font-sans">
      
      {/* Top logo */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1D2B1E] flex items-center justify-center text-[#D4A574]">
            <span>K</span>
          </div>
          <span className="font-sans font-bold text-lg text-charcoal tracking-wide">Kindred</span>
        </div>
        
        <button
          onClick={handleLogout}
          className="text-xs font-semibold text-charcoal/60 hover:text-clay transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-cream-dark/50"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main card */}
      <div className="max-w-md mx-auto w-full bg-white border border-charcoal/10 rounded-[32px] p-8 shadow-xl relative overflow-hidden my-auto space-y-6 hover-premium">
        
        {/* Glow Top Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-ochre-light text-[#A86E43] border border-[#D4A574]/20 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 text-glow-ochre animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>Onboarding In Progress</span>
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="font-sans text-2xl font-bold tracking-tight text-charcoal">
            Welcome to the Circle, {user?.legalFirstName || 'Sprout'}
          </h1>
          <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
            Your application is being evaluated by the Kindred Founding Circle administrators to maintain community safety and alignment.
          </p>
        </div>

        {/* Dynamic Queue Position box (Premium clay panel) */}
        <div className="bg-[#1D2B1E] text-white p-6 rounded-2xl relative overflow-hidden border border-white/5 shadow-md flex items-center justify-between">
          <div className="space-y-1 z-10">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Queue Position</span>
            <span className="text-3xl font-bold font-mono tracking-tight text-glow-sage text-[#FAF8F5]">
              Position #3
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#C4956D]/15 border border-[#C4956D]/35 text-[#D4A574] flex items-center justify-center z-10">
            <Award className="w-6 h-6" />
          </div>
          
          {/* Subtle line layout detail */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none w-24 h-full">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <path d="M0 50 L100 50" stroke="#E2D4C1" strokeWidth="6" />
            </svg>
          </div>
        </div>

        {/* Verification credentials box */}
        <div className="space-y-3.5">
          <span className="text-[11px] font-bold text-charcoal/40 uppercase tracking-wider block">Submitted Details</span>
          
          <div className="space-y-3.5">
            {/* Field 1: Name */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-charcoal/50">Legal Name</span>
              <span className="font-semibold text-charcoal">{user?.legalNameFull}</span>
            </div>

            {/* Field 2: Email domain */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-charcoal/50">Affiliated Domain</span>
              <span className="font-semibold text-charcoal flex items-center gap-1 font-mono">
                <Mail className="w-3.5 h-3.5 text-charcoal/40" />
                <span>{displayDomain}</span>
              </span>
            </div>

            {/* Field 3: Bio */}
            <div className="border-t border-charcoal/5 pt-3.5 space-y-1">
              <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-wider block">Intent & Bio</span>
              <p className="text-xs text-charcoal/70 leading-relaxed italic font-sans font-light bg-[#FAF8F5] p-3 rounded-xl border border-charcoal/5">
                "{user?.bio || 'No background bio provided by the registering member.'}"
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-charcoal/10 pt-4 text-center">
          <p className="text-[11px] text-charcoal/40 leading-relaxed font-sans">
            Have questions about your verification? Contact our trust desk at{' '}
            <a href="mailto:trust@kindred.org" className="underline hover:text-sage transition-colors font-semibold font-mono">
              trust@kindred.org
            </a>
          </p>
        </div>

      </div>

      {/* Rooted Status Box in bottom */}
      <div className="max-w-md mx-auto w-full text-center text-xs text-charcoal/40 space-y-1">
        <p className="font-semibold uppercase tracking-wider text-[10px] text-sage">Reciprocity Covenant Protected</p>
        <p>Kindred requires reciprocal local show-ups. No ghosting or silent profiles allowed.</p>
      </div>

    </div>
  );
}
