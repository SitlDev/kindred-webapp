import type { User, CheckIn, Event, EventRSVP, MentoringRelationship, Review, Message } from '../types';

// Storage keys
const KEYS = {
  USERS: 'kindred_users',
  CHECK_INS: 'kindred_check_ins',
  EVENTS: 'kindred_events',
  RSVPS: 'kindred_rsvps',
  RELATIONSHIPS: 'kindred_relationships',
  REVIEWS: 'kindred_reviews',
  MESSAGES: 'kindred_messages',
};

// Initial Seed Data
const SEED_USERS: User[] = [
  {
    id: 'mentor-1',
    email: 'sarah.chen@google.com',
    email_verified: true,
    legalFirstName: 'Sarah',
    legalLastName: 'Chen',
    legalNameFull: 'Sarah Chen',
    phoneNumber: '+15550101',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Sarah Chen',
    profile_photo_url: '/avatars/sarah.png',
    profile_photo_verified: true,
    bio: 'Passionate about React, frontend architecture, and helping early-career engineers find their grounding. Let\'s build stable and beautiful systems.',
    location_city: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Frontend System Design', 'Career Growth'],
    values: ['Continuous Learning', 'Empathy', 'Rootedness', 'Collaboration'],
    work_email: 'sarah.chen@google.com',
    work_email_verified: true,
    company_name: 'Google',
    job_title: 'Senior Staff Engineer',
    company_domain: 'google.com',
    help_swaps_completed: 48,
    average_rating: 4.95,
    total_reviews: 32,
    check_in_streak: 12,
    trust_score: 4.9,
    is_founding_member: true,
    founding_member_number: 12,
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    account_status: 'active',
  },
  {
    id: 'mentor-2',
    email: 'liam.vance@stanford.edu',
    email_verified: true,
    legalFirstName: 'William',
    legalLastName: 'Vance',
    legalNameFull: 'William Liam Vance',
    phoneNumber: '+15550102',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Liam Vance',
    profile_photo_url: '/avatars/liam.png',
    profile_photo_verified: true,
    bio: 'Postdoc at Stanford researching AI alignment and human-computer symbiosis. Values deep inquiry and long-term mentoring partnerships.',
    location_city: 'Palo Alto, CA',
    skills: ['Machine Learning', 'AI Alignment', 'Academic Research', 'Python'],
    values: ['Deep Inquiry', 'Trustworthiness', 'Safety First', 'Ethics'],
    school_email: 'liam.vance@stanford.edu',
    school_email_verified: true,
    university_name: 'Stanford University',
    department: 'Computer Science',
    university_domain: 'stanford.edu',
    help_swaps_completed: 18,
    average_rating: 4.86,
    total_reviews: 14,
    check_in_streak: 5,
    trust_score: 4.8,
    is_founding_member: true,
    founding_member_number: 89,
    created_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    account_status: 'active',
  },
  {
    id: 'mentor-3',
    email: 'maya.patel@airbnb.com',
    email_verified: true,
    legalFirstName: 'Maya',
    legalLastName: 'Patel',
    legalNameFull: 'Maya Patel',
    phoneNumber: '+15550103',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Maya Patel',
    profile_photo_url: '/avatars/maya.png',
    profile_photo_verified: true,
    bio: 'UX Design Leader @ Airbnb. Believes in human-centric design, calm aesthetics, and building trust in digital interfaces.',
    location_city: 'San Francisco, CA',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Public Speaking'],
    values: ['Aesthetic Calmless', 'Inclusivity', 'Integrity', 'Community Focus'],
    work_email: 'maya.patel@airbnb.com',
    work_email_verified: true,
    company_name: 'Airbnb',
    job_title: 'Design Director',
    company_domain: 'airbnb.com',
    help_swaps_completed: 39,
    average_rating: 4.92,
    total_reviews: 26,
    check_in_streak: 8,
    trust_score: 4.9,
    is_founding_member: true,
    founding_member_number: 45,
    created_at: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
    account_status: 'active',
  },
  {
    id: 'mentor-4',
    email: 'marcus.a@stripe.com',
    email_verified: true,
    legalFirstName: 'Marcus',
    legalLastName: 'Aurelius',
    legalNameFull: 'Marcus Aurelius Smith',
    phoneNumber: '+15550104',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Marcus A.',
    profile_photo_url: '/avatars/marcus.png',
    profile_photo_verified: false,
    bio: 'Product Manager @ Stripe. Focused on financial infrastructure, scaling products, and building high-trust developer ecosystems.',
    location_city: 'Berkeley, CA',
    skills: ['Product Strategy', 'Stripe API', 'Roadmapping', 'Agile Delivery'],
    values: ['Clarity', 'Reliability', 'Long-term Thinking', 'Humility'],
    work_email: 'marcus.a@stripe.com',
    work_email_verified: true,
    company_name: 'Stripe',
    job_title: 'Lead PM',
    company_domain: 'stripe.com',
    help_swaps_completed: 22,
    average_rating: 4.78,
    total_reviews: 18,
    check_in_streak: 3,
    trust_score: 4.7,
    is_founding_member: false,
    created_at: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    account_status: 'active',
  }
];

