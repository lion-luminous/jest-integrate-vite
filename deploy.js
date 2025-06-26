#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment process...');

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
    console.log('📦 Building React application...');
    try {
        execSync('npm run build', { stdio: 'inherit' });
        console.log('✅ Build completed successfully');
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Start the preview server for production
console.log('🌐 Starting production server...');
try {
    execSync('npm run preview', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
}