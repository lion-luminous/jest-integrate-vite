#!/bin/bash

echo "🚀 Starting deployment process..."

# Kill any existing build processes
pkill -f "vite build" 2>/dev/null || true

# Clean and build
echo "📦 Building application..."
npx vite build --mode production

# Check if build was successful
if [ -f "dist/index.html" ]; then
    echo "✅ Build completed successfully"
    echo "📁 Build artifacts:"
    ls -la dist/
    
    # Start production server
    echo "🌐 Starting production server..."
    node http-server.js
else
    echo "❌ Build failed - dist/index.html not found"
    exit 1
fi