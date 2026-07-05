const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const jobRoutes = require('./routes/jobRoutes')

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api/jobs', jobRoutes)

connectDB()

app.get('/', (req, res) => {
    res.send('job Tracker Api Running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server running on port 5000')
})