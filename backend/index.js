const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const {connectDb} = require("./DB/db.config.js");
const userRoutes = require("./routes/userRoutes.js");
const logRoutes = require("./routes/logRoutes.js");
const cors = require('cors'); 

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/users", userRoutes);
app.use("/api/logs", logRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Kine-Sync-AI API running", data: null });
});

app.listen(port ,() => {
    console.log(`server running on port ${port}`);
})