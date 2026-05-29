import { create } from 'zustand';
import type { CheckIn } from '../types';
import { mockServer } from '../services/mockData';

interface CheckInState {
  activeCheckIn: CheckIn | null;
  checkIns: CheckIn[];
  loading: boolean;
  
  fetchCheckIns: () => Promise<void>;
  startCheckIn: (userId: string, location_name: string, location_city: string, note: string, visibility: 'visible' | 'mentors_only' | 'private') => Promise<boolean>;
  endCheckIn: (userId: string) => Promise<boolean>;
  loadMyCheckIn: (userId: string) => void;
}

export const useCheckInStore = create<CheckInState>()((set, get) => {
  return {
    activeCheckIn: null,
    checkIns: [],
    loading: false,

    fetchCheckIns: async () => {
      set({ loading: true });
      try {
        const list = await mockServer.getActiveCheckIns();
        set({ checkIns: list, loading: false });
      } catch (err) {
        set({ loading: false });
      }
    },

    startCheckIn: async (userId, location_name, location_city, note, visibility) => {
      set({ loading: true });
      try {
        const checkIn = await mockServer.startCheckIn(userId, location_name, location_city, note, visibility);
        localStorage.setItem(`kindred_active_checkin_${userId}`, JSON.stringify(checkIn));
        set({ activeCheckIn: checkIn, loading: false });
        
        // Refresh feed check-ins
        await get().fetchCheckIns();
        return true;
      } catch (err) {
        set({ loading: false });
        return false;
      }
    },

    endCheckIn: async (userId) => {
      set({ loading: true });
      try {
        await mockServer.endCheckIn(userId);
        localStorage.removeItem(`kindred_active_checkin_${userId}`);
        set({ activeCheckIn: null, loading: false });
        
        // Refresh feed check-ins
        await get().fetchCheckIns();
        return true;
      } catch (err) {
        set({ loading: false });
        return false;
      }
    },

    loadMyCheckIn: (userId) => {
      const stored = localStorage.getItem(`kindred_active_checkin_${userId}`);
      if (stored) {
        const parsed = JSON.parse(stored) as CheckIn;
        // Check if expired
        if (new Date(parsed.expires_at) > new Date()) {
          set({ activeCheckIn: parsed });
        } else {
          localStorage.removeItem(`kindred_active_checkin_${userId}`);
          set({ activeCheckIn: null });
        }
      }
    }
  };
});
