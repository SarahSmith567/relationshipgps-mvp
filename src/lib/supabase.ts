import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hsphsuparrbbveomeurp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcGhzdXBhcnJiYnZlb21ldXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMTQyMzAsImV4cCI6MjA3MDg5MDIzMH0.fg8nIrj5BpoULgW9aI4HSqXE-8AQg3M6e_ulYOzdJbc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface FamilyMember {
  user_id: string;
  email: string;
  preferred_name: string;
  full_name: string;
  phone: string | null;
  date_of_birth: string | null;
  timezone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Relationship {
  relationship_id: string;
  user_a_id: string;
  user_b_id: string;
  relationship_type: string;
  relationship_status: string;
  start_date: string | null;
  relationship_data: any;
  health_score: number;
  last_interaction_date: string | null;
  interaction_frequency: string;
  created_at: string;
  updated_at: string;
}

// Helper functions
export const getFamilyMembers = async (): Promise<FamilyMember[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('is_active', true)
    .order('full_name');
  
  if (error) {
    console.error('Error fetching family members:', error);
    return [];
  }
  
  return data || [];
};

export const getRelationships = async (): Promise<Relationship[]> => {
  const { data, error } = await supabase
    .from('relationships')
    .select('*')
    .eq('relationship_status', 'active');
  
  if (error) {
    console.error('Error fetching relationships:', error);
    return [];
  }
  
  return data || [];
};

export const getFamilyMemberById = async (userId: string): Promise<FamilyMember | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching family member:', error);
    return null;
  }
  
  return data;
};

// Calculate age from date of birth
export const calculateAge = (dateOfBirth: string | null): number | null => {
  if (!dateOfBirth) return null;
  
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Get relationship label from John's perspective
export const getRelationshipLabel = (member: FamilyMember): string => {
  const name = member.preferred_name || member.full_name;
  
  // Hardcoded for now - can be enhanced with relationship table queries
  switch (name) {
    case 'John':
      return 'You';
    case 'Laurie':
      return 'Wife';
    case 'Sarah':
      return 'Daughter';
    case 'Ryan':
      return 'Son-in-law';
    case 'Abigail':
      return 'Granddaughter';
    case 'Peyton':
      return 'Grandchild';
    case 'Brady':
      return 'Grandson';
    case 'Rylee':
      return 'Step-granddaughter';
    case 'Mya':
      return 'Step-granddaughter';
    case 'Finn':
      return 'Step-grandson';
    case 'Haden':
      return 'Grandson-in-law (Abigail\'s fiancé)';
    default:
      return 'Family Member';
  }
};
