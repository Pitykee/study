import { createContext, useContext, useEffect, useState } from "react";

const EmployeesContext = createContext(null);

export function EmployeesProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => {
        if (!res.ok) throw new Error("Hiba: " + res.status);
        return res.json();
      })
      .then((data) => setEmployees(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function addEmployee(data) {
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content.type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Hiba: " + res.status);
    const saved = await res.json();
    setEmployees((elozo) => [...elozo, saved]);
  }

  async function deleteEmployee(id) {
    const res = await fetch(`/api/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Hiba: " + res.status);
    setEmployees((elozo) => elozo.filter((x) => x.id !== id));
  }

  return (
    <EmployeesContext.Provider
      value={{ employees, loading, error, addEmployee, deleteEmployee }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}

export function useEmployees() {
  const ctx = useContext(EmployeesContext);
  if (!ctx)
    throw new Error(
      "useEmployees csak EmployeesProvider-en belül használható!",
    );
  return ctx;
}
