-- Apply after supabase/schema.sql in Supabase SQL editor.
-- Prevent users from granting themselves admin privileges.
drop policy if exists "Users can update their own profile" on public.profiles;
create or replace function public.prevent_profile_role_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'Only trusted service operations can change account roles';
  end if;
  return new;
end;
$$;
drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role before update on public.profiles
for each row execute function public.prevent_profile_role_change();

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text not null default '',
  video_url text,
  content text not null default '',
  position integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.lessons enable row level security;

create policy "Published lessons of published courses are public"
on public.lessons for select using (
  published = true and exists (
    select 1 from public.courses c where c.id = course_id and c.published = true
  )
);

create policy "Admins can manage courses"
on public.courses for all to authenticated
using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins can manage lessons"
on public.lessons for all to authenticated
using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins can view all profiles"
on public.profiles for select to authenticated
using (exists(select 1 from public.profiles p2 where p2.id = auth.uid() and p2.role = 'admin'));

create policy "Admins can view all enrollments"
on public.enrollments for select to authenticated
using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins can view all orders"
on public.orders for select to authenticated
using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Starter catalog: intentionally unpublished until an admin reviews course material.
insert into public.courses (slug,title,description,category,level,price_irr,published) values
('ai-foundations','مبانی هوش مصنوعی','آشنایی با مفاهیم پایه هوش مصنوعی، کاربردها، محدودیت‌ها و استفاده مسئولانه از ابزارهای هوشمند.','هوش مصنوعی','beginner',0,false),
('prompt-engineering','مهندسی پرامپت','روش طراحی درخواست‌های روشن، ارزیابی پاسخ‌ها و ساخت گردش‌کارهای مفید با مدل‌های زبانی.','هوش مصنوعی','beginner',0,false),
('ai-projects','ساخت پروژه با هوش مصنوعی','از تعریف مسئله تا نمونه اولیه؛ یک مسیر پروژه‌محور برای آشنایی عملی با ابزارهای هوش مصنوعی.','هوش مصنوعی','intermediate',0,false),
('python-zero','پایتون از صفر','مبانی پایتون، متغیرها، شرط‌ها، حلقه‌ها و توابع با تمرین‌های کوچک و مرحله‌ای.','برنامه‌نویسی','beginner',0,false),
('web-basics','مبانی طراحی وب','شروع HTML و CSS و JavaScript و ساخت نخستین صفحه وب واکنش‌گرا.','برنامه‌نویسی','beginner',0,false)
on conflict (slug) do nothing;

-- Assign the first admin manually using the Supabase SQL editor after reviewing
-- the intended account: update public.profiles set role='admin' where id='AUTH_USER_UUID';
