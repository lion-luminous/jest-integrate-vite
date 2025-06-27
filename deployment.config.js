// Deployment configuration for ETHEREAL DEGENERATE TASKCHAIN
// This file documents the deployment requirements for Cloud Run

module.exports = {
  // Cloud Run deployment configuration
  deployment: {
    target: 'cloudrun',
    buildCommand: 'npm install && npm run build',
    runCommand: 'npm start',
    port: 5000,
    healthCheck: '/health'
  },
  
  // Environment variables for production
  environment: {
    NODE_ENV: 'production',
    PORT: '5000'
  },
  
  // Build process
  build: {
    steps: [
      'npm install',
      'npm run build'
    ],
    output: 'server/dist and static files'
  },
  
  // Runtime configuration
  runtime: {
    startCommand: 'node server/index.js',
    workingDirectory: 'eth-degen-taskchain',
    healthEndpoint: '/health'
  }
};