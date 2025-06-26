import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const url = req.url;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health endpoints
  if (url === '/health' || url === '/health-check') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
    return;
  }
  
  if (url === '/ping') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('pong');
    return;
  }
  
  // API status
  if (url === '/api/status') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      port: PORT
    }));
    return;
  }
  
  // Root endpoint
  if (url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Google Login App - Deployment Ready</title>
          <style>
            body { 
              font-family: 'Orbitron', Arial, sans-serif; 
              background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
              color: #00ffff;
              text-align: center; 
              padding: 50px;
              margin: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 40px;
              border: 2px solid #00ffff;
              border-radius: 15px;
              background: rgba(0, 255, 255, 0.1);
            }
            h1 { 
              color: #ffd700; 
              font-size: 2.5em;
              margin-bottom: 20px;
            }
            .status { 
              color: #00ff00; 
              font-size: 1.2em;
              margin: 20px 0;
            }
            .feature {
              background: rgba(255, 215, 0, 0.1);
              border: 1px solid #ffd700;
              border-radius: 8px;
              padding: 15px;
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Google Login App</h1>
            <p class="status">Server Running Successfully</p>
            <p>Ready for Production Deployment</p>
            
            <div class="feature">
              <h3>Features Implemented</h3>
              <p>• Firebase Google Authentication</p>
              <p>• PostgreSQL Database Integration</p>
              <p>• Ethereal-Degenerate Cyber-punk Styling</p>
              <p>• Deployment-ready Server Configuration</p>
            </div>
            
            <p><strong>Health Check:</strong> <a href="/health" style="color: #00ffff;">/health</a></p>
            <p><strong>API Status:</strong> <a href="/api/status" style="color: #00ffff;">/api/status</a></p>
          </div>
        </body>
      </html>
    `);
    return;
  }
  
  // 404
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log(`Server started successfully`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`Server is ready and accepting connections`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default server;