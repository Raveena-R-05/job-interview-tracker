const db = require("../config/db");

exports.addCandidate = (req, res) => {
  const { name, email, phone, position, status } = req.body;

  const sql = "INSERT INTO candidates (name,email,phone,position,status) VALUES (?,?,?,?,?)";

  db.query(sql, [name, email, phone, position, status], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Candidate added successfully");
    }
  });
};

exports.getCandidates = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  const countSql = "SELECT COUNT(*) as total FROM candidates";
  const dataSql = "SELECT * FROM candidates LIMIT ? OFFSET ?";

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
            candidates: dataResult,
            currentPage: page,
            totalPages: totalPages,
            totalCandidates: total
          });
        }
      });
    }
  });
};

exports.updateCandidateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE candidates SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Status updated successfully", id, status });
    }
  });
};

exports.deleteCandidate = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM candidates WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Candidate deleted successfully", id });
    }
  });
};