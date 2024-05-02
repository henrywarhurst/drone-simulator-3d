const ws = require('ws');
const { spawn } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

// Configuration for UDP stream
const UDP_ADDRESS = 'udp://localhost:12345';

// Start WebSocket server
const server = new ws.Server({ port: 8080 });
console.log('WebSocket server is running on ws://localhost:8080');

server.on('connection', function(socket) {
    console.log('Client connected');

    // Start FFmpeg process to encode images to H.265 and package in MPEG-TS
    const ffmpeg = spawn(ffmpegPath, [
        '-i', '-',                   // Input from stdin
        '-c:v', 'libx265',           // Use H.265 codec
        '-f', 'mpegts',              // Format as MPEG-TS
        '-preset', 'fast',           // Encoding preset
        '-tune', 'zerolatency',      // Reduce latency for streaming
        UDP_ADDRESS                  // Directly output to UDP address
    ]);

    // Handle errors from FFmpeg
    ffmpeg.stderr.on('data', (data) => {
        console.error(`FFmpeg error: ${data.toString()}`);
    });

    socket.on('message', function(data) {
        ffmpeg.stdin.write(data); // Send image data directly to FFmpeg
    });

    socket.on('close', () => {
        console.log('Connection closed');
        ffmpeg.kill('SIGINT'); // Close FFmpeg on socket close
    });

    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});
