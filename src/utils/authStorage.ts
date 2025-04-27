interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const storeAuthTokens = (tokens: AuthTokens): void => {
  localStorage.setItem('auth_tokens', JSON.stringify(tokens));
};

export const getStoredAuthTokens = (): AuthTokens | null => {
  const tokensStr = localStorage.getItem('auth_tokens');
  if (!tokensStr) {
    return null;
  }

  try {
    return JSON.parse(tokensStr) as AuthTokens;
  } catch (error) {
    console.error('Failed to parse auth tokens:', error);
    return null;
  }
};

export const clearStoredTokens = (): void => {
  localStorage.removeItem('auth_tokens');
};

export const isAuthenticated = (): boolean => {
  return !!getStoredAuthTokens()?.accessToken;
};