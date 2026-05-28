create extension if not exists "pgcrypto";

create type public.user_role as enum ('customer', 'employee', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  phone text,
  role public.user_role not null default 'customer',
  city text,
  created_at timestamptz not null default now()
);

create table public.employee_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  employee_code text not null unique,
  role_title text not null,
  join_date date,
  is_active boolean not null default true
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client_id uuid references public.profiles(id),
  type text not null,
  location text not null,
  status text not null default 'Enquiry',
  start_date date,
  target_date date,
  scope_notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.project_assignments (
  project_id uuid not null references public.projects(id) on delete cascade,
  employee_id uuid not null references public.profiles(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references public.profiles(id),
  primary key (project_id, employee_id)
);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  marked_at timestamptz not null default now(),
  marked_by uuid not null references public.profiles(id),
  type text not null default 'present',
  unique (employee_id, date)
);

create table public.progress_reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  employee_id uuid not null references public.profiles(id) on delete cascade,
  stage text not null,
  notes text,
  progress_pct integer not null check (progress_pct between 0 and 100),
  submitted_at timestamptz not null default now()
);

create table public.progress_photos (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.progress_reports(id) on delete cascade,
  photo_url text not null,
  caption text
);

create table public.rate_config (
  id uuid primary key default gen_random_uuid(),
  parameter_key text not null unique,
  parameter_value jsonb not null,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create table public.rate_config_history (
  id uuid primary key default gen_random_uuid(),
  parameter_key text not null,
  old_value jsonb,
  new_value jsonb not null,
  changed_by uuid references public.profiles(id),
  changed_at timestamptz not null default now()
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  inputs_json jsonb not null,
  output_json jsonb not null,
  created_at timestamptz not null default now()
);

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  status text not null default 'Pending',
  admin_notes text,
  updated_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  project_type text not null,
  message text not null,
  attachment_url text,
  status text not null default 'New',
  created_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content jsonb not null,
  tags text[] not null default '{}',
  status text not null default 'draft',
  author_id uuid references public.profiles(id),
  published_at timestamptz
);

create table public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  category text not null,
  year integer,
  images text[] not null default '{}',
  stats_json jsonb not null default '{}'::jsonb,
  is_featured boolean not null default false,
  status text not null default 'published'
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  display_order integer not null default 0
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company text,
  content text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  is_visible boolean not null default true
);
