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
    const result = []
    console.log(userProfile)
    if (!mongoose.Types.ObjectId.isValid(userProfile[0]._id)) {
        return res.status(404).send('No user with id')
    }
    const updateUserFirst = await User.findByIdAndUpdate(
        userProfile[0]._id,
        userProfile[0],
        {
            new: true,
        }
    )
    result.push(updateUserFirst)

    if (userProfile[1]?._id) {
        const updateUserSecond = await User.findByIdAndUpdate(
            userProfile[1]._id,
            userProfile[1],
            {
                new: true,
            }
        )
        result.push(updateUserSecond)
    }

    res.json(result)
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getUserById = async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findById(req.body.userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}
