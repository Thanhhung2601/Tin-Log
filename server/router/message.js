import express from 'express'
import {
    getMessagesByConversation,
    sendMessage,
} from '../controller/message.js'

const router = express.Router()

router.post('/', sendMessage)
router.get('/:conversationId', getMessagesByConversation)

export default router
