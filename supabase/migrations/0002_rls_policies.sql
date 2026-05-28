alter table public.profiles enable row level security;
alter table public.employee_profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_assignments enable row level security;
alter table public.attendance enable row level security;
alter table public.progress_reports enable row level security;
alter table public.progress_photos enable row level security;
alter table public.rate_config enable row level security;
alter table public.rate_config_history enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_requests enable row level security;
alter table public.enquiries enable row level security;
alter table public.blog_posts enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.team_members enable row level security;
alter table public.testimonials enable row level security;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() = 'admin'
$$;

create policy "Users can read own profile"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

create policy "Users can update own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "Public can create enquiries"
on public.enquiries for insert
with check (true);

create policy "Admins can manage enquiries"
on public.enquiries for all
using (public.is_admin())
with check (public.is_admin());

create policy "Public can read published blog posts"
on public.blog_posts for select
using (status = 'published' or public.is_admin());

create policy "Public can read published portfolio projects"
on public.portfolio_projects for select
using (status = 'published' or public.is_admin());

create policy "Public can read visible testimonials"
on public.testimonials for select
using (is_visible = true or public.is_admin());

create policy "Public can read team members"
on public.team_members for select
using (true);

create policy "Admins can manage public content"
on public.blog_posts for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage portfolio"
on public.portfolio_projects for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage team"
on public.team_members for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage testimonials"
on public.testimonials for all
using (public.is_admin())
with check (public.is_admin());

create policy "Customers can manage own quotes"
on public.quotes for all
using (customer_id = auth.uid() or public.is_admin())
with check (customer_id = auth.uid() or public.is_admin());

create policy "Customers can read own quote requests"
on public.quote_requests for select
using (
  public.is_admin()
  or exists (
    select 1 from public.quotes
    where quotes.id = quote_requests.quote_id
    and quotes.customer_id = auth.uid()
  )
);

create policy "Admins can manage quote requests"
on public.quote_requests for all
using (public.is_admin())
with check (public.is_admin());

create policy "Employees can read assigned projects"
on public.projects for select
using (
  public.is_admin()
  or exists (
    select 1 from public.project_assignments
    where project_assignments.project_id = projects.id
    and project_assignments.employee_id = auth.uid()
  )
);

create policy "Admins can manage projects"
on public.projects for all
using (public.is_admin())
with check (public.is_admin());

create policy "Employees can read own assignments"
on public.project_assignments for select
using (employee_id = auth.uid() or public.is_admin());

create policy "Admins can manage assignments"
on public.project_assignments for all
using (public.is_admin())
with check (public.is_admin());

create policy "Employees can manage own attendance"
on public.attendance for all
using (employee_id = auth.uid() or public.is_admin())
with check (employee_id = auth.uid() or public.is_admin());

create policy "Employees can create own progress reports"
on public.progress_reports for insert
with check (employee_id = auth.uid() or public.is_admin());

create policy "Employees can read own progress reports"
on public.progress_reports for select
using (employee_id = auth.uid() or public.is_admin());

create policy "Admins can manage progress reports"
on public.progress_reports for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage rates"
on public.rate_config for all
using (public.is_admin())
with check (public.is_admin());

create policy "Authenticated users can read rates"
on public.rate_config for select
using (auth.role() = 'authenticated');

create policy "Admins can read rate history"
on public.rate_config_history for select
using (public.is_admin());
