/*
  # Create appointments table

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `package_id` (uuid, foreign key to packages)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `date` (date)
      - `time` (text)
      - `location` (text)
      - `status` (text)
      - `payment_status` (text)
      - `notes` (text, nullable)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `appointments` table
    - Add policy for authenticated users to read their own appointments
    - Add policy for authenticated users to insert their own appointments
    - Add policy for authenticated users to update their own appointments
    - Add policy for admin users to manage all appointments
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  package_id uuid REFERENCES packages(id) ON DELETE RESTRICT,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Users can read their own appointments
CREATE POLICY "Users can read own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own appointments
CREATE POLICY "Users can insert own appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own appointments
CREATE POLICY "Users can update own appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin users can manage all appointments
CREATE POLICY "Admin users can manage all appointments"
  ON appointments
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
