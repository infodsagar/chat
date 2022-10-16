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
// io.use((socket, next) => {
//   const username = socket.handshake.query.username;
//   if (username === 'null') {
//     return next(new Error('invalid username'));
//   }
//   socket.username = username;
//   next();
// });

io.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  socket.username = username;
  const usersList = [];

  //When connect print user details
  console.log(`User ${socket.username} connected on ${socket.id}`);

  //Add user in list
  for (let [id, socket] of io.of('/').sockets) {
    usersList.push({
      userID: id,
      username: socket.username,
    });

    console.log(usersList);
  }

  //Retrun socket id
  socket.emit('connection', { data: socket.id });
  socket.broadcast.emit('usersList', usersList);
  socket.emit('usersList', usersList);

  //Waiting for general msg
  socket.on('send-message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('receive-message', msg);
  });

  //Waiting for PRIV msg
  socket.on('private-message', ({ msg, username, receptionId }) => {
    socket
      .to(receptionId)
      .emit('receive-priv-message', {
        msg,
        senderUsername: username,
        from: socket.id,
      });
  });

  //Wait for disconnect
  socket.on('disconnect', (socket) => {
    console.log(`User left ${socket.id}`);
  });
});
