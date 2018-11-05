const { verify } = require('./jwt')
const Lists = require('../models/lists')

const socket = io => {
  // Middleware to check if the jsonwebtoken is correct when connecting
  io.use((packet, next) => {
    verify(packet.handshake.query.token)
      .then(() => next())
      .catch(() => next(new Error('Error verifying token')))
  })

  // const getUsers = () =>
  //   Object.keys(io.sockets.sockets)
  //     .map(x => io.sockets.sockets[x])

  io.on('connection', socket => {
    // console.log(`Numbers of users connected: ${getUsers().length}`)
    socket.on('join', data => {
      socket.join(data)
    })

    socket.on('list', data => {
      const room = Object.keys(socket.rooms)[1]
      // Should save to database here
      Lists.updateOne({ _id: room },
        { list: data.items },
        { runValidators: true })
        .then(() => socket.to(room).broadcast.emit('list', data))
        .catch(e => console.log(e))
    })

    // socket.on('disconnect', socket => {
    //   console.log(`Numbers of users connected: ${getUsers().length}`)
    // })
  })
}

module.exports = socket
