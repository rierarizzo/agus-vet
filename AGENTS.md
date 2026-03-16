# AI Agent Instructions for VCA (Veterinaria Cuidado Animal)

Welcome, AI coding agent! This document contains the guidelines, conventions, and operational details you must adhere to when working within this repository. This ensures that the codebase remains consistent, clean, and functional.

## 1. Project Overview

VCA (Veterinaria Cuidado Animal) is a single-page website for a veterinary clinic ("Agus Vet"), built with React 19 and Vite. It features a playful, family-friendly design, section-based smooth scrolling, and a mobile-responsive interface.

- **Stack**: React 19, Vite 6, standard CSS (no CSS frameworks)
- **Architecture**: A simple Single Page Application (SPA). Components are currently kept inline within `src/App.jsx` for simplicity.
- **Styling**: Global and component styles are located in `src/index.css` utilizing CSS custom properties.
- **Language**: UI text and code comments are primarily in Spanish.
- **Data**: Static data (services, testimonials, contact info) is stored in `src/constants.js`

## 2. Core Commands

Use these commands via your Bash tool to interact with the project:

### Build & Development
- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Preview Production Build**: `npm run preview`

### Linting
- **Run ESLint**: `npm run lint`
- **Fix ESLint Issues**: `npm run lint -- --fix` or `npm run lint:fix`

Note: This project uses ESLint 9.x with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`. Configuration is in `eslint.config.js`.

### Testing
- **Current State**: There are **no automated tests** configured in this repository.
- **If Tests Are Added**: Verify the testing framework in `package.json` first (e.g., Vitest, Jest).
- **Single Test (Vitest)**: `npx vitest run path/to/test.file.js`
- **Single Test (Jest)**: `npx jest path/to/test.file.js`
- **Watch Mode (Vitest)**: `npx vitest path/to/test.file.js`
- **Watch Mode (Jest)**: `npx jest path/to/test.file.js --watch`
- **Coverage (Vitest)**: `npx vitest run --coverage`
- **General Test Command**: Use `npm run test` if defined in package.json

## 3. Code Style & Formatting Guidelines

Maintain the existing coding style strictly to avoid unnecessary diffs and formatting issues.

### 3.1. Formatting
- **Semicolons**: Do NOT use semicolons at the end of statements. This is consistent throughout `src/App.jsx` and `src/main.jsx`.
- **Quotes**: Use single quotes (`'`) for JavaScript strings and double quotes (`"`) for JSX attributes.
- **Indentation**: Use 2 spaces for indentation.
- **Trailing Commas**: Use trailing commas in multi-line object literals and arrays.
- **Line Length**: Keep lines under 100 characters where practical.
- **Arrow Functions**: Prefer concise syntax for simple callbacks. Use parentheses for single parameters: `map(x => ...)` vs `map((x, y) => ...)`.

### 3.2. Imports
- Use ES modules (`import`/`export`).
- React imports should come first, followed by third-party libraries, and then local files.
- Order imports by: React core → React DOM → third-party → local components/styles.
- Example ordering:
  ```jsx
  import { useState, useEffect } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App.jsx'
  ```

### 3.3. React Patterns & State Management
- **Functional Components**: Use functional components exclusively. Avoid class components.
- **Hooks**: Rely on React hooks (`useState`, `useEffect`) for state and side effects. Never call hooks inside loops, conditions, or nested functions.
- **Component Structure**: For simplicity, components are currently kept inline in `App.jsx`. If separating components in the future, create new files in `src/components/` and use default exports.
- **Props**: Destructure props in the function signature for clarity: `function MyComponent({ prop1, prop2 }) {}`
- **Event Handlers**: Prefix event handler functions with `handle` (e.g., `handleScroll`, `handleLogoClick`, `handleSubmit`).
- **State Naming**: Use descriptive names for state variables. Boolean states should be prefixed with `is`, `has`, or `should` (e.g., `isLoading`, `hasError`). Exception: simple booleans like `scrolled` or `mobileMenuOpen` are acceptable when context is clear.

### 3.4. Naming Conventions
- **Files**: Use PascalCase for React component files (e.g., `App.jsx`) and camelCase for standard JavaScript files (e.g., `vite.config.js`).
- **Components**: Use PascalCase (e.g., `HeroSection`, `ContactForm`).
- **Variables/Functions**: Use camelCase (e.g., `mobileMenuOpen`, `scrollToSection`).
- **Constants**: Use SCREAMING_SNAKE_CASE for true constants (e.g., `API_BASE_URL`).
- **CSS Classes**: Use kebab-case for CSS class names (e.g., `servicio-card`, `cta-button`). Avoid overly deep nesting in CSS.
- **CSS Variables**: Use kebab-case with descriptive names (e.g., `--primary`, `--space-md`, `--transition-fast`).

