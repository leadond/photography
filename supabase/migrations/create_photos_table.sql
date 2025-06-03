/*
  # Create photos table

  1. New Tables
    - `photos`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `appointment_id` (uuid, foreign key to appointments)
      - `url` (text)
      - `thumbnail_url` (text)
      - `title` (text)
      - `description` (text, nullable)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `photos` table
    - Add policy for authenticated users to read their own photos
*/

CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  appointment_id uuid REFERENCES appointments(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  thumbnail_url text NOT NULL,
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own photos"
  ON photos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
