const db = require("../config/db");

exports.getJobs = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  
  const countSql = "SELECT COUNT(*) as total FROM jobs";
  const dataSql = "SELECT * FROM jobs ORDER BY created_at DESC LIMIT ? OFFSET ?";
  
  db.query(countSql, (err, countResult) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const total = countResult[0].total;
      const totalPages = Math.ceil(total / limit);
      
      db.query(dataSql, [limit, offset], (err, dataResult) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            jobs: dataResult,
            currentPage: page,
            totalPages: totalPages,
            totalJobs: total
          });
        }
      });
    }
  });
};

exports.addJob = (req, res) => {
  const { title, location, experience } = req.body;
  
  // Validate India locations
  const validLocations = ['Chennai', 'Coimbatore', 'Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi', 'Kolkata', 'Ahmedabad', 'Noida', 'Gurgaon'];
  if (!validLocations.includes(location)) {
    return res.status(400).json({ error: "Invalid location. Must be an Indian city." });
  }
  
  // Validate experience levels
  const validExperience = ['0 years (Freshers)', '1+ years', '2+ years', '3+ years', '5+ years'];
  if (!validExperience.includes(experience)) {
    return res.status(400).json({ error: "Invalid experience level." });
  }
  
  const sql = "INSERT INTO jobs (title, location, experience) VALUES (?, ?, ?)";
  
  db.query(sql, [title, location, experience], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Job added successfully", id: result.insertId });
    }
  });
};
