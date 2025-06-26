import express from 'express';
import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Check if we need to build the app
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

console.log('🚀 Starting production server setup...');

// Build the app if needed
if (!fs.existsSync(indexPath)) {
    console.log('📦 Building React application for production...');
    try {
        // Use faster build without type checking for deployment
        execSync('npx vite build --mode production', { 
            stdio: 'inherit',
            timeout: 120000 // 2 minute timeout
        });
        console.log('✅ Build completed successfully');
    } catch (error) {
        console.error('❌ Build failed, serving development version');
        // Fallback to dev mode if build fails
        console.log('🔄 Starting development server instead...');
        execSync('npm run dev -- --host 0.0.0.0 --port 5000', { stdio: 'inherit' });
        process.exit(0);
    }
}

// Serve static files from dist directory
app.use(express.static(distPath, {
    setHeaders: (res, path) => {
        // Set cache headers for static assets
        if (path.endsWith('.js') || path.endsWith('.css')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
    }
}));

// Handle client-side routing - serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(500).send('Server Error');
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Production server running on http://0.0.0.0:${PORT}`);
    console.log(`🌐 Server is ready and accepting connections`);
    console.log(`📊 Health check available at: http://0.0.0.0:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully');
    process.exit(0);
});