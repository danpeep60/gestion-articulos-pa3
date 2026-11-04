import { createContext, useContext, useState, type ReactNode } from 'react';
import { http } from '../api/http';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'user';
}

interface AuthContextType {
  user: Usuario | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Revisa que el token exista y no haya vencido
const tokenVigente = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const leerUsuario = (): Usuario | null => {
  if (!tokenVigente()) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(leerUsuario);

  const login = async (email: string, password: string) => {
    const { data } = await http.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return contexto;
}