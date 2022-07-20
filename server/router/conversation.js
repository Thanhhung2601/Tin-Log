import express from 'express'
import {
    addConversation,
    getAllConversation,
    getConversationById,
} from '../controller/conversation.js'

const router = express.Router()

router.post('/', addConversation)
router.get('/', getAllConversation)
router.get('/:id', getConversationById)

export default router
