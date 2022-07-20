import Conversation from '../model/Conversation.js'

export const addConversation = async (req, res) => {
    const { senderId, receiverId } = req.body
    const newConversation = new Conversation({
        members: [senderId, receiverId],
    })
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getAllConversation = async (req, res) => {
    try {
        const conversations = await Conversation.find()
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getConversationById = async (req, res) => {
    console.log(req.params.id)
    try {
        const conversation = await Conversation.findById(req.params.id)
        console.log(conversation)
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
}
