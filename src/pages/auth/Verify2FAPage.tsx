import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Phone, ShieldAlert, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Verify2FAPage() {
  const { verify2FA, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionToken = searchParams.get('sessionToken') || '';

  const [code, setCode] = useState('');

  // Proactively push the code inside alert in case they missed the previous toast
  useEffect(() => {
    const t = setTimeout(() => {
      toast('🔑 Sandbox 2FA SMS Code: 123456', {
        icon: '📱',
        duration: 8000,
        style: {
          background: '#3D5941',
          color: '#fff',
          fontWeight: 'bold',
          border: '1px solid rgba(255,255,255,0.2)'
        }
      });
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  const handleKeyPress = (num: string) => {
    if (code.length < 6) {
      setCode(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setCode(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setCode('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error('Verification code must be exactly 6 digits.');
      return;
    }

    const success = await verify2FA(sessionToken, code);
    if (success) {
      toast.success('Successfully Rooted In! Welcome to Kindred.');
      navigate('/');
    } else {
      toast.error('Invalid 2FA code. Try again or check the alert banner!');
    }
  };

  // Auto-submit when code reaches 6 digits
  useEffect(() => {
    if (code.length === 6) {
      const triggerSubmit = async () => {
        const success = await verify2FA(sessionToken, code);
        if (success) {
          toast.success('Successfully Rooted In! Welcome to Kindred.');
          navigate('/');
        }
      };
      triggerSubmit();
    }
  }, [code, sessionToken, verify2FA, navigate]);

  return (
    <div className="min-h-screen bg-cream/15 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[400px] bg-white border border-charcoal/8 rounded-2xl p-8 shadow-2xl space-y-6 text-center">
        
        {/* Brand Shield sprout */}
        <div className="space-y-2">
          <div className="inline-flex w-12 h-12 bg-sage/10 rounded-full items-center justify-center text-sage">
            <Phone className="w-6 h-6 animate-bounce" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-charcoal">Phone 2FA Verification</h2>
          <p className="text-xs text-charcoal/70">
            We sent a secure code to your phone. Enter it below to complete authorization.
          </p>
        </div>

        {/* Code Alert Box */}
        <div className="bg-ochre/10 border border-ochre/30 rounded-xl p-3 text-xs text-ochre font-medium flex items-center justify-center gap-2">
          <span className="animate-pulse">📱</span>
          <span>Sandbox Demo Code: <strong className="text-sm tracking-wider font-mono">123456</strong></span>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2.5 rounded-xl flex items-start gap-2.5 text-left">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Display screen digits */}
        <div className="flex justify-center gap-2.5">
          {[...Array(6)].map((_, idx) => {
            const digit = code[idx] || '';
            const isActive = code.length === idx;
            return (
              <div
                key={idx}
                className={`w-11 h-13 rounded-xl border text-xl font-mono font-bold flex items-center justify-center transition-all ${
                  digit
                    ? 'border-sage bg-sage/5 text-charcoal'
                    : isActive
                    ? 'border-clay ring-2 ring-clay/20 scale-105'
                    : 'border-charcoal/10 bg-cream/5'
                }`}
              >
                {digit}
              </div>
            );
          })}
        </div>

        {/* Simulated Dialpad */}
        <div className="grid grid-cols-3 gap-3 select-none">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyPress(num)}
              className="py-3 bg-cream/20 border border-charcoal/5 rounded-xl text-lg font-mono font-semibold text-charcoal hover:bg-cream hover:border-clay hover:scale-102 transition-all active:scale-98"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="py-3 text-xs font-bold text-clay/70 hover:text-clay hover:bg-clay/5 rounded-xl transition-all"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="py-3 bg-cream/20 border border-charcoal/5 rounded-xl text-lg font-mono font-semibold text-charcoal hover:bg-cream hover:border-clay hover:scale-102 transition-all active:scale-98"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="py-3 text-xs font-bold text-charcoal/60 hover:text-charcoal hover:bg-cream/40 rounded-xl transition-all"
          >
            Delete
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || code.length !== 6}
          className="w-full bg-sage text-white font-medium py-3.5 rounded-xl hover:bg-sage-hover transition-all flex items-center justify-center gap-2 disabled:opacity-40"
        >
          {loading ? 'Authorizing...' : 'Complete Authentication'}
          <ShieldCheck className="w-5 h-5" />
        </button>

        {/* Back Link */}
        <div className="text-center">
          <Link to="/login" className="text-xs font-bold text-clay hover:underline">
            Go Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
