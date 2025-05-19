import axios from 'axios';
import { getStoredAuthTokens, clearStoredTokens } from '../utils/authStorage';

const API_BASE_URL = (window as any).APP_CONFIG?.API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const tokens = getStoredAuthTokens();
    if (tokens && tokens.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already tried to refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        await refreshToken();
        
        // Get the new token
        const tokens = getStoredAuthTokens();
        if (tokens && tokens.accessToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
        }
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        clearStoredTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Function to refresh token
export const refreshToken = async () => {
  try {
    const response = await api.post('/api/v1/auth/refresh-token');
    // Store the new tokens
    const tokens = response.data;
    localStorage.setItem('auth_tokens', JSON.stringify({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    }));
    return tokens;
  } catch (error) {
    clearStoredTokens();
    throw error;
  }
};

export default api;