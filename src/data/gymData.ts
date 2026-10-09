import { WorkoutProgram, Trainer, MembershipPlan, EquipmentItem, Transformation, Testimonial, ScheduleItem, Booking, Enquiry } from '../types/gym';

export const INITIAL_PROGRAMS: WorkoutProgram[] = [
  {
    id: 'prog-weight',
    name: 'Heavy Iron: Barbell Mastery',
    category: 'Weight Training',
    tagline: 'Raw compound strength, progressive overload & barbell proficiency.',
    description: 'Designed for serious lifters seeking functional absolute strength. Master the Big Three (Squat, Bench, Deadlift) alongside Olympic weightlifting fundamentals under certified biomechanics coaches.',
    intensity: 'High',
    durationWeeks: 12,
    sessionsPerWeek: 4,
    targetFocus: 'Maximum Force Output & Central Nervous Adaptation',
    keyBenefits: [
      'Progressive overload periodization tracking',
      'Barbell velocity and kinematic movement screening',
      'Joint integrity & rotational core stabilization',
      'Personalized 1RM calculation & load indexing'
    ],
    equipmentUsed: ['Eleiko Competition Barbells', 'Calibrated Steel Plates', 'Rogue Power Racks', 'Safety Squat Bars'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    coachId: 'coach-1',
    coachName: 'Marcus Vance'
  },
  {
    id: 'prog-cardio',
    name: 'Metabolic Velocity & VO2 Engine',
    category: 'Cardio & Conditioning',
    tagline: 'High-octane conditioning, lactate threshold training & peak endurance.',
    description: 'Push past fatigue barriers with high-intensity interval conditioning. Combines ski-ergs, assault bikes, sled pushes, and heart-rate zone pacing to elevate your aerobic threshold and burn subcutaneous fat efficiently.',
    intensity: 'Extreme',
    durationWeeks: 8,
    sessionsPerWeek: 4,
    targetFocus: 'Cardiovascular Work Capacity & Lactate Clearance',
    keyBenefits: [
      'Heart rate zone 4 & 5 interval conditioning',
      'Zero-impact joint-friendly endurance pacing',
      'Rapid EPOC (Excess Post-Exercise Oxygen Consumption) burn',
      'Functional lung capacity and sprint recovery'
    ],
    equipmentUsed: ['Concept2 SkiErgs & Rowers', 'Echo Assault Bikes', 'Torque Tank Magnetic Sleds', 'Turf Sprint Lane'],
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1200&auto=format&fit=crop',
    coachId: 'coach-3',
    coachName: 'Jaxson Cruz'
  },
  {
    id: 'prog-muscle',
    name: 'Titan Hypertrophy Protocol',
    category: 'Muscle Building',
    tagline: 'Science-backed volume splits for dense, aesthetic muscular hypertrophy.',
    description: 'Architect your physique with precision angle isolation, tempo eccentrics, and failure-proximity training. Tailored upper/lower push-pull splits engineered to maximize mechanical tension and muscular density.',
    intensity: 'High',
    durationWeeks: 16,
    sessionsPerWeek: 5,
    targetFocus: 'Maximal Muscle Fiber Recruitment & Cross-Sectional Area',
    keyBenefits: [
      'Evidence-based 10-20 weekly sets per muscle group',
      'Mechanical tension through full range of motion',
      'Deload phases to prevent systemic overtraining',
      'Custom muscle group lagging-point prioritization'
    ],
    equipmentUsed: ['Hammer Strength Iso-Lateral Machines', 'Watson Custom Dumbbells', 'Dual Cable Cross Rigs', 'Arsenal Strength Hack Squat'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop',
    coachId: 'coach-2',
    coachName: 'Elena Rostova'
  },
  {
    id: 'prog-weightloss',
    name: 'Inferno Lean Shred',
    category: 'Weight Loss',
    tagline: 'Accelerated fat oxidation, metabolic resistance & lean tone preservation.',
    description: 'Transform your body composition with high-density circuit training designed to strip stubborn fat while guarding hard-earned muscle tissue. Includes guided nutritional calorie-deficit calculations.',
    intensity: 'Medium',
    durationWeeks: 10,
    sessionsPerWeek: 4,
    targetFocus: 'Caloric Expenditure, Lipolysis & Lean Body Mass Retention',
    keyBenefits: [
      'High calorie-burn metabolic resistance training circuits',
      'Body fat calipers & InBody biometric progress tracking',
      'Personalized macronutrient targets & hydration guides',
      'Post-workout active recovery and mobility routines'
    ],
    equipmentUsed: ['Kettlebells (8kg - 40kg)', 'Plyo Boxes', 'Medicine Slam Balls', 'TRX Suspension Trainers'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    coachId: 'coach-4',
    coachName: 'Maya Lin'
  },
  {
    id: 'prog-personal',
    name: 'Apex 1-on-1 Elite Coaching',
    category: 'Personal Training',
    tagline: 'Dedicated personal mentorship, biomechanics audit & bespoke programming.',
    description: 'The pinnacle private training experience. Receive daily personalized workout routines, continuous form correction, lifestyle recovery protocols, and direct coach accessibility via private communication channels.',
    intensity: 'Extreme',
    durationWeeks: 12,
    sessionsPerWeek: 3,
    targetFocus: 'Holistic Athletic Performance & Tailored Transformation',
    keyBenefits: [
      'Comprehensive FMS functional movement screen & postural scan',
      'Periodized weekly roadmap adapted to your schedule',
      'Nutritional meal timing & supplementation consultation',
      'Private training suite access during peak hours'
    ],
    equipmentUsed: ['All Private Zone Apparatus', 'Velocity-Based Training Transducers', 'Hyperice Recovery Suite'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
    coachId: 'coach-1',
    coachName: 'Marcus Vance'
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'coach-1',
    name: 'Marcus Vance',
    role: 'Head of Strength & Biomechanics',
    experienceYears: 12,
    certifications: ['CSCS (NSCA)', 'USAW Level 2 Senior Coach', 'EXOS Performance Specialist'],
    specialties: ['Powerlifting', 'Olympic Weightlifting', 'Barbell Kinematics', 'Injury Prevention'],
    bio: 'Former national collegiate powerlifting medalist with over a decade of coaching elite athletes, military personnel, and everyday lifters chasing raw physical power.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop',
    athletesTrained: 540,
    quote: 'Strength is not an accident. It is an unyielding habit built under tension.',
    instagram: '@marcus.apexiron'
  },
  {
    id: 'coach-2',
    name: 'Elena Rostova',
    role: 'Hypertrophy & Physique Director',
    experienceYears: 9,
    certifications: ['M.Sc. Exercise Science', 'IFBB Pro League Advisor', 'NASM-PES'],
    specialties: ['Muscle Hypertrophy', 'Body Composition Recomposition', 'Advanced Posing & Symmetry', 'Contest Prep'],
    bio: 'Specialist in biomechanics and muscle fiber recruitment. Elena applies clinical exercise science to sculpt symmetrical, dense physiques without joint wear.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop',
    athletesTrained: 420,
    quote: 'Control the eccentric phase. Where your focus goes, muscle tissue responds.',
    instagram: '@elena_rostova_fit'
  },
  {
    id: 'coach-3',
    name: 'Jaxson Cruz',
    role: 'Tactical Conditioning & Endurance Lead',
    experienceYears: 8,
    certifications: ['CrossFit Level 3 Trainer', 'CPT (ACSM)', 'Precision Nutrition L1'],
    specialties: ['Metabolic Conditioning', 'VO2 Max Threshold', 'Kettlebell Sport', 'High Intensity Agility'],
    bio: 'Former collegiate decathlete and tactical conditioning coach. Jaxson specializes in building engines that perform under severe physical stress.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    athletesTrained: 380,
    quote: 'When your lungs scream to quit, that is where true conditioning starts.',
    instagram: '@cruz_conditioning'
  },
  {
    id: 'coach-4',
    name: 'Maya Lin',
    role: 'Movement Quality & Active Recovery Coach',
    experienceYears: 7,
    certifications: ['FRC Mobility Specialist', 'E-RYT 500 Yoga Alliance', 'Functional Movement Screen (FMS)'],
    specialties: ['Hip & Thoracic Mobility', 'Post-Heavy Lifting Decompression', 'Breathwork & Nervous Regulation'],
    bio: 'Maya bridges the gap between brutal iron workouts and longevity. Her protocols keep Apex members lifting heavy year-round without chronic aches.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    athletesTrained: 610,
    quote: 'Mobility is the armor that protects heavy strength.',
    instagram: '@maya.flow.iron'
  }
];

export const INITIAL_PLANS: MembershipPlan[] = [
  {
    id: 'plan-basic',
    name: 'Iron Foundation',
    monthlyPrice: 49,
    annualPricePerMonth: 39,
    description: 'Perfect for independent lifters seeking full unrestricted access to heavy iron and free weights.',
    features: [
      'Full 24/7 access to main gym floor',
      'Olympic lifting platforms & free weights zone',
      'Cardio deck & turf sprint track',
      'Locker rooms & luxury rain showers',
      'Apex Iron mobile companion app'
    ],
    notIncluded: [
      'Unlimited group fitness classes',
      'Infrared sauna & ice plunge recovery',
      'Dedicated personal trainer sessions'
    ],
    accessHours: '24/7 Biometric Access'
  },
  {
    id: 'plan-pro',
    name: 'Pro Performance',
    monthlyPrice: 89,
    annualPricePerMonth: 69,
    badge: 'MOST POPULAR',
    isPopular: true,
    description: 'Our flagship tier for athletes who want elite equipment, group energy, and thermal recovery suites.',
    features: [
      'Everything in Iron Foundation',
      'Unlimited group fitness & HIIT classes',
      'Infrared Finnish sauna & 45°F cold plunge',
      'Monthly InBody 770 body composition scan',
      '1 complimentary 1-on-1 coaching session / month',
      '10% pro shop & supplement discount'
    ],
    notIncluded: [
      'Weekly private trainer dedication',
      'Reserved private executive locker'
    ],
    accessHours: '24/7 VIP Access'
  },
  {
    id: 'plan-elite',
    name: 'Apex Elite Athlete',
    monthlyPrice: 149,
    annualPricePerMonth: 119,
    badge: 'BEST VALUE',
    description: 'For competitive lifters and high performers requiring regular coach guidance, body audits, and guest privileges.',
    features: [
      'Everything in Pro Performance',
      '4 one-on-one personal training sessions / month',
      'Custom periodized training program quarterly',
      'Personalized macronutrient & nutrition guide',
      'Unlimited guest passes (bring a partner anytime)',
      'Free recovery smoothie after every workout'
    ],
    notIncluded: [
      'Daily 1-on-1 private coaching'
    ],
    accessHours: '24/7 Priority Access'
  },
  {
    id: 'plan-vip',
    name: 'Titan VIP Transformation',
    monthlyPrice: 299,
    annualPricePerMonth: 239,
    badge: 'ALL-INCLUSIVE',
    description: 'The highest tier bespoke fitness concierge. Unrivaled results with dedicated master coach mentorship.',
    features: [
      'Everything in Apex Elite Athlete',
      '12 one-on-one sessions per month with Head Coach',
      'Personalized weekly grocery & meal prep blueprint',
      'Private executive locker with daily fresh laundry',
      'Direct WhatsApp access to master coach 24/7',
      'Full monthly bloodwork & hormone analysis review'
    ],
    accessHours: '24/7 Executive Pass'
  }
];

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-1',
    name: 'Eleiko IPF Approved Powerlifting Platforms',
    category: 'Free Weights',
    brand: 'Eleiko Sweden',
    specs: '6 Custom Baltic birch platforms with calibrated competition plates',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop',
    description: 'Precision grip Swedish steel barbells designed for zero deflection error and maximum knurl bite.'
  },
  {
    id: 'eq-2',
    name: 'Hammer Strength Iso-Lateral Suite',
    category: 'Heavy Racks',
    brand: 'Hammer Strength',
    specs: '14 plate-loaded machines matching natural converging/diverging arcs',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    description: 'Targeted muscle isolation with zero compromise on mechanical load safety.'
  },
  {
    id: 'eq-3',
    name: 'Concept2 Performance Ergometer Rowers & SkiErgs',
    category: 'Cardio Deck',
    brand: 'Concept2',
    specs: 'PM5 performance monitors, damper airflow regulation',
    image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?q=80&w=800&auto=format&fit=crop',
    description: 'The gold standard in endurance and anaerobic power metrics worldwide.'
  },
  {
    id: 'eq-4',
    name: 'Rogue Monster 4-Way Rig & Turf Track',
    category: 'Functional Rig',
    brand: 'Rogue Fitness',
    specs: '3x3" 11-gauge steel, 30-meter high-density turf sprint track',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=800&auto=format&fit=crop',
    description: 'Rope climbs, gymnastics rings, pull-up stations, and magnetic sled runs.'
  },
  {
    id: 'eq-5',
    name: 'Custom Urethane Dumbbell Vault (5 to 150 lbs)',
    category: 'Free Weights',
    brand: 'Watson Pro',
    specs: 'Single-piece welded steel with precision knurled handles',
    image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?q=80&w=800&auto=format&fit=crop',
    description: 'Heavy dumbbell racks tiered in 2.5 lb and 5 lb increments up to 150 lbs.'
  },
  {
    id: 'eq-6',
    name: 'Finnish Cedar Sauna & 42°F Cold Plunge Pods',
    category: 'Recovery',
    brand: 'Nordic Cryo Labs',
    specs: 'Infrared & dry rock 195°F sauna paired with ozone-filtered chilled tubs',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
    description: 'Contrast therapy engineered to accelerate blood flow and drop muscle soreness.'
  }
];

export const INITIAL_TRANSFORMATIONS: Transformation[] = [
  {
    id: 'trans-1',
    memberName: 'David Miller',
    age: 34,
    duration: '16 Weeks',
    program: 'Titan Hypertrophy Protocol',
    startingWeight: '94 kg (207 lbs)',
    currentWeight: '81 kg (178 lbs)',
    bodyFatChange: '27% -> 12%',
    beforeImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
    story: 'After years of sedentary desk work, I felt exhausted every afternoon. Elena adjusted my lifting volume and dialed in a realistic protein schedule. In 4 months, my deadlift shot to 220kg and I shaved 13kg of fat.',
    trainer: 'Elena Rostova'
  },
  {
    id: 'trans-2',
    memberName: 'Sarah Jenkins',
    age: 29,
    duration: '12 Weeks',
    program: 'Inferno Lean Shred',
    startingWeight: '73 kg (161 lbs)',
    currentWeight: '61 kg (134 lbs)',
    bodyFatChange: '31% -> 18%',
    beforeImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    story: 'I was intimidated by free weights until Marcus walked me through correct form. I stopped starving myself with crash diets and started fueling properly. I feel stronger and more energetic than ever.',
    trainer: 'Marcus Vance'
  },
  {
    id: 'trans-3',
    memberName: 'Alex Rivera',
    age: 41,
    duration: '24 Weeks',
    program: 'Heavy Iron: Barbell Mastery',
    startingWeight: '82 kg (180 lbs)',
    currentWeight: '86 kg (189 lbs)',
    bodyFatChange: 'Gained 7kg Lean Muscle',
    beforeImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop',
    story: 'Rebuilt my knees and lower back through progressive compound lifts. From chronic aches to pulling 500 lbs pain-free. Apex is in a class of its own.',
    trainer: 'Marcus Vance'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Julian Sterling',
    role: 'Tech Executive & Amateur Powerlifter',
    rating: 5,
    duration: 'Member for 2 years',
    quote: 'Apex Iron is not a commercial health spa with broken machines and waiting lines. It is an uncompromising temple of strength. The Eleiko barbells and coaches are top-tier.',
    highlight: 'Added 65 kg to my total powerlifting lifts in 10 months.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'test-2',
    name: 'Chloe Zhang',
    role: 'Marathoner & Triathlete',
    rating: 5,
    duration: 'Member for 14 months',
    quote: 'The metabolic conditioning conditioning zones and recovery plunges completely transformed my race recovery. Jaxson’s pacing drills took 18 minutes off my marathon PR.',
    highlight: 'PR broken by 18 minutes thanks to lactate conditioning.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'test-3',
    name: 'Robert Thorne',
    role: 'Orthopedic Surgeon & Masters Athlete',
    rating: 5,
    duration: 'Member for 3 years',
    quote: 'As a surgeon, joint biomechanics and spinal loading hygiene matter to me. The equipment selection here is flawless, biomechanically superior, and maintained meticulously.',
    highlight: 'Best biomechanical machine line in the state.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  // Monday
  { id: 'sch-1', day: 'Monday', time: '06:00 AM - 07:00 AM', className: 'Dawn Barbell Power Hour', category: 'Strength', trainer: 'Marcus Vance', room: 'Main Platform Zone', capacity: 12, enrolled: 11, intensity: 'Advanced' },
  { id: 'sch-2', day: 'Monday', time: '07:30 AM - 08:30 AM', className: 'VO2 Max Conditioning', category: 'Conditioning', trainer: 'Jaxson Cruz', room: 'Sprint & Turf Lane', capacity: 16, enrolled: 14, intensity: 'Intermediate' },
  { id: 'sch-3', day: 'Monday', time: '12:00 PM - 01:00 PM', className: 'Midday Hypertrophy Push', category: 'Hypertrophy', trainer: 'Elena Rostova', room: 'Iron Machine Floor', capacity: 14, enrolled: 10, intensity: 'All Levels' },
  { id: 'sch-4', day: 'Monday', time: '05:30 PM - 06:30 PM', className: 'Inferno HIIT Shred', category: 'HIIT', trainer: 'Jaxson Cruz', room: 'Functional Rig Room', capacity: 20, enrolled: 19, intensity: 'High' as any },
  { id: 'sch-5', day: 'Monday', time: '07:00 PM - 08:00 PM', className: 'Heavy Squat & Deadlift Clinic', category: 'Strength', trainer: 'Marcus Vance', room: 'Olympic Lifting Suite', capacity: 10, enrolled: 10, intensity: 'Advanced' },

  // Tuesday
  { id: 'sch-6', day: 'Tuesday', time: '06:30 AM - 07:30 AM', className: 'Kettlebell Flow & Core', category: 'Conditioning', trainer: 'Maya Lin', room: 'Functional Rig Room', capacity: 15, enrolled: 12, intensity: 'Intermediate' },
  { id: 'sch-7', day: 'Tuesday', time: '09:00 AM - 10:00 AM', className: 'Back & Lat Hypertrophy Focus', category: 'Hypertrophy', trainer: 'Elena Rostova', room: 'Iron Machine Floor', capacity: 12, enrolled: 9, intensity: 'Intermediate' },
  { id: 'sch-8', day: 'Tuesday', time: '05:00 PM - 06:00 PM', className: 'Tactical Sled & Erg Relays', category: 'HIIT', trainer: 'Jaxson Cruz', room: 'Sprint & Turf Lane', capacity: 16, enrolled: 15, intensity: 'Advanced' },
  { id: 'sch-9', day: 'Tuesday', time: '07:00 PM - 08:00 PM', className: 'Deep Decompression & Mobility', category: 'Mobility', trainer: 'Maya Lin', room: 'Recovery Studio', capacity: 18, enrolled: 16, intensity: 'All Levels' },

  // Wednesday
  { id: 'sch-10', day: 'Wednesday', time: '06:00 AM - 07:00 AM', className: 'Olympic Clean & Jerk Workshop', category: 'Strength', trainer: 'Marcus Vance', room: 'Main Platform Zone', capacity: 8, enrolled: 8, intensity: 'Advanced' },
  { id: 'sch-11', day: 'Wednesday', time: '12:00 PM - 01:00 PM', className: 'High Density Lunch Burn', category: 'HIIT', trainer: 'Jaxson Cruz', room: 'Functional Rig Room', capacity: 18, enrolled: 16, intensity: 'Intermediate' },
  { id: 'sch-12', day: 'Wednesday', time: '06:00 PM - 07:00 PM', className: 'Chest & Delts Masterclass', category: 'Hypertrophy', trainer: 'Elena Rostova', room: 'Iron Machine Floor', capacity: 14, enrolled: 13, intensity: 'Intermediate' },
  { id: 'sch-13', day: 'Wednesday', time: '07:30 PM - 08:30 PM', className: 'Post-Lift Spine & Hip Flow', category: 'Mobility', trainer: 'Maya Lin', room: 'Recovery Studio', capacity: 16, enrolled: 11, intensity: 'Beginner' },

  // Thursday
  { id: 'sch-14', day: 'Thursday', time: '06:30 AM - 07:30 AM', className: 'SkiErg & Assault Bike Crucible', category: 'Conditioning', trainer: 'Jaxson Cruz', room: 'Sprint & Turf Lane', capacity: 14, enrolled: 14, intensity: 'Advanced' },
  { id: 'sch-15', day: 'Thursday', time: '05:30 PM - 06:30 PM', className: 'Deadlift Velocity & Lockout', category: 'Strength', trainer: 'Marcus Vance', room: 'Olympic Lifting Suite', capacity: 10, enrolled: 9, intensity: 'Advanced' },
  { id: 'sch-16', day: 'Thursday', time: '07:00 PM - 08:00 PM', className: 'Hamstring & Glute Hypertrophy', category: 'Hypertrophy', trainer: 'Elena Rostova', room: 'Iron Machine Floor', capacity: 12, enrolled: 12, intensity: 'All Levels' },

  // Friday
  { id: 'sch-17', day: 'Friday', time: '06:00 AM - 07:00 AM', className: 'Dawn Functional Circuit', category: 'Conditioning', trainer: 'Jaxson Cruz', room: 'Functional Rig Room', capacity: 20, enrolled: 18, intensity: 'Intermediate' },
  { id: 'sch-18', day: 'Friday', time: '05:00 PM - 06:30 PM', className: 'Friday Heavy Iron Open Jam', category: 'Strength', trainer: 'Marcus Vance', room: 'Main Platform Zone', capacity: 25, enrolled: 22, intensity: 'All Levels' },
  { id: 'sch-19', day: 'Friday', time: '07:00 PM - 08:00 PM', className: 'Weekend Reset & Thermal Soak', category: 'Mobility', trainer: 'Maya Lin', room: 'Recovery Studio', capacity: 20, enrolled: 17, intensity: 'Beginner' },

  // Saturday
  { id: 'sch-20', day: 'Saturday', time: '08:00 AM - 09:30 AM', className: 'Apex Gladiator Team Gauntlet', category: 'HIIT', trainer: 'Jaxson Cruz', room: 'Sprint & Turf Lane', capacity: 24, enrolled: 24, intensity: 'Advanced' },
  { id: 'sch-21', day: 'Saturday', time: '10:00 AM - 11:30 AM', className: 'Barbell Form Lab (All Levels)', category: 'Strength', trainer: 'Marcus Vance', room: 'Main Platform Zone', capacity: 15, enrolled: 13, intensity: 'All Levels' },
  { id: 'sch-22', day: 'Saturday', time: '02:00 PM - 03:00 PM', className: 'Active Recovery Yoga & Foam Roll', category: 'Mobility', trainer: 'Maya Lin', room: 'Recovery Studio', capacity: 20, enrolled: 14, intensity: 'Beginner' },

  // Sunday
  { id: 'sch-23', day: 'Sunday', time: '09:00 AM - 10:30 AM', className: 'Heavy Sunday Squat Sanctuary', category: 'Strength', trainer: 'Marcus Vance', room: 'Main Platform Zone', capacity: 14, enrolled: 12, intensity: 'Intermediate' },
  { id: 'sch-24', day: 'Sunday', time: '11:00 AM - 12:00 PM', className: 'Full Body Deload & Mobility', category: 'Mobility', trainer: 'Maya Lin', room: 'Recovery Studio', capacity: 22, enrolled: 19, intensity: 'All Levels' }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-9481',
    fullName: 'Brandon Hayes',
    email: 'brandon.hayes@example.com',
    phone: '+1 (555) 234-8971',
    planId: 'plan-pro',
    planName: 'Pro Performance',
    billingCycle: 'annual',
    preferredDate: '2026-10-15',
    goal: 'Increase clean & jerk by 20kg and cut body fat to 14%',
    trainerId: 'coach-1',
    trainerName: 'Marcus Vance',
    status: 'Confirmed',
    createdAt: '2026-10-08T14:32:00Z',
    notes: 'Requested orientation at 7 AM on opening day.'
  },
  {
    id: 'BK-9482',
    fullName: 'Samantha Wright',
    email: 'samantha.w@example.com',
    phone: '+1 (555) 782-9901',
    planId: 'plan-elite',
    planName: 'Apex Elite Athlete',
    billingCycle: 'monthly',
    preferredDate: '2026-10-18',
    goal: 'Hypertrophy specialization and physique prep',
    trainerId: 'coach-2',
    trainerName: 'Elena Rostova',
    status: 'Pending',
    createdAt: '2026-10-09T02:15:00Z',
    notes: 'Interested in contest posing clinics.'
  },
  {
    id: 'BK-9483',
    fullName: 'Derrick O’Connor',
    email: 'derrick.oc@example.com',
    phone: '+1 (555) 441-2831',
    planId: 'plan-basic',
    planName: 'Iron Foundation',
    billingCycle: 'annual',
    preferredDate: '2026-10-12',
    goal: 'General conditioning and heavy barbell access',
    status: 'Active',
    createdAt: '2026-10-06T11:20:00Z',
    notes: 'Night owl, will use late night access.'
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'ENQ-104',
    name: 'Michael Chen',
    email: 'mchen.corp@example.com',
    phone: '+1 (555) 912-3044',
    subject: 'Corporate Team Membership Package',
    message: 'Hello, looking to enroll our tech engineering group of 25 staff into Pro Performance plans. Do you offer corporate invoices and dedicated group training hours?',
    status: 'New',
    createdAt: '2026-10-09T05:45:00Z'
  },
  {
    id: 'ENQ-103',
    name: 'Jessica Vance',
    email: 'jess.vance@example.com',
    phone: '+1 (555) 843-1192',
    subject: 'Olympic Weightlifting Equipment Inquiry',
    message: 'Do you permit chalk usage on all platforms and are drop-pads mandatory for snatches above 100kg?',
    status: 'Replied',
    createdAt: '2026-10-08T18:22:00Z'
  }
];

// LocalStorage Persistence Helpers
const STORAGE_KEYS = {
  BOOKINGS: 'apex_gym_bookings',
  ENQUIRIES: 'apex_gym_enquiries',
  TRAINERS: 'apex_gym_trainers',
  PLANS: 'apex_gym_plans',
  SCHEDULE: 'apex_gym_schedule',
};

export const loadStoredData = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (err) {
    console.warn(`Error loading localStorage key "${key}":`, err);
    return defaultValue;
  }
};

export const saveStoredData = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Error writing to localStorage key "${key}":`, err);
  }
};

export { STORAGE_KEYS };