### 3.5. Error Handling & Validation
- **Form Validation**: Rely on client-side validation before "submitting" data. Collect errors in an object (e.g., `formErrors`) and display them conditionally in the UI.
- **Error Messages**: Provide user-friendly error messages in Spanish.
- **Try/Catch**: Use `try/catch` blocks around asynchronous operations (if any are introduced later).
- **Graceful Degradation**: Ensure the UI does not break completely if a single interaction fails. Display appropriate fallback UI or messages.

### 3.6. CSS & Styling
- **CSS Variables**: Use CSS variables (custom properties) defined in `:root` for colors, spacing, transitions, and typography. This ensures consistency across the application.
- **Key Variables Available**:
  - Colors: `--primary`, `--secondary`, `--accent`, `--dark`, `--white`, `--cream`, etc.
  - Spacing: `--space-xs` through `--space-3xl`
  - Transitions: `--transition-fast`, `--transition-normal`, `--transition-bounce`
  - Shadows: `--shadow`, `--shadow-hover`, `--shadow-pop`
- **Responsive Design**: Use standard CSS media queries to handle breakpoints. Current breakpoint: `768px` for mobile.
- **Mobile-First**: When adding new responsive styles, consider mobile first.
- **Accessibility**: Include standard accessibility features:
  - `aria-label` on icon-only buttons (e.g., the hamburger menu)
  - `focus-visible` styles for keyboard navigation
  - Respect `prefers-reduced-motion` for animations
  - Ensure minimum touch targets (44px height/width for interactive elements)

## 4. Specific Features & Quirk Handling

When modifying existing features, be aware of the following:

- **Easter Egg**: The logo has a secret easter egg. Clicking it 3 times reveals a toast message. Maintain this state logic (`logoClickCount`, `showSecret`). Do not remove this feature.
- **Smooth Scrolling**: Navigation relies on native `scrollIntoView`. Do not implement heavy third-party scrolling libraries unless absolutely necessary.
- **Mock Forms**: The contact form simulates submission with a `setTimeout`. There is no actual backend integration at this time. Do not add real API calls without explicit instruction.
- **State Management**: The app uses local component state with `useState`. There is no global state management library (Redux, Zustand, etc.).
- **Scroll Compensation**: Sections use `scroll-margin-top: 75px` and the app uses `padding-top: 70px` to compensate for the fixed header. Keep this in mind when modifying header styles.

## 5. Agent Operational Directives

- **Read Before Write**: Always read the target file before attempting to write or edit it. Use the `read` tool to ensure you understand the context.
- **Path Resolution**: Use absolute paths for all file system operations. The root is `/home/keneth/projects/vca`.
- **No Assumptions**: Do not assume the presence of generic packages (like `axios`, `lodash`, `date-fns`). Check `package.json` first.
- **Minimal Changes**: Keep your edits focused. Do not refactor unrelated code while implementing a feature or fixing a bug.
- **Validation**: After making changes to the source code, always run `npm run lint` and `npm run build` to verify that your changes did not introduce syntax errors or break the build process.
- **No Type Checking**: This project does not use TypeScript. Do not add type annotations or `.d.ts` files unless explicitly requested. The `@types/react` packages are dev dependencies for IDE support only.
- **Comments**: The codebase uses minimal comments. Add comments only when necessary to explain complex logic or non-obvious decisions. Use Spanish for user-facing comments if appropriate.

## 6. Project Structure

```
vca/
├── dist/              # Production build output (generated)
├── node_modules/      # Dependencies (generated)
├── public/            # Static assets (favicon, etc.)
├── src/
│   ├── App.jsx        # Main application component
│   ├── constants.js   # Static data (SERVICIOS, TESTIMONIOS, etc.)
│   ├── index.css      # Global styles and CSS variables
│   └── main.jsx       # Application entry point
├── index.html         # HTML template
├── package.json       # Project configuration and dependencies
├── vite.config.js     # Vite configuration
├── eslint.config.js   # ESLint configuration
└── AGENTS.md          # This file
```

## 7. Common Tasks Reference

### Adding a New Section
1. Add the section component/JSX within `App.jsx`
2. Add corresponding styles to `src/index.css`
3. Add navigation button in the `nav` element
4. Ensure `scroll-margin-top` is set for the new section
5. Test responsive behavior

### Adding a New CSS Variable
1. Define in `:root` selector in `src/index.css`
2. Use descriptive kebab-case naming
3. Document logical grouping (color, spacing, transition)

### Modifying Form Behavior
1. The form is a mock submission with `setTimeout`
2. State variables: `formSubmitted`, `formLoading`, `formErrors`
3. Validation function: `validateForm`
4. Submit handler: `handleSubmit`