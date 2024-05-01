const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const app = express();
const upload = multer();

app.post('/upload', upload.single('frame'), (req, res) => {
    const ffmpegCommand = `ffmpeg -f image2pipe -i - -c:v libx265 -f mpegts udp://127.0.0.1:23000`;
    const ffmpegProcess = exec(ffmpegCommand);

    // Pipe the image buffer directly into FFmpeg's stdin
    ffmpegProcess.stdin.write(req.file.buffer);
    ffmpegProcess.stdin.end();

    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

