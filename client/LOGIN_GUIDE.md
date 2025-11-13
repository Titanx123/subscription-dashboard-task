# Frontend Login Guide

## Quick Start

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
   Server should run on `http://localhost:8001`

2. **Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```
   Frontend should run on `http://localhost:5173`

3. **Login with admin credentials:**
   - Email: `admin@example.com`
   - Password: `Admin@123`

## Login Flow

1. User enters email and password in the login form
2. Form validation checks for valid email format and required fields
3. `authStore.login()` is called with credentials
4. API request is sent to `/api/auth/login`
5. Backend validates credentials and returns JWT tokens
6. Tokens are stored in Zustand store (persisted to localStorage)
7. User is redirected based on role:
   - Admin → `/admin`
   - Regular user → `/dashboard`

## Environment Variables

Create a `.env` file in the `client` directory (optional):

```env
VITE_BACKEND_URL=http://localhost:8001
```

If not set, it defaults to `http://localhost:8001`

## Troubleshooting

### Login fails with "Unable to connect to server"
- **Check:** Is the backend server running?
- **Solution:** Start the server with `cd server && npm run dev`

### Login fails with "Invalid email or password"
- **Check:** Are you using the correct credentials?
- **Solution:** Use `admin@example.com` / `Admin@123` or run seed script:
  ```bash
  cd server
  npm run seed
  ```

### CORS errors in browser console
- **Check:** Backend CORS configuration
- **Solution:** Ensure backend allows requests from `http://localhost:5173`

### Network errors
- **Check:** Backend URL in `api.js` matches your server port
- **Solution:** Update `VITE_BACKEND_URL` in `.env` or check server is on port 8001

### Tokens not persisting
- **Check:** Browser localStorage is enabled
- **Solution:** Check browser console for errors, clear localStorage and try again

## Test Credentials

After running `npm run seed` in the server directory:

- **Admin:** `admin@example.com` / `Admin@123`
- **User 1:** `john@example.com` / `Test@123`
- **User 2:** `jane@example.com` / `Test@123`
- **User 3:** `bob@example.com` / `Test@123`

## API Endpoints

- **Login:** `POST /api/auth/login`
- **Register:** `POST /api/auth/register`
- **Refresh Token:** `POST /api/auth/refresh`
- **Logout:** `POST /api/auth/logout`

## Code Structure

- **Login Component:** `src/pages/Login.jsx`
- **Auth Store:** `src/store/authStore.js`
- **API Service:** `src/services/api.js`
- **Protected Routes:** `src/components/ProtectedRoute.jsx`
- **Admin Routes:** `src/components/AdminRoute.jsx`

