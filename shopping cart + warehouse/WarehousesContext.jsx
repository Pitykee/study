import { createContext, useContext, useEffect, useState } from "react";

const WarehousesContext = createContext(null);

export function WarehousesProvider({ children }) {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/warehouses")
      .then((res) => {
        if (!res.ok) throw new Error("Hiba: " + res.status);
        return res.json();
      })
      .then((data) => setWarehouses(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function addWarehouse(data) {
    const res = await fetch("api/warehouses", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Hiba: " + res.status);
    const saved = await res.json();
    setWarehouses((elozo) => [...elozo, saved]);
  }

  async function deleteWarehouse(id) {
    const res = await fetch(`/api/warehouses/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("hiba: " + res.status);
    setWarehouses((elozo) => elozo.filter((x) => x.id !== id));
  }

  return (
    <WarehousesContext.Provider
      value={{ warehouses, loading, error, addWarehouse, deleteWarehouse }}
    >
      {children}
    </WarehousesContext.Provider>
  );
}

export function useWarehouses() {
  const ctx = useContext(WarehousesContext);
  if (!ctx)
    throw new Error(
      "useWarehouses csak WarehousesProvider-en belül használható!",
    );
  return ctx;
}
