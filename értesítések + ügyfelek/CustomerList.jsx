import { useCustomers } from "../context/CustomersContext.jsx";

export default function CustomerList() {
  const { customers, loading, error, deleteCustomer } = useCustomers();

  if (loading) return <p>Betöltés…</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (customers.length === 0)
    return <p className="text-muted">Nincs még adat.</p>;

  async function torol(x) {
    if (!window.confirm(`Biztosan törlöd: ${x.name}?`)) return;
    try {
      await deleteCustomer(x.id);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <table className="table table-striped bg-white">
      <thead>
        <tr>
          <th>Név</th>
          <th>E-mail</th>
          <th>Telefon</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customers.map((x) => (
          <tr key={x.id}>
            <td>{x.name}</td>
            <td>{x.email}</td>
            <td>{x.phone || "-"}</td>
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
