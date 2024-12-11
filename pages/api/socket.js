import { Server } from 'socket.io';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Initialize Socket.IO only once
    if (!res.socket.server.io) {
      const io = new Server(res.socket.server);

      // Attach Socket.IO server to the Next.js server
      res.socket.server.io = io;

      // Handle socket connections
      io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('sendMessage', (message) => {
          console.log('Message received:', message);
          io.emit('receiveMessage', message); // Broadcast message to all clients
        });

        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
      });
    }

    // End the response
    res.end();
  } else {
    res.status(404).send('Not Found'); // Handle other HTTP methods
  }
}
