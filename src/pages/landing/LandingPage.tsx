import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Award, Flame, Coffee, Compass, PenTool } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';

export default function LandingPage() {
  const { t } = useLanguageStore();

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden flex flex-col justify-between">
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
            {t('landing.signIn')}
          </Link>
          <Link
            to="/register"
            className="bg-sage text-white text-sm font-semibold px-4.5 py-2.5 rounded-xl hover:bg-sage-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-sage/10"
          >
            {t('landing.joinFounding')}
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
            {t('landing.heroTitle').split('.')[0]}.<br />
            <span className="text-sage text-glow-sage">{t('landing.heroTitle').split('.').slice(1).join('.').trim()}</span>
          </h1>

          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-xl">
            {t('landing.heroSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/register"
              className="bg-sage text-white font-medium px-8 py-4 rounded-xl hover:bg-sage-hover shadow-lg shadow-sage/15 transition-all text-center hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('landing.applyMembership')}
            </Link>
            <Link
              to="/login"
              className="bg-white border border-charcoal/10 text-charcoal font-medium px-8 py-4 rounded-xl hover:bg-cream/40 transition-all text-center hover:scale-[1.02]"
            >
              {t('landing.exploreMentors')}
            </Link>
          </div>
        </div>

        {/* Hero Interactive Graphics Overlay */}
        <div className="lg:col-span-5 relative w-full h-[400px] flex items-center justify-center animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-tr from-sage/10 via-indigo/10 to-rose/10 rounded-full blur-3xl" />
          <img src="/hero.png" alt="Kindred Café" className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-45" />

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
              <span className="bg-indigo-light text-indigo border border-indigo/20 px-2 py-1 rounded text-[11px] font-mono">React</span>
              <span className="bg-sage-light text-sage border border-sage-border px-2 py-1 rounded text-[11px] font-mono">System Design</span>
              <span className="bg-rose-light text-rose border border-rose/20 px-2 py-1 rounded text-[11px] font-sans font-medium">Empathy</span>
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
                <span className="font-bold text-sage block">{t('home.activeCheckIn')}:</span>
                <span className="text-charcoal/80">Sightglass Coffee • "Coffee reviews!"</span>
              </div>
            </div>
          </div>

          {/* Floaters */}
          <div className="absolute top-10 right-4 bg-rose text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-1 animate-bounce">
            <Compass className="w-3.5 h-3.5" />
            <span>{t('discover.valuesMatch')}</span>
          </div>

          <div className="absolute bottom-6 left-2 bg-indigo text-white px-4 py-2 rounded-2xl text-xs font-medium shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>12 {t('home.activeMentorsText')}</span>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="bg-slate-50/50 border-t border-b border-charcoal/10 py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-charcoal mb-12">
            {t('landing.highTrustTitle')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-charcoal/8 p-6.5 rounded-2xl shadow-sm space-y-3.5 hover:border-sage/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center text-sage">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">{t('landing.domainVerifyTitle')}</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">{t('landing.domainVerifyDesc')}</p>
            </div>

            <div className="bg-white border border-charcoal/8 p-6.5 rounded-2xl shadow-sm space-y-3.5 hover:border-clay/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-clay/10 flex items-center justify-center text-clay">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">{t('landing.checkInTitle')}</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">{t('landing.checkInDesc')}</p>
            </div>

            <div className="bg-white border border-charcoal/8 p-6.5 rounded-2xl shadow-sm space-y-3.5 hover:border-ochre/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-ochre/10 flex items-center justify-center text-ochre">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">{t('landing.reputationTitle')}</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">{t('landing.reputationDesc')}</p>
            </div>

            <div className="bg-white border border-charcoal/8 p-6.5 rounded-2xl shadow-sm space-y-3.5 hover:border-rose/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center text-rose">
                <PenTool className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">{t('landing.bilateralTitle')}</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">{t('landing.bilateralDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reciprocity Teaser Widget */}
      <section className="max-w-[800px] mx-auto px-6 py-16 text-center space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">
          {t('landing.teaserTitle')}
        </h2>
        <p className="text-sm sm:text-base text-charcoal/70 max-w-lg mx-auto">
          {t('landing.teaserDesc')}
        </p>

        {/* Blurred Teaser Box */}
        <div className="relative border border-charcoal/10 rounded-2xl p-6 bg-white overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-cream/10 backdrop-blur-[6px] z-10 flex flex-col items-center justify-center p-6 space-y-4">
            <span className="text-2xl" role="img" aria-label="Shield lock">🔒</span>
            <h4 className="font-serif font-bold text-charcoal">{t('landing.lockedContract')}</h4>
            <p className="text-xs text-charcoal/70 max-w-sm">{t('landing.lockedDesc')}</p>
            <Link
              to="/login"
              className="bg-charcoal text-white text-xs font-semibold px-4.5 py-2.5 rounded-lg hover:bg-sage transition-all"
            >
              {t('landing.signInUnlock')}
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
            <a href="#privacy" className="hover:text-white transition-colors">{t('landing.footerTerms')}</a>
            <a href="#terms" className="hover:text-white transition-colors">{t('landing.footerCovenant')}</a>
            <a href="#safety" className="hover:text-white transition-colors">{t('landing.footerSafety')}</a>
          </div>
          <div>
            © 2026 Kindred. Verified Rooted. Capped at 500 Founding Members.
          </div>
        </div>
      </footer>
    </div>
  );
}
