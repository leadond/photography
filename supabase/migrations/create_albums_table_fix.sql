/*
  # Create albums table

  1. New Tables
    - `albums`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text)
      - `description` (text)
      - `cover_url` (text)
      - `is_shared` (boolean)
      - `is_favorite` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on `albums` table
    - Add policies for authenticated users to read their own albums
    - Add policies for public access to shared albums
*/

CREATE TABLE IF NOT EXISTS albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  description text,
  cover_url text,
  is_shared boolean DEFAULT false,
  is_favorite boolean DEFAULT false,
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

-- Policy for users to update their own albums
CREATE POLICY "Users can update their own albums"
  ON albums
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for public access to shared albums
CREATE POLICY "Public can view shared albums"
  ON albums
  FOR SELECT
  TO public
  USING (is_shared = true);

-- Create policy for public access to photos in shared albums
CREATE POLICY "Public can view photos in shared albums"
  ON photos
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM albums
      WHERE albums.id = photos.album_id
      AND albums.is_shared = true
    )
  );
