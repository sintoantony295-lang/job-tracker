const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// rest of your imports/code, including mongoose.connect(...)no
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')
const jobRoutes = require('./routes/jobRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config()

const app = express()
app.use(cors())
// app.use(express.json())

app.use(express.json())

app.use('/api/jobs', jobRoutes)

app.use('/api/users', userRoutes)

connectDB()

app.get('/', (req, res) => {
    res.send('job Tracker Api Running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// console.log(process.env.JWT_SECRET)