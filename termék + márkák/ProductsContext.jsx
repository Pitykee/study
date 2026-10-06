import { createContext, useContext, useState, useEffect } from "react";
import { apiGet, apiPost } from "../api/api.js";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([apiGet("/products"), apiGet("/categories")])
      .then(([p, c]) => {
        setProducts(p);
        setCategories(c);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      }); // JAVÍTÁS 1: sikernél és hibánál is
  }, []);

  async function addProduct(data) {
    const saved = await apiPost("/products", data);
    setProducts((elozo) => [...elozo, saved]);
  }

  return (
    <ProductsContext.Provider
      value={{ products, categories, loading, error, addProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx)
    throw new Error("useProducts csak ProductsProvider-en belül használható!");
  return ctx;
}
