export interface User {
  id: string;
  email: string;
  email_verified: boolean;
  
  // Legal identity
  legalFirstName: string;
  legalLastName: string;
  legalNameFull: string;
  
  // Contact
  phoneNumber: string;
  phone_verified: boolean;
  
  // 2FA
  two_factor_enabled: boolean;
  two_factor_method: string;
  
  // Profile
  display_name: string;
  profile_photo_url: string;
  profile_photo_verified: boolean;
  bio: string;
  location_city: string;
  
  // Skills & Values
  skills: string[];
  values: string[];
  
  // Verification Badges
  work_email?: string;
  work_email_verified?: boolean;
  company_name?: string;
  job_title?: string;
  company_domain?: string;
  
  school_email?: string;
  school_email_verified?: boolean;
  university_name?: string;
  department?: string;
  university_domain?: string;
  
  // Trust Signals
  help_swaps_completed: number;
  average_rating: number;
  total_reviews: number;
  check_in_streak: number;
  last_check_in_date?: string;
  trust_score: number;
  
  // Founding Member
  is_founding_member: boolean;
  founding_member_number?: number;
  founding_member_date?: string;
  
  created_at: string;
  account_status: 'active' | 'suspended';
}

export interface CheckIn {
  id: string;
  user_id: string;
  location_name: string;
  location_city: string;
  note?: string;
  visibility: 'visible' | 'mentors_only' | 'private';
  created_at: string;
  expires_at: string;
  user?: Partial<User>; // populated in queries
}

export interface Event {
  id: string;
  created_by: string;
  title: string;
  description: string;
  location_name: string;
  location_city: string;
  start_time: string;
  end_time: string;
  skill_tags: string[];
  value_tags: string[];
  capacity: number;
  current_attendees: number;
  is_founding_member_only: boolean;
  price: number;
  image_url: string;
}

export interface EventRSVP {
  id: string;
  user_id: string;
  event_id: string;
  status: 'going' | 'interested' | 'declined';
  created_at: string;
}

export interface MentoringRelationship {
  id: string;
  mentor_id: string;
  mentee_id: string;
  status: 'pending' | 'active' | 'declined' | 'completed';
  skills_focus: string[];
  meeting_frequency: string;
  start_date: string;
  notes?: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewer_name: string;
  reviewer_photo?: string;
  reviewed_user_id: string;
  rating: number;
  comment: string;
  tags: string[];
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: string;
  is_system?: boolean;
  agreement_data?: {
    relationship_id: string;
    skills: string[];
    frequency: string;
    status: 'pending' | 'accepted' | 'declined';
  };
}

export interface Thread {
  otherUser: User;
  lastMessage: Message;
  messages: Message[];
}
