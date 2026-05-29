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

// Initial Seed Data (10 highly detailed users)
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
    values: ['Aesthetic Calm', 'Inclusivity', 'Integrity', 'Community Focus'],
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
    profile_photo_verified: true,
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
  },
  {
    id: 'mentor-5',
    email: 'elena.r@apple.com',
    email_verified: true,
    legalFirstName: 'Elena',
    legalLastName: 'Rostova',
    legalNameFull: 'Elena Rostova',
    phoneNumber: '+15550105',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Elena R.',
    profile_photo_url: '/avatars/default.png',
    profile_photo_verified: true,
    bio: 'Senior Firmware Engineer @ Apple. Enthusiast of Rust in embedded chips and real-time operating systems. Let\'s build secure firmware.',
    location_city: 'San Francisco, CA',
    skills: ['Rust', 'Embedded C', 'RTOS', 'Systems Safety'],
    values: ['Integrity', 'Humility', 'Trustworthiness', 'Continuous Learning'],
    work_email: 'elena.r@apple.com',
    work_email_verified: true,
    company_name: 'Apple',
    job_title: 'Senior Staff Engineer',
    company_domain: 'apple.com',
    help_swaps_completed: 15,
    average_rating: 4.88,
    total_reviews: 12,
    check_in_streak: 8,
    trust_score: 4.8,
    is_founding_member: true,
    founding_member_number: 104,
    created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    account_status: 'active',
  },
  {
    id: 'mentor-6',
    email: 'devon.h@netflix.com',
    email_verified: true,
    legalFirstName: 'Devon',
    legalLastName: 'Harris',
    legalNameFull: 'Devon Harris',
    phoneNumber: '+15550106',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Devon Harris',
    profile_photo_url: '/avatars/default.png',
    profile_photo_verified: true,
    bio: 'Staff UI Architect @ Netflix. Specializing in high-performance browser rendering, accessible CSS layouts, and animations.',
    location_city: 'San Francisco, CA',
    skills: ['CSS Performance', 'Web Accessibility', 'HTML5 APIs', 'JavaScript'],
    values: ['Aesthetic Calm', 'Collaboration', 'Empathy', 'Inclusivity'],
    work_email: 'devon.h@netflix.com',
    work_email_verified: true,
    company_name: 'Netflix',
    job_title: 'Staff Architect',
    company_domain: 'netflix.com',
    help_swaps_completed: 28,
    average_rating: 4.90,
    total_reviews: 20,
    check_in_streak: 6,
    trust_score: 4.9,
    is_founding_member: true,
    founding_member_number: 220,
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    account_status: 'active',
  },
  {
    id: 'mentor-7',
    email: 'chloe.k@figma.com',
    email_verified: true,
    legalFirstName: 'Chloe',
    legalLastName: 'Kim',
    legalNameFull: 'Chloe Kim',
    phoneNumber: '+15550107',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Chloe Kim',
    profile_photo_url: '/avatars/default.png',
    profile_photo_verified: true,
    bio: 'Systems Designer @ Figma. Believes in unified design variables, strict typography grids, and bridging the designer-developer gap.',
    location_city: 'San Francisco, CA',
    skills: ['Figma Variables', 'Design Tokens', 'Typography', 'React UI'],
    values: ['Continuous Learning', 'Empathy', 'Collaboration', 'Aesthetic Calm'],
    work_email: 'chloe.k@figma.com',
    work_email_verified: true,
    company_name: 'Figma',
    job_title: 'Lead Systems Designer',
    company_domain: 'figma.com',
    help_swaps_completed: 32,
    average_rating: 4.96,
    total_reviews: 24,
    check_in_streak: 15,
    trust_score: 4.9,
    is_founding_member: true,
    founding_member_number: 148,
    created_at: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
    account_status: 'active',
  },
  {
    id: 'mentor-8',
    email: 'aris.t@berkeley.edu',
    email_verified: true,
    legalFirstName: 'Aris',
    legalLastName: 'Thorne',
    legalNameFull: 'Aristotle Thorne',
    phoneNumber: '+15550108',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Aris Thorne',
    profile_photo_url: '/avatars/default.png',
    profile_photo_verified: true,
    bio: 'PhD candidate at UC Berkeley researching quantum algorithms and discrete mathematics. Seeking to swap coding help for physics math.',
    location_city: 'Berkeley, CA',
    skills: ['Quantum Computing', 'Discrete Math', 'Algorithms', 'C++'],
    values: ['Deep Inquiry', 'Integrity', 'Trustworthiness', 'Humility'],
    school_email: 'aris.t@berkeley.edu',
    school_email_verified: true,
    university_name: 'UC Berkeley',
    department: 'Physics & Computing',
    university_domain: 'berkeley.edu',
    help_swaps_completed: 8,
    average_rating: 4.75,
    total_reviews: 6,
    check_in_streak: 3,
    trust_score: 4.6,
    is_founding_member: false,
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    account_status: 'active',
  },
  {
    id: 'mentor-9',
    email: 'siddharth@openai.com',
    email_verified: true,
    legalFirstName: 'Siddharth',
    legalLastName: 'Mehta',
    legalNameFull: 'Siddharth Mehta',
    phoneNumber: '+15550109',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Siddharth M.',
    profile_photo_url: '/avatars/default.png',
    profile_photo_verified: true,
    bio: 'Research Scientist @ OpenAI. Fine-tuning models, evaluating reinforcement learning bounds, and developing ethical alignment tools.',
    location_city: 'Palo Alto, CA',
    skills: ['LLM Fine-tuning', 'PyTorch', 'Model Alignment', 'Python'],
    values: ['Safety First', 'Ethics', 'Deep Inquiry', 'Trustworthiness'],
    work_email: 'siddharth@openai.com',
    work_email_verified: true,
    company_name: 'OpenAI',
    job_title: 'Research Scientist',
    company_domain: 'openai.com',
    help_swaps_completed: 40,
    average_rating: 4.92,
    total_reviews: 30,
    check_in_streak: 11,
    trust_score: 4.9,
    is_founding_member: true,
    founding_member_number: 312,
    created_at: new Date(Date.now() - 310 * 24 * 60 * 60 * 1000).toISOString(),
    account_status: 'active',
  },
  {
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
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    values: ['Continuous Learning', 'Humility', 'Integrity', 'Collaboration'],
    help_swaps_completed: 2,
    average_rating: 4.8,
    total_reviews: 2,
    check_in_streak: 12,
    trust_score: 2.5,
    is_founding_member: true,
    founding_member_number: 482,
    created_at: new Date().toISOString(),
    account_status: 'active',
    role: 'admin',
  },
  {
    id: 'pending-1',
    email: 'david.k@apple.com',
    email_verified: true,
    legalFirstName: 'David',
    legalLastName: 'Kim',
    legalNameFull: 'David Kim',
    phoneNumber: '+15550201',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'David Kim',
    profile_photo_url: '/avatars/default.png',
    profile_photo_verified: false,
    bio: 'Hardware engineering specialist at Apple. Looking to swap design and embedded architecture help.',
    location_city: 'Cupertino, CA',
    skills: ['Hardware Design', 'Embedded Systems', 'C++'],
    values: ['Integrity', 'Deep Inquiry', 'Trustworthiness'],
    work_email: 'david.k@apple.com',
    work_email_verified: false,
    company_name: 'Apple',
    job_title: 'Hardware Engineer',
    company_domain: 'apple.com',
    help_swaps_completed: 0,
    average_rating: 0,
    total_reviews: 0,
    check_in_streak: 1,
    trust_score: 2.0,
    is_founding_member: false,
    created_at: new Date().toISOString(),
    account_status: 'pending_approval',
    role: 'member',
  },
  {
    id: 'pending-2',
    email: 'sophia.l@mit.edu',
    email_verified: true,
    legalFirstName: 'Sophia',
    legalLastName: 'Lin',
    legalNameFull: 'Sophia Lin',
    phoneNumber: '+15550202',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Sophia Lin',
    profile_photo_url: '/avatars/default.png',
    profile_photo_verified: false,
    bio: 'MIT Computer Science student researching cryptography and decentralized identity networks.',
    location_city: 'Boston, MA',
    skills: ['Cryptography', 'Blockchain', 'Discrete Math'],
    values: ['Deep Inquiry', 'Safety First', 'Humility'],
    school_email: 'sophia.l@mit.edu',
    school_email_verified: false,
    university_name: 'MIT',
    department: 'EECS',
    university_domain: 'mit.edu',
    help_swaps_completed: 0,
    average_rating: 0,
    total_reviews: 0,
    check_in_streak: 1,
    trust_score: 2.0,
    is_founding_member: false,
    created_at: new Date().toISOString(),
    account_status: 'pending_approval',
    role: 'member',
  },
  {
    id: 'pending-3',
    email: 'lucas.s@netflix.com',
    email_verified: true,
    legalFirstName: 'Lucas',
    legalLastName: 'Silva',
    legalNameFull: 'Lucas Silva',
    phoneNumber: '+15550203',
    phone_verified: true,
    two_factor_enabled: true,
    two_factor_method: 'sms',
    display_name: 'Lucas Silva',
    profile_photo_url: '/avatars/default.png',
    profile_photo_verified: false,
    bio: 'UI Architect at Netflix. Excited to swap design architecture and high scale browser loading tricks.',
    location_city: 'Los Gatos, CA',
    skills: ['CSS Performance', 'Accessibility', 'TypeScript'],
    values: ['Aesthetic Calm', 'Continuous Learning', 'Collaboration'],
    work_email: 'lucas.s@netflix.com',
    work_email_verified: false,
    company_name: 'Netflix',
    job_title: 'UI Engineer',
    company_domain: 'netflix.com',
    help_swaps_completed: 0,
    average_rating: 0,
    total_reviews: 0,
    check_in_streak: 1,
    trust_score: 2.0,
    is_founding_member: false,
    created_at: new Date().toISOString(),
    account_status: 'pending_approval',
    role: 'member',
  }
];

