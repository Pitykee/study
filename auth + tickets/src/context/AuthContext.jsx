import { createContext, useContext, useState } from 'react';
import { apiGet } from '../api/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // "Bejelentkezés": e-mail alapján megkeressük a felhasználót az API-ban
  async function login(email) {
    const talalat = await apiGet(`/users?email=${encodeURIComponent(email)}`);
    if (talalat.length === 0) throw new Error('Nincs ilyen felhasználó.');
    setUser(talalat[0]);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
