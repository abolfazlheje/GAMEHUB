-- NOVA Academy initial database schema.
-- Apply through the Supabase SQL editor after creating your project.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  category text not null,
  level text not null default 'beginner' check (level in ('beginner', 'intermediate', 'advanced')),
  price_irr bigint not null default 0 check (price_irr >= 0),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'active', 'cancelled')),
  created_at timestamptz not null default now(),
  unique(student_id, course_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete restrict,
  course_id uuid not null references public.courses(id) on delete restrict,
  amount_irr bigint not null check (amount_irr >= 0),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  provider_reference text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.orders enable row level security;

create policy "Profiles are viewable by their owner"
  on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Users can create their own profile"
  on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Users can update their own profile"
  on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "Published courses are public"
  on public.courses for select using (published = true);
create policy "Students can view their enrollments"
  on public.enrollments for select to authenticated using (student_id = auth.uid());
create policy "Students can view their own orders"
  on public.orders for select to authenticated using (student_id = auth.uid());

-- Never mark an order paid from the browser. A trusted server-side payment
-- verification endpoint must validate the gateway callback before changing status.
