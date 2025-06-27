# ETHEREAL DEGENERATE TASKCHAIN

A cutting-edge Web3 task management platform with cyberpunk aesthetics, featuring Google Firebase authentication and animated task creation wizards.

## Features

- 🔥 Google Firebase Authentication
- ⚡ One-Click Task Creation Wizard with 6 pre-built templates
- 🎮 Cyberpunk-themed UI with smooth animations
- 📱 Fully responsive design (mobile-optimized)
- 🚀 Real-time task management and tracking
- 🌐 Web3-ready architecture

## Deployment

This application is configured for Replit Deployments:

1. **Build Command**: `npm run build`
2. **Start Command**: `node server/index.js`
3. **Port**: 5000
4. **Health Check**: `/health`

### Environment Variables Required

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`

### Architecture

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Fastify server serving static files
- **Authentication**: Google Firebase Auth
- **Build System**: Turbo monorepo
- **Deployment**: Replit Cloud Run

## Development

```bash
# Install dependencies
npm install

# Build all workspaces
npm run build

# Start production server
npm start

# Development mode
npm run dev
```

## Project Structure

```
eth-degen-taskchain/
├── contracts/          # Smart contract placeholders
├── server/             # Fastify backend + static files
├── web/                # React frontend application
├── turbo.json          # Monorepo build configuration
└── package.json        # Root workspace configuration
```