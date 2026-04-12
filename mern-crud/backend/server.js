const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANT LINE (must match file path)
const studentRoutes = require("./routes/studentRoutes");

app.use("/students", studentRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

app.listen(5000, () => {
  console.log("Server running on 5000");
});