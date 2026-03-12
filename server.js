console.log("Starting server...");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const candidateRoutes = require("./routes/candidateRoutes");
const jobRoutes = require("./routes/jobRoutes");

app.use("/api/candidates", candidateRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});