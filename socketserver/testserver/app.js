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
io.on('connection', (socket) => {
  console.log('User connected!', socket.id);
  const uid = socket.handshake?.auth?.uid;
  if (uid) {
    user2clients[uid]
      ? user2clients[uid].push(socket.id)
      : (user2clients[uid] = [socket.id]);
    console.log(user2clients);
  }

  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

  socket.on('clear_whiteboard', (data) =>
    socket.broadcast.emit('clear_whiteboard')
  );

  socket.on('update_website', (link) =>
    socket.broadcast.emit('update_website', link)
  );

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', (reason) => {
    console.log('User disconnected!', socket.id);

    if (uid) {
      user2clients[uid] = user2clients[uid].filter((id) => id !== socket.id);
      if (!user2clients[uid].length) {
        delete user2clients.uid;
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
