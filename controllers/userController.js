const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json(user)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
)

res.status(200).json({
    message: "Login successful",
    token
})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body

        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        await user.save()

        res.status(200).json({
            message: "Password updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id)

        res.status(200).json({
            message: "Account deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    changePassword,
    deleteAccount
}