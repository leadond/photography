/*
  # Update photos table schema

  1. Changes
    - Add `album_id` column to photos table
    - Update RLS policies for photos table
  
  2. Security
    - Update policies for authenticated users to read their own photos
    - Add policies for admins to manage all photos
*/

-- Add album_id column to photos table
ALTER TABLE photos ADD COLUMN IF NOT EXISTS album_id uuid REFERENCES albums(id) ON DELETE CASCADE;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own photos" ON photos;

-- Create new policies
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
