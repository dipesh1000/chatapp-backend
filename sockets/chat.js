module.exports = (io, socket) => {
  // join a chat room
  socket.on('joinRoom', async ({ roomId, userId }) => {
    try {
    } catch (error) {}
  });

  // send a message
  //{ roomId, userId, content, media }
  socket.on('message', async (client) => {
    try {
      console.log(client);
    } catch (error) {}
  });

  // Typing indicator
  socket.on('typing', ({ roomId, userId, username }) => {
    socket.to(roomId).emit('userTyping', { userId, username });
  });

  // stop typing
  socket.on('stopTyping', ({ roomId }) => {
    socket.to(roomId).emit('userStoppedTyping');
  });

  // Mark message as read
  socket.on('markRead', async ({ messageId, userId }) => {
    try {
    } catch (error) {}
  });
};
