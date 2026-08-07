-- ADMIN SETUP INSTRUCTIONS
-- Use this SQL to grant admin access to a user

-- Step 1: First, sign up a user account on your website (e.g., your business email)

-- Step 2: Find the user's ID by querying auth.users:
-- SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Step 3: Insert admin role for that user (replace USER_ID with actual UUID):
-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('USER_ID_HERE', 'admin');

-- Example (replace with actual user ID):
-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('123e4567-e89b-12d3-a456-426614174000', 'admin');

-- Step 4: Verify the admin role was added:
-- SELECT * FROM public.user_roles WHERE role = 'admin';

-- Step 5: Log out and log back in, then navigate to /admin to access the admin panel
