import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { ShieldCheck, Mail, Bell, Lock, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export default function SettingsPage() {
  const { user, verifyDomainEmail } = useAuthStore();

  const [workEmail, setWorkEmail] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessRegNum, setBusinessRegNum] = useState('');
  const [verifyingWork, setVerifyingWork] = useState(false);
  const [verifyingSchool, setVerifyingSchool] = useState(false);
  const [verifyingBusiness, setVerifyingBusiness] = useState(false);

  // Toggle state simulation
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifCheckIn, setNotifCheckIn] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);

  if (!user) return null;

  const handleVerifyWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail) return;
    if (!workEmail.includes('@') || workEmail.split('@')[1].length < 3) {
      toast.error('Please enter a valid work email.');
      return;
    }

    setVerifyingWork(true);
    const success = await verifyDomainEmail('work', workEmail);
    setVerifyingWork(false);

    if (success) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#3D5941', '#FAF8F3']
      });
      toast.success('Work Email verified! Professional Sprout Badge unlocked.');
      setWorkEmail('');
    }
  };

  const handleVerifySchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolEmail) return;
    if (!schoolEmail.includes('@') || schoolEmail.split('@')[1].length < 3) {
      toast.error('Please enter a valid university email.');
      return;
    }

    setVerifyingSchool(true);
    const success = await verifyDomainEmail('school', schoolEmail);
    setVerifyingSchool(false);

    if (success) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C4956D', '#FAF8F3']
      });
      toast.success('School Email verified! Academic Sprout Badge unlocked.');
    }
  };

  const handleVerifyBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessEmail) return;
    if (!businessEmail.includes('@') || businessEmail.split('@')[1].length < 3) {
      toast.error('Please enter a valid business email.');
      return;
    }

    setVerifyingBusiness(true);
    const success = await verifyDomainEmail('business', businessEmail, businessName || undefined, businessRegNum || undefined);
    setVerifyingBusiness(false);

    if (success) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4A574', '#FAF8F3']
      });
      toast.success('Business Email verified! Local Business Owner Badge unlocked.');
      setBusinessEmail('');
      setBusinessName('');
      setBusinessRegNum('');
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h2 className="font-serif text-3xl font-bold text-charcoal">Account Settings</h2>
        <p className="text-xs text-charcoal-muted mt-1">Configure your credentials, domain email badges, and notifications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: DOMAIN BADGES VERIFICATION */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Work verification widget */}
          <div className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm space-y-5">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-sage/10 text-sage rounded-xl flex items-center justify-center">
                <Mail className="w-5.5 h-5.5" />
              </div>
              <div className="text-left">
                <h3 className="font-serif text-lg font-bold text-charcoal">Verify Professional Credential</h3>
                <p className="text-xs text-charcoal-muted">Unlock a verified company badge and boost your Trust Score (+0.3).</p>
              </div>
            </div>

            {user.work_email_verified ? (
              <div className="bg-sage/5 border border-sage/15 rounded-2xl p-4 flex gap-3.5 items-center animate-scale-in">
                <ShieldCheck className="w-6 h-6 text-sage shrink-0" />
                <div className="text-xs text-left leading-normal">
                  <span className="font-bold text-sage block">Verification Complete ✓</span>
                  <span className="text-charcoal/70">
                    Your professional email <strong>{user.work_email}</strong> is domain verified.
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifyWork} className="space-y-4 animate-scale-in">
                <div className="bg-ochre/5 border border-ochre/15 rounded-xl p-3.5 text-[11px] text-ochre leading-normal flex gap-2">
                  <span className="shrink-0 mt-0.5">💡</span>
                  <p>
                    <strong>Simulated Test Domains:</strong> Entering any email ending with your organization domain (e.g. <code>you@google.com</code>, <code>you@stripe.com</code>) will instantly complete and unlock your professional badge.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Company Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@google.com"
                    value={workEmail}
                    onChange={e => setWorkEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifyingWork || !workEmail}
                  className="w-full bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage-hover transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  Verify Work Email
                </button>
              </form>
            )}
          </div>

          {/* School verification widget */}
          <div className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm space-y-5">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-clay/10 text-clay rounded-xl flex items-center justify-center">
                <Mail className="w-5.5 h-5.5" />
              </div>
              <div className="text-left">
                <h3 className="font-serif text-lg font-bold text-charcoal">Verify Academic Credential</h3>
                <p className="text-xs text-charcoal-muted">Unlock a verified university badge and boost your Trust Score (+0.25).</p>
              </div>
            </div>

            {user.school_email_verified ? (
              <div className="bg-sage/5 border border-sage/15 rounded-2xl p-4 flex gap-3.5 items-center animate-scale-in">
                <ShieldCheck className="w-6 h-6 text-sage shrink-0" />
                <div className="text-xs text-left leading-normal">
                  <span className="font-bold text-sage block">Verification Complete ✓</span>
                  <span className="text-charcoal/70">
                    Your school domain <strong>{user.school_email}</strong> is verified.
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifySchool} className="space-y-4 animate-scale-in">
                <div className="bg-ochre/5 border border-ochre/15 rounded-xl p-3.5 text-[11px] text-ochre leading-normal flex gap-2">
                  <span className="shrink-0 mt-0.5">💡</span>
                  <p>
                    <strong>Simulated Test Domains:</strong> Entering any university domain (e.g. <code>you@stanford.edu</code>, <code>you@mit.edu</code>) will instantly complete and unlock your student badge.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">University Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@stanford.edu"
                    value={schoolEmail}
                    onChange={e => setSchoolEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifyingSchool || !schoolEmail}
                  className="w-full bg-clay text-white font-medium py-3 rounded-xl hover:bg-clay/90 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  Verify School Email
                </button>
              </form>
            )}
          </div>

          {/* Business Owner verification widget */}
          <div className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm space-y-5">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-ochre/15 text-ochre rounded-xl flex items-center justify-center">
                <Mail className="w-5.5 h-5.5" />
              </div>
              <div className="text-left">
                <h3 className="font-serif text-lg font-bold text-charcoal">Verify Local Business Owner</h3>
                <p className="text-xs text-charcoal-muted">Unlock a verified Local Business Owner badge and boost your Trust Score (+0.35).</p>
              </div>
            </div>

            {user.business_email_verified ? (
              <div className="bg-sage/5 border border-sage/15 rounded-2xl p-4 flex gap-3.5 items-center animate-scale-in">
                <ShieldCheck className="w-6 h-6 text-sage shrink-0" />
                <div className="text-xs text-left leading-normal space-y-1">
                  <span className="font-bold text-sage block">Verification Complete ✓</span>
                  <span className="text-charcoal/70 block">
                    Your local business email <strong>{user.business_email}</strong> is domain verified.
                  </span>
                  <span className="text-charcoal/70 block">
                    <strong>Business Name:</strong> {user.business_name}
                  </span>
                  <span className="text-charcoal/70 block">
                    <strong>Registration Number:</strong> {user.business_registration_number}
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifyBusiness} className="space-y-4 animate-scale-in">
                <div className="bg-ochre/5 border border-ochre/15 rounded-xl p-3.5 text-[11px] text-ochre leading-normal flex gap-2">
                  <span className="shrink-0 mt-0.5">💡</span>
                  <p>
                    <strong>Simulated Test Domains:</strong> Entering any custom business email domain (e.g. <code>owner@mycafe.com</code>, <code>info@sprouts.org</code>) will instantly complete and unlock your Business Owner badge.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Business Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="owner@mycafe.com"
                    value={businessEmail}
                    onChange={e => setBusinessEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Business Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Kindred Cafe"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Business Registration Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. LLC-12345678"
                    value={businessRegNum}
                    onChange={e => setBusinessRegNum(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifyingBusiness || !businessEmail}
                  className="w-full bg-ochre text-white font-medium py-3 rounded-xl hover:bg-ochre/90 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 font-bold"
                >
                  Verify Business Email
                </button>
              </form>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: PRIVACY, SECURITY & NOTIFICATION CONFIGS */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Security & 2FA toggles */}
          <div className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
              <Lock className="w-5 h-5 text-clay" />
              <span>Security & 2FA</span>
            </h3>

            <div className="space-y-4 text-xs leading-normal">
              <div className="flex justify-between items-center border-b border-charcoal/5 pb-3">
                <div>
                  <span className="font-bold text-charcoal block">Two-Factor Authentication (2FA)</span>
                  <span className="text-charcoal/60">SMS secondary verification mandatory on logins.</span>
                </div>
                <div className="bg-sage/10 text-sage border border-sage/20 px-2.5 py-1 rounded-full font-bold text-[10px]">
                  Active
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-charcoal/5 pb-3">
                <div>
                  <span className="font-bold text-charcoal block">2FA Device verification</span>
                  <span className="text-charcoal/60">Simulate verification for current device.</span>
                </div>
                <div className="bg-sage/10 text-sage border border-sage/20 px-2.5 py-1 rounded-full font-bold text-[10px]">
                  Verified
                </div>
              </div>
            </div>
          </div>

          {/* Notification toggles */}
          <div className="bg-white border border-charcoal/8 rounded-3xl p-6.5 shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
              <Bell className="w-5 h-5 text-clay" />
              <span>Preferences</span>
            </h3>

            <div className="space-y-4.5 select-none">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-charcoal block">Email Alerts</span>
                  <span className="text-charcoal-muted">Receive newsletter updates and founding circles status.</span>
                </div>
                <button onClick={() => setNotifEmail(!notifEmail)} className="text-sage focus:outline-none">
                  {notifEmail ? <ToggleRight className="w-8 h-8 fill-sage/20" /> : <ToggleLeft className="w-8 h-8 text-charcoal/30" />}
                </button>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-charcoal block">Check-In Broadcasts</span>
                  <span className="text-charcoal-muted">Let others see your location alerts when checked-in.</span>
                </div>
                <button onClick={() => setNotifCheckIn(!notifCheckIn)} className="text-sage focus:outline-none">
                  {notifCheckIn ? <ToggleRight className="w-8 h-8 fill-sage/20" /> : <ToggleLeft className="w-8 h-8 text-charcoal/30" />}
                </button>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-charcoal block">Mentoring Messages</span>
                  <span className="text-charcoal-muted">Trigger real-time sounds/visual alerts when threads update.</span>
                </div>
                <button onClick={() => setNotifMessages(!notifMessages)} className="text-sage focus:outline-none">
                  {notifMessages ? <ToggleRight className="w-8 h-8 fill-sage/20" /> : <ToggleLeft className="w-8 h-8 text-charcoal/30" />}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
