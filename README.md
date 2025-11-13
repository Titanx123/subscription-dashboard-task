# Subscription Dashboard

This project contains a full-stack subscription management dashboard built with React, Vite, Tailwind CSS, and an Express/MongoDB backend.

## Setup & Run Instructions

### Prerequisites
- Node.js v18 or higher
- npm (bundled with Node.js)
- MongoDB running locally or a MongoDB Atlas connection string

### Backend (Server)
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```env
   PORT=8001
   MONGO_URL=mongodb://localhost:27017/subscription_dashboard
   JWT_ACCESS_SECRET=your-access-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   ```
4. (Optional) Seed the database with demo data:
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend (Client)
1. Open a new terminal window and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Configure the backend URL with a `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:8001
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

## Tech Stack

### Frontend
- React 19 – UI library
- Vite 7 – Build tool and dev server
- Tailwind CSS v4 – Utility-first CSS framework
- Zustand – State management
- Axios – HTTP client
- ESLint – Linting and code quality

### Backend
- Node.js & Express – REST API server
- MongoDB & Mongoose – Database and ODM
- JSON Web Tokens – Authentication
- bcryptjs – Password hashing
- Zod – Request validation

## Project Structure
```
root/
├── client/              # Frontend application
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── App.css
│   └── ...
├── server/              # Backend application
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
└── README.md
```

## Configuration
- **Vite**: `client/vite.config.js` – Vite and React plugin configuration
- **Tailwind**: `client/tailwind.config.js` – Tailwind CSS configuration
- **PostCSS**: `client/postcss.config.js` – PostCSS with Tailwind plugin
- **ESLint**: `client/eslint.config.js` – ESLint rules and React hooks support
- **Server config**: `server/config/database.js` – MongoDB connection helper

## Available Scripts

### Client
- `npm run dev` – Start development server with HMR
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

### Server
- `npm run dev` – Start the Express server with nodemon
- `npm run start` – Start the server in production mode
- `npm run seed` – Seed the database with demo data

## Tailwind CSS
Tailwind CSS v4 is configured and ready to use. Import styles in `client/src/index.css`:
```css
@import "tailwindcss";
```
Use Tailwind utility classes directly in your components:
```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind!
</div>
```

## Development Notes
- The frontend dev server runs on `http://localhost:5173` (or the next available port) with hot module replacement enabled.
- The backend API defaults to `http://localhost:8001` and exposes routes under `/api/*`.
- Authentication uses JWT access and refresh tokens with automatic refresh handling.
- See [client/SETUP.md](./client/SETUP.md) for additional frontend details.

## Maintainer
**Gokulakannan M**  
phone: +91 9361892735
Email: mgokul417@gmail.com.com  
LinkedIn: www.linkedin.com/in/titanxblue
github : https://github.com/Titanx123/subscription-dashboard-task