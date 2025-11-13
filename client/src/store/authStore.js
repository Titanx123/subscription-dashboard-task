import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
        if (accessToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }
      },

      login: async (email, password) => {
        try {
          set({ isLoading: true });
          const response = await api.post('/api/auth/login', { email, password });
          
          if (response.data.success && response.data.data) {
            const { user, accessToken, refreshToken } = response.data.data;
            
            set({
              user,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
            
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            
            return { success: true };
          } else {
            set({ isLoading: false });
            return {
              success: false,
              message: response.data.message || 'Login failed',
            };
          }
        } catch (error) {
          set({ isLoading: false });
          
          // Handle different error types
          let errorMessage = 'Login failed. Please check your credentials.';
          
          if (error.response) {
            // Server responded with error status
            errorMessage = error.response.data?.message 
              || error.response.data?.errors?.[0]?.message
              || `Server error: ${error.response.status}`;
          } else if (error.request) {
            // Request was made but no response received
            errorMessage = 'Unable to connect to server. Please check if the backend is running.';
            console.error('Network error:', error.request);
          } else {
            // Something else happened
            errorMessage = error.message || errorMessage;
          }
          
          return {
            success: false,
            message: errorMessage,
          };
        }
      },

      register: async (name, email, password) => {
        try {
          set({ isLoading: true });
          const response = await api.post('/api/auth/register', { name, email, password });
          const { user, accessToken, refreshToken } = response.data.data;
          
          set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
          
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            message: error.response?.data?.message || 'Registration failed',
          };
        }
      },

      logout: async () => {
        try {
          await api.post('/api/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          delete api.defaults.headers.common['Authorization'];
        }
      },

      refreshAccessToken: async () => {
        try {
          const { refreshToken } = get();
          if (!refreshToken) return false;

          const response = await api.post('/api/auth/refresh', { refreshToken });
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;
          
          set({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });
          
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          
          return true;
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().logout();
          return false;
        }
      },

      checkAuth: () => {
        const { accessToken } = get();
        if (accessToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          set({ isAuthenticated: true });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);