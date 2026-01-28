-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PACKAGES TABLE
create table packages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  price numeric not null,
  images text[] default '{}',
  is_featured boolean default false
);

-- 2. ITEMS TABLE (Inventory)
create table items (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  category text not null,
  price_per_day numeric not null,
  quantity integer default 0,
  images text[] default '{}',
  is_featured boolean default false
);

-- 3. BOOKINGS TABLE
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  customer_name text not null,
  email text,
  phone text,
  event_date timestamp with time zone,
  event_type text,
  total_amount numeric,
  status text default 'Pending', -- Pending, Approved, Cancelled, Completed
  location text,
  notes text,
  order_items jsonb default '[]'
);

-- 4. MESSAGES TABLE
create table messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false
);

-- 5. SETTINGS TABLE (Single Row)
create table settings (
  id integer primary key default 1,
  site_name text default 'Nagor Rental & Decor',
  contact_email text,
  payment_paystack boolean default true,
  payment_momo boolean default true,
  notify_email boolean default true,
  notify_whatsapp boolean default false,
  notify_daily boolean default true,
  constraint single_row check (id = 1)
);

-- Insert Default Settings
insert into settings (id, site_name, contact_email) 
values (1, 'Nagor Rental & Decor', 'info@nagordecor.com')
on conflict (id) do nothing;

-- SEED DATA (Optional, just for starter)
insert into packages (name, description, price, images, is_featured) values
('Luxury Wedding Package', 'Complete hall decoration with flowers, lighting, stage setup, and table settings.', 5000, ARRAY['/images/wedding.png'], true),
('Corporate Event Setup', 'Professional stage, PA system integration, branding backdrop, and VIP seating.', 3500, ARRAY['/images/corporate.png'], true),
('Birthday Party Standard', 'Balloon arch, backdrop, cake table decor, and mood lighting.', 1500, ARRAY['/images/birthday.png'], true);

insert into items (name, category, price_per_day, quantity, images, is_featured) values
('Gold Phoenix Chair', 'Chairs', 25, 200, ARRAY['/images/chair-gold.png'], true),
('Marquee Tent (Canopy)', 'Tents', 500, 5, ARRAY['/images/tent.png'], true),
('Artificial Flower Wall', 'Backdrops', 300, 2, ARRAY['/images/flower-wall.png'], true),
('LED Mood Lights', 'Lighting', 50, 20, ARRAY['/images/lights.png'], false);
