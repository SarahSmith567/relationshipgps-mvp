// Real data integration - using embedded Raymond family data
import { FamilyMember, GiftSuggestion, DatePlan, ChatMessage } from './mockData';
import { raymondFamilyMembers } from './raymondFamilyData';

// Load family members (using embedded data for now, will connect to Supabase with auth later)
export const loadFamilyMembers = async (): Promise<FamilyMember[]> => {
  // Simulate async loading
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(raymondFamilyMembers);
    }, 100);
  });
};

// Sample gift suggestions (will be replaced with AI-generated ones)
export const sampleGiftSuggestions: GiftSuggestion[] = [
  {
    id: '1',
    name: 'Personalized Garden Stone Set',
    price: '$45',
    retailer: 'Etsy',
    whyFit: "Perfect for Laurie's love of gardening - she can personalize with family names",
    link: '#',
    category: 'Home & Garden'
  },
  {
    id: '2',
    name: 'Cozy Reading Blanket + Book Light',
    price: '$52',
    retailer: 'Amazon',
    whyFit: 'Laurie loves reading - this makes her reading time even more comfortable',
    link: '#',
    category: 'Books & Comfort'
  },
  {
    id: '3',
    name: 'Gourmet Cooking Class for Two',
    price: '$95',
    retailer: 'Local Culinary School',
    whyFit: 'Quality time together learning new recipes - combines her love of cooking with togetherness',
    link: '#',
    category: 'Experiences'
  },
  {
    id: '4',
    name: 'Herb Garden Starter Kit',
    price: '$38',
    retailer: 'Williams Sonoma',
    whyFit: 'Combines gardening and cooking - two of her favorite hobbies',
    link: '#',
    category: 'Garden & Kitchen'
  },
  {
    id: '5',
    name: 'Spa Day Gift Certificate',
    price: '$85',
    retailer: 'Local Day Spa',
    whyFit: 'Physical touch love language - professional massage and pampering',
    link: '#',
    category: 'Self-Care'
  }
];

// Sample date plan (will be replaced with AI-generated ones)
export const sampleDatePlan: DatePlan = {
  activity: {
    name: 'Sunset Garden Stroll',
    time: '6:00 PM',
    location: 'Botanical Gardens',
    whyFit: "Laurie loves gardening and you both enjoy quality time together",
    price: '$15/couple',
    link: '#'
  },
  dining: {
    name: 'Trattoria Bella',
    cuisine: 'Italian',
    priceLevel: '$$$',
    address: '456 Main Street',
    whyFit: 'Intimate atmosphere, fresh ingredients - perfect for a romantic evening',
    estimatedCost: '$75',
    link: '#'
  },
  gesture: {
    suggestion: 'Bring a small potted herb plant',
    whyFit: 'Combines her love of gardening with a thoughtful surprise',
    estimatedCost: '$12'
  }
};

// Sample chat messages
export const sampleChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'ai',
    text: 'Hi John! I\'m here to help strengthen your family relationships. What would you like to talk about today?',
    timestamp: new Date()
  }
];

// Daily nudge
export const dailyNudge = {
  text: 'Send Laurie a text telling her one thing you appreciate about her today',
  loveLanguage: 'Words of Affirmation',
  recipient: 'Laurie',
  date: new Date()
};

// Calculate upcoming events from birthdays
export const calculateUpcomingEvents = (familyMembers: FamilyMember[]) => {
  const today = new Date();
  const events = [];
  
  for (const member of familyMembers) {
    if (member.birthday && member.birthday !== 'Unknown') {
      const birthday = new Date(member.birthday);
      const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
      
      // If birthday already passed this year, use next year
      if (thisYearBirthday < today) {
        thisYearBirthday.setFullYear(today.getFullYear() + 1);
      }
      
      const daysUntil = Math.ceil((thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntil <= 90) { // Show events within 90 days
        events.push({
          id: member.id,
          type: 'birthday',
          name: member.name,
          date: thisYearBirthday.toISOString().split('T')[0],
          daysUntil: daysUntil
        });
      }
    }
  }
  
  // Sort by days until
  events.sort((a, b) => a.daysUntil - b.daysUntil);
  
  return events.slice(0, 5); // Return top 5 upcoming events
};
