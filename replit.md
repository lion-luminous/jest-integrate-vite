# ETHEREAL DEGENERATE TASKCHAIN

## Overview

A cutting-edge Web3 task management platform built with a modern Turbo monorepo architecture. The project combines decentralized blockchain technology with a cyberpunk-themed user interface for managing tasks on the Ethereum network.

## System Architecture

### Monorepo Structure
- **Root**: Turbo configuration and workspace orchestration
- **contracts/**: Ethereum smart contracts using Hardhat and OpenZeppelin
- **server/**: Fastify API server for backend operations
- **web/**: React + TypeScript frontend with Web3 wallet integration

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, Wagmi, RainbowKit
- **Backend**: Fastify with ES modules, static file serving
- **Blockchain**: Hardhat, OpenZeppelin contracts, Ethereum
- **Build System**: Turbo monorepo with parallel execution
- **Styling**: Cyberpunk theme with Orbitron font and neon effects

### Web3 Integration
- RainbowKit for wallet connectivity
- Wagmi for Ethereum interactions
- Viem for low-level blockchain operations
- Smart contract deployment and interaction capabilities

## Key Features

### Design Philosophy
- Cyberpunk aesthetic with neon colors (cyan, purple, pink)
- Orbitron monospace font for futuristic feel
- Gradient backgrounds and glitch effects
- Responsive design for all devices

### Core Functionality
- Decentralized task management on Ethereum
- Web3 wallet integration
- Smart contract deployment interface
- Real-time system status monitoring
- Task matrix initialization

## Development Configuration

### Build Pipeline
- Turbo orchestrates builds across all workspaces
- Parallel development with `turbo run dev --parallel`
- Production builds with dependency management
- Health check endpoints for deployment monitoring

### Deployment Strategy
- Fastify server serves React build from `web/dist`
- Health check at `/health` endpoint
- API routes under `/api` prefix
- Port 5000 for production deployment

## Project Status

- ✅ Monorepo structure initialized
- ✅ Contracts workspace with Hardhat setup
- ✅ Server workspace with Fastify configuration
- ✅ Web workspace with React + Web3 integration
- ✅ Cyberpunk UI theme implementation
- ✅ Build pipeline configuration
- ✅ Development workflow setup

## Recent Changes

- June 27, 2025: Fixed deployment configuration issues
  - Added proper deployment section to .replit file with Cloud Run target
  - Configured correct run command using npm start instead of incorrect printf statement
  - Added production environment variables (NODE_ENV=production, PORT=5000)
  - Fixed build process to include npm install and npm run build steps
  - Removed conflicting replit.toml configuration
  - Ensured proper server startup command for production deployment

- June 27, 2025: Completed ETHEREAL DEGENERATE TASKCHAIN deployment configuration
  - Working Google Firebase authentication on mobile and desktop
  - One-Click Task Creation Wizard with 6 animated templates
  - Fully responsive cyberpunk UI optimized for mobile devices
  - Production build system with Turbo monorepo configuration
  - Deployment-ready Fastify server on port 5000
  - Health check endpoint for monitoring
  - Complete task management system with filtering and real-time updates

## User Preferences

- Design preference: Cyberpunk aesthetic with high contrast neon colors
- Communication style: Simple, everyday language
- Architecture preference: Modern monorepo with clear separation of concerns
- Technology focus: Web3 integration with user-friendly interfaces