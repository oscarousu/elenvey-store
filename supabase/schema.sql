-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products Table
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  stock integer default 0,
  is_unique boolean default false, -- Para piezas únicas de autor (stock 1)
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for products
alter table public.products enable row level security;

-- Public read access for products
drop policy if exists "Products are viewable by everyone." on products;
create policy "Products are viewable by everyone." 
  on products for select 
  using (true);

-- Orders Table (Actualizada con campos de despacho Colombia)
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  customer_name text,
  user_email text not null,
  user_phone text,
  shipping_address text,
  shipping_city text,
  shipping_department text,
  notes text,
  status text default 'pending', -- pending, paid, shipped, delivered, cancelled
  total_amount numeric(10, 2) not null,
  mercadopago_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Migración segura si la tabla ya existía previamente
alter table public.orders add column if not exists customer_name text;
alter table public.orders add column if not exists shipping_address text;
alter table public.orders add column if not exists shipping_city text;
alter table public.orders add column if not exists shipping_department text;
alter table public.orders add column if not exists notes text;

-- Enable RLS for orders
alter table public.orders enable row level security;

-- Allow anonymous users to insert orders
drop policy if exists "Anyone can insert orders." on orders;
create policy "Anyone can insert orders."
  on orders for insert
  with check (true);

-- Allow public read of own order via ID
drop policy if exists "Public can view orders." on orders;
create policy "Public can view orders."
  on orders for select
  using (true);

-- Allow server update of orders
drop policy if exists "Allow update orders." on orders;
create policy "Allow update orders."
  on orders for update
  using (true);

-- Order Items Table
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id text not null, -- Compatible con UUID o IDs curados
  product_name text,
  quantity integer default 1,
  price_at_time numeric(10, 2) not null
);

-- Enable RLS for order items
alter table public.order_items enable row level security;

drop policy if exists "Anyone can insert order items." on order_items;
create policy "Anyone can insert order items."
  on order_items for insert
  with check (true);

drop policy if exists "Anyone can read order items." on order_items;
create policy "Anyone can read order items."
  on order_items for select
  using (true);
