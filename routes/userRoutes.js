// const express = require('express')
// const router = express.Router()

// const { registerUser, loginUser } = require('../controllers/userController')

// router.post('/register', registerUser)
// router.post('/login', loginUser)

// module.exports = router
const express = require('express')
const router = express.Router()

const { registerUser, loginUser, changePassword, deleteAccount } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/change-password', protect, changePassword)
router.delete('/delete-account', protect, deleteAccount)

module.exports = router