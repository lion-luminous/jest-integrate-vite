const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 5000;

console.log('Starting deployment server...');

// Function to build app asynchronously 
function buildApp() {
  return new Promise((resolve, reject) => {
    console.log('Starting build process...');
    const buildProcess = spawn('npm', ['run', 'build'], { stdio: 'pipe' });
    
    let buildOutput = '';
    buildProcess.stdout.on('data', (data) => {
      buildOutput += data.toString();
    });
    
    buildProcess.stderr.on('data', (data) => {
      buildOutput += data.toString();
    });
    
    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Build completed successfully');
        resolve();
      } else {
        console.log('Build failed, serving development mode');
        resolve(); // Continue anyway for development deployment
      }
    });
    
    // Timeout after 2 minutes
    setTimeout(() => {
      buildProcess.kill('SIGTERM');
      console.log('Build timed out, serving development mode');
      resolve();
    }, 120000);
  });
}

// Start build in background
buildApp();

// Create server immediately
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = parsedUrl.pathname;

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
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'Todo App Deployment Server'
    }));
    return;
  }

  // Try to serve from dist first, fallback to index.html
  if (pathname === '/' || pathname.endsWith('/')) {
    pathname = '/index.html';
  }

  const distPath = path.join(__dirname, 'dist', pathname);
  const indexPath = path.join(__dirname, 'index.html');
  
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  // Try dist directory first
  fs.readFile(distPath, (err, data) => {
    if (err) {
      // Fallback to development index.html
      fs.readFile(indexPath, (indexErr, indexData) => {
        if (indexErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Application starting... Please refresh in a moment.');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(indexData);
        }
      });
    } else {
      const extname = path.extname(distPath);
      const contentType = mimeTypes[extname] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Deployment server running on http://0.0.0.0:${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
  console.log('Build process running in background...');
});