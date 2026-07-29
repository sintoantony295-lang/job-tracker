const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

// Get all jobs
router.get("/", protect, getAllJobs);

// Create a job
router.post("/", protect, createJob);

// Get one job
router.get("/:id", protect, getJob);

// Update a job
router.put("/:id", protect, updateJob);

// Delete a job
router.delete("/:id", protect, deleteJob);

module.exports = router;