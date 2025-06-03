/*
  # Insert sample appointments

  1. Purpose
    - Add sample appointment data for demonstration purposes
    - Create appointments with different statuses and payment statuses
  2. Details
    - Inserts appointments for existing users
    - Sets up past, current, and future appointments
    - Creates appointments with different statuses (scheduled, completed, cancelled)
    - Creates appointments with different payment statuses (paid, pending)
*/

-- Insert a completed appointment with paid status (for the first user in the system)
DO $$
DECLARE
  first_user_id uuid;
  graduation_package_id uuid;
  headshot_package_id uuid;
  family_package_id uuid;
  corporate_package_id uuid;
BEGIN
  -- Get the first user from profiles
  SELECT id INTO first_user_id FROM profiles LIMIT 1;
  
  -- Get package IDs
  SELECT id INTO graduation_package_id FROM packages WHERE name = 'Graduation' LIMIT 1;
  SELECT id INTO headshot_package_id FROM packages WHERE name = 'Professional Headshot' LIMIT 1;
  SELECT id INTO family_package_id FROM packages WHERE name = 'Family Portrait' LIMIT 1;
  SELECT id INTO corporate_package_id FROM packages WHERE name = 'Corporate Event' LIMIT 1;
  
  -- Only proceed if we have a user and packages
  IF first_user_id IS NOT NULL AND 
     graduation_package_id IS NOT NULL AND 
     headshot_package_id IS NOT NULL AND
     family_package_id IS NOT NULL AND
     corporate_package_id IS NOT NULL THEN
    
    -- Insert a completed appointment (past date)
    INSERT INTO appointments (
      user_id, 
      package_id, 
      date, 
      time, 
      location, 
      status, 
      payment_status, 
      notes
    ) VALUES (
      first_user_id,
      graduation_package_id,
      (CURRENT_DATE - INTERVAL '30 days')::date,
      '10:00 AM',
      'University Campus',
      'completed',
      'paid',
      'Graduation photos for the Class of 2023'
    );
    
    -- Insert a scheduled appointment (future date)
    INSERT INTO appointments (
      user_id, 
      package_id, 
      date, 
      time, 
      location, 
      status, 
      payment_status, 
      notes
    ) VALUES (
      first_user_id,
      headshot_package_id,
      (CURRENT_DATE + INTERVAL '14 days')::date,
      '2:00 PM',
      'Studio',
      'scheduled',
      'paid',
      'Professional headshots for LinkedIn'
    );
    
    -- Insert a pending appointment (future date)
    INSERT INTO appointments (
      user_id, 
      package_id, 
      date, 
      time, 
      location, 
      status, 
      payment_status, 
      notes
    ) VALUES (
      first_user_id,
      family_package_id,
      (CURRENT_DATE + INTERVAL '30 days')::date,
      '4:00 PM',
      'City Park',
      'scheduled',
      'pending',
      'Family portrait session'
    );
    
    -- Insert a cancelled appointment
    INSERT INTO appointments (
      user_id, 
      package_id, 
      date, 
      time, 
      location, 
      status, 
      payment_status, 
      notes
    ) VALUES (
      first_user_id,
      corporate_package_id,
      (CURRENT_DATE - INTERVAL '7 days')::date,
      '9:00 AM',
      'Office Building',
      'cancelled',
      'refunded',
      'Corporate event photos - cancelled due to scheduling conflict'
    );
  END IF;
END $$;
