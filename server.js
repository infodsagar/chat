const io = require('socket.io')(4000, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  },
});

io.on('connection', (socket) => {
  console.log(`Connected on ${socket.id}`);
  socket.on('send-message', (message) => {
    socket.broadcast.emit('receive-message', message);
  });
});
