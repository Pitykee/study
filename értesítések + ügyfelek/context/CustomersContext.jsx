import { createContext, useContext, useState, useEffect } from 'react';
import { apiGet, apiPost, apiDelete } from '../api/api.js';

const CustomersContext = createContext(null);

export function CustomersProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) LISTA betöltése az API-ból, egyszer
  useEffect(() => {
    apiGet('/customers')
      .then(setCustomers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // 2) HOZZÁADÁS: a backend visszaadja az elmentett elemet (id-vel együtt)
  async function addCustomer(data) {
    const saved = await apiPost('/customers', data);
    setCustomers((elozo) => [...elozo, saved]);          // új tömb!
  }

  // 3) TÖRLÉS: előbb a backendből, utána a listából
  async function deleteCustomer(id) {
    await apiDelete(`/customers/${id}`);
    setCustomers((elozo) => elozo.filter((x) => x.id !== id));
  }

  return (
    <CustomersContext.Provider value={{ customers, loading, error, addCustomer, deleteCustomer }}>
      {children}
    </CustomersContext.Provider>
  );
}

export function useCustomers() {
  const ctx = useContext(CustomersContext);
  if (!ctx) throw new Error('useCustomers csak CustomersProvider-en belül használható!');
  return ctx;
}
