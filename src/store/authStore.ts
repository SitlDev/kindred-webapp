import { create } from 'zustand';
import type { User } from '../types';
import { mockServer } from '../services/mockData';

interface AuthState {
  user: User | null;
  token: string | null;
  sessionToken: string | null;
  loading: boolean;
  error: string | null;
  
  login: (email: string, password_hash: string) => Promise<{ status: '2fa_required'; sessionToken: string } | null>;
  verify2FA: (sessionToken: string, code: string) => Promise<boolean>;
  register: (data: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  verifyDomainEmail: (type: 'work' | 'school' | 'business', email: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => {
  // Load initial session if exists in localStorage
  const localUser = localStorage.getItem('kindred_user');
  const localToken = localStorage.getItem('kindred_token');
  
  return {
    user: localUser ? JSON.parse(localUser) : null,
    token: localToken,
    sessionToken: null,
    loading: false,
    error: null,

    login: async (email, password_hash) => {
      set({ loading: true, error: null });
      try {
        const res = await mockServer.login(email, password_hash);
        if (res) {
          set({ sessionToken: res.sessionToken, loading: false });
          return res;
        } else {
          set({ error: 'Invalid email or password credentials', loading: false });
          return null;
        }
      } catch (err) {
        set({ error: 'Network failure. Please try again.', loading: false });
        return null;
      }
    },

    verify2FA: async (sessionToken, code) => {
      set({ loading: true, error: null });
      try {
        const res = await mockServer.verify2FA(sessionToken, code);
        if (res) {
          localStorage.setItem('kindred_token', res.token);
          localStorage.setItem('kindred_user', JSON.stringify(res.user));
          set({ token: res.token, user: res.user, sessionToken: null, loading: false });
          return true;
        } else {
          set({ error: 'Invalid 2FA verification code', loading: false });
          return false;
        }
      } catch (err) {
        set({ error: '2FA verification failed', loading: false });
        return false;
      }
    },

    register: async (data) => {
      set({ loading: true, error: null });
      try {
        const res = await mockServer.register(data);
        set({ loading: false });
        return res !== null;
      } catch (err) {
        set({ error: 'Registration failed. Try again.', loading: false });
        return false;
      }
    },

    logout: () => {
      localStorage.removeItem('kindred_token');
      localStorage.removeItem('kindred_user');
      set({ token: null, user: null, sessionToken: null, error: null });
    },

    updateProfile: async (data) => {
      const activeUser = get().user;
      if (!activeUser) return false;
      
      set({ loading: true });
      try {
        const updated = await mockServer.updateUserProfile(activeUser.id, data);
        if (updated) {
          localStorage.setItem('kindred_user', JSON.stringify(updated));
          set({ user: updated, loading: false });
          return true;
        }
        set({ loading: false });
        return false;
      } catch (err) {
        set({ error: 'Profile update failed', loading: false });
        return false;
      }
    },

    verifyDomainEmail: async (type, email) => {
      const activeUser = get().user;
      if (!activeUser) return false;
      
      set({ loading: true });
      try {
        const parts = email.split('@');
        const domain = parts[1] || '';
        
        let updates: Partial<User> = {};
        if (type === 'work') {
          const compName = domain.split('.')[0];
          const niceCompName = compName.charAt(0).toUpperCase() + compName.slice(1);
          updates = {
            work_email: email,
            work_email_verified: true,
            company_domain: domain,
            company_name: niceCompName,
            job_title: activeUser.job_title || 'Professional Partner',
            trust_score: Math.min(5.0, get().user!.trust_score + 0.3) // verified domains boost trust score!
          };
        } else if (type === 'school') {
          const univName = domain.split('.')[0];
          const niceUnivName = univName.charAt(0).toUpperCase() + univName.slice(1) + ' University';
          updates = {
            school_email: email,
            school_email_verified: true,
            university_domain: domain,
            university_name: niceUnivName,
            department: activeUser.department || 'Computer Science',
            trust_score: Math.min(5.0, get().user!.trust_score + 0.25)
          };
        } else {
          const bizName = domain.split('.')[0];
          const niceBizName = bizName.charAt(0).toUpperCase() + bizName.slice(1) + ' & Co.';
          updates = {
            business_email: email,
            business_email_verified: true,
            business_domain: domain,
            business_name: niceBizName,
            trust_score: Math.min(5.0, get().user!.trust_score + 0.35)
          };
        }

        const updated = await mockServer.updateUserProfile(activeUser.id, updates);
        if (updated) {
          localStorage.setItem('kindred_user', JSON.stringify(updated));
          set({ user: updated, loading: false });
          return true;
        }
        set({ loading: false });
        return false;
      } catch (err) {
        set({ error: 'Domain verification failed', loading: false });
        return false;
      }
    }
  };
});
