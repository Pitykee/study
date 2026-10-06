import { createContext, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";

const CustormersContext = createContext(null);

export function CustomersProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => {
        if (!res.ok) throw new Error("Hiba: " + res.status);
        return res.json();
      })
      .then((data) => setCustomers(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function addCustomer(data) {
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Hiba: " + res.status);
    const saved = await res.json();
    setCustomers((elozo) => [...elozo, saved]);
  }

  async function deleteCustomer(id) {
    const res = await fetch(`/api/customers/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Hiba: " + res.status);
    setCustomers((elozo) => elozo.filter((x) => x.id !== id));
  }

  return (
    <CustormersContext.Provider
      value={{ customers, loading, error, addCustomer, deleteCustomer }}
    >
      {children}
    </CustormersContext.Provider>
  );
}

export function useCustomers() {
  const ctx = useContext(CustormersContext);
  if (!ctx)
    throw new Error(
      "useCustomers csak CustomersProvider-en belül használható!",
    );
  return ctx;
}
