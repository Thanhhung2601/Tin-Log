import express from 'express'
import {
    signUp,
    signIn,
    updateProfile,
    getAllUser,
} from '../controller/user.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/updateprofile', updateProfile)
router.get('/getAll', getAllUser)

export default router
