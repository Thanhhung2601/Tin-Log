import { Server } from 'socket.io'

const io = new Server(8900, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
}

const removeUser = (skId) => {
    users = users.filter((user) => user.socketId !== skId)
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
}

io.on('connection', (socket) => {
    socket.on('addUser', (userId) => {
        console.log('user Idddd', userId)
        addUser(userId, socket.id)
        io.emit('getUser', users)
    })

    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId)
        if (!user) return
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text,
        })
    })

    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('getUser', users)
    })
})
