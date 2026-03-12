-- Migration script to update existing jobs to Indian cities and new experience format

-- Clear all existing jobs
TRUNCATE TABLE jobs;

-- Insert updated jobs with Indian cities and new experience format
INSERT INTO jobs (title, location, experience) VALUES
('Software Engineer', 'Bangalore', '2+ years'),
('Frontend Developer', 'Hyderabad', '1+ years'),
('Backend Developer', 'Pune', '3+ years'),
('Full Stack Developer', 'Chennai', '2+ years'),
('DevOps Engineer', 'Mumbai', '5+ years'),
('Data Scientist', 'Bangalore', '3+ years'),
('Product Manager', 'Delhi', '5+ years'),
('UI/UX Designer', 'Hyderabad', '1+ years'),
('Mobile Developer', 'Pune', '2+ years'),
('Junior Developer', 'Chennai', '0 years (Freshers)'),
('Java Developer', 'Noida', '2+ years'),
('Python Developer', 'Bangalore', '1+ years'),
('React Developer', 'Mumbai', '0 years (Freshers)'),
('Node.js Developer', 'Gurgaon', '2+ years'),
('Business Analyst', 'Delhi', '3+ years'),
('QA Tester', 'Coimbatore', '0 years (Freshers)'),
('Angular Developer', 'Chennai', '1+ years'),
('Database Administrator', 'Bangalore', '3+ years'),
('System Administrator', 'Pune', '2+ years'),
('Technical Support', 'Coimbatore', '0 years (Freshers)'),
('Machine Learning Engineer', 'Bangalore', '3+ years'),
('Cloud Architect', 'Mumbai', '5+ years'),
('Scrum Master', 'Hyderabad', '3+ years'),
('Content Writer', 'Chennai', '1+ years'),
('Digital Marketing Specialist', 'Delhi', '2+ years'),
('HR Manager', 'Pune', '3+ years'),
('Sales Executive', 'Mumbai', '1+ years'),
('Customer Support', 'Coimbatore', '0 years (Freshers)'),
('Network Engineer', 'Bangalore', '2+ years'),
('Cybersecurity Analyst', 'Delhi', '3+ years');

-- Verify the update
SELECT COUNT(*) as total_jobs FROM jobs;
SELECT location, COUNT(*) as job_count FROM jobs GROUP BY location ORDER BY job_count DESC;
SELECT experience, COUNT(*) as job_count FROM jobs GROUP BY experience ORDER BY job_count DESC;
