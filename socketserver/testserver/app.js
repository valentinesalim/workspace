const app = require('express')();
const cors = require('cors');

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.get('/', (req, res) => {
  res.send('API is running!');
});

const user2clients = {};
const rooms = [];
io.on('connection', (socket) => {
  console.log('User connected!', socket.id);
  const uid = socket.handshake?.auth?.uid;
  if (uid) {
    user2clients[uid]
      ? user2clients[uid].push(socket.id)
      : (user2clients[uid] = [socket.id]);
    console.log(user2clients);
  }
  let room = null;

  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

  socket.on('clear_whiteboard', (data) =>
    socket.broadcast.emit('clear_whiteboard')
  );

  socket.on('update_website', (link) =>
    socket.broadcast.emit('update_website', link)
  );

  socket.on('update_notes', (notes) =>
    socket.broadcast.emit('update_notes', notes)
  );

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('roomjoin', ({roomId}) => {
    console.log(`User: ${uid} - Client ${socket.id} - Joined Room ${roomId}`)
    socket.join(roomId);
    if (uid) {
      if (!rooms[roomId]) {
        console.log('Creating Room: ', roomId)
        rooms[roomId] = [uid]
      } else {
        if (!rooms[roomId].find(id => id === uid)) {
          rooms[roomId].push(uid)
        } else {
          return;
        }
      }
    }
    io.to(roomId).emit('roster', rooms[roomId]);
    room = roomId;
  });

  socket.on('roomleave', roomId => {
  });

  socket.on('disconnect', (reason) => {
    console.log('User disconnected!', socket.id, ` Reason: ${reason}`);

    if (uid) {
      user2clients[uid] = user2clients[uid].filter((id) => id !== socket.id);
      if (!user2clients[uid].length) {
        delete user2clients.uid;
      }
      if (room) {
        rooms[room] = rooms[room].filter(roomUserId => roomUserId != uid)
        if (!rooms[room].length) {
          console.log('Deleting Room: ', room)
          delete rooms[room];
        } else {
          io.to(room).emit('roster', rooms[room]);
        }
      }
      console.log(user2clients);
    }
  });
});

if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}

module.exports = server;
