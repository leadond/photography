/*
  # Create photos table

  1. New Tables
    - `photos`
      - `id` (uuid, primary key)
      - `album_id` (uuid, references albums)
      - `url` (text)
      - `thumbnail_url` (text)
      - `filename` (text)
      - `caption` (text)
      - `is_favorite` (boolean)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `photos` table
    - Add policies for users to view their own photos
    - Add policies for admins to manage all photos
*/

CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id uuid REFERENCES albums(id) ON DELETE CASCADE,
  url text NOT NULL,
  thumbnail_url text,
  filename text,
  caption text,
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own photos
CREATE POLICY "Users can view their own photos"
  ON photos
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM albums
      WHERE albums.id = photos.album_id
      AND albums.user_id = auth.uid()
    )
  );

-- Policy for admins to manage all photos
CREATE POLICY "Admins can manage all photos"
  ON photos
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
