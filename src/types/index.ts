export type Goal =
  | 'find_customers'
  | 'find_investors'
  | 'find_collaborators'
  | 'find_beta_users'
  | 'partnerships';

export interface GrowthContext {
  id: string;
  product_name: string;
  one_liner: string;
  website?: string;
  target_customer?: string;
  industry?: string;
  keywords: string[];
  competitors: string[];
  goals: Goal[];
}

export type PipelineStage =
  | 'new'
  | 'commented'
  | 'connected'
  | 'messaged'
  | 'replied'
  | 'meeting'
  | 'customer'
  | 'investor'
  | 'lost';

export type RecommendedAction =
  | 'comment_first'
  | 'send_dm'
  | 'follow_up_tomorrow'
  | 'connect_first'
  | 'ignore';

export interface Prospect {
  id: string;
  name: string;
  headline?: string;
  company?: string;
  platform: string;
  profile_url?: string;
  avatar_url?: string;
  location?: string;
  role?: string;
  company_size?: string;
  stage?: string;
  fit_score: number;
  pain_points: string[];
  mutual_interests: string[];
  recent_activity?: string;
  why_relevant?: string;
  suggested_approach?: string;
  pipeline_stage: PipelineStage;
  tags: string[];
  notes?: string;
  last_contact_date?: string;
  next_follow_up?: string;
}

export interface Opportunity {
  id: string;
  prospect: Prospect;
  recommended_action: RecommendedAction;
  reason: string;
  surfaced_on: string;
  dismissed: boolean;
}

export interface CommentDraft {
  id: string;
  prospect_id: string;
  source_post: string;
  content: string;
  tone: 'friendly' | 'professional' | 'technical' | 'shorter';
  status: 'draft' | 'copied' | 'posted';
}

export interface OutreachDraft {
  id: string;
  prospect_id: string;
  channel: 'dm' | 'email';
  subject?: string;
  content: string;
  tone: 'friendly' | 'professional';
  status: 'draft' | 'sent' | 'replied';
}

export interface FollowUp {
  id: string;
  prospect: Prospect;
  suggested_message: string;
  priority: 'low' | 'medium' | 'high';
  due_date: string;
  completed: boolean;
}

export interface DailyAnalytics {
  day: string;
  prospects_discovered: number;
  outreach_drafts_created: number;
  replies_tracked: number;
  meetings_booked: number;
  customers_closed: number;
}
