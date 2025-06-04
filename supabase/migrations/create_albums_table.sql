/*
  # Create albums table

  1. New Tables
    - `albums`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text)
      - `description` (text)
      - `cover_image` (text)
      - `photo_count` (integer)
      - `download_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on `albums` table
    - Add policies for authenticated users to read their own albums
    - Add policies for admins to manage all albums
*/

CREATE TABLE IF NOT EXISTS albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  description text,
  cover_image text,
  photo_count integer DEFAULT 0,
  download_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE albums ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own albums
CREATE POLICY "Users can view their own albums"
  ON albums
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for admins to manage all albums
CREATE POLICY "Admins can manage all albums"
  ON albums
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
