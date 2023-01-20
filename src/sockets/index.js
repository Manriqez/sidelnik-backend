const app = require('express')()
const server = require('http').createServer({}, app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
    let userId = ''
  
    socket.on('userJoin', (data, cb) => {
      if(!data.id || !data.username) {
        return cb('Данные некорректны')
      }
      userId = data.id
      cb({ userSocketId: socket.id })
    })
    
    socket.on('send-message', (data) => {
      data.userId = userId
      socket.broadcast.emit('broadcast', data);
    });
    
    // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    // });
  });

module.exports = {
    app,
    server
}