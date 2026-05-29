import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Award, Flame, Coffee, Compass } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream/15 font-sans overflow-hidden flex flex-col justify-between">
      {/* Landing Header */}
      <header className="w-full max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Kindred logo" className="w-8 h-8 object-contain" />
          <span className="font-serif text-2xl font-bold tracking-tight text-charcoal">
            Kindred
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold text-charcoal hover:text-sage transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-sage text-white text-sm font-semibold px-4.5 py-2.5 rounded-xl hover:bg-sage-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-sage/10"
          >
            Join Founding Circle
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full max-w-[1200px] mx-auto px-6 pt-10 pb-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 animate-slide-up text-left">
          {/* Founding Circle Glowing Urgency Bar */}
          <div className="inline-flex items-center gap-2 bg-ochre/10 border border-ochre/25 text-ochre px-4 py-2 rounded-full text-xs font-semibold text-glow-ochre tracking-wide">
            <Award className="w-4.5 h-4.5" />
            <span>Founding Circle Status: <strong>482 / 500</strong> slots joined (Lifetime benefits)</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal leading-[1.1] tracking-tight">
            A trust-first <br />
            <span className="text-sage text-glow-sage">mentoring community.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-xl">
            Kindred is where students and professionals find values-aligned mentors, build genuine relationships, and stay rooted. Domain verified. Streak behavior-based. Reciprocity non-negotiable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/register"
              className="bg-sage text-white font-medium px-8 py-4 rounded-xl hover:bg-sage-hover shadow-lg shadow-sage/15 transition-all text-center hover:scale-[1.02] active:scale-[0.98]"
            >
              Apply for Membership
            </Link>
            <Link
              to="/login"
              className="bg-white border border-charcoal/10 text-charcoal font-medium px-8 py-4 rounded-xl hover:bg-cream/40 transition-all text-center hover:scale-[1.02]"
            >
              Explore Mentors Demo
            </Link>
          </div>
        </div>

        {/* Hero Interactive Graphics Overlay */}
        <div className="lg:col-span-5 relative w-full h-[400px] flex items-center justify-center animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-tr from-sage/5 to-clay/5 rounded-full blur-3xl" />
          <img src="/hero.png" alt="Kindred Café" className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-20" />
          
          {/* Card Overlay Preview */}
          <div className="relative w-full max-w-[340px] bg-white border border-charcoal/8 rounded-2xl p-6 shadow-2xl space-y-4 hover:scale-[1.02] transition-transform">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full object-cover border border-clay"
                />
                <div>
                  <h3 className="font-serif font-bold text-charcoal text-base">Sarah Chen</h3>
                  <p className="text-xs text-charcoal/70">Staff Engineer @ Google</p>
                </div>
              </div>
              <div className="bg-sage/10 text-sage text-[10px] font-bold px-2 py-0.5 rounded border border-sage/20">
                ✓ Verified
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="bg-cream px-2 py-1 rounded text-[11px] font-mono text-charcoal">React</span>
              <span className="bg-cream px-2 py-1 rounded text-[11px] font-mono text-charcoal">System Design</span>
              <span className="bg-clay/10 px-2 py-1 rounded text-[11px] font-sans font-medium text-clay text-glow-ochre">Empathy</span>
            </div>

            <div className="border-t border-charcoal/5 pt-3 flex justify-between items-center text-xs text-charcoal/60">
              <div className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-clay text-clay" />
                <span className="font-semibold text-charcoal">12 Streak Days</span>
              </div>
              <div className="font-bold text-ochre">⭐ 4.9 Trust</div>
            </div>

            {/* Simulated Checked-In Overlay */}
            <div className="bg-sage/5 border border-sage/10 rounded-xl p-3 text-xs flex items-start gap-2 animate-pulse">
              <Coffee className="w-4 h-4 text-sage mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-sage block">Active Check-In:</span>
                <span className="text-charcoal/80">Sightglass Coffee • "Coffee reviews!"</span>
              </div>
            </div>
          </div>

          {/* Floaters */}
          <div className="absolute top-10 right-4 bg-clay text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-1 animate-bounce">
            <Compass className="w-3.5 h-3.5" />
            <span>Values Matching</span>
          </div>
          
          <div className="absolute bottom-6 left-2 bg-charcoal text-cream px-4 py-2 rounded-2xl text-xs font-medium shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>12 local check-ins active</span>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="bg-cream/45 border-t border-b border-charcoal/10 py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-charcoal mb-12">
            Built on Core High-Trust Mechanisms
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-charcoal/8 p-6.5 rounded-2xl shadow-sm space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center text-sage">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">Domain Verification Only</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Connect your work or school email (google.com, stanford.edu) to build immediate professional credibility without uploading invasive government IDs.
              </p>
            </div>

            <div className="bg-white border border-charcoal/8 p-6.5 rounded-2xl shadow-sm space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-clay/10 flex items-center justify-center text-clay">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">Check-In Reciprocity</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                See who else is studying or working in local coffee shops, libraries, and parks. Surveillance-free: you must be checked-in to see others around.
              </p>
            </div>

            <div className="bg-white border border-charcoal/8 p-6.5 rounded-2xl shadow-sm space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-ochre/10 flex items-center justify-center text-ochre">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">Behavior-Based Trust Score</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Your reputation is calculated through check-in streaks, mentoring reviews, and help-swap consistency. Integrity and showing up is what matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reciprocity Teaser Widget */}
      <section className="max-w-[800px] mx-auto px-6 py-16 text-center space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">
          Who's Checked In Locally Right Now?
        </h2>
        <p className="text-sm sm:text-base text-charcoal/70 max-w-lg mx-auto">
          Under our reciprocity contract, active locations and check-ins are restricted until you join the community and check in yourself.
        </p>

        {/* Blurred Teaser Box */}
        <div className="relative border border-charcoal/10 rounded-2xl p-6 bg-white overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-cream/10 backdrop-blur-[6px] z-10 flex flex-col items-center justify-center p-6 space-y-4">
            <span className="text-2xl" role="img" aria-label="Shield lock">🔒</span>
            <h4 className="font-serif font-bold text-charcoal">Active Contract Locked</h4>
            <p className="text-xs text-charcoal/70 max-w-sm">
              Verify your email and complete a check-in to witness 12 local mentors and students checked-in around San Francisco.
            </p>
            <Link
              to="/login"
              className="bg-charcoal text-white text-xs font-semibold px-4.5 py-2.5 rounded-lg hover:bg-sage transition-all"
            >
              Sign In to Unlock
            </Link>
          </div>

          {/* Blurred Dummy Content */}
          <div className="opacity-20 select-none space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-charcoal/20" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 bg-charcoal/20 w-32 rounded" />
                <div className="h-3 bg-charcoal/20 w-48 rounded" />
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="h-5 w-12 bg-charcoal/20 rounded" />
              <div className="h-5 w-16 bg-charcoal/20 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white/70 text-xs py-10 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span>🌱</span>
            <span className="font-serif font-bold text-white text-sm">Kindred Community</span>
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Charter</a>
            <a href="#terms" className="hover:text-white transition-colors">Reciprocity Covenant</a>
            <a href="#safety" className="hover:text-white transition-colors">Safety Code</a>
          </div>
          <div>
            © 2026 Kindred. Verified Rooted. Capped at 500 Founding Members.
          </div>
        </div>
      </footer>
    </div>
  );
}
