require('dotenv').config();
const express = require('express');
var cors = require('cors');
const { dbConnect } = require('./config/Database');
const { appConfig } = require('./config/AppConfig');
const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*', // Adjust as needed for security
  },
});

const startServer = async () => {
  const app = express();

  // CORS configuration (example using Express)
  const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));

  // Handle preflight requests
  app.options('*', cors(corsOptions));

  // database connection
  await dbConnect();
  // App Default Config

  io.on('connection', (client) => {
    console.log('Client connected:', client.id);

    client.on('joinRoom', (roomId) => {
      client.join(roomId);
      console.log(`${client.user.id} joined room:${room}`);

      // Notify room of new user
      socket.to(roomId).emit('message', {
        text: `${client.user.id} joined the chat`,
        sender: 'System',
        timestamp: new Date().toISOString(),
      });
    });

    client.on('message', (data) => {
      console.log(
        `Message from ${client.user.id} in ${data.roomId}: ${data.text}`
      );
      io.to(data.roomId).emit('message', {
        text: data.text,
        sender: client.user.id,
        timestamp: new Date().toISOString(),
      });
    });
    client.on('disconnect', () => {
      console.log('Disconnected:', client.id);
    });
  });
  server.listen(5555, () => {
    console.log('socket triggered');
  });

  await appConfig(app);
};
startServer();
