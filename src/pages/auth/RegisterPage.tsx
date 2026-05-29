import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ShieldCheck, User, Compass, Award, ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const PREDEFINED_VALUES = [
  'Continuous Learning',
  'Empathy',
  'Rootedness',
  'Deep Inquiry',
  'Aesthetic Calm',
  'Trustworthiness',
  'Inclusivity',
  'Integrity',
  'Long-term Thinking',
  'Humility'
];

const PREDEFINED_SKILLS = [
  'React',
  'TypeScript',
  'Frontend System Design',
  'Machine Learning',
  'AI Alignment',
  'Python',
  'UI/UX Design',
  'Figma',
  'Product Strategy',
  'Academic Research',
  'Career Growth'
];

export default function RegisterPage() {
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [legalFirstName, setLegalFirstName] = useState('');
  const [legalLastName, setLegalLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [displayName, setDisplayName] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [bio, setBio] = useState('');
  
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleToggleValue = (value: string) => {
    setSelectedValues(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      if (!email || !password || !legalFirstName || !legalLastName || !phoneNumber) {
        toast.error('Please complete all legal identity fields.');
        return;
      }
    }
    if (step === 2) {
      if (!displayName || !locationCity) {
        toast.error('Please complete display name and location.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkills.length < 1 || selectedValues.length < 1) {
      toast.error('Please select at least 1 skill and 1 core value.');
      return;
    }

    const payload = {
      email,
      password,
      legalFirstName,
      legalLastName,
      phoneNumber,
      display_name: displayName,
      location_city: locationCity,
      bio,
      skills: selectedSkills,
      values: selectedValues,
    };

    const success = await register(payload);
    if (success) {
      toast.success('Registration request received! Sign in to verify phone.');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-cream/15 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[520px] bg-white border border-charcoal/8 rounded-2xl p-8 shadow-2xl space-y-6">
        {/* Registration Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block text-4xl">🌱</Link>
          <h2 className="font-serif text-3xl font-bold text-charcoal">Apply for Membership</h2>
          
          {/* Progress Indicator Dots */}
          <div className="flex justify-center gap-1.5 pt-1">
            <span className={`w-3.5 h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-sage' : 'bg-charcoal/10'}`} />
            <span className={`w-3.5 h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-sage' : 'bg-charcoal/10'}`} />
            <span className={`w-3.5 h-1.5 rounded-full transition-all ${step >= 3 ? 'bg-sage' : 'bg-charcoal/10'}`} />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* STEP 1: LEGAL IDENTITY */}
          {step === 1 && (
            <div className="space-y-4 animate-slide-up">
              <div className="bg-sage/5 border border-sage/10 rounded-xl p-3.5 text-xs text-charcoal/70 leading-relaxed flex gap-2.5">
                <ShieldCheck className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                <p>
                  <strong>Privacy Pledge:</strong> Your legal first and last name is stored securely for account security and legal protection, but is <em>never</em> shared publicly. Your public display identity is fully customizable.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Legal First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sarah"
                    value={legalFirstName}
                    onChange={e => setLegalFirstName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Legal Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Chen"
                    value={legalLastName}
                    onChange={e => setLegalLastName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Phone Number (For 2FA SMS)</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 0199"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="sarah.chen@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage-hover hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                Continue to Public Profile
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: PUBLIC PROFILE */}
          {step === 2 && (
            <div className="space-y-4 animate-slide-up">
              <div className="bg-clay/5 border border-clay/10 rounded-xl p-3.5 text-xs text-charcoal/70 leading-relaxed flex gap-2.5">
                <User className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                <p>
                  Create your outward community persona. Pick a nickname or display name that feels natural, specify your location, and write a brief description of how you stay rooted.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Display Name</label>
                <input
                  type="text"
                  required
                  placeholder="Sarah C."
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Location (City, State)</label>
                <input
                  type="text"
                  required
                  placeholder="San Francisco, CA"
                  value={locationCity}
                  onChange={e => setLocationCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Bio</label>
                <textarea
                  placeholder="Passionate about learning engineering systems and designing safe spaces."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-cream/20 border border-charcoal/10 rounded-xl text-sm focus:border-sage focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-white border border-charcoal/10 text-charcoal font-medium py-3 rounded-xl hover:bg-cream/40 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage-hover hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  Configure Alignment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ALIGNMENT & RECOVENANT */}
          {step === 3 && (
            <div className="space-y-5 animate-slide-up">
              <div className="bg-ochre/5 border border-ochre/15 rounded-xl p-3.5 text-xs text-charcoal/70 leading-relaxed flex gap-2.5">
                <Compass className="w-5 h-5 text-ochre shrink-0 mt-0.5" />
                <p>
                  <strong>Reciprocity Contract:</strong> Kindred thrives on shared support. Select the professional skills you wish to learn/teach, and highlight the core values you will bring to our community space.
                </p>
              </div>

              {/* Skills select tags grid */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Skills Preference (Select 2-4)</label>
                <div className="flex flex-wrap gap-1.5">
                  {PREDEFINED_SKILLS.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                        selectedSkills.includes(skill)
                          ? 'bg-sage border-sage text-white shadow-sm'
                          : 'bg-cream/55 border-charcoal/10 text-charcoal hover:border-sage'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Values select tags grid */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider block">Core Alignment Values (Select 2-4)</label>
                <div className="flex flex-wrap gap-1.5">
                  {PREDEFINED_VALUES.map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleToggleValue(val)}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all border ${
                        selectedValues.includes(val)
                          ? 'bg-clay border-clay text-white shadow-sm'
                          : 'bg-cream/55 border-charcoal/10 text-charcoal hover:border-clay'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-white border border-charcoal/10 text-charcoal font-medium py-3 rounded-xl hover:bg-cream/40 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-sage text-white font-medium py-3 rounded-xl hover:bg-sage-hover hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Register'}
                  <Award className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Action Toggle Links */}
        <div className="text-center text-xs text-charcoal/60">
          Already applied?{' '}
          <Link to="/login" className="font-bold text-sage hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
