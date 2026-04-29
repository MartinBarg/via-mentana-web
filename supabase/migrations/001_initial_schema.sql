-- Studio Via Mentana — initial schema

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  country text,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz default now()
);

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- RLS: reviews are public to read, only authenticated can insert
alter table reviews enable row level security;
create policy "Reviews are viewable by everyone" on reviews for select using (true);
create policy "Authenticated users can insert reviews" on reviews for insert with check (auth.role() = 'authenticated');

-- RLS: contact_requests only accessible to authenticated (admin)
alter table contact_requests enable row level security;
create policy "Only authenticated can read contacts" on contact_requests for select using (auth.role() = 'authenticated');
create policy "Anyone can submit a contact request" on contact_requests for insert with check (true);
