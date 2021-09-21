const io = require('socket.io')(3000, {
    cors: {
        origin: "*",
      },
})



const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connection', name)

    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
    })
    socket.on('send-file-message', message => {
        socket.broadcast.emit('file-message', {file: message.src, name: users[socket.id]})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnection', users[socket.id])
        delete users[socket.id]
    })
})

