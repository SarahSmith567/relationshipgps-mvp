// Core Types for RelationshipGPS MVP

export interface User {
  id: string;
  fullName: string;
  preferredName: string;
  email?: string;
  phone?: string;
  birthday?: string;
  genderIdentity?: string;
  pronouns?: string;
  photoUrl?: string;
  createdAt: string;
}

export interface Relationship {
  id: string;
  userAId: string;
  userBId: string;
  relationshipType: RelationshipType;
  strength: number; // 1-10
  notes?: string;
  createdAt: string;
}

export type RelationshipType = 
  | 'spouse' | 'partner'
  | 'parent' | 'child'
  | 'grandparent' | 'grandchild'
  | 'sibling' | 'step_sibling'
  | 'step_parent' | 'step_child'
  | 'in_law' | 'extended'
  | 'friend' | 'colleague';

export interface Profile {
  id: string;
  userId: string;
  attachmentStyle?: AttachmentStyle;
  loveLanguages: LoveLanguage[];
  preferences: UserPreferences;
  amazonIntelligence?: AmazonIntelligence;
  communicationStyle?: string;
  boundaries: string[];
  updatedAt: string;
}

export type AttachmentStyle = 'secure' | 'anxious' | 'avoidant' | 'disorganized';

export type LoveLanguage = 
  | 'words_of_affirmation'
  | 'acts_of_service'
  | 'receiving_gifts'
  | 'quality_time'
  | 'physical_touch';

export interface UserPreferences {
  favoriteActivities: string[];
  favoriteFood: string[];
  favoriteColors: string[];
  hobbies: string[];
  interests: string[];
  dislikes: string[];
}

export interface AmazonIntelligence {
  brandPreferences: BrandPreference[];
  colorPalette: string[];
  spendingPatterns: SpendingPattern;
  confidenceScore: number;
  source: 'amazon' | 'manual' | 'inferred';
  updatedAt: string;
}

export interface BrandPreference {
  brand: string;
  category: string;
  confidence: number;
  frequency: number;
}

export interface SpendingPattern {
  averageItemSpend: number;
  splurgeThreshold: number;
  priceRange: {
    min: number;
    max: number;
  };
  frequentCategories: string[];
}

export interface AIInteraction {
  id: string;
  userId?: string;
  agentName: AgentName;
  requestType: string;
  inputData: any;
  outputData: any;
  createdAt: string;
}

export type AgentName = 'Sam' | 'Gaia' | 'Atlas' | 'DatePlanner' | 'MemoryJog';

export interface GiftSuggestion {
  id: string;
  title: string;
  description: string;
  price: number;
  url?: string;
  imageUrl?: string;
  reasoning: string;
  confidence: number;
  category: string;
  tags: string[];
}

export interface FamilyTree {
  members: User[];
  relationships: Relationship[];
  profiles: Profile[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  agentName?: AgentName;
}

export interface TenantConfig {
  id: string;
  tenantId: string;
  branding: BrandingConfig;
  features: FeatureFlags;
  limits: UsageLimits;
  aiSettings: AISettings;
}

export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl?: string;
  faviconUrl?: string;
  companyName: string;
}

export interface FeatureFlags {
  giftIntelligence: boolean;
  amazonAnalysis: boolean;
  datePlanning: boolean;
  memoryJogs: boolean;
  familyTree: boolean;
  aiChat: boolean;
  whiteLabel: boolean;
}

export interface UsageLimits {
  maxFamilyMembers: number;
  maxAIInteractions: number;
  maxGiftSuggestions: number;
}

export interface AISettings {
  samPersonality: string;
  gaiaPersonality: string;
  atlasPersonality: string;
  customPrompts: Record<string, string>;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form Types
export interface AddFamilyMemberForm {
  fullName: string;
  preferredName: string;
  email?: string;
  phone?: string;
  birthday?: string;
  genderIdentity?: string;
  pronouns?: string;
  relationshipType: RelationshipType;
  relationshipStrength: number;
}

export interface UpdateProfileForm {
  attachmentStyle?: AttachmentStyle;
  loveLanguages: LoveLanguage[];
  favoriteActivities: string[];
  favoriteFood: string[];
  favoriteColors: string[];
  hobbies: string[];
  interests: string[];
  boundaries: string[];
  communicationStyle?: string;
}

export interface GiftRequestForm {
  recipientId: string;
  budget?: number;
  occasion?: string;
  preferences?: string[];
  avoidItems?: string[];
}

// Component Props Types
export interface FamilyTreeProps {
  familyData: FamilyTree;
  onMemberSelect: (member: User) => void;
  onAddMember: () => void;
}

export interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  selectedAgent?: AgentName;
}

export interface MemberCardProps {
  member: User;
  profile?: Profile;
  relationship?: Relationship;
  onClick: () => void;
}

export interface GiftSuggestionsProps {
  suggestions: GiftSuggestion[];
  recipient: User;
  onSelectGift: (gift: GiftSuggestion) => void;
  onRequestMore: () => void;
}
