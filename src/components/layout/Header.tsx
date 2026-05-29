import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Flame, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Rooted out. See you soon!');
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
            🏆 Founding Member
          </span>
        )}
      </div>

      {/* Stats and Action Bar */}
      <div className="flex items-center gap-4 md:gap-6">
        {user && (
          <>
            {/* Check-In Streak Widget */}
            <div className="flex items-center gap-1 bg-clay-light px-3 py-1.5 rounded-full text-clay font-medium text-sm animate-fade-in hover:scale-105 transition-transform" title="Your Daily Check-in Streak">
              <Flame className="w-4 h-4 fill-clay text-clay animate-pulse" />
              <span>{user.check_in_streak || 0} Streaks</span>
            </div>

            {/* Founding Circle Polished Urgency Counter */}
            <Link to="/profile" className="hidden md:flex items-center gap-1.5 bg-ochre/10 text-ochre border border-ochre/20 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-ochre/15 transition-all text-glow-ochre animate-fade-in">
              <Award className="w-4 h-4" />
              <span>Founding Circle: 482 / 500 members</span>
            </Link>

            {/* User Profile dropdown panel */}
            <div className="flex items-center gap-3 border-l border-charcoal/10 pl-4 md:pl-6">
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
                title="Log Out"
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
