export interface WeddingEvent {
  id: string;
  dayNumber: number;
  name: string;
  time: string;
  venueStyle: string;
  dressCode: string;
  ritualHighlights: string[];
  keyDishes: string[];
  specialElement: string;
}

export interface BudgetItem {
  id?: string;
  category: string;
  percentage: number;
  amountLakhs: number;
  guidance: string;
  spentLakhs?: number;
}

export interface VendorItem {
  id: string;
  category: string;
  timelineMilestone: string;
  criticalQuestionToAsk: string;
  negotiationTip: string;
  status: 'Pending' | 'Contacted' | 'Booked' | 'Advance Paid';
  vendorName?: string;
  quoteLakhs?: number;
}

export interface PersonalizedIdea {
  title: string;
  category: string;
  description: string;
  costLevel?: 'Budget-Friendly' | 'Moderate' | 'Luxury Extravagant';
  proTip?: string;
}

export interface EvaluationBreakdown {
  codeQuality: number;
  security: number;
  efficiency: number;
  testing: number;
  accessibility: number;
  problemStatementAlignment: number;
}

export interface AiEvaluation {
  score: number;
  breakdown: EvaluationBreakdown;
  verdictSummary?: string;
  topRecommendations?: string[];
  strengths?: string[];
  gapsToFix?: string[];
}

export interface WeddingPlan {
  themeTitle: string;
  tagline: string;
  auspiciousMuhuratAdvice: string;
  events: WeddingEvent[];
  budgetAllocations: BudgetItem[];
  vendorChecklist: VendorItem[];
  personalizedIdeas: PersonalizedIdea[];
  aiEvaluation?: AiEvaluation;
}

export interface PlanInputParams {
  brideName: string;
  groomName: string;
  budgetLakhs: number;
  guestCount: number;
  city: string;
  tradition: string;
  vibe: string;
  weddingDate: string;
  days: number;
}
