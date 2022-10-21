//Import dotenv
require('dotenv').config();
// const express = require('express');
const io = require('socket.io')({
  cors: {
    origin: [
      'https://sagar-chat.herokuapp.com/',
      'https://sagar-chat.herokuapp.com',
    ],
    methods: ['GET', 'POST'],
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

//Parse json
// app.use(express.json());

//Static assests
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('front/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
//   });
// }

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
    socket.to(receptionId).emit('receive-priv-message', {
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

io.listen(process.env.PORT || 4000);
