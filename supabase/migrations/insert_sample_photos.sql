/*
  # Insert sample photos

  1. Purpose
    - Add sample photo data for demonstration purposes
  2. Details
    - Inserts photos for completed appointments
    - Creates sample photo gallery for users to view
*/

-- Insert sample photos for completed appointments
DO $$
DECLARE
  completed_appointment_id uuid;
  user_id_for_appointment uuid;
BEGIN
  -- Get a completed appointment and its user
  SELECT id, user_id INTO completed_appointment_id, user_id_for_appointment 
  FROM appointments 
  WHERE status = 'completed' 
  LIMIT 1;
  
  -- Only proceed if we have a completed appointment
  IF completed_appointment_id IS NOT NULL AND user_id_for_appointment IS NOT NULL THEN
    
    -- Insert sample photos for the completed appointment
    INSERT INTO photos (
      user_id,
      appointment_id,
      url,
      thumbnail_url,
      title,
      description
    ) VALUES
    (
      user_id_for_appointment,
      completed_appointment_id,
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=300',
      'Portrait 1',
      'Professional portrait from your graduation session'
    ),
    (
      user_id_for_appointment,
      completed_appointment_id,
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      'Portrait 2',
      'Candid shot from your graduation session'
    ),
    (
      user_id_for_appointment,
      completed_appointment_id,
      'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
      'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=300',
      'Portrait 3',
      'Group shot with your classmates'
    ),
    (
      user_id_for_appointment,
      completed_appointment_id,
      'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg',
      'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=300',
      'Portrait 4',
      'Outdoor graduation portrait'
    ),
    (
      user_id_for_appointment,
      completed_appointment_id,
      'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg',
      'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=300',
      'Portrait 5',
      'Celebratory graduation moment'
    );
  END IF;
END $$;
