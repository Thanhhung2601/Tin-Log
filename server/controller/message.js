import Message from '../model/Message.js'

export const sendMessage = async (req, res) => {
    const newMessages = new Message(req.body)
    try {
        const savedMessage = await newMessages.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(err)
    }
}

export const getMessagesByConversation = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(err)
    }
}
