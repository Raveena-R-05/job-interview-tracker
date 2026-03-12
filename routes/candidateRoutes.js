const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

router.post("/", candidateController.addCandidate);
router.get("/", candidateController.getCandidates);
router.put("/:id", candidateController.updateCandidateStatus);
router.delete("/:id", candidateController.deleteCandidate);

module.exports = router;
