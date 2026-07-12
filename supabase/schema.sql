-- GrowthPilot database schema
-- Run this in the Supabase SQL editor (or via `supabase db push`)

create extension if not exists "uuid-ossp";

-- ============ USERS / WORKSPACE ============
-- Supabase auth.users already exists; we extend with a profile table.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  openai_api_key text, -- encrypted at rest via Supabase Vault in production
  notifications_enabled boolean default true,
  created_at timestamptz default now()
);

-- ============ GROWTH CONTEXT ============
create table if not exists public.growth_context (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  product_name text not null,
  one_liner text,
  website text,
  target_customer text,
  industry text,
  keywords text[],
  competitors text[],
  goals text[], -- e.g. ['find_customers','find_investors','find_collaborators','find_beta_users','partnerships']
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============ PROSPECTS ============
create table if not exists public.prospects (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  headline text,
  company text,
  platform text, -- e.g. 'X', 'LinkedIn', 'Product Hunt'
  profile_url text,
  avatar_url text,
  location text,
  role text,
  company_size text,
  stage text, -- company stage: pre-seed, seed, series A, etc
  fit_score int check (fit_score between 0 and 100),
  pain_points text[],
  mutual_interests text[],
  recent_activity text,
  why_relevant text,
  suggested_approach text,
  pipeline_stage text default 'new', -- new, commented, connected, messaged, replied, meeting, customer, investor, lost
  tags text[],
  notes text,
  last_contact_date timestamptz,
  next_follow_up date,
  created_at timestamptz default now()
);

-- ============ OPPORTUNITIES ============
-- A daily/curated feed item pointing at a prospect + recommended action
create table if not exists public.opportunities (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  prospect_id uuid references public.prospects(id) on delete cascade,
  recommended_action text, -- comment_first, send_dm, follow_up_tomorrow, connect_first, ignore
  reason text,
  surfaced_on date default current_date,
  dismissed boolean default false,
  created_at timestamptz default now()
);

-- ============ COMMENT DRAFTS ============
create table if not exists public.comment_drafts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  prospect_id uuid references public.prospects(id) on delete cascade,
  source_post text, -- what the comment is replying to
  content text not null,
  tone text default 'friendly', -- friendly, professional, technical, shorter
  status text default 'draft', -- draft, copied, posted
  created_at timestamptz default now()
);

-- ============ OUTREACH DRAFTS (DM + Email) ============
create table if not exists public.outreach_drafts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  prospect_id uuid references public.prospects(id) on delete cascade,
  channel text not null, -- 'dm' | 'email'
  subject text, -- email only
  content text not null,
  tone text default 'professional',
  status text default 'draft', -- draft, sent, replied
  created_at timestamptz default now()
);

-- ============ FOLLOW UPS ============
create table if not exists public.follow_ups (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  prospect_id uuid references public.prospects(id) on delete cascade,
  suggested_message text,
  priority text default 'medium', -- low, medium, high
  due_date date,
  completed boolean default false,
  created_at timestamptz default now()
);

-- ============ ANALYTICS (daily rollups) ============
create table if not exists public.analytics_daily (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  day date default current_date,
  prospects_discovered int default 0,
  outreach_drafts_created int default 0,
  replies_tracked int default 0,
  meetings_booked int default 0,
  customers_closed int default 0,
  unique (user_id, day)
);

-- ============ ROW LEVEL SECURITY ============
alter table public.profiles enable row level security;
alter table public.growth_context enable row level security;
alter table public.prospects enable row level security;
alter table public.opportunities enable row level security;
alter table public.comment_drafts enable row level security;
alter table public.outreach_drafts enable row level security;
alter table public.follow_ups enable row level security;
alter table public.analytics_daily enable row level security;

-- Each user can only read/write their own rows.
create policy "own profile" on public.profiles for all using (auth.uid() = id);
create policy "own growth_context" on public.growth_context for all using (auth.uid() = user_id);
create policy "own prospects" on public.prospects for all using (auth.uid() = user_id);
create policy "own opportunities" on public.opportunities for all using (auth.uid() = user_id);
create policy "own comment_drafts" on public.comment_drafts for all using (auth.uid() = user_id);
create policy "own outreach_drafts" on public.outreach_drafts for all using (auth.uid() = user_id);
create policy "own follow_ups" on public.follow_ups for all using (auth.uid() = user_id);
create policy "own analytics_daily" on public.analytics_daily for all using (auth.uid() = user_id);

-- Indexes for common queries
create index if not exists idx_prospects_user on public.prospects(user_id);
create index if not exists idx_prospects_pipeline on public.prospects(user_id, pipeline_stage);
create index if not exists idx_opportunities_user_day on public.opportunities(user_id, surfaced_on);
create index if not exists idx_follow_ups_due on public.follow_ups(user_id, due_date, completed);
