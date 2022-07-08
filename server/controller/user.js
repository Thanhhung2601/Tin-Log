import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../model/user.js'

export const signUp = async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body
    console.log('runnn', email)
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exist' })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password don't match" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({
            userName,
            email,
            password: hashedPassword,
        })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong ' })
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res
                .status(404)
                .json({ message: 'Hình như bạn nhập sai email á !!' })
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        )
        if (!isPasswordCorrect)
            return res
                .status(400)
                .json({ message: 'Oops bạn nhập sai mật khẩu ròi !!' })
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ' })
    }
}

export const updateProfile = async (req, res) => {
    const userProfile = req.body
    console.log(userProfile)
    if (!mongoose.Types.ObjectId.isValid(userProfile._id)) {
        return res.status(404).send('No user with id')
    }
    const updateUser = await User.findByIdAndUpdate(
        userProfile._id,
        userProfile,
        {
            new: true,
        }
    )
    res.json(updateUser)
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}
