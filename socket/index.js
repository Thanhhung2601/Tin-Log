import { Server } from 'socket.io'

const io = new Server(8900, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

let users = []

io.on('connection', (socket) => {
    socket.emit('hello', 'word')

    socket.on('addUser', (userId) => {
        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId: socket.id })
        io.emit('getUser', users)
    })

    socket.on('disconnect', () => {
        users = users.filter((user) => user.socketId !== socket.id)
        console.log('filter', users)
        io.emit('getUser', users)
    })
})
