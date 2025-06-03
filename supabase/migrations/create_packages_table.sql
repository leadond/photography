/*
  # Create packages table

  1. New Tables
    - `packages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (integer)
      - `duration` (integer)
      - `image_url` (text)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `packages` table
    - Add policy for public read access
  3. Sample Data
    - Insert photography packages (Graduation, Family Portrait, Corporate Event, Professional Headshot)
*/

CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  duration integer NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to packages
CREATE POLICY "Packages are viewable by everyone"
  ON packages
  FOR SELECT
  TO public
  USING (true);

-- Insert sample packages
INSERT INTO packages (name, description, price, duration, image_url) VALUES
(
  'Graduation',
  'Commemorate your academic achievement with professional graduation photos. Package includes individual portraits in cap and gown, as well as group shots with friends and family.',
  299,
  60,
  'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg'
),
(
  'Family Portrait',
  'Capture precious family moments with our professional family portrait session. Indoor or outdoor settings available. Includes multiple poses and groupings.',
  349,
  90,
  'https://images.pexels.com/photos/1231365/pexels-photo-1231365.jpeg'
),
(
  'Corporate Event',
  'Professional photography for your corporate events, conferences, and team gatherings. Includes candid shots, group photos, and coverage of key moments.',
  599,
  240,
  'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg'
),
(
  'Professional Headshot',
  'Elevate your professional profile with our headshot session. Perfect for LinkedIn, company websites, and professional portfolios. Multiple outfit changes included.',
  199,
  45,
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
);
