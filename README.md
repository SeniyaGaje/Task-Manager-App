# Task Manager Pro

A Trello-inspired task management application built with React, featuring boards, lists, and tasks.

## Features

- Browse boards from the main page
- View detailed board with multiple task lists
- Add, edit, move, and delete tasks
- Mark tasks as favorites and see favorite count
- Toggle between light and dark themes

## Technologies Used

### React and React Router

- Used React for building the UI components
- Implemented React Router v6 for navigation between pages
- Created routes for boards list (/boards) and individual boards (/boards/:id)

### Ant Design and SCSS

- Utilized Ant Design components for UI elements (Card, Button, Modal, Form, etc.)
- Created custom SCSS styling for a clean, professional look
- Implemented responsive design for different screen sizes

### State Management

- Used `useReducer` for managing complex board state
- Created actions for task operations (add, update, move, delete)
- Maintained favorite tasks count across the application

### Custom Hooks

- Created `useBoardApi` hook to handle API requests and manage loading/error states
- Simplified component code by abstracting API logic

### Mock API

- Implemented a mock API service to simulate backend functionality
- Created methods for all CRUD operations (GET, POST, PUT, DELETE)

## Extra Feature

I implemented the **Board Theme** feature, allowing users to toggle between light and dark modes. The implementation includes:

- Theme toggle button in the board header
- CSS variables for theme colors
- Smooth transitions between themes
- Persistence of theme preference using React state

## Design Decisions

1. **Component Structure**:
   - Separated concerns into distinct components (Board, TaskList, TaskCard)
   - Used container/presentational pattern for better code organization

2. **Task Operations**:
   - Provided intuitive UI for task management
   - Implemented confirmation dialogs for destructive actions
   - Added visual feedback for favorite tasks

3. **User Experience**:
   - Created smooth animations for card interactions
   - Implemented responsive design for mobile and desktop
   - Used consistent styling based on Jira/Trello inspiration

4. **Code Organization**:
   - Separated styles into component-specific SCSS files
   - Used SCSS variables and mixins for consistent theming
   - Implemented clean, documented code with clear naming conventions

