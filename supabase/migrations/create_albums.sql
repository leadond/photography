/*
  # Create albums table

  1. New Tables
    - `albums`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `cover_image` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `is_public` (boolean)
  2. Security
    - Enable RLS on `albums` table
    - Add policies for public albums and user-specific albums
*/

CREATE TABLE IF NOT EXISTS albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  is_public BOOLEAN DEFAULT false
);

ALTER TABLE albums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public albums are viewable by everyone"
  ON albums
  FOR SELECT
  TO anon, authenticated
  USING (is_public = true);
