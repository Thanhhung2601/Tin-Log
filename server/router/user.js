import express from 'express'
import {
    signUp,
    signIn,
    updateProfile,
    getAllUser,
    getUserById,
} from '../controller/user.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/updateprofile', updateProfile)
router.get('/getAll', getAllUser)
router.post('/getById', getUserById)

export default router
