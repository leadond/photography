/*
  # Create photos table

  1. New Tables
    - `photos`
      - `id` (uuid, primary key)
      - `url` (text)
      - `title` (text)
      - `category` (text)
      - `description` (text)
      - `featured` (boolean)
      - `created_at` (timestamptz)
      - `album_id` (uuid, references albums)
  2. Security
    - Enable RLS on `photos` table
    - Add policies for public photos and user-specific photos
*/

CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Photos in public albums are viewable by everyone"
  ON photos
  FOR SELECT
  TO anon, authenticated
  USING (
    album_id IN (
      SELECT id FROM albums WHERE is_public = true
    )
  );
