#!/bin/bash

# ETHEREAL DEGENERATE TASKCHAIN Deployment Script
# This script handles the complete deployment process for Cloud Run

set -e

echo "🚀 Starting ETHEREAL DEGENERATE TASKCHAIN deployment..."

# Set environment variables for production
export NODE_ENV=production
export PORT=5000

# Navigate to project directory
cd eth-degen-taskchain

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building application..."
npm run build

echo "✅ Build complete! Starting server..."
npm start