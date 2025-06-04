/*
  # Update albums table for sharing functionality

  1. Changes
    - Add `is_shared` column to albums table
    - Add `is_favorite` column to albums table
    - Add `cover_url` column to albums table
  
  2. Security
    - Update RLS policies for shared albums
*/

-- Add new columns to albums table
ALTER TABLE albums ADD COLUMN IF NOT EXISTS is_shared boolean DEFAULT false;
ALTER TABLE albums ADD COLUMN IF NOT EXISTS is_favorite boolean DEFAULT false;
ALTER TABLE albums ADD COLUMN IF NOT EXISTS cover_url text;

-- Create policy for public access to shared albums
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
