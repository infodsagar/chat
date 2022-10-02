//Import path
const path = require('path');

//Import Https
const http = require('http');

//Import Socket IO
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

// Run when client connects
io.on('connection', (socket) => {
  console.log('New websocket');
  socket.emit('message', 'Welcome');
});
