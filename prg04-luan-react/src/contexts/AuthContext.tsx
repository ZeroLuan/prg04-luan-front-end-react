import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  login: (nome: string, email: string, senha: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializa o estado com dados do sessionStorage
  const getInitialUser = (): AuthUser | null => {
    const storedUser = sessionStorage.getItem('usuarioLogado');
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const [user, setUser] = useState<AuthUser | null>(getInitialUser);

  const login = (nome: string, email: string, senha: string): boolean => {
    if (nome && email && senha) {
      const userData: AuthUser = { nome, email };
      sessionStorage.setItem('usuarioLogado', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('usuarioLogado');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
