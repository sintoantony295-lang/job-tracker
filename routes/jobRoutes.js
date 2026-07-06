const express = require('express')
const router = express.Router()
const { getAllJobs } = require('../controllers/jobController')


router.post('/api/jobs', async (req, res) => {
    try {
        console.log(req.body)
        const newJob = await Job.create(req.body)

        res.status(201).json(newJob)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/', getAllJobs)

router.get('/api/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)

        if (!job) {
            return res.status(404).json({ message: 'Job not found' })
        }

        res.status(200).json(job)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.put('/api/jobs/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" })
        }

        res.status(200).json(updatedJob)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.delete('/api/jobs/:id', async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id)
   
    if (!deletedJob) {
    return res.status(404).json({ message: "Job not found" })
}

res.status(200).json(deletedJob)
 } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router