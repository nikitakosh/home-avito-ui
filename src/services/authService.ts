import api from './api';
import { AuthenticationRequest, RegisterRequest, AuthenticationResponse } from '../types';

const AUTH_ENDPOINTS = {
  REGISTER: '/api/v1/auth/register',
  LOGIN: '/api/v1/auth/authenticate',
  REFRESH_TOKEN: '/api/v1/auth/refresh-token',
};

export const register = async (data: RegisterRequest): Promise<AuthenticationResponse> => {
  const response = await api.post<AuthenticationResponse>(AUTH_ENDPOINTS.REGISTER, data);
  return response.data;
};

export const login = async (data: AuthenticationRequest): Promise<AuthenticationResponse> => {
  const response = await api.post<AuthenticationResponse>(AUTH_ENDPOINTS.LOGIN, data);
  return response.data;
};

export const refreshToken = async (): Promise<void> => {
  await api.post(AUTH_ENDPOINTS.REFRESH_TOKEN);
};

export default {
  register,
  login,
  refreshToken,
};