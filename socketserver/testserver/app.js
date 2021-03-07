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

io.on('connection', (socket) => {
  console.log('User connected!', socket.id);

  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

  socket.on('clear_whiteboard', (data) =>
    socket.broadcast.emit('clear_whiteboard')
  );

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
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
