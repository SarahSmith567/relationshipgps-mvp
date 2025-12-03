// Mock data for RelationshipGPS MVP
// Raymond Family (11 members)

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  birthday: string;
  age: number;
  avatar: string;
  loveLanguages: string[];
  attachmentStyle?: string;
  hobbies: string[];
  preferences?: {
    sizes?: { shoe?: string; clothing?: string; ring?: string };
    colors?: string[];
    brands?: string[];
  };
  triggers?: string[];
  sharedRituals?: string[];
  budgetLevel?: string;
}

export interface GiftSuggestion {
  id: string;
  name: string;
  price: string;
  retailer: string;
  whyFit: string;
  link: string;
  category: string;
}

export interface DatePlan {
  activity: {
    name: string;
    time: string;
    location: string;
    whyFit: string;
    price: string;
    link: string;
  };
  dining: {
    name: string;
    cuisine: string;
    priceLevel: string;
    address: string;
    whyFit: string;
    estimatedCost: string;
    link: string;
  };
  gesture: {
    suggestion: string;
    whyFit: string;
    estimatedCost: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  concepts?: Array<{
    title: string;
    brief: string;
  }>;
}

// Raymond Family Members
export const familyMembers: FamilyMember[] = [
  {
    id: 'laurie',
    name: 'Laurie',
    relationship: 'Wife',
    birthday: '1970-10-14',
    age: 54,
    avatar: 'L',
    loveLanguages: ['Words of Affirmation', 'Quality Time'],
    attachmentStyle: 'Anxious',
    hobbies: ['Reading', 'Boating', 'Hiking'],
    preferences: {
      sizes: { shoe: '7.5', clothing: 'M', ring: '6' },
      colors: ['Teal', 'Navy', 'Gray'],
      brands: ['Patagonia', 'Athleta', 'Barnes & Noble']
    },
    triggers: ['Loud noises', 'Sudden changes', 'Crowds'],
    sharedRituals: ['Sunday morning coffee', 'Evening walks', 'Monthly date night'],
    budgetLevel: '50_100'
  },
  {
    id: 'sarah',
    name: 'Sarah',
    relationship: 'Daughter',
    birthday: '1990-12-31',
    age: 34,
    avatar: 'S',
    loveLanguages: ['Acts of Service', 'Quality Time'],
    hobbies: ['Parenting', 'Organizing', 'Cooking'],
    preferences: {
      colors: ['Pastels', 'White', 'Beige']
    },
    budgetLevel: '25_50'
  },
  {
    id: 'ryan',
    name: 'Ryan',
    relationship: 'Son-in-law',
    birthday: '1988-06-15',
    age: 36,
    avatar: 'R',
    loveLanguages: ['Physical Touch', 'Quality Time'],
    hobbies: ['Sports', 'Coaching', 'Woodworking'],
    budgetLevel: '25_50'
  },
  {
    id: 'abigail',
    name: 'Abigail',
    relationship: 'Granddaughter',
    birthday: '2003-03-20',
    age: 21,
    avatar: 'A',
    loveLanguages: ['Gifts', 'Quality Time'],
    hobbies: ['Fashion', 'Social media', 'Dating'],
    preferences: {
      colors: ['Pink', 'Gold', 'White']
    },
    budgetLevel: 'under_25'
  },
  {
    id: 'peyton',
    name: 'Peyton',
    relationship: 'Grandchild',
    birthday: '2006-08-10',
    age: 18,
    avatar: 'P',
    loveLanguages: ['Words of Affirmation', 'Quality Time'],
    hobbies: ['College prep', 'Reading', 'Music'],
    budgetLevel: 'under_25'
  },
  {
    id: 'brady',
    name: 'Brady',
    relationship: 'Grandson',
    birthday: '2009-11-05',
    age: 15,
    avatar: 'B',
    loveLanguages: ['Physical Touch', 'Quality Time'],
    hobbies: ['Sports', 'Video games', 'Friends'],
    budgetLevel: 'under_25'
  },
  {
    id: 'haden',
    name: 'Haden',
    relationship: 'Grandson (Abigail\'s boyfriend)',
    birthday: '2002-07-12',
    age: 22,
    avatar: 'H',
    loveLanguages: ['Acts of Service', 'Physical Touch'],
    hobbies: ['Cars', 'Gaming', 'Fitness'],
    budgetLevel: 'under_25'
  },
  {
    id: 'emma',
    name: 'Emma',
    relationship: 'Step-granddaughter',
    birthday: '2010-04-18',
    age: 14,
    avatar: 'E',
    loveLanguages: ['Quality Time', 'Gifts'],
    hobbies: ['Dance', 'Art', 'Friends'],
    budgetLevel: 'under_25'
  },
  {
    id: 'noah',
    name: 'Noah',
    relationship: 'Step-grandson',
    birthday: '2012-09-22',
    age: 12,
    avatar: 'N',
    loveLanguages: ['Physical Touch', 'Quality Time'],
    hobbies: ['Soccer', 'Legos', 'Science'],
    budgetLevel: 'under_25'
  },
  {
    id: 'lily',
    name: 'Lily',
    relationship: 'Step-granddaughter',
    birthday: '2015-01-30',
    age: 9,
    avatar: 'L',
    loveLanguages: ['Words of Affirmation', 'Gifts'],
    hobbies: ['Drawing', 'Dolls', 'Stories'],
    budgetLevel: 'under_25'
  }
];

// Sample gift suggestions for Laurie
export const sampleGiftSuggestions: GiftSuggestion[] = [
  {
    id: '1',
    name: 'The Midnight Library - Hardcover + Cozy Reading Blanket Set',
    price: '$67',
    retailer: 'Barnes & Noble',
    whyFit: 'Matches her love of contemporary fiction and cozy reading spots',
    link: '#',
    category: 'Books & Home'
  },
  {
    id: '2',
    name: 'Boating Safety Kit with Personalized Compass',
    price: '$85',
    retailer: 'West Marine',
    whyFit: 'Practical for her boating hobby, shows you pay attention to her interests',
    link: '#',
    category: 'Outdoor & Sports'
  },
  {
    id: '3',
    name: 'Spa Day at Serenity Springs',
    price: '$95',
    retailer: 'Local Spa',
    whyFit: 'Quality Time love language + self-care she rarely prioritizes',
    link: '#',
    category: 'Experiences'
  },
  {
    id: '4',
    name: 'Patagonia Fleece Jacket in Teal',
    price: '$79',
    retailer: 'Patagonia',
    whyFit: 'Her favorite brand and color, perfect for hiking and boating',
    link: '#',
    category: 'Fashion'
  },
  {
    id: '5',
    name: 'Lavender Essential Oil Diffuser Set',
    price: '$45',
    retailer: 'Amazon',
    whyFit: 'Lavender is her favorite scent, helps with sensory regulation',
    link: '#',
    category: 'Self-Care'
  }
];

// Sample date plan
export const sampleDatePlan: DatePlan = {
  activity: {
    name: 'Jazz Night at The Blue Note',
    time: '7:30 PM',
    location: 'Downtown Denver',
    whyFit: 'Laurie loves live music in intimate venues - perfect for her sensory preferences',
    price: '$40/couple',
    link: '#'
  },
  dining: {
    name: 'Osteria Marco',
    cuisine: 'Italian',
    priceLevel: '$$$',
    address: '1453 Larimer St, Denver, CO',
    whyFit: 'Her favorite cuisine, cozy atmosphere, walking distance from venue',
    estimatedCost: '$80',
    link: '#'
  },
  gesture: {
    suggestion: 'Stop by bookstore after and let her pick one book',
    whyFit: 'Words + Gifts love language, extends quality time together',
    estimatedCost: '$20'
  }
};

// Sample chat messages
export const sampleChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'ai',
    text: 'Hi John! I\'m here to help with your relationships. What\'s on your mind today?',
    timestamp: new Date('2025-01-10T10:00:00Z')
  }
];

// Daily nudge
export const dailyNudge = {
  text: 'Laurie loves Words of Affirmation - text her one thing you appreciate about how she handled that meeting today',
  loveLanguage: 'Words of Affirmation',
  recipient: 'Laurie',
  date: new Date()
};

// Upcoming events
export const upcomingEvents = [
  {
    id: '1',
    type: 'birthday',
    name: 'Brady',
    date: '2025-01-20',
    daysUntil: 10
  },
  {
    id: '2',
    type: 'anniversary',
    name: 'John & Laurie',
    date: '2025-02-14',
    daysUntil: 35
  },
  {
    id: '3',
    type: 'birthday',
    name: 'Lily',
    date: '2025-01-30',
    daysUntil: 20
  }
];
