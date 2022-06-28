import bcrypt from 'bcryptjs'
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
            return res.status(404).json({ message: "User don't exist" })
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        )
        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Invalid credantials' })
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ' })
    }
}
