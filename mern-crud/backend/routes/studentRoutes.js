const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// INSERT
router.post("/add", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send("Student Added");
});

// GET
router.get("/", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

module.exports = router;