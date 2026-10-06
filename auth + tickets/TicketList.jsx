import { useTickets } from "../context/TicketsContext";

export default function TicketList() {
  const { tickets, loading, error, deleteTicket } = useTickets();

  if (loading) return <p>Beltöltés</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (tickets.length === 0)
    return <p className="text-muted">Nincs még adat.</p>;

  async function torol(x) {
    if (!window.confirm(`Biztosan törlöd: ${x.title}?`)) return;
    try {
      await deleteTicket(x.id);
    } catch (err) {
      alert(err.messsage);
    }
  }
  return (
    <table className="table table-striped bg-white">
      <thead>
        <tr>
          <th>Cím</th>
          <th>Priorítás</th>
          <th>Bejelentő</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((x) => (
          <tr key={x.id}>
            <td>{x.title}</td>
            <td>{x.priority}</td>
            <td>{x.reporter || "-"}</td>
            <td className="text-end">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => torol(x)}
              >
                Törlés
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