// 5 local Events
const SEED_EVENTS: Event[] = [
  {
    id: 'event-1',
    created_by: 'mentor-1',
    title: 'San Francisco Sage Circle: Roots & Coffee',
    description: 'A cozy coffee gathering for values-aligned engineers to discuss frontend system design, calm tech principles, and career resilience. First coffee is on us! Strictly limited capacity to encourage deep conversation.',
    location_name: 'Sightglass Coffee, SOMA',
    location_city: 'San Francisco, CA',
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
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
  },
  {
    id: 'event-3',
    created_by: 'mentor-7',
    title: 'Figma Variables & Design System Sync',
    description: 'Practical interactive clinic on creating responsive design tokens, linking mode variables in light/dark mode layouts, and syncing code tokens with Github actions.',
    location_name: 'Figma SF Office, SOMA',
    location_city: 'San Francisco, CA',
    start_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(),
    skill_tags: ['Design Tokens', 'Figma Variables', 'React UI'],
    value_tags: ['Aesthetic Calm', 'Collaboration', 'Continuous Learning'],
    capacity: 15,
    current_attendees: 12,
    is_founding_member_only: false,
    price: 0,
    image_url: '/events/coffee.png',
  },
  {
    id: 'event-4',
    created_by: 'mentor-5',
    title: 'Rust Embedded Firmware Swap',
    description: 'Hardware hacking session. Bring your microcontrollers! Elena will demonstrate writing memory-safe embedded firmware in Rust, followed by peer board review.',
    location_name: 'Sightglass Coffee, SOMA',
    location_city: 'San Francisco, CA',
    start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000).toISOString(),
    skill_tags: ['Rust', 'Embedded C', 'Systems Safety'],
    value_tags: ['Integrity', 'Trustworthiness', 'Continuous Learning'],
    capacity: 10,
    current_attendees: 7,
    is_founding_member_only: true,
    price: 0,
    image_url: '/events/seminar.png',
  },
  {
    id: 'event-5',
    created_by: 'mentor-6',
    title: 'CSS UI Grid & Accessibility Audit Clinic',
    description: 'A live design-to-code troubleshooting clinic. Bring your broken layouts and let\'s optimize DOM structures, color contrast, keyboard focal states, and CSS grid lines in real-time.',
    location_name: 'Blue Bottle Coffee, SOMA',
    location_city: 'San Francisco, CA',
    start_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
    skill_tags: ['CSS Performance', 'Web Accessibility', 'HTML5 APIs'],
    value_tags: ['Empathy', 'Inclusivity', 'Collaboration'],
    capacity: 20,
    current_attendees: 14,
    is_founding_member_only: false,
    price: 0,
    image_url: '/events/coffee.png',
  }
];

