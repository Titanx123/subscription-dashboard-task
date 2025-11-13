# React + Vite + Tailwind CSS Setup

This document describes the setup and configuration for the React + Vite + Tailwind CSS project.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Project Structure

```
client/
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Main App component
│   ├── index.css         # Tailwind CSS imports
│   └── App.css           # Additional styles
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Dependencies and scripts
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Configuration Files

### 1. Vite Configuration (`vite.config.js`)
- Uses `@vitejs/plugin-react` for React support
- Configured for ES modules

### 2. Tailwind CSS Configuration (`tailwind.config.js`)
- Content paths configured to scan `index.html` and all JS/JSX/TS/TSX files in `src/`
- Theme can be extended as needed

### 3. PostCSS Configuration (`postcss.config.js`)
- Uses `@tailwindcss/postcss` plugin (Tailwind CSS v4)
- Includes `autoprefixer` for browser compatibility

### 4. CSS Entry Point (`src/index.css`)
- Imports Tailwind CSS using the v4 syntax: `@import "tailwindcss";`

## Available Scripts

- `npm run dev` - Start development server with hot module replacement (HMR)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Tailwind CSS Usage

Tailwind CSS is configured and ready to use. You can use Tailwind utility classes directly in your JSX:

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind!
</div>
```

## Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` directory.

## Verification

The setup includes a test component in `App.jsx` that demonstrates Tailwind CSS is working correctly with various color utilities.

## Troubleshooting

1. **Tailwind styles not applying**: 
   - Ensure `src/index.css` is imported in `main.jsx`
   - Check that PostCSS is configured correctly
   - Verify content paths in `tailwind.config.js`

2. **Build errors**:
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

3. **HMR not working**:
   - Restart the dev server
   - Clear browser cache

