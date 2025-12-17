const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/env");
const analyzeRoutes = require("./routes/analyze.route");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/analyze-url", analyzeRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Accessly Backend is running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
