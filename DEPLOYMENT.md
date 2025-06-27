# ETHEREAL DEGENERATE TASKCHAIN - Cloud Run Deployment Guide

## Required .replit Configuration

Since the current .replit file is missing the deployment section, it needs to be updated with the following configuration:

```toml
modules = ["nodejs-20"]
[nix]
packages = ["git"]
channel = "stable-24_05"

[[ports]]
localPort = 3000
externalPort = 3000

[[ports]]
localPort = 5000
externalPort = 80

[deployment]
run = ["sh", "-c", "cd eth-degen-taskchain && npm start"]
build = ["sh", "-c", "cd eth-degen-taskchain && npm install && npm run build"]
deploymentTarget = "cloudrun"

[env]
NODE_ENV = "production"
PORT = "5000"

[workflows]
runButton = "Project"

[[workflows.workflow]]
name = "Project"
mode = "parallel"
author = "agent"

[[workflows.workflow.tasks]]
task = "workflow.run"
args = "ETHEREAL TASKCHAIN"

[[workflows.workflow]]
name = "ETHEREAL TASKCHAIN"
author = "agent"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "cd eth-degen-taskchain && PORT=5000 node server/index.js"
waitForPort = 5000
```

## Current Fixes Applied

### 1. Package.json Scripts Fixed ✅
- Updated `start` script to include proper environment variables
- Added `deploy` script for one-command deployment

### 2. Production Environment Configuration ✅
- Set NODE_ENV=production in start script
- Configured PORT=5000 for Cloud Run compatibility
- Added proper build and start commands

### 3. Health Check Endpoint ✅
- Server has `/health` endpoint returning status
- Configured for Cloud Run health checks
- Proper error handling and logging

### 4. Build Process ✅
- Turbo monorepo build system configured
- Web assets copied to server directory
- Production-ready build pipeline

## Deployment Commands

### Manual Deployment
```bash
# Build the application
cd eth-degen-taskchain
npm install
npm run build

# Start production server
npm start
```

### Automated Deployment
```bash
# Use the deployment script
./deploy.sh
```

## Environment Variables Required

The following environment variables should be set in the Replit deployment:

- `NODE_ENV=production`
- `PORT=5000`
- `VITE_FIREBASE_API_KEY` (for Firebase auth)
- `VITE_FIREBASE_AUTH_DOMAIN` (for Firebase auth)
- `VITE_FIREBASE_PROJECT_ID` (for Firebase auth)

## Cloud Run Configuration

The application is configured for Cloud Run with:

- **Runtime**: Node.js 20
- **Port**: 5000
- **Health Check**: `/health`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Working Directory**: `eth-degen-taskchain`

## Verification

After deployment, verify the application is running by checking:

1. Health endpoint: `https://your-app.replit.app/health`
2. API status: `https://your-app.replit.app/api/status`
3. Main application: `https://your-app.replit.app/`

## Next Steps

1. Update the .replit file with the deployment section above
2. Ensure all environment variables are set in Replit
3. Click the Deploy button in Replit
4. Monitor the deployment logs for any issues

The application is now properly configured for Cloud Run deployment with all necessary build commands, environment variables, and health checks in place.