// 10 peer Reviews
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
  },
  {
    id: 'review-3',
    reviewer_id: 'user-guest',
    reviewer_name: 'Guest Mentee',
    reviewer_photo: '/avatars/guest.png',
    reviewed_user_id: 'mentor-3',
    rating: 5,
    comment: 'Maya helped me audit my portfolio typography. She explained visual calmness grids beautifully!',
    tags: ['UI/UX Design', 'Design Systems', 'Aesthetic Calm'],
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-4',
    reviewer_id: 'user-guest',
    reviewer_name: 'Guest Mentee',
    reviewer_photo: '/avatars/guest.png',
    reviewed_user_id: 'mentor-4',
    rating: 4,
    comment: 'Marcus walked me through product roadmapping metrics. Very clear, pragmatic, and humble advice.',
    tags: ['Product Strategy', 'Roadmapping', 'Humility'],
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-5',
    reviewer_id: 'mentor-1',
    reviewer_name: 'Sarah Chen',
    reviewer_photo: '/avatars/sarah.png',
    reviewed_user_id: 'user-guest',
    rating: 5,
    comment: 'Jane is an exceptionally curious and fast learner! She built a gorgeous CSS layout and shared great design systems questions.',
    tags: ['Continuous Learning', 'Humility', 'React'],
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-6',
    reviewer_id: 'mentor-2',
    reviewer_name: 'Liam Vance',
    reviewer_photo: '/avatars/liam.png',
    reviewed_user_id: 'mentor-3',
    rating: 5,
    comment: 'Maya Patel is standard-setting in interface aesthetics. Our collaborative alignment sessions were incredibly productive.',
    tags: ['Design Systems', 'Collaboration', 'Aesthetic Calm'],
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-7',
    reviewer_id: 'mentor-3',
    reviewer_name: 'Maya Patel',
    reviewer_photo: '/avatars/maya.png',
    reviewed_user_id: 'mentor-1',
    rating: 5,
    comment: 'Sarah is an outstanding collaborator. She helped us implement clean layout modes in our React component libraries.',
    tags: ['React', 'Collaboration', 'Continuous Learning'],
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-8',
    reviewer_id: 'mentor-4',
    reviewer_name: 'Marcus A.',
    reviewer_photo: '/avatars/marcus.png',
    reviewed_user_id: 'mentor-5',
    rating: 5,
    comment: 'Elena provided outstanding systems assistance for our Stripe hardware terminal firmware tests. Absolute expert.',
    tags: ['Systems Safety', 'Rust', 'Trustworthiness'],
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-9',
    reviewer_id: 'mentor-5',
    reviewer_name: 'Elena R.',
    reviewer_photo: '/avatars/default.png',
    reviewed_user_id: 'mentor-9',
    rating: 5,
    comment: 'Siddharth provided brilliant PyTorch code optimizations for our real-time board chip alignment models. Exceptionally safe approach.',
    tags: ['PyTorch', 'Model Alignment', 'Safety First'],
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review-10',
    reviewer_id: 'mentor-9',
    reviewer_name: 'Siddharth M.',
    reviewer_photo: '/avatars/default.png',
    reviewed_user_id: 'mentor-2',
    rating: 5,
    comment: 'Liam Vance possesses a standard of academic rigor and inquiry that is rare. Essential safety alignment review discussions.',
    tags: ['AI Alignment', 'Deep Inquiry', 'Trustworthiness'],
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// 10 active nearby local Check-ins
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
  },
  {
    id: 'check-in-4',
    user_id: 'mentor-4',
    location_name: 'Berkeley Espresso, Berkeley',
    location_city: 'Berkeley, CA',
    note: 'Drafting product strategies and specifications. Let\'s trade roadmapping support!',
    visibility: 'visible',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'check-in-5',
    user_id: 'mentor-5',
    location_name: 'Sightglass Coffee, SOMA',
    location_city: 'San Francisco, CA',
    note: 'Soldering iron in hand, reviewing embedded chips. Let\'s swap low-level Rust tips!',
    visibility: 'visible',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'check-in-6',
    user_id: 'mentor-6',
    location_name: 'Blue Bottle Coffee, SOMA',
    location_city: 'San Francisco, CA',
    note: 'Auditing browser painting offsets and accessibility tags. First espresso is on me!',
    visibility: 'visible',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'check-in-7',
    user_id: 'mentor-7',
    location_name: 'Figma SF HQ, SOMA',
    location_city: 'San Francisco, CA',
    note: 'Refining typography pairs and Figma variables. Come check out our tokens clinic!',
    visibility: 'visible',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'check-in-8',
    user_id: 'mentor-8',
    location_name: 'Doe Library, Berkeley',
    location_city: 'Berkeley, CA',
    note: 'Solving discrete equations and matrix spaces. Swing by for physics formulas.',
    visibility: 'mentors_only',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'check-in-9',
    user_id: 'mentor-9',
    location_name: 'Coupa Cafe, Palo Alto',
    location_city: 'Palo Alto, CA',
    note: 'Evaluating LLM alignment weights. Open to chat PyTorch optimizations!',
    visibility: 'visible',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'check-in-10',
    user_id: 'user-guest',
    location_name: 'Sightglass Coffee, SOMA',
    location_city: 'San Francisco, CA',
    note: 'Building a beautiful React dashboard for my mentoring community swap prototype!',
    visibility: 'visible',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
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

// Initialize LocalStorage with seed data if empty (with automatic size self-healing)
export function initLocalStorage() {
  const storedUsers = window.localStorage.getItem(KEYS.USERS);
  let shouldForceReseed = false;

  if (storedUsers) {
    try {
      const parsed = JSON.parse(storedUsers);
      // Force reseed if the cache contains old Unsplash URLs or has fewer than 13 seeded profiles or lacks pending_approval accounts
      if (parsed.length < 13 || !parsed.some((u: User) => u.account_status === 'pending_approval') || storedUsers.includes('unsplash.com')) {
        shouldForceReseed = true;
      }
    } catch (e) {
      shouldForceReseed = true;
    }
  } else {
    shouldForceReseed = true;
  }

  if (shouldForceReseed) {
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
    // 10 active chat history threads with custom exchange dialogues and agreement cards for Jane (user-guest)
    const defaultMessages: Message[] = [
      // Thread 1: Sarah Chen (Google)
      {
        id: 'msg-sarah-1',
        sender_id: 'mentor-1',
        recipient_id: 'user-guest',
        content: 'Hi Jane! Welcome to Kindred. I noticed your interest in React and frontend system design. Let me know if you would ever like to check-in locally or start a mentoring swap!',
        created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 'msg-sarah-2',
        sender_id: 'user-guest',
        recipient_id: 'mentor-1',
        content: 'Hi Sarah! That would be amazing. I\'m currently trying to structure my first large-scale React app and feeling a bit lost with state management.',
        created_at: new Date(Date.now() - 23 * 3600 * 1000).toISOString(),
      },
      {
        id: 'msg-sarah-3',
        sender_id: 'mentor-1',
        recipient_id: 'user-guest',
        content: 'Perfect! React System Design for Content Curation sounds like a great exchange. Let\'s lock down a mentoring swap agreement. Check the contract below!',
        created_at: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
      },

      // Thread 2: Liam Vance (Stanford)
      {
        id: 'msg-liam-1',
        sender_id: 'mentor-2',
        recipient_id: 'user-guest',
        content: 'Hello Jane. I see you values-aligned on Deep Inquiry and Humility. If you need support reviewing academic algorithms or Python, let\'s chat.',
        created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 'msg-liam-2',
        sender_id: 'user-guest',
        recipient_id: 'mentor-2',
        content: 'Hi Liam! Thanks for reaching out. I\'m actually very interested in AI ethics and how we translate values into safety code parameters.',
        created_at: new Date(Date.now() - 47 * 3600 * 1000).toISOString(),
      },

      // Thread 3: Maya Patel (Airbnb)
      {
        id: 'msg-maya-1',
        sender_id: 'mentor-3',
        recipient_id: 'user-guest',
        content: 'Hi Jane! I love your values on Continuous Learning. I\'m holding quick design variables reviews at Blue Bottle today if you want to swing by.',
        created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
      },

      // Thread 4: Marcus A. (Stripe)
      {
        id: 'msg-marcus-1',
        sender_id: 'mentor-4',
        recipient_id: 'user-guest',
        content: 'Hi Jane, let me know if you ever need help with Stripe API integrations or setting up transaction flows. Happy to help swap!',
        created_at: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
      },

      // Thread 5: Elena R. (Apple)
      {
        id: 'msg-elena-1',
        sender_id: 'mentor-5',
        recipient_id: 'user-guest',
        content: 'Hello! I noticed you are seeking low-level firmware guidance. Swapping Rust compiler support for web documentation. Interested?',
        created_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
      },

      // Thread 6: Devon Harris (Netflix)
      {
        id: 'msg-devon-1',
        sender_id: 'mentor-6',
        recipient_id: 'user-guest',
        content: 'Hey Jane, do you want to run a quick performance and CSS layout accessibility audit on your mentoring prototype? Let\'s sync up!',
        created_at: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
      },

      // Thread 7: Chloe Kim (Figma)
      {
        id: 'msg-chloe-1',
        sender_id: 'mentor-7',
        recipient_id: 'user-guest',
        content: 'Hi Jane! I\'m sharing Figma design token workflows today at Figma HQ. Grab a spot if you want to learn variables systems.',
        created_at: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
      },

      // Thread 8: Aris Thorne (Berkeley)
      {
        id: 'msg-aris-1',
        sender_id: 'mentor-8',
        recipient_id: 'user-guest',
        content: 'Hello Aristotle, looking to trade quantum algorithm explanations for help with building clean LaTeX documentation websites.',
        created_at: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
      },

      // Thread 9: Siddharth M. (OpenAI)
      {
        id: 'msg-siddharth-1',
        sender_id: 'mentor-9',
        recipient_id: 'user-guest',
        content: 'Hi Jane, walking through PyTorch alignment benchmarks today in SOMA. Let me know if you want to swap computational models guidance.',
        created_at: new Date(Date.now() - 9 * 24 * 3600 * 1000).toISOString(),
      }
    ];
    setStored(KEYS.MESSAGES, defaultMessages);
  }
}

// Call initialization immediately on import
initLocalStorage();

// --- RESEND EMAIL SYSTEM & ADMIN FORWARDING INTEGRATION ---
const emailStyleHeader = `
  <div style="background-color: #FAF8F5; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1D2B1E; max-width: 600px; margin: 0 auto; border-radius: 32px; border: 1px solid rgba(29, 43, 30, 0.08); box-shadow: 0 4px 30px rgba(0,0,0,0.02);">
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="font-size: 32px;">🌱</span>
      <h2 style="margin: 8px 0 0 0; color: #1D2B1E; font-size: 24px; font-weight: 700;">Kindred</h2>
      <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #3D5941; border: 1px solid rgba(61, 89, 65, 0.2); padding: 4px 12px; border-radius: 12px; display: inline-block; margin-top: 8px;">Reciprocity Covenant</span>
    </div>
`;

const emailStyleFooter = `
    <div style="border-top: 1px solid rgba(29, 43, 30, 0.08); margin-top: 32px; padding-top: 24px; text-align: center; font-size: 11px; color: rgba(29, 43, 30, 0.4);">
      <p style="font-weight: bold; color: #3D5941; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Protected under the Reciprocity Covenant</p>
      <p style="margin: 0;">Kindred preserves a high-trust local mentoring workspace. Active show-ups are required. No silent profiles.</p>
      <p style="margin: 8px 0 0 0;">© 2026 Kindred Club | A Product of KnotStranded LLC</p>
    </div>
  </div>
`;

async function sendSystemEmail(to: string, subject: string, html: string, isSystemAlert = false) {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to, subject, html, isSystemAlert })
    });
    const data = await res.json();
    console.log('✓ [Mailing System API Response]:', data);
  } catch (error) {
    // Elegant fallback simulation logging for local development
    console.log(
      '%c✉️ [Kindred Mailing Simulator]',
      'background: #3D5941; color: #FAF8F3; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
      {
        to,
        subject,
        adminForward: 'admin@knotstranded.com',
        status: 'Real API call deferred (Local Sandbox Dev Mode). Real dispatch triggers automatically on Vercel deployment!'
      }
    );
  }
}

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
      const guest = users.find(u => u.id === 'user-guest');
      if (guest) {
        return { token: 'jwt-guest-token', user: guest };
      }
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
      trust_score: 2.0,
      is_founding_member: true,
      founding_member_number: users.length + 101,
      founding_member_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      account_status: 'pending_approval',
    };
    
    users.push(newUser);
    setStored(KEYS.USERS, users);

    // Send email that registration request is received and copy to admin@knotstranded.com
    const registerHtml = `
      ${emailStyleHeader}
      <div style="background-color: #FFFFFF; border-radius: 20px; padding: 24px; border: 1px solid rgba(29, 43, 30, 0.04); box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
        <h3 style="margin-top:0; color:#1D2B1E; font-size:18px;">Application Received, ${newUser.legalFirstName}</h3>
        <p style="font-size:14px; line-height:1.6; color:rgba(29, 43, 30, 0.8);">
          Your application to join the Kindred Founding Circle has been safely received. Our community administration team is currently reviewing your profile alignments, skills, and submitted credentials.
        </p>
        <div style="background-color: #FAF8F5; border-radius: 16px; padding: 16px; border: 1px solid rgba(61, 89, 65, 0.1); margin-top: 20px; font-size:13px; line-height:1.5;">
          <strong>Legal Name:</strong> ${newUser.legalNameFull}<br>
          <strong>Email Address:</strong> ${newUser.email}<br>
          <strong>Submission Status:</strong> Onboarding Queue Position #3
        </div>
        <p style="font-size:13px; color:rgba(29, 43, 30, 0.5); margin-top: 20px; line-height:1.5;">
          You will receive an automated email verification notice as soon as an administrator reviews and approves your account request.
        </p>
      </div>
      ${emailStyleFooter}
    `;
    sendSystemEmail(newUser.email, '🌱 Your Kindred Membership Application is Received', registerHtml, true);

    return { userId: newId };
  },

  async approveUserAccount(userId: string): Promise<User> {
    await delay(500);
    const users = getStored<User[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx].account_status = 'active';
      if (users[idx].work_email) users[idx].work_email_verified = true;
      if (users[idx].school_email) users[idx].school_email_verified = true;
      users[idx].trust_score = 3.0;
      setStored(KEYS.USERS, users);

      // Send approval email and forward copy to admin@knotstranded.com
      const approveHtml = `
        ${emailStyleHeader}
        <div style="background-color: #FFFFFF; border-radius: 20px; padding: 24px; border: 1px solid rgba(29, 43, 30, 0.04); box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
          <h3 style="margin-top:0; color:#3D5941; font-size:18px;">Welcome to the Circle! 🎉</h3>
          <p style="font-size:14px; line-height:1.6; color:rgba(29, 43, 30, 0.8);">
            We are thrilled to share that your application has been approved by the Kindred Founding Circle administrators! Your account is now fully active.
          </p>
          <div style="background-color: #FAF8F5; border-radius: 16px; padding: 20px; border: 1px solid rgba(61, 89, 65, 0.1); margin-top: 20px; text-align: center;">
            <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #C4956D; letter-spacing: 1px; display: block; margin-bottom: 4px;">Founding Member Roster</span>
            <span style="font-size: 24px; font-weight: bold; color: #3D5941; font-family: monospace;">Member #${users[idx].founding_member_number}</span>
          </div>
          <p style="font-size:14px; line-height:1.6; color:rgba(29, 43, 30, 0.8); margin-top: 20px;">
            Log in to your dashboard to check-in locally, view values-aligned mentors nearby, and establish your first reciprocity mentoring swap!
          </p>
        </div>
        ${emailStyleFooter}
      `;
      sendSystemEmail(users[idx].email, '🎉 Welcome to the Circle! Your Kindred Account is Approved', approveHtml);

      return users[idx];
    }
    throw new Error('User not found');
  },

  async suspendUserAccount(userId: string): Promise<User> {
    await delay(400);
    const users = getStored<User[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx].account_status = 'suspended';
      setStored(KEYS.USERS, users);

      // Send suspension email and forward copy to admin@knotstranded.com
      const suspendHtml = `
        ${emailStyleHeader}
        <div style="background-color: #FFFFFF; border-radius: 20px; padding: 24px; border: 1px solid rgba(29, 43, 30, 0.04); box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
          <h3 style="margin-top:0; color:#C4956D; font-size:18px;">Account Status Advisory: Suspended</h3>
          <p style="font-size:14px; line-height:1.6; color:rgba(29, 43, 30, 0.8);">
            Your Kindred account has been temporarily suspended by our community moderation desk due to values mismatch or covenant review guidelines.
          </p>
          <p style="font-size:14px; line-height:1.6; color:rgba(29, 43, 30, 0.8);">
            If you believe this is a misunderstanding, please reach out to our team at <a href="mailto:trust@kindred.org" style="color: #3D5941; font-weight: bold; text-decoration: underline;">trust@kindred.org</a>.
          </p>
        </div>
        ${emailStyleFooter}
      `;
      sendSystemEmail(users[idx].email, '⚠️ Kindred Account Suspension Notice', suspendHtml);

      return users[idx];
    }
    throw new Error('User not found');
  },

  async restoreUserAccount(userId: string): Promise<User> {
    await delay(400);
    const users = getStored<User[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx].account_status = 'active';
      setStored(KEYS.USERS, users);

      // Send restoration email and forward copy to admin@knotstranded.com
      const restoreHtml = `
        ${emailStyleHeader}
        <div style="background-color: #FFFFFF; border-radius: 20px; padding: 24px; border: 1px solid rgba(29, 43, 30, 0.04); box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
          <h3 style="margin-top:0; color:#3D5941; font-size:18px;">Account Re-activated! 🔓</h3>
          <p style="font-size:14px; line-height:1.6; color:rgba(29, 43, 30, 0.8);">
            Your Kindred account has been successfully restored by our community moderation desk.
          </p>
          <p style="font-size:14px; line-height:1.6; color:rgba(29, 43, 30, 0.8);">
            Welcome back to the circle!
          </p>
        </div>
        ${emailStyleFooter}
      `;
      sendSystemEmail(users[idx].email, '🔓 Kindred Account Restored Notice', restoreHtml);

      return users[idx];
    }
    throw new Error('User not found');
  },

  async verifyUserDomainManually(userId: string, type: 'work' | 'school'): Promise<User> {
    await delay(400);
    const users = getStored<User[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      if (type === 'work') {
        users[idx].work_email_verified = true;
      } else {
        users[idx].school_email_verified = true;
      }
      users[idx].trust_score = parseFloat(Math.min(5.0, users[idx].trust_score + 0.5).toFixed(2));
      setStored(KEYS.USERS, users);

      // Send domain manual verification success email
      const verifyDomainHtml = `
        ${emailStyleHeader}
        <div style="background-color: #FFFFFF; border-radius: 20px; padding: 24px; border: 1px solid rgba(29, 43, 30, 0.04); box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
          <h3 style="margin-top:0; color:#3D5941; font-size:18px;">Credential Verified! ✓</h3>
          <p style="font-size:14px; line-height:1.6; color:rgba(29, 43, 30, 0.8);">
            We have verified your domain credentials! A high-trust verification badge has been successfully added to your profile card.
          </p>
          <div style="background-color: #FAF8F5; border-radius: 16px; padding: 16px; border: 1px solid rgba(61, 89, 65, 0.1); margin-top: 20px; font-size:13px; line-height:1.5;">
            <strong>Verified Domain:</strong> ${type === 'work' ? users[idx].company_domain : users[idx].university_domain}<br>
            <strong>Credential Type:</strong> ${type === 'work' ? '💼 Professional Partner' : '🎓 Academic Partner'}
          </div>
        </div>
        ${emailStyleFooter}
      `;
      sendSystemEmail(users[idx].email, '✓ Kindred Credentials Domain Verified', verifyDomainHtml);

      return users[idx];
    }
    throw new Error('User not found');
  },

  async getAllUsers(): Promise<User[]> {
    await delay(300);
    return getStored<User[]>(KEYS.USERS, []);
  },

  async declineUserAccount(userId: string): Promise<boolean> {
    await delay(400);
    const users = getStored<User[]>(KEYS.USERS, []);
    const decUser = users.find(u => u.id === userId);
    const filtered = users.filter(u => u.id !== userId);
    setStored(KEYS.USERS, filtered);

    // Send membership decline notification email and forward to admin@knotstranded.com
    if (decUser) {
      const declineHtml = `
        ${emailStyleHeader}
        <div style="background-color: #FFFFFF; border-radius: 20px; padding: 24px; border: 1px solid rgba(29, 43, 30, 0.04); box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
          <h3 style="margin-top:0; color:#C4956D; font-size:18px;">Advisory Notice: Membership Request</h3>
          <p style="font-size:14px; line-height:1.6; color:rgba(29, 43, 30, 0.8);">
            Thank you for applying to the Kindred Founding Circle. At this time, our moderators have determined that your request does not align with our current neighborhood capacity or Reciprocity Covenant needs.
          </p>
          <p style="font-size:13px; color:rgba(29, 43, 30, 0.5); line-height:1.5;">
            Our review policies are focused on maintaining active, reciprocal physical show-ups within specified local boundaries.
          </p>
        </div>
        ${emailStyleFooter}
      `;
      sendSystemEmail(decUser.email, '🌱 Kindred Membership Request Advisory Notice', declineHtml);
    }

    return true;
  },

  // --- DISCOVERY & USERS ---
  async getMentors(filters: { skill?: string; value?: string; trustScore_min?: number }): Promise<User[]> {
    await delay(400);
    const users = getStored<User[]>(KEYS.USERS, []);
    
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
    await delay(400);
    const users = getStored<User[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...data } as User;
      setStored(KEYS.USERS, users);
      return users[idx];
    }
    return null;
  },

  async updateProfilePhoto(userId: string, photoUrl: string): Promise<boolean> {
    await delay(400);
    const users = getStored<User[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx].profile_photo_url = photoUrl;
      users[idx].profile_photo_verified = false; // reset verification status on change
      setStored(KEYS.USERS, users);
      return true;
    }
    return false;
  },

  async verifyWorkDomain(userId: string, email: string, domain: string, company: string): Promise<User | null> {
    await delay(500);
    const users = getStored<User[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx].work_email = email;
      users[idx].work_email_verified = true;
      users[idx].company_name = company;
      users[idx].company_domain = domain;
      users[idx].trust_score = parseFloat((users[idx].trust_score + 0.3).toFixed(2)); // boost score
      setStored(KEYS.USERS, users);
      return users[idx];
    }
    return null;
  },

  async verifySchoolDomain(userId: string, email: string, domain: string, university: string): Promise<User | null> {
    await delay(500);
    const users = getStored<User[]>(KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx].school_email = email;
      users[idx].school_email_verified = true;
      users[idx].university_name = university;
      users[idx].university_domain = domain;
      users[idx].trust_score = parseFloat((users[idx].trust_score + 0.3).toFixed(2)); // boost score
      setStored(KEYS.USERS, users);
      return users[idx];
    }
    return null;
  },

  // --- CHECK-INS ---
  async getActiveCheckIns(): Promise<CheckIn[]> {
    return this.fetchCheckIns();
  },

  async fetchCheckIns(): Promise<CheckIn[]> {
    await delay(300);
    const checkins = getStored<CheckIn[]>(KEYS.CHECK_INS, []);
    const users = getStored<User[]>(KEYS.USERS, []);
    
    // Populate user profile info in check-ins
    return checkins.map(chk => {
      const u = users.find(user => user.id === chk.user_id);
      return {
        ...chk,
        user: u ? {
          display_name: u.display_name,
          profile_photo_url: u.profile_photo_url,
          job_title: u.job_title,
          company_name: u.company_name,
          university_name: u.university_name,
          trust_score: u.trust_score,
          check_in_streak: u.check_in_streak,
        } : undefined
      };
    });
  },

  async startCheckIn(userId: string, location_name: string, location_city: string, note?: string, visibility?: 'visible' | 'mentors_only' | 'private'): Promise<CheckIn> {
    await delay(500);
    const checkins = getStored<CheckIn[]>(KEYS.CHECK_INS, []);
    const users = getStored<User[]>(KEYS.USERS, []);
    
    const newCheckIn: CheckIn = {
      id: `chk-${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      location_name,
      location_city,
      note,
      visibility: visibility || 'visible',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4hr expiration
    };
    
    // Remove previous checkin of the same user
    const filtered = checkins.filter(c => c.user_id !== userId);
    filtered.push(newCheckIn);
    setStored(KEYS.CHECK_INS, filtered);
    
    // Increment user show-up streak
    const uIdx = users.findIndex(u => u.id === userId);
    if (uIdx !== -1) {
      users[uIdx].check_in_streak += 1;
      users[uIdx].last_check_in_date = new Date().toISOString();
      users[uIdx].trust_score = parseFloat(Math.min(5.0, users[uIdx].trust_score + 0.15).toFixed(2));
      setStored(KEYS.USERS, users);
    }
    
    return newCheckIn;
  },

  async endCheckIn(userId: string): Promise<boolean> {
    await delay(300);
    const checkins = getStored<CheckIn[]>(KEYS.CHECK_INS, []);
    const filtered = checkins.filter(c => c.user_id !== userId);
    setStored(KEYS.CHECK_INS, filtered);
    return true;
  },

  // --- REVIEWS & RATING ENGINE ---
  async submitReview(
    reviewerId: string,
    reviewerName: string,
    reviewerPhoto: string,
    reviewedUserId: string,
    rating: number,
    comment: string,
    tags: string[]
  ): Promise<Review> {
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
    
    // Recalculate average rating & trust score for reviewed user
    const reviewedIdx = users.findIndex(u => u.id === reviewedUserId);
    if (reviewedIdx !== -1) {
      const userReviews = reviews.filter(r => r.reviewed_user_id === reviewedUserId);
      const totalRatings = userReviews.reduce((sum, r) => sum + r.rating, 0);
      const avg = parseFloat((totalRatings / userReviews.length).toFixed(2));
      
      users[reviewedIdx].total_reviews = userReviews.length;
      users[reviewedIdx].average_rating = avg;
      
      // Trust Score Algorithm: Base rating score (weight 70%) + streak score (weight 20%) + swaps score (weight 10%)
      const baseRatingVal = (avg / 5.0) * 4.0; // max 4.0
      const streakBonus = Math.min(0.5, (users[reviewedIdx].check_in_streak / 30) * 0.5); // max 0.5
      const swapsBonus = Math.min(0.5, (users[reviewedIdx].help_swaps_completed / 50) * 0.5); // max 0.5
      
      const newScore = parseFloat(Math.min(5.0, baseRatingVal + streakBonus + swapsBonus).toFixed(2));
      users[reviewedIdx].trust_score = newScore;
      
      setStored(KEYS.USERS, users);
    }
    
    return newReview;
  },

  // --- MESSAGES & CHATS ---
  async getMessages(activeUserId: string, otherUserId?: string): Promise<Message[]> {
    await delay(300);
    const messages = getStored<Message[]>(KEYS.MESSAGES, []);
    
    if (!otherUserId) {
      // Return all messages for thread list parsing
      return messages.filter(msg => msg.sender_id === activeUserId || msg.recipient_id === activeUserId)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }
    
    return messages.filter(msg => 
      (msg.sender_id === activeUserId && msg.recipient_id === otherUserId) ||
      (msg.sender_id === otherUserId && msg.recipient_id === activeUserId)
    ).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  },

  async sendMessage(senderId: string, recipientId: string, content: string, agreement_data?: Message['agreement_data']): Promise<Message> {
    await delay(400);
    const messages = getStored<Message[]>(KEYS.MESSAGES, []);
    
    const newMsg: Message = {
      id: `msg-${Math.random().toString(36).substr(2, 9)}`,
      sender_id: senderId,
      recipient_id: recipientId,
      content,
      created_at: new Date().toISOString(),
      agreement_data
    };
    
    messages.push(newMsg);
    setStored(KEYS.MESSAGES, messages);
    
    return newMsg;
  },

  async handleAgreement(messageId: string, status: 'accepted' | 'declined', recipientSignature?: string): Promise<{ message: Message; relationship?: MentoringRelationship } | null> {
    return this.respondToAgreement(messageId, status, recipientSignature);
  },

  async respondToAgreement(messageId: string, status: 'accepted' | 'declined', recipientSignature?: string): Promise<{ message: Message; relationship?: MentoringRelationship } | null> {
    await delay(500);
    const messages = getStored<Message[]>(KEYS.MESSAGES, []);
    const relationships = getStored<MentoringRelationship[]>(KEYS.RELATIONSHIPS, []);
    const users = getStored<User[]>(KEYS.USERS, []);

    const msgIdx = messages.findIndex(m => m.id === messageId);
    if (msgIdx !== -1 && messages[msgIdx].agreement_data) {
      messages[msgIdx].agreement_data!.status = status;
      if (recipientSignature) {
        messages[msgIdx].agreement_data!.recipient_signature = recipientSignature;
      }
      
      let relationship: MentoringRelationship | undefined;
      const relId = messages[msgIdx].agreement_data!.relationship_id;
      const rIdx = relationships.findIndex(r => r.id === relId);
      
      if (rIdx !== -1) {
        relationships[rIdx].status = status === 'accepted' ? 'active' : 'declined';
        relationship = relationships[rIdx];
        setStored(KEYS.RELATIONSHIPS, relationships);

        if (status === 'accepted') {
          // Increment swaps completed for both users and boost their Trust Score!
          const mIdx = users.findIndex(u => u.id === relationships[rIdx].mentor_id);
          const meIdx = users.findIndex(u => u.id === relationships[rIdx].mentee_id);
          
          if (mIdx !== -1) {
            users[mIdx].help_swaps_completed += 1;
            users[mIdx].trust_score = parseFloat(Math.min(5.0, users[mIdx].trust_score + 0.2).toFixed(2));
          }
          if (meIdx !== -1) {
            users[meIdx].help_swaps_completed += 1;
            users[meIdx].trust_score = parseFloat(Math.min(5.0, users[meIdx].trust_score + 0.2).toFixed(2));
          }
          setStored(KEYS.USERS, users);
        }
      }
      
      setStored(KEYS.MESSAGES, messages);
      return { message: messages[msgIdx], relationship };
    }
    return null;
  },

  // --- EVENTS ---
  async getEvents(): Promise<Event[]> {
    return this.fetchEvents();
  },

  async fetchEvents(): Promise<Event[]> {
    await delay(300);
    return getStored<Event[]>(KEYS.EVENTS, []);
  },

  async rsvpToEvent(userId: string, eventId: string, status: 'going' | 'interested' | 'declined'): Promise<EventRSVP> {
    await delay(400);
    const rsvps = getStored<EventRSVP[]>(KEYS.RSVPS, []);
    const events = getStored<Event[]>(KEYS.EVENTS, []);
    
    // Check if RSVP already exists
    const idx = rsvps.findIndex(r => r.user_id === userId && r.event_id === eventId);
    const newRsvp: EventRSVP = {
      id: idx !== -1 ? rsvps[idx].id : `rsvp-${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      event_id: eventId,
      status,
      created_at: new Date().toISOString(),
    };
    
    if (idx !== -1) {
      rsvps[idx] = newRsvp;
    } else {
      rsvps.push(newRsvp);
      
      // Increment event attendee count
      const eIdx = events.findIndex(e => e.id === eventId);
      if (eIdx !== -1) {
        events[eIdx].current_attendees = Math.min(events[eIdx].capacity, events[eIdx].current_attendees + 1);
        setStored(KEYS.EVENTS, events);
      }
    }
    
    setStored(KEYS.RSVPS, rsvps);
    return newRsvp;
  },

  async getMyRSVPs(userId: string): Promise<EventRSVP[]> {
    await delay(300);
    const rsvps = getStored<EventRSVP[]>(KEYS.RSVPS, []);
    return rsvps.filter(r => r.user_id === userId);
  },

  async requestMentoring(mentorId: string, menteeId: string, skillsFocus: string[]): Promise<MentoringRelationship> {
    await delay(500);
    const relationships = getStored<MentoringRelationship[]>(KEYS.RELATIONSHIPS, []);
    
    const newRelationship: MentoringRelationship = {
      id: `rel-${Math.random().toString(36).substr(2, 9)}`,
      mentor_id: mentorId,
      mentee_id: menteeId,
      status: 'pending',
      skills_focus: skillsFocus,
      meeting_frequency: 'Bi-weekly',
      start_date: new Date().toISOString(),
    };
    
    relationships.push(newRelationship);
    setStored(KEYS.RELATIONSHIPS, relationships);
    return newRelationship;
  }
};
