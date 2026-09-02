import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface AuthContextValue {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('memories_token'));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('memories_username'));

  const value = useMemo(
    () => ({
      token,
      username,
      isAuthenticated: Boolean(token),
      login: (newToken: string, newUsername: string) => {
        localStorage.setItem('memories_token', newToken);
        localStorage.setItem('memories_username', newUsername);
        setToken(newToken);
        setUsername(newUsername);
      },
      logout: () => {
        localStorage.removeItem('memories_token');
        localStorage.removeItem('memories_username');
        setToken(null);
        setUsername(null);
      },
    }),
    [token, username]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
