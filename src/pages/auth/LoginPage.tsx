import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ShieldAlert, Key, UserCheck, Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password credentials.');
      return;
    }

    const res = await login(email, password);
    if (res && res.status === '2fa_required') {
      toast.success('Credentials verified. Sending 2FA SMS code...');
      // Simulated code alert
      setTimeout(() => {
        toast('🔑 Sandbox 2FA SMS Code: 123456', {
          icon: '📱',
          duration: 6000,
          style: {
            background: '#D4A574',
            color: '#fff',
            fontWeight: 'bold'
          }
        });
      }, 800);
      navigate(`/verify-2fa?sessionToken=${res.sessionToken}`);
    }
  };

  const handleQuickLogin = async () => {
    // Quick login helper
    const res = await login('guest@kindred.org', 'password');
    if (res && res.status === '2fa_required') {
      toast.success('Instant Credentials check! Sending 2FA code...');
      setTimeout(() => {
        toast('🔑 Sandbox 2FA SMS Code: 123456', {
          icon: '📱',
          duration: 6000,
          style: {
            background: '#D4A574',
            color: '#fff',
            fontWeight: 'bold'
          }
        });
      }, 800);
      navigate(`/verify-2fa?sessionToken=${res.sessionToken}`);
    }
  };

  return (
    <div className="min-h-screen bg-cream/15 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[420px] bg-white border border-charcoal/8 rounded-2xl p-8 shadow-2xl space-y-6">
        {/* Header Sprout Brand */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block text-4xl">🌱</Link>
          <h2 className="font-serif text-3xl font-bold text-charcoal">Sign in to Kindred</h2>
          <p className="text-sm text-charcoal/70">Enter your credentials below to log in securely.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10.5 pr-4 py-3 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Password</label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10.5 pr-4 py-3 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage-hover hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-charcoal/5"></div>
          <span className="flex-shrink mx-4 text-charcoal/40 text-[10px] uppercase font-bold tracking-widest">Or Sandbox Login</span>
          <div className="flex-grow border-t border-charcoal/5"></div>
        </div>

        {/* Quick Guest Log-in Panel */}
        <div className="bg-ochre/5 border border-ochre/25 rounded-2xl p-4.5 space-y-3">
          <div className="flex items-center gap-2 text-ochre text-xs font-bold">
            <UserCheck className="w-4 h-4" />
            <span>Sandbox Tester Quick-Login</span>
          </div>
          <p className="text-[11px] text-charcoal/70 leading-normal font-sans">
            Instantly log in as a values-aligned tester to review check-ins, streaks, events, and mentor searches with populated mock profiles.
          </p>
          <button
            onClick={handleQuickLogin}
            className="w-full bg-ochre text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-ochre/90 hover:scale-[1.01] transition-all"
          >
            Quick Guest Login (Demo)
          </button>
        </div>

        {/* Action Toggle Links */}
        <div className="text-center text-xs text-charcoal/60">
          New to Kindred?{' '}
          <Link to="/register" className="font-bold text-sage hover:underline">
            Apply for Membership
          </Link>
        </div>
      </div>
    </div>
  );
}
