import express from 'express'
import {
    addConversation,
    deleteConversation,
    getAllConversation,
    getConversationById,
} from '../controller/conversation.js'

const router = express.Router()

router.post('/', addConversation)
router.get('/', getAllConversation)
router.get('/:id', getConversationById)
router.post('/delete', deleteConversation)

export default router
