import { createContext, useContext, useEffect, useState } from "react";

const TicketsContext = createContext(null);

export function TicketsProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/tickets")
      .then((res) => {
        if (!res.ok) throw new Error("Hiba: " + res.status);
        return res.json();
      })
      .then((data) => setTickets(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function addTicket(data) {
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Hiba: " + res.status);
    const saved = await res.json();
    setTickets((elozo) => [...elozo, saved]);
  }

  async function deleteTicket(id) {
    const res = await fetch(`/api/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Hiba: " + res.status);
    setTickets((elozo) => elozo.filter((x) => x.id !== id));
  }

  return (
    <TicketsContext.Provider
      value={{ tickets, loading, error, addTicket, deleteTicket }}
    >
      {children}
    </TicketsContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketsContext);
  if (!ctx)
    throw new Error("useTickets csak a TicketsProvider-en belül használható!");
  return ctx;
}
