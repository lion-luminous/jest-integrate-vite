const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 5000;

// Build the project first
console.log('Building project...');
const buildProcess = spawn('npm', ['run', 'build'], { 
    stdio: 'pipe',
    shell: true 
});

buildProcess.stdout.on('data', (data) => {
    console.log(data.toString());
});

buildProcess.stderr.on('data', (data) => {
    console.error(data.toString());
});

buildProcess.on('close', (code) => {
    if (code === 0) {
        console.log('Build completed successfully');
    } else {
        console.log(`Build failed with code ${code}, serving development version`);
    }
});

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Health check
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            status: 'ok', 
            timestamp: new Date().toISOString(),
            built: fs.existsSync('./dist/index.html')
        }));
        return;
    }

    // Serve from dist if available, fallback to development
    let filePath;
    if (req.url === '/' || req.url === '/index.html') {
        filePath = fs.existsSync('./dist/index.html') ? './dist/index.html' : './index.html';
    } else {
        filePath = path.join('./dist', req.url);
        if (!fs.existsSync(filePath)) {
            // For SPA routing, fallback to index.html
            filePath = fs.existsSync('./dist/index.html') ? './dist/index.html' : './index.html';
        }
    }

    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject'
    };

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/html';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Health check: http://0.0.0.0:${PORT}/health`);
    console.log(`Serving from: ${fs.existsSync('./dist') ? 'dist/ (production)' : 'development files'}`);
});