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

### Production Build
- **Build Process**: `npm run build` compiles TypeScript and creates optimized bundle
- **Preview**: `npm run preview` serves production build locally
- **Static Assets**: Built files ready for static hosting or server deployment

### Code Quality
- **Linting**: ESLint with TypeScript and React hooks rules
- **Formatting**: Prettier with custom configuration (tabs, single quotes, no trailing commas)
- **Testing**: Jest with React Testing Library setup

## Changelog

- June 26, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.