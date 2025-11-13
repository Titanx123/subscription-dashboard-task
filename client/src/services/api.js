import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.response?.data?.code === 'TOKEN_EXPIRED' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token from localStorage
        const authStorage = localStorage.getItem('auth-storage');
        if (!authStorage) throw new Error('No auth data');

        const { state } = JSON.parse(authStorage);
        const { refreshToken } = state;

        if (!refreshToken) throw new Error('No refresh token');

        // Request new access token
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001'}/api/auth/refresh`,
          { refreshToken }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        // Update stored tokens
        const updatedState = {
          ...state,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };
        localStorage.setItem('auth-storage', JSON.stringify({ state: updatedState }));

        // Update request header
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;