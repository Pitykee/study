import { createContext, useContext, useState, useEffect } from 'react';
import { apiGet, apiPost, apiDelete } from '../api/api.js';

const BrandsContext = createContext(null);

export function BrandsProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) LISTA betöltése az API-ból, egyszer
  useEffect(() => {
    apiGet('/brands')
      .then(setBrands)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // 2) HOZZÁADÁS: a backend visszaadja az elmentett elemet (id-vel együtt)
  async function addBrand(data) {
    const saved = await apiPost('/brands', data);
    setBrands((elozo) => [...elozo, saved]);          // új tömb!
  }

  // 3) TÖRLÉS: előbb a backendből, utána a listából
  async function deleteBrand(id) {
    await apiDelete(`/brands/${id}`);
    setBrands((elozo) => elozo.filter((x) => x.id !== id));
  }

  return (
    <BrandsContext.Provider value={{ brands, loading, error, addBrand, deleteBrand }}>
      {children}
    </BrandsContext.Provider>
  );
}

export function useBrands() {
  const ctx = useContext(BrandsContext);
  if (!ctx) throw new Error('useBrands csak BrandsProvider-en belül használható!');
  return ctx;
}
