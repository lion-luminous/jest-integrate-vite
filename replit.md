# React Todo App with Google Authentication

## Overview

This is a React-based todo application built with TypeScript and Vite. The app features a modern UI using Ant Design components with TailwindCSS styling, state management through Redux Toolkit with persistence, and is prepared for Google Authentication integration via Firebase. The application includes plans for PostgreSQL database integration using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Ant Design (antd) components with custom theming
- **Styling**: TailwindCSS with preflight disabled to avoid conflicts with Ant Design
- **State Management**: Redux Toolkit with Redux Persist for local storage persistence

### Backend Architecture (Planned)
- **Server**: Express.js (dependencies added but not yet implemented)
- **Database**: PostgreSQL with Drizzle ORM (dependency added)
- **Authentication**: Firebase Google Authentication (dependency added)
- **API**: RESTful endpoints for task management and user operations

### Data Storage Solutions
- **Local Storage**: Redux Persist for client-side state persistence
- **Database**: PostgreSQL (planned integration via Drizzle ORM)
- **Authentication**: Firebase Authentication service

## Key Components

### State Management
- **Redux Store**: Centralized state management with two main slices:
  - `tasks.slice.ts`: Manages todo tasks (add, remove, edit, change status)
  - `modal.slice.ts`: Controls modal visibility and data for task editing
- **Persistence**: Redux Persist maintains state across browser sessions

### UI Components
- **Todo**: Main container component organizing the overall layout
- **AddTask**: Form component for creating new tasks with validation
- **Tasks**: Table component displaying tasks with filtering and actions
- **UpdateModal**: Modal for editing existing tasks
- **Actions**: Modular action components (EditTask, DeleteTask, ChangeStatus)

### Task Management
- **Task Structure**: Each task includes ID, title, description, and status
- **Status Types**: NOT_COMPLETED, PENDING, COMPLETED
- **Operations**: Full CRUD operations with optimistic UI updates

## Data Flow

1. **Task Creation**: User inputs → Form validation → Redux action → State update → UI refresh
2. **Task Management**: User actions → Redux dispatchers → State mutations → Component re-renders
3. **Persistence**: State changes → Redux Persist → Local storage → Restoration on app reload
4. **Authentication Flow** (Planned): Login → Firebase Auth → User sync to PostgreSQL → Task association

## External Dependencies

### Core Dependencies
- **React Ecosystem**: react, react-dom, react-redux
- **State Management**: @reduxjs/toolkit, redux-persist
- **UI Framework**: antd, @ant-design/icons
- **Styling**: tailwindcss, clsx, tailwind-merge
- **Utilities**: uuid for unique ID generation

### Planned Integrations
- **Firebase**: firebase, react-firebase-hooks (for Google Authentication)
- **Database**: drizzle-orm (for PostgreSQL integration)
- **Backend**: express, cors (for API server)

### Development Tools
- **Testing**: Jest, @testing-library/react, @testing-library/jest-dom
- **Build Tools**: typescript, vite, @vitejs/plugin-react
- **Code Quality**: eslint, prettier, @typescript-eslint/*

## Deployment Strategy

### Development
- **Local Development**: `npm run dev` starts Vite development server
- **Port Configuration**: Configured for port 5000 (mapped to external port 80)
- **Hot Reload**: Vite provides fast refresh for development

### Production Deployment
- **Build Process**: `npm run build` compiles TypeScript and creates optimized bundle
- **Production Server**: Custom Node.js HTTP server (`http-server.js`) serves static files
- **Deployment Ready**: Configured for Replit Autoscale deployment
- **Health Monitoring**: `/health` endpoint for deployment health checks
- **Client-side Routing**: Proper SPA routing support for React Router

### Deployment Configuration
- **Server**: `http-server.js` - Custom HTTP server without Express dependencies
- **Build Output**: `dist/` directory with optimized production assets
- **Deployment Target**: Replit Autoscale with automatic build and deployment
- **Environment**: Production-ready with proper CORS and static file serving

### Code Quality
- **Linting**: ESLint with TypeScript and React hooks rules
- **Formatting**: Prettier with custom configuration (tabs, single quotes, no trailing commas)
- **Testing**: Jest with React Testing Library setup

## Changelog

- June 26, 2025: Initial React Todo App setup with TypeScript, Vite, and Ant Design
- June 26, 2025: Fixed deployment configuration for Replit Autoscale
  - Created custom HTTP server to avoid Express compatibility issues
  - Configured proper production build process
  - Added deployment health checks and CORS support
  - Resolved "Missing deployment section" error
  - Resolved "Invalid run command" error  
  - Resolved "No proper build process" error
- June 26, 2025: Completed cyberpunk design transformation
  - Evolved from gold-dominant theme to vibrant cyberpunk aesthetic
  - Implemented cyan (#06B6D4), purple (#8B5CF6), and pink (#EC4899) color scheme
  - Updated landing page with animated cyberpunk backgrounds
  - Transformed task table with purple titles and cyan descriptions
  - Applied cyberpunk colors to forms, buttons, and UI elements
  - User verified and approved final design for deployment
- June 26, 2025: Implemented real Firebase Google authentication
  - Replaced mock authentication with actual Firebase integration
  - Configured Firebase using existing environment secrets
  - Added account selection prompt for enhanced user experience
  - Created centralized Firebase configuration in src/firebase/config.ts
  - User confirmed successful implementation
- June 26, 2025: Completed "ETHEREAL DEGENERATE" waterfall animation design
  - Created cascading rainbow color animation for both words
  - Implemented vertical layout with "ETHEREAL" on top, "DEGENERATE" below
  - Added 500ms interval waterfall effect with high contrast colors
  - Integrated neon pink Google logo in slower bouncing orb (3s cycle)
  - Removed all glow effects for clean, sharp appearance
  - Application ready for deployment with no TypeScript errors
- June 26, 2025: Fixed mobile Google authentication and final polish
  - Updated Google sign-in button text to "GOOGLING" with cyberpunk gradient colors
  - Fixed authentication redirect timing to prevent white screen after login
  - Applied cyberpunk background gradient to main todo page
  - Resolved mobile-specific authentication issues
  - User confirmed perfect functionality and approved final color scheme
- June 26, 2025: Resolved deployment configuration and app ready for production
  - Fixed replit.toml deployment configuration for Replit Autoscale
  - Created production-server.js with CommonJS compatibility
  - Resolved ES6 module issues blocking deployment
  - Configured development server deployment approach for fast startup
  - Application fully functional and deployment-ready

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Cyberpunk aesthetic with high contrast colors (cyan, purple, pink) over gold-dominant themes.