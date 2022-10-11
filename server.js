const io = require('socket.io')(4000, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
  },
});

//Login Check middleware
io.use((socket, next) => {
  const username = socket.handshake.auth.userName;
  if (!username) {
    return next(new Error('invalid username'));
  }
  socket.username = username;
  next();
});

//On user conect
io.on('connection', (socket) => {
  console.log(`Connected on ${socket.id}`);

  const users = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }

  socket.emit('users', users);

  socket.emit('user connected', {
    userID: socket.id,
    username: socket.username,
  });

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on('send-message', (message) => {
    socket.broadcast.emit('receive-message', message);
  });

  socket.on('disconnect', () => {
    console.log(`User left ${socket.id}`);
  });
});
