/*
  # Create packages table

  1. New Tables
    - `packages`
      - `id` (text, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (integer)
      - `duration` (text)
      - `features` (text[])
      - `popular` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on `packages` table
    - Add policies for public access to packages
*/

CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration TEXT NOT NULL,
  features TEXT[] NOT NULL,
  popular BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Packages are viewable by everyone"
  ON packages
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert default packages
INSERT INTO packages (id, name, description, price, duration, features, popular)
VALUES
  ('graduation', 'Graduation Package', 'Perfect for capturing your graduation day memories.', 299, '1 hour', ARRAY['1-hour photo session', 'Up to 3 outfit changes', '25 digital images', 'Online gallery', 'Print release', '5 professional prints (8x10)'], false),
  
  ('family', 'Family Portrait Package', 'Capture beautiful family moments to cherish forever.', 349, '1.5 hours', ARRAY['1.5-hour photo session', 'Up to 2 locations', '30 digital images', 'Online gallery', 'Print release', '1 canvas print (16x20)'], true),
  
  ('corporate', 'Corporate Event Package', 'Professional coverage for your corporate events.', 599, '4 hours', ARRAY['4-hour event coverage', 'Multiple photographers', '100+ digital images', 'Online gallery', 'Commercial usage rights', 'Quick turnaround (48 hours)'], false),
  
  ('headshots', 'Professional Headshots', 'Elevate your professional image with quality headshots.', 199, '30 minutes', ARRAY['30-minute studio session', '2 outfit changes', '10 digital images', 'Professional retouching', 'Online gallery', 'LinkedIn optimization'], false);
