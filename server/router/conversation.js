import express from 'express'
import {
    addConversation,
    getAllConversation,
} from '../controller/conversation.js'

const router = express.Router()

router.post('/', addConversation)
router.get('/', getAllConversation)

export default router
