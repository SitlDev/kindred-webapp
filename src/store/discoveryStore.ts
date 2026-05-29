import { create } from 'zustand';
import type { User, Event } from '../types';
import { mockServer } from '../services/mockData';

interface DiscoveryState {
  skillFilter: string;
  valueFilter: string;
  trustFilter: number;
  mentors: User[];
  events: Event[];
  loading: boolean;
  
  setFilters: (filters: { skill?: string; value?: string; trust?: number }) => void;
  fetchDiscoveryData: () => Promise<void>;
  rsvpToEvent: (userId: string, eventId: string, status: 'going' | 'interested' | 'declined') => Promise<boolean>;
}

export const useDiscoveryStore = create<DiscoveryState>()((set, get) => {
  return {
    skillFilter: '',
    valueFilter: '',
    trustFilter: 0,
    mentors: [],
    events: [],
    loading: false,

    setFilters: (filters) => {
      set(state => ({
        skillFilter: filters.skill !== undefined ? filters.skill : state.skillFilter,
        valueFilter: filters.value !== undefined ? filters.value : state.valueFilter,
        trustFilter: filters.trust !== undefined ? filters.trust : state.trustFilter,
      }));
      get().fetchDiscoveryData();
    },

    fetchDiscoveryData: async () => {
      set({ loading: true });
      try {
        const skill = get().skillFilter;
        const value = get().valueFilter;
        const trust = get().trustFilter;
        
        const mentorsList = await mockServer.getMentors({
          skill: skill || undefined,
          value: value || undefined,
          trustScore_min: trust || undefined
        });

        const allEvents = await mockServer.getEvents();
        // Simple client-side filtering on events
        const filteredEvents = allEvents.filter(event => {
          if (skill && !event.skill_tags.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
            return false;
          }
          if (value && !event.value_tags.some(v => v.toLowerCase().includes(value.toLowerCase()))) {
            return false;
          }
          return true;
        });

        set({ mentors: mentorsList, events: filteredEvents, loading: false });
      } catch (err) {
        set({ loading: false });
      }
    },

    rsvpToEvent: async (userId, eventId, status) => {
      try {
        await mockServer.rsvpToEvent(userId, eventId, status);
        // Refresh discovery data
        await get().fetchDiscoveryData();
        return true;
      } catch (err) {
        return false;
      }
    }
  };
});
