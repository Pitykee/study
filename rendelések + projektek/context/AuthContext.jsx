import { createContext, useContext, useState, useEffect } from 'react';
import { apiGet } from '../api/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);   // a választható felhasználók (egyszerűsített belépés)
  const [user, setUser] = useState(null);

  useEffect(() => {
    apiGet('/users').then(setUsers);
  }, []);

  function loginAs(id) {
    setUser(users.find((u) => u.id === Number(id)) ?? null);
  }

  return (
    <AuthContext.Provider value={{ user, users, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth csak AuthProvider-en belül használható!');
  return ctx;
}
