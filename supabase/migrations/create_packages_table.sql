/*
  # Create packages table

  1. New Tables
    - `packages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `duration` (text)
      - `category` (text)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `packages` table
    - Add policy for public read access
    - Add policy for admin users to manage packages
*/

CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  duration text,
  category text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Anyone can view active packages
CREATE POLICY "Packages are viewable by everyone"
  ON packages
  FOR SELECT
  USING (is_active = true);

-- Admin users can manage packages
CREATE POLICY "Admin users can manage packages"
  ON packages
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
