import { createContext, useContext, useEffect, useState } from "react";

const BrandsContext = createContext(null);

export function BrandsProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => {
        if (!res.ok) throw new Error("Szerver hiba: " + res.status);
        return res.json();
      })
      .then((data) => setBrands(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function addBrand(data) {
    const res = await fetch("/api/brands", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Hozzáadás hiba: " + res.status);
    const saved = await res.json();
    setBrands((elozo) => [...elozo, saved]);
  }

  async function deleteBrand(id) {
    const res = await fetch(`/api/brands/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Törlés hiba: " + res.status);
    setBrands((elozo) => elozo.filter((x) => x.id !== id));
  }

  return (
    <BrandsContext.Provider
      value={{ brands, loading, error, addBrand, deleteBrand }}
    >
      {children}
    </BrandsContext.Provider>
  );
}

export function useBrands() {
  const ctx = useContext(BrandsContext);
  if (!ctx)
    throw new Error("useBrands csak BrandsProvider-en belül használható!");
  return ctx;
}
