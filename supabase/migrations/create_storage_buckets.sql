/*
  # Create storage buckets for media files

  1. New Storage Buckets
    - `media` - For storing original photos
    - `thumbnails` - For storing thumbnail versions of photos
  
  2. Security
    - Enable public access for both buckets
    - Set up RLS policies for uploads and downloads
*/

-- Create media bucket for original photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Create thumbnails bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for media bucket
CREATE POLICY "Media bucket public access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

CREATE POLICY "Media bucket authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Media bucket admin delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'media' AND
  EXISTS (
    SELECT 1 FROM auth.users
    JOIN public.profiles ON auth.users.id = profiles.id
    WHERE auth.users.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Set up security policies for thumbnails bucket
CREATE POLICY "Thumbnails bucket public access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'thumbnails');

CREATE POLICY "Thumbnails bucket authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'thumbnails');

CREATE POLICY "Thumbnails bucket admin delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'thumbnails' AND
  EXISTS (
    SELECT 1 FROM auth.users
    JOIN public.profiles ON auth.users.id = profiles.id
    WHERE auth.users.id = auth.uid() AND profiles.role = 'admin'
  )
);
