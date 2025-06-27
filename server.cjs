const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 5000;

// Check if we need to build
const needsBuild = !fs.existsSync('./dist/index.html');

if (needsBuild) {
    console.log('Building project for deployment...');
    const buildProcess = spawn('npm', ['run', 'build'], { 
        stdio: 'inherit',
        shell: true 
    });

    buildProcess.on('close', (code) => {
        if (code === 0) {
            console.log('Build completed successfully');
        } else {
            console.log(`Build process exited with code ${code}`);
        }
        startServer();
    });
} else {
    console.log('Using existing build');
    startServer();
}

function startServer() {
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

        // Health check endpoint
        if (req.url === '/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                status: 'ok', 
                timestamp: new Date().toISOString(),
                built: fs.existsSync('./dist/index.html'),
                environment: process.env.NODE_ENV || 'development'
            }));
            return;
        }

        // Serve static files
        let filePath;
        if (req.url === '/' || req.url === '/index.html') {
            filePath = fs.existsSync('./dist/index.html') ? './dist/index.html' : './index.html';
        } else {
            // Try to serve from dist directory first
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
                console.error('File read error:', err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    });

    server.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
        console.log(`📊 Health check: http://0.0.0.0:${PORT}/health`);
        console.log(`📁 Serving from: ${fs.existsSync('./dist') ? 'dist/ (production build)' : 'development files'}`);
    });
}