const ws = require('ws');
const server = new ws.Server({ port: 8080 });

server.on('connection', function(socket) {
    console.log('Client connected');

    socket.on('message', function(data) {
        console.log('Received frame:', data);
        // Process the received frame data here
    });

    socket.on('close', () => {
        console.log('Connection closed');
    });

    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');

