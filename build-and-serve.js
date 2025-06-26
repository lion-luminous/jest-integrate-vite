#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');

console.log('🚀 Preparing React app for deployment...');

// Function to build the app
function buildApp() {
    return new Promise((resolve, reject) => {
        console.log('📦 Building React application...');
        const buildProcess = spawn('npm', ['run', 'build'], { 
            stdio: 'inherit',
            shell: true 
        });
        
        buildProcess.on('close', (code) => {
            if (code === 0) {
                console.log('✅ Build completed successfully');
                resolve();
            } else {
                console.error('❌ Build failed with code:', code);
                reject(new Error(`Build failed with code ${code}`));
            }
        });
    });
}

// Function to serve the app
function serveApp() {
    console.log('🌐 Starting production server on port 5000...');
    const serveProcess = spawn('npx', ['vite', 'preview', '--host', '0.0.0.0', '--port', '5000'], {
        stdio: 'inherit',
        shell: true
    });
    
    serveProcess.on('error', (error) => {
        console.error('❌ Server failed to start:', error.message);
        process.exit(1);
    });
    
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down server...');
        serveProcess.kill();
        process.exit(0);
    });
}

// Main execution
async function main() {
    try {
        // Check if dist exists, if not build it
        if (!fs.existsSync(distPath)) {
            await buildApp();
        } else {
            console.log('📁 Build directory exists, using existing build');
        }
        
        // Start serving
        serveApp();
    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        process.exit(1);
    }
}

main();