const SEED_EVENTS: Event[] = [
  {
    id: 'event-1',
    created_by: 'mentor-1',
    title: 'San Francisco Sage Circle: Roots & Coffee',
    description: 'A cozy coffee gathering for values-aligned engineers to discuss frontend system design, calm tech principles, and career resilience. First coffee is on us! Strictly limited capacity to encourage deep conversation.',
    location_name: 'Sightglass Coffee, SOMA',
    location_city: 'San Francisco, CA',
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(), // 2 days later, afternoon
    end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString(),
    skill_tags: ['Frontend System Design', 'Career Growth'],
    value_tags: ['Empathy', 'Continuous Learning', 'Rootedness'],
    capacity: 12,
    current_attendees: 8,
    is_founding_member_only: false,
    price: 0,
    image_url: '/events/coffee.png',
  },
  {
    id: 'event-2',
    created_by: 'mentor-2',
    title: 'Stanford AI Alignment: Deep Inquiry Seminar',
    description: 'An academic workshop and help-swap dedicated to researching technical safety, neural alignment frameworks, and long-term ethical implications of large language models.',
    location_name: 'Gates Computer Science Building, Stanford',
    location_city: 'Palo Alto, CA',
    start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
    skill_tags: ['AI Alignment', 'Machine Learning'],
    value_tags: ['Deep Inquiry', 'Trustworthiness', 'Safety First'],
    capacity: 25,
    current_attendees: 19,
    is_founding_member_only: true,
    price: 0,
    image_url: '/events/seminar.png',
  }
];

const SEED_REVIEWS: Review[] = [
  {
    id: 'review-1',
    reviewer_id: 'user-guest',
    reviewer_name: 'Guest Mentee',
    reviewer_photo: '/avatars/guest.png',
    reviewed_user_id: 'mentor-1',
    rating: 5,
    comment: 'Sarah is an incredible mentor! She helped me diagram out our startup architecture and grounded me when I was feeling major burnout. Her deep sage principles are wonderful.',
    tags: ['Frontend System Design', 'Rootedness', 'Empathy'],
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-2',
    reviewer_id: 'user-guest',
    reviewer_name: 'Guest Mentee',
    reviewer_photo: '/avatars/guest.png',
    reviewed_user_id: 'mentor-2',
    rating: 5,
    comment: 'Liam asked extremely thoughtful questions during our research sync. He is incredibly supportive and patient.',
    tags: ['AI Alignment', 'Deep Inquiry', 'Trustworthiness'],
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const SEED_CHECK_INS: CheckIn[] = [
  {
    id: 'check-in-1',
    user_id: 'mentor-1',
    location_name: 'Sightglass Coffee, SOMA',
    location_city: 'San Francisco, CA',
    note: 'Sipping sage tea, doing some open-source react reviews. Come say hi!',
    visibility: 'visible',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'check-in-2',
    user_id: 'mentor-2',
    location_name: 'Green Library, Stanford',
    location_city: 'Palo Alto, CA',
    note: 'Drafting research slides on safety algorithms. Happy to meet students!',
    visibility: 'mentors_only',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'check-in-3',
    user_id: 'mentor-3',
    location_name: 'Blue Bottle Coffee, SOMA',
    location_city: 'San Francisco, CA',
    note: 'Quick layout reviews. Grab a cup and let\'s talk typography!',
    visibility: 'visible',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  }
];

// Helper functions for LocalStorage management
function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
}

// Initialize LocalStorage with seed data if empty
export function initLocalStorage() {
  // Clear out stale seed data referencing Unsplash external URLs
  const storedUsers = window.localStorage.getItem(KEYS.USERS);
  if (storedUsers && storedUsers.includes('unsplash.com')) {
    window.localStorage.removeItem(KEYS.USERS);
    window.localStorage.removeItem(KEYS.EVENTS);
    window.localStorage.removeItem(KEYS.REVIEWS);
    window.localStorage.removeItem(KEYS.CHECK_INS);
    window.localStorage.removeItem(KEYS.MESSAGES);
    window.localStorage.removeItem(KEYS.RSVPS);
    window.localStorage.removeItem(KEYS.RELATIONSHIPS);
  }

  if (!window.localStorage.getItem(KEYS.USERS)) {
    setStored(KEYS.USERS, SEED_USERS);
  }
  if (!window.localStorage.getItem(KEYS.EVENTS)) {
    setStored(KEYS.EVENTS, SEED_EVENTS);
  }
  if (!window.localStorage.getItem(KEYS.REVIEWS)) {
    setStored(KEYS.REVIEWS, SEED_REVIEWS);
  }
  if (!window.localStorage.getItem(KEYS.CHECK_INS)) {
    setStored(KEYS.CHECK_INS, SEED_CHECK_INS);
  }
  if (!window.localStorage.getItem(KEYS.RSVPS)) {
    setStored(KEYS.RSVPS, []);
  }
  if (!window.localStorage.getItem(KEYS.RELATIONSHIPS)) {
    setStored(KEYS.RELATIONSHIPS, []);
  }
  if (!window.localStorage.getItem(KEYS.MESSAGES)) {
    // Initial system and introductory messages
    const defaultMessages: Message[] = [
      {
        id: 'msg-init-1',
        sender_id: 'mentor-1',
        recipient_id: 'user-guest',
        content: 'Hi! Welcome to Kindred. I noticed your interest in React and frontend system design. Let me know if you would ever like to check-in locally or start a mentoring swap!',
        created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      }
    ];
    setStored(KEYS.MESSAGES, defaultMessages);
  }
}

// Call initialization immediately on import
initLocalStorage();

// Simulated Network Latency Wrapper
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const mockServer = {
  // --- AUTH SERVICES ---
  async login(email: string, password_hash: string): Promise<{ status: '2fa_required'; sessionToken: string } | null> {
    await delay(600);
    const users = getStored<User[]>(KEYS.USERS, []);
    
    // Accept standard guest user or seed user matching
    if (email === 'guest@kindred.org' && password_hash === 'password') {
      return { status: '2fa_required', sessionToken: 'session-guest-token' };
    }
    
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      return { status: '2fa_required', sessionToken: `session-${user.id}` };
    }
    
    return null;
  },

  async verify2FA(sessionToken: string, code: string): Promise<{ token: string; user: User } | null> {
    await delay(500);
    const users = getStored<User[]>(KEYS.USERS, []);
    
    if (code !== '123456') return null; // Seed code

    if (sessionToken === 'session-guest-token') {
      // Return or create the guest user
      let guest = users.find(u => u.id === 'user-guest');
      if (!guest) {
        guest = {
          id: 'user-guest',
          email: 'guest@kindred.org',
          email_verified: true,
          legalFirstName: 'Jane',
          legalLastName: 'Doe',
          legalNameFull: 'Jane Doe',
          phoneNumber: '+15559876',
          phone_verified: true,
          two_factor_enabled: true,
          two_factor_method: 'sms',
          display_name: 'Jane D. (Guest)',
          profile_photo_url: '/avatars/guest.png',
          profile_photo_verified: true,
          bio: 'Junior Developer seeking guidance on software design patterns and deep career foundations. Excited to meet the community!',
          location_city: 'San Francisco, CA',
          skills: ['HTML', 'CSS', 'JavaScript'],
          values: ['Continuous Learning', 'Humility', 'Integrity'],
          help_swaps_completed: 2,
          average_rating: 4.8,
          total_reviews: 2,
          check_in_streak: 2,
          trust_score: 2.5,
          is_founding_member: true,
          founding_member_number: 482,
          created_at: new Date().toISOString(),
          account_status: 'active',
        };
        users.push(guest);
        setStored(KEYS.USERS, users);
      }
      return { token: 'jwt-guest-token', user: guest };
    }

    const userId = sessionToken.replace('session-', '');
    const user = users.find(u => u.id === userId);
    if (user) {
      return { token: `jwt-${user.id}`, user };
    }
    
    return null;
  },

  async register(data: Partial<User>): Promise<{ userId: string } | null> {
    await delay(700);
    const users = getStored<User[]>(KEYS.USERS, []);
    const newId = `user-${Math.random().toString(36).substr(2, 9)}`;
    
    const newUser: User = {
      id: newId,
      email: data.email || '',
      email_verified: true,
      legalFirstName: data.legalFirstName || '',
      legalLastName: data.legalLastName || '',
      legalNameFull: `${data.legalFirstName} ${data.legalLastName}`,
      phoneNumber: data.phoneNumber || '',
      phone_verified: true,
      two_factor_enabled: true,
      two_factor_method: 'sms',
      display_name: data.display_name || data.legalFirstName || 'New Member',
      profile_photo_url: data.profile_photo_url || '/avatars/default.png',
      profile_photo_verified: false,
      bio: data.bio || '',
      location_city: data.location_city || 'San Francisco, CA',
      skills: data.skills || [],
      values: data.values || [],
      help_swaps_completed: 0,
      average_rating: 0,
      total_reviews: 0,
      check_in_streak: 1,
      trust_score: 2.0, // starting trust score
      is_founding_member: true,
      founding_member_number: users.length + 101, // give them a nice founding member number
      founding_member_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      account_status: 'active',
    };
    
    users.push(newUser);
    setStored(KEYS.USERS, users);
    return { userId: newId };
  },

  // --- DISCOVERY & USERS ---
  async getMentors(filters: { skill?: string; value?: string; trustScore_min?: number }): Promise<User[]> {
    await delay(400);
    const users = getStored<User[]>(KEYS.USERS, []);
    
    // Filter down to seed mentors and other profiles
    return users.filter(user => {
      // Exclude the active guest tester
      if (user.id === 'user-guest') return false;
      
      if (filters.skill && !user.skills.some(s => s.toLowerCase().includes(filters.skill!.toLowerCase()))) {
        return false;
      }
      if (filters.value && !user.values.some(v => v.toLowerCase().includes(filters.value!.toLowerCase()))) {
        return false;
      }
      if (filters.trustScore_min && user.trust_score < filters.trustScore_min) {
        return false;
      }
      return true;
    });
  },

  async getUserProfile(userId: string): Promise<{ user: User; reviews: Review[] } | null> {
    await delay(300);
    const users = getStored<User[]>(KEYS.USERS, []);
    const reviews = getStored<Review[]>(KEYS.REVIEWS, []);
    
    const user = users.find(u => u.id === userId);
    if (!user) return null;
    
    const userReviews = reviews.filter(r => r.reviewed_user_id === userId);
    return { user, reviews: userReviews };
  },

  async updateUserProfile(userId: string, data: Partial<User>): Promise<User | null> {
    await delay(500);
    const users = getStored<User[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return null;
    
    const updated = { ...users[idx], ...data };
    users[idx] = updated;
    setStored(KEYS.USERS, users);
    return updated;
  },

  // --- CHECK-INS ---
  async getActiveCheckIns(): Promise<CheckIn[]> {
    await delay(300);
    const checkIns = getStored<CheckIn[]>(KEYS.CHECK_INS, []);
    const users = getStored<User[]>(KEYS.USERS, []);
    
    // Map user profiles to check-ins
    return checkIns
      .filter(c => new Date(c.expires_at) > new Date())
      .map(c => {
        const u = users.find(user => user.id === c.user_id);
        return {
          ...c,
          user: u ? {
            id: u.id,
            display_name: u.display_name,
            profile_photo_url: u.profile_photo_url,
            job_title: u.job_title,
            company_name: u.company_name,
            university_name: u.university_name,
            trust_score: u.trust_score,
            check_in_streak: u.check_in_streak,
            skills: u.skills,
            values: u.values
          } : undefined
        };
      });
  },

  async startCheckIn(userId: string, location_name: string, location_city: string, note: string, visibility: 'visible' | 'mentors_only' | 'private'): Promise<CheckIn> {
    await delay(500);
    const checkIns = getStored<CheckIn[]>(KEYS.CHECK_INS, []);
    const users = getStored<User[]>(KEYS.USERS, []);
    
    // Clear any previous check-in for this user
    const filtered = checkIns.filter(c => c.user_id !== userId);
    
    const newCheckIn: CheckIn = {
      id: `check-${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      location_name,
      location_city,
      note,
      visibility,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // expires in 4 hours
    };
    
    filtered.push(newCheckIn);
    setStored(KEYS.CHECK_INS, filtered);
    
    // Increment user streak and update last check-in date
    const uIdx = users.findIndex(u => u.id === userId);
    if (uIdx !== -1) {
      const u = users[uIdx];
      const today = new Date().toDateString();
      const lastCheckIn = u.last_check_in_date ? new Date(u.last_check_in_date).toDateString() : '';
      
      let newStreak = u.check_in_streak || 1;
      if (lastCheckIn !== today) {
        // If they checked in yesterday, increment. If longer, reset or preserve.
        newStreak = (u.check_in_streak || 0) + 1;
      }
      
      users[uIdx] = {
        ...u,
        check_in_streak: newStreak,
        last_check_in_date: new Date().toISOString()
      };
      setStored(KEYS.USERS, users);
    }
    
    return newCheckIn;
  },

  async endCheckIn(userId: string): Promise<boolean> {
    await delay(300);
    const checkIns = getStored<CheckIn[]>(KEYS.CHECK_INS, []);
    const filtered = checkIns.filter(c => c.user_id !== userId);
    setStored(KEYS.CHECK_INS, filtered);
    return true;
  },

  // --- EVENTS ---
  async getEvents(): Promise<Event[]> {
    await delay(300);
    return getStored<Event[]>(KEYS.EVENTS, []);
  },

  async rsvpToEvent(userId: string, eventId: string, status: 'going' | 'interested' | 'declined'): Promise<EventRSVP> {
    await delay(400);
    const rsvps = getStored<EventRSVP[]>(KEYS.RSVPS, []);
    const events = getStored<Event[]>(KEYS.EVENTS, []);
    
    // Remove existing RSVP
    const filtered = rsvps.filter(r => !(r.user_id === userId && r.event_id === eventId));
    
    const newRsvp: EventRSVP = {
      id: `rsvp-${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      event_id: eventId,
      status,
      created_at: new Date().toISOString(),
    };
    
    filtered.push(newRsvp);
    setStored(KEYS.RSVPS, filtered);
    
    // Update event attendee count
    const evIdx = events.findIndex(e => e.id === eventId);
    if (evIdx !== -1 && status === 'going') {
      events[evIdx].current_attendees = (events[evIdx].current_attendees || 0) + 1;
      setStored(KEYS.EVENTS, events);
    }
    
    return newRsvp;
  },

  async getMyRSVPs(userId: string): Promise<EventRSVP[]> {
    const rsvps = getStored<EventRSVP[]>(KEYS.RSVPS, []);
    return rsvps.filter(r => r.user_id === userId);
  },

  // --- MESSAGES & MENTORING ---
  async getMessages(userId: string): Promise<Message[]> {
    await delay(300);
    const messages = getStored<Message[]>(KEYS.MESSAGES, []);
    return messages.filter(m => m.sender_id === userId || m.recipient_id === userId);
  },

  async sendMessage(senderId: string, recipientId: string, content: string, agreement_data?: any): Promise<Message> {
    await delay(350);
    const messages = getStored<Message[]>(KEYS.MESSAGES, []);
    
    const newMessage: Message = {
      id: `msg-${Math.random().toString(36).substr(2, 9)}`,
      sender_id: senderId,
      recipient_id: recipientId,
      content,
      created_at: new Date().toISOString(),
      agreement_data,
    };
    
    messages.push(newMessage);
    setStored(KEYS.MESSAGES, messages);
    
    // Trigger automated mentor replies for beautiful UI demo!
    if (recipientId.startsWith('mentor-') && !agreement_data) {
      setTimeout(async () => {
        const activeMsgs = getStored<Message[]>(KEYS.MESSAGES, []);
        const mentor = getStored<User[]>(KEYS.USERS, []).find(u => u.id === recipientId);
        
        let replyContent = `Hi there! I received your message. I am extremely values-aligned with your request and would love to partner up.`;
        if (content.toLowerCase().includes('mentor')) {
          replyContent = `I would be absolutely honored to support your path! I have proposed a structured Mentoring Agreement in our chat here. Let\'s check it out!`;
          
          // Generate automated Mentoring Agreement proposal!
          const mockAgreementMsg: Message = {
            id: `msg-agree-${Math.random().toString(36).substr(2, 9)}`,
            sender_id: recipientId,
            recipient_id: senderId,
            content: `PROPOSED AGREEMENT: Mentoring Swap with ${mentor?.display_name}`,
            created_at: new Date(Date.now() + 1000).toISOString(),
            agreement_data: {
              relationship_id: `rel-${Math.random().toString(36).substr(2, 9)}`,
              skills: mentor ? [mentor.skills[0], mentor.skills[1]] : ['System Design'],
              frequency: 'Bi-weekly, 45-minute syncs',
              status: 'pending'
            }
          };
          activeMsgs.push(mockAgreementMsg);
        } else {
          // Normal chat reply
          const normalReply: Message = {
            id: `msg-reply-${Math.random().toString(36).substr(2, 9)}`,
            sender_id: recipientId,
            recipient_id: senderId,
            content: `Thank you for sharing that! I really value your perspective on this. Let\'s coordinate a local check-in soon at a nearby coffee shop so we can catch up in person. ☕`,
            created_at: new Date(Date.now() + 1500).toISOString(),
          };
          activeMsgs.push(normalReply);
        }
        
        activeMsgs.push({
          id: `msg-reply-base-${Math.random().toString(36).substr(2, 9)}`,
          sender_id: recipientId,
          recipient_id: senderId,
          content: replyContent,
          created_at: new Date().toISOString(),
        });
        setStored(KEYS.MESSAGES, activeMsgs);
        
        // Dispatch custom event to notify components to force refresh messages
        window.dispatchEvent(new Event('kindred_new_message'));
      }, 2500);
    }
    
    return newMessage;
  },

  async handleAgreement(messageId: string, status: 'accepted' | 'declined'): Promise<boolean> {
    await delay(400);
    const messages = getStored<Message[]>(KEYS.MESSAGES, []);
    const relationships = getStored<MentoringRelationship[]>(KEYS.RELATIONSHIPS, []);
    const users = getStored<User[]>(KEYS.USERS, []);
    
    const msgIdx = messages.findIndex(m => m.id === messageId);
    if (msgIdx === -1 || !messages[msgIdx].agreement_data) return false;
    
    const agreement = messages[msgIdx].agreement_data!;
    agreement.status = status;
    messages[msgIdx].agreement_data = agreement;
    setStored(KEYS.MESSAGES, messages);
    
    if (status === 'accepted') {
      const newRelationship: MentoringRelationship = {
        id: agreement.relationship_id,
        mentor_id: messages[msgIdx].sender_id,
        mentee_id: messages[msgIdx].recipient_id,
        status: 'active',
        skills_focus: agreement.skills,
        meeting_frequency: agreement.frequency,
        start_date: new Date().toISOString(),
      };
      relationships.push(newRelationship);
      setStored(KEYS.RELATIONSHIPS, relationships);
      
      // Increment swaps for both users
      const mentorIdx = users.findIndex(u => u.id === newRelationship.mentor_id);
      const menteeIdx = users.findIndex(u => u.id === newRelationship.mentee_id);
      if (mentorIdx !== -1) {
        users[mentorIdx].help_swaps_completed += 1;
        users[mentorIdx].trust_score = Math.min(5.0, users[mentorIdx].trust_score + 0.05);
      }
      if (menteeIdx !== -1) {
        users[menteeIdx].help_swaps_completed += 1;
        users[menteeIdx].trust_score = Math.min(5.0, users[menteeIdx].trust_score + 0.02);
      }
      setStored(KEYS.USERS, users);
    }
    
    return true;
  },

  // --- REVIEWS ---
  async submitReview(reviewerId: string, reviewerName: string, reviewerPhoto: string, reviewedUserId: string, rating: number, comment: string, tags: string[]): Promise<Review> {
    await delay(600);
    const reviews = getStored<Review[]>(KEYS.REVIEWS, []);
    const users = getStored<User[]>(KEYS.USERS, []);
    
    const newReview: Review = {
      id: `rev-${Math.random().toString(36).substr(2, 9)}`,
      reviewer_id: reviewerId,
      reviewer_name: reviewerName,
      reviewer_photo: reviewerPhoto,
      reviewed_user_id: reviewedUserId,
      rating,
      comment,
      tags,
      created_at: new Date().toISOString(),
    };
    
    reviews.push(newReview);
    setStored(KEYS.REVIEWS, reviews);
    
    // Recalculate average rating, review count, and increase Trust Score!
    const userIdx = users.findIndex(u => u.id === reviewedUserId);
    if (userIdx !== -1) {
      const u = users[userIdx];
      const newTotal = (u.total_reviews || 0) + 1;
      const newAvg = parseFloat((((u.average_rating * u.total_reviews) + rating) / newTotal).toFixed(2));
      
      // Trust Score goes up slightly with every verified review!
      const newTrust = Math.min(5.0, parseFloat((u.trust_score + (rating >= 4 ? 0.05 : -0.1)).toFixed(2)));
      
      users[userIdx] = {
        ...u,
        total_reviews: newTotal,
        average_rating: newAvg,
        trust_score: newTrust
      };
      setStored(KEYS.USERS, users);
    }
    
    return newReview;
  }
};
