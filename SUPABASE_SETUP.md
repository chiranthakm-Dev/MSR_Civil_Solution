# Supabase Setup

## 1. Create Project

Create a Supabase project for MSR Civil Solutions, then copy:

- Project URL
- Public anon key

Add them to `.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Never put the service role key in this frontend app.

## 2. Apply Migrations

Run the SQL files in order from `supabase/migrations`:

1. `0001_core_schema.sql`
2. `0002_rls_policies.sql`

You can run them through the Supabase SQL editor or the Supabase CLI.

## 3. Storage Buckets

Create these buckets:

- `project-files` private
- `progress-photos` private
- `enquiry-attachments` private
- `portfolio-images` public or private depending on CMS needs
- `certifications` public or private depending on content policy

Private buckets should be accessed only through signed URLs.

## 4. Auth Roles

Profiles use these roles:

- `customer`
- `employee`
- `admin`

After a user signs up, create or update their row in `profiles` with the correct role.

## 5. First Admin

Create the first admin user through Supabase Auth, then update their profile:

```sql
update public.profiles
set role = 'admin'
where email = 'admin@example.com';
```

## 6. Current App Behavior

The frontend is already prepared for Supabase env variables, but the visible workflows still use local browser storage until each feature is connected.

