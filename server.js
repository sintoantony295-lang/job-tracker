const express = require('express')


const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Job = require('./models/Job')

dotenv.config()

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongob connceted'))
    .catch(err => console.log(err))
app.get('/', (req, res) => {
    res.send('job Tracker Api Running')
})
app.post('/api/jobs', async (req, res) => {
    try {
        console.log(req.body)
        const newJob=await Job.create(req.body)
        
        res.status(201).json(newJob)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find()

        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.get('/api/jobs/:id', async (req, res) => {
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
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server running on port 5000')
})