const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle 'updateLocation' event
    socket.on('updateLocation', (location) => {
        // Process the updated location
        console.log('Received location update:', location);

        // Broadcast the updated location to other users
        socket.broadcast.emit('locationUpdated', location);
    });

    // Other socket event handlers...

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
