/*
  # Create user_albums table

  1. New Tables
    - `user_albums`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `album_id` (uuid, references albums)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `user_albums` table
    - Add policies for users to access their own albums
*/

CREATE TABLE IF NOT EXISTS user_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users,
  album_id UUID NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, album_id)
);

ALTER TABLE user_albums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own albums"
  ON user_albums
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Add policy to allow users to view photos in their albums
CREATE POLICY "Users can view photos in their albums"
  ON photos
  FOR SELECT
  TO authenticated
  USING (
    album_id IN (
      SELECT album_id FROM user_albums WHERE user_id = auth.uid()
    )
  );
