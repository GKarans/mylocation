const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const http = require('http');
const server = http.createServer(app); // Assuming 'app' is your Express app
const io = require('socket.io')(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root path ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Check if the socket object is defined
    if (socket) {
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
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
