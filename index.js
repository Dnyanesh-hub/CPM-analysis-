const express = require("express");
const cors = require("cors");
const runCPM = require("./cpmEngine");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/calculate", (req, res) => {
  try {
    const activities = req.body.activities;
    const result = runCPM(activities);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});