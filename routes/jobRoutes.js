const express = require('express')
const router = express.Router()
const {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
} = require('../controllers/jobController')
const { protect } = require('../middleware/authMiddleware')

router.get('/:id', protect, getJob)

router.put('/:id', protect, updateJob)

router.delete('/:id', protect, deleteJob)

router.get('/:id', getJob)

router.put('/:id', updateJob)

router.delete('/:id', deleteJob)

module.exports = router