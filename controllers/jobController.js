const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            user: req.user._id
        })

        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const createJob = async (req, res) => {
    try {
        console.log(req.body)

       const newJob = await Job.create({
    ...req.body,
    user: req.user._id
})

        res.status(201).json(newJob)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            })
        }

        if (job.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }

        res.status(200).json(job)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            })
        }

        if (job.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json(updatedJob)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            })
        }

        if (job.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }

        await Job.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Job deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}
