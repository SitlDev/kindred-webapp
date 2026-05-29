import { NavLink } from 'react-router-dom';
import { Home, Search, MessageSquare, User, Settings, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useLanguageStore } from '../../store/languageStore';

export default function Sidebar() {
  const { user } = useAuthStore();
  const { t } = useLanguageStore();

  if (!user) return null;

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/discover', label: t('nav.discover'), icon: Search },
    { path: '/messages', label: t('nav.messages'), icon: MessageSquare },
    { path: '/profile', label: t('nav.profile'), icon: User },
    { path: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  if (user.role === 'admin') {
    navItems.push({ path: '/admin', label: t('nav.adminPanel'), icon: Shield });
  }

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-cream/35 border-r border-charcoal/10 p-6 justify-between select-none">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                ${isActive
                  ? 'bg-sage text-white shadow-md shadow-sage/10 scale-[1.02]'
                  : 'text-charcoal hover:bg-cream hover:text-sage-hover'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Rooted Status Box */}
        <div className="bg-sage/5 border border-sage/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sage animate-pulse" />
            <span className="text-[11px] font-bold text-sage uppercase tracking-wider">{t('nav.rootedActive')}</span>
          </div>
          <p className="text-[12px] text-charcoal/70 leading-relaxed font-sans">
            {t('nav.rootedDesc')}
          </p>
        </div>
      </aside>

      {/* Mobile/Tablet Premium Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-t border-charcoal/10 px-6 flex items-center justify-around z-50 shadow-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-200
              ${isActive ? 'text-sage scale-105' : 'text-charcoal/60'}
            `}
          >
            <item.icon className="w-5.5 h-5.5" />
            <span className="text-[9px] font-semibold mt-1 font-sans">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
