export type ProgramCategory = 
  | 'Weight Training' 
  | 'Cardio & Conditioning' 
  | 'Muscle Building' 
  | 'Weight Loss' 
  | 'Personal Training';

export interface WorkoutProgram {
  id: string;
  name: string;
  category: ProgramCategory;
  tagline: string;
  description: string;
  intensity: 'Medium' | 'High' | 'Extreme';
  durationWeeks: number;
  sessionsPerWeek: number;
  targetFocus: string;
  keyBenefits: string[];
  equipmentUsed: string[];
  image: string;
  coachId: string;
  coachName: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  certifications: string[];
  specialties: string[];
  bio: string;
  image: string;
  athletesTrained: number;
  quote: string;
  instagram?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPricePerMonth: number;
  badge?: string;
  isPopular?: boolean;
  description: string;
  features: string[];
  notIncluded?: string[];
  accessHours: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'Free Weights' | 'Cardio Deck' | 'Heavy Racks' | 'Functional Rig' | 'Recovery';
  brand: string;
  specs: string;
  image: string;
  description: string;
}

export interface Transformation {
  id: string;
  memberName: string;
  age: number;
  duration: string;
  program: string;
  startingWeight: string;
  currentWeight: string;
  bodyFatChange: string;
  beforeImage: string;
  afterImage: string;
  story: string;
  trainer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  duration: string;
  quote: string;
  highlight: string;
  avatar: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  className: string;
  category: 'Strength' | 'HIIT' | 'Conditioning' | 'Mobility' | 'Hypertrophy';
  trainer: string;
  room: string;
  capacity: number;
  enrolled: number;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
}

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  planId: string;
  planName: string;
  billingCycle: 'monthly' | 'annual';
  preferredDate: string;
  goal: string;
  trainerId?: string;
  trainerName?: string;
  status: 'Pending' | 'Confirmed' | 'Active' | 'Cancelled';
  createdAt: string;
  notes?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'Replied' | 'Archived';
  createdAt: string;
}
