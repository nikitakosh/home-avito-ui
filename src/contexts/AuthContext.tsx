import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { UserInfoDto, AuthenticationRequest, RegisterRequest } from '../types';
import authService from '../services/authService';
import profileService from '../services/profileService';
import { storeAuthTokens, getStoredAuthTokens, clearStoredTokens, isAuthenticated as checkIsAuthenticated } from '../utils/authStorage';

interface AuthContextType {
  user: UserInfoDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: AuthenticationRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfoDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => checkIsAuthenticated());

  // Load user info on mount if token exists
  useEffect(() => {
    const loadUserInfo = async () => {
      if (isAuthenticated) {
        try {
          const userInfo = await profileService.getProfileInfo();
          setUser(userInfo);
        } catch (error) {
          console.error('Failed to load user info:', error);
          logout();
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, [isAuthenticated]);

  const refreshUserInfo = async () => {
    if (isAuthenticated) {
      try {
        const userInfo = await profileService.getProfileInfo();
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to refresh user info:', error);
      }
    }
  };

  const login = async (data: AuthenticationRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      
      // Store tokens
      storeAuthTokens({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      });
      
      setIsAuthenticated(true);
      
      // Load user info
      await refreshUserInfo();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      
      // Store tokens
      storeAuthTokens({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      });
      
      setIsAuthenticated(true);
      
      // Load user info
      await refreshUserInfo();
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearStoredTokens();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};