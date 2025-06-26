# Merge Conflict Resolution Guide

## Current Status
You have merge conflicts in two files that need manual resolution:
- `package.json` 
- `README.md`

## 1. Fix package.json

Replace the entire conflicted content with this resolved version:

```json
{
        "name": "todo-list",
        "private": true,
        "version": "0.0.0",
        "type": "module",
        "scripts": {
                "dev": "vite",
                "build": "tsc && vite build",
                "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
                "preview": "vite preview",
                "format": "npx prettier . --write",
                "test": "jest",
                "start": "node index.js"
        },
        "dependencies": {
                "@ant-design/icons": "^5.3.1",
                "@reduxjs/toolkit": "^2.2.1",
                "antd": "^5.15.1",
                "clsx": "^2.1.0",
                "punycode": "^2.3.1",
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "react-redux": "^9.1.0",
                "redux-persist": "^6.0.0",
                "tailwind-merge": "^2.2.1",
                "uuid": "^9.0.1",
                "firebase": "^11.9.1",
                "react-firebase-hooks": "^5.1.1",
                "drizzle-orm": "^0.44.2",
                "express": "^5.1.0",
                "cors": "^2.8.5"
        },
        "devDependencies": {
                "@testing-library/jest-dom": "^6.5.0",
                "@testing-library/react": "^16.0.1",
                "@types/jest": "^29.5.12",
                "@types/react": "^18.2.56",
                "@types/react-dom": "^18.2.19",
                "@types/testing-library__react": "^10.0.1",
                "@types/uuid": "^9.0.8",
                "@typescript-eslint/eslint-plugin": "^7.0.2",
                "@typescript-eslint/parser": "^7.0.2",
                "@vitejs/plugin-react": "^4.2.1",
                "autoprefixer": "^10.4.18",
                "babel-jest": "^29.7.0",
                "eslint": "^8.56.0",
                "eslint-plugin-react-hooks": "^4.6.0",
                "eslint-plugin-react-refresh": "^0.4.5",
                "jest": "^29.7.0",
                "jest-environment-jsdom": "^29.7.0",
                "postcss": "^8.4.35",
                "prettier": "3.2.5",
                "tailwindcss": "^3.4.1",
                "ts-jest": "^29.2.5",
                "ts-node": "^10.9.2",
                "typescript": "^5.6.2",
                "vite": "^5.1.4",
                "drizzle-kit": "^0.31.3",
                "@types/cors": "^2.8.19",
                "@types/express": "^5.0.3"
        }
}
```

Key changes:
- Kept Olena's original project name and structure
- Added "start": "node index.js" script for deployment
- Added Google Login dependencies: firebase, react-firebase-hooks
- Added backend dependencies: drizzle-orm, express, cors
- Added TypeScript types for backend packages

## 2. Commands to run after fixing conflicts

```bash
git add package.json README.md
git rebase --continue
git push -f origin feature/google-login
```

## 3. Open PR
https://github.com/lion-luminous/jest-integrate-vite/compare/master...MarkMlynski:feature/google-login

## 2. Fix README.md

Replace the conflicted content with this resolved version:

```markdown
# React Todo App with Google Login

A todo app to write remind your daily tasks, now enhanced with Google Authentication and PostgreSQL integration.

Currently tech stacks:

- React Vite + Typescript
- Redux toolkit
- Redux persist
- Ant Design
- TailwindCSS
- Firebase Google Authentication
- PostgreSQL with Drizzle ORM
- Ethereal-Degenerate cyber-punk styling

## How to run this app locally

- Clone this source code `git clone https://github.com/lion-luminous/jest-integrate-vite.git`

- Run `npm i` to setup libraries

- Run `npm run dev` to start the app

- Run `npm run build` to build for production

- Run `npm start` to start the production server

- Note: To format the source code, run `npm run format` and `npm run lint` to check lint

## Features

- **Google Login**: Secure authentication via Firebase
- **User Management**: Automatic user sync to PostgreSQL database  
- **Task Management**: Full CRUD operations for todo items
- **Modern Styling**: Cyber-punk themed UI with cascading animations
- **Deployment Ready**: Platform-compliant server configuration

## Usage

- This is the initial UI, we have 2 sections: **_Form_** and **_Table_**

`Form`: Add a new task

`Table`: Show your added tasks

- Google Login button allows secure authentication
- User data is automatically synced to PostgreSQL database
- Tasks are persistent and tied to authenticated users

#### Happy hacking!
```

Key changes:
- Kept Olena's original structure and tone
- Added Google Login and PostgreSQL features to the description
- Added new tech stack items (Firebase, PostgreSQL, Drizzle ORM)
- Added npm start command for deployment
- Mentioned the new authentication and database features

This resolution keeps Olena's original project structure while adding all the Google Login and PostgreSQL integration dependencies you implemented.