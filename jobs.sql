-- Create jobs table with updated structure for India locations and experience levels
CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(100) NOT NULL,
  experience VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clear existing data and insert updated sample data
TRUNCATE TABLE jobs;

-- Insert sample jobs with India locations and new experience format
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
('Technical Support', 'Coimbatore', '0 years (Freshers)');
