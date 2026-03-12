const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Varna@1404",
  database: "job_interview_mgmt",
  port: 3307
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
    
    // Create jobs table if not exists
    const createJobsTable = `
      CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(100) NOT NULL,
        experience VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    db.query(createJobsTable, (err) => {
      if (err) {
        console.error("Error creating jobs table:", err);
      } else {
        console.log("Jobs table ready");
        
        // Insert sample data if table is empty
        db.query("SELECT COUNT(*) as count FROM jobs", (err, result) => {
          if (!err && result[0].count === 0) {
            const sampleJobs = `
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
              ('Technical Support', 'Coimbatore', '0 years (Freshers)')
            `;
            
            db.query(sampleJobs, (err) => {
              if (err) {
                console.error("Error inserting sample jobs:", err);
              } else {
                console.log("Sample jobs inserted");
              }
            });
          }
        });
      }
    });
  }
});

module.exports = db;