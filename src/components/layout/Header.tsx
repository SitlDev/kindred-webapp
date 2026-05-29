import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Flame, Award, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguageStore, type Language } from '../../store/languageStore';
import confetti from 'canvas-confetti';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguageStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const languagesList: { code: Language; label: string; flag: string; colors: string[] }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸', colors: ['#3D5941', '#FAF8F3'] },
    { code: 'es', label: 'Español', flag: '🇪🇸', colors: ['#D4A574', '#FAF8F3'] },
    { code: 'fr', label: 'Français', flag: '🇫🇷', colors: ['#C4956D', '#FAF8F3'] },
    { code: 'it', label: 'Italiano', flag: '🇮🇹', colors: ['#A57D5F', '#FAF8F3'] }
  ];

  const handleLanguageChange = (lang: Language, colors: string[]) => {
    setLanguage(lang);
    setDropdownOpen(false);
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.15 },
      colors: colors
    });
    toast.success(lang === 'es' ? '¡Idioma cambiado a Español!' : lang === 'fr' ? 'Langue changée en Français !' : lang === 'it' ? 'Lingua cambiata in Italiano!' : 'Language changed to English!');
  };

  const handleLogout = () => {
    logout();
    toast.success(language === 'es' ? 'Sesión cerrada. ¡Hasta pronto!' : language === 'fr' ? 'Déconnecté. À bientôt !' : language === 'it' ? 'Sessione chiusa. A presto!' : 'Rooted out. See you soon!');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white/85 backdrop-blur-md border-b border-charcoal/10 px-4 md:px-8 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Kindred logo" className="w-8 h-8 object-contain hover:scale-105 transition-transform" />
          <span className="font-serif text-2xl font-bold tracking-tight text-charcoal group-hover:text-sage transition-colors">
            Kindred
          </span>
        </Link>
        {user?.is_founding_member && (
          <span className="hidden sm:inline-flex items-center gap-1 bg-ochre/15 text-ochre text-[11px] font-bold px-2 py-0.5 rounded-full border border-ochre/30">
            🏆 {t('nav.foundingMember')}
          </span>
        )}
      </div>

      {/* Stats and Action Bar */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Language Selector Dropdown – always visible */}
        <div className="relative">
          <button
            id="language-selector-btn"
            onClick={() => setDropdownOpen(prev => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cream/60 border border-charcoal/10 rounded-full text-xs font-semibold text-charcoal hover:bg-cream hover:border-sage/30 transition-all hover:scale-105"
            title="Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-sage" />
            <span>{languagesList.find(l => l.code === language)?.flag} {language.toUpperCase()}</span>
          </button>

          {dropdownOpen && (
            <>
              {/* Overlay to close */}
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-10 z-50 bg-white border border-charcoal/10 rounded-2xl shadow-xl min-w-[150px] py-1.5 animate-scale-in">
                {languagesList.map(lang => (
                  <button
                    key={lang.code}
                    id={`lang-option-${lang.code}`}
                    onClick={() => handleLanguageChange(lang.code, lang.colors)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors hover:bg-cream/60 rounded-xl mx-1 ${
                      language === lang.code ? 'text-sage font-bold' : 'text-charcoal'
                    }`}
                    style={{ width: 'calc(100% - 8px)' }}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                    {language === lang.code && <span className="ml-auto text-sage text-xs">✓</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {user && (
          <>
            {/* Check-In Streak Widget */}
            <div className="flex items-center gap-1 bg-clay-light px-3 py-1.5 rounded-full text-clay font-medium text-sm animate-fade-in hover:scale-105 transition-transform" title="Your Daily Check-in Streak">
              <Flame className="w-4 h-4 fill-clay text-clay animate-pulse" />
              <span>{user.check_in_streak || 0} {t('nav.streaks')}</span>
            </div>

            {/* Founding Circle Urgency Counter */}
            <Link to="/profile" className="hidden md:flex items-center gap-1.5 bg-ochre/10 text-ochre border border-ochre/20 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-ochre/15 transition-all text-glow-ochre animate-fade-in">
              <Award className="w-4 h-4" />
              <span>{t('nav.foundingCircle')}: 482 / 500</span>
            </Link>

            {/* User Profile panel */}
            <div className="flex items-center gap-3 border-l border-charcoal/10 pl-3 md:pl-5">
              <Link to="/profile" className="flex items-center gap-2.5 group">
                <img
                  src={user.profile_photo_url}
                  alt={user.display_name}
                  className="w-9 h-9 rounded-full object-cover border border-clay group-hover:border-sage transition-all hover:scale-105"
                />
                <span className="hidden lg:inline text-sm font-medium text-charcoal group-hover:text-sage transition-colors">
                  {user.display_name}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-charcoal/60 hover:text-clay hover:bg-clay/5 rounded-full transition-colors"
                title={t('nav.logout')}
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
