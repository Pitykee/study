import { useWarehouses } from "../context/WarehousesContext.jsx";

export default function WarehouseList() {
  const { warehouses, loading, error, deleteWarehouse } = useWarehouses();

  if (loading) return <p>Betöltés...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (warehouses.length === 0)
    return <p className=" text-muted">Nincs még adat.</p>;

  async function torol(x) {
    if (!window.confirm(`Biztosan törlöd: ${x.name}?`)) return;
    try {
      await deleteWarehouse(x.id);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <table className="table table-striped bg-white">
      <thead>
        <tr>
          <th>Név</th>
          <th>Város</th>
          <th>Kapacitás (db)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {warehouses.map((x) => (
          <tr key={x.id}>
            <td>{x.name}</td>
            <td>{x.city}</td>
            <td>{x.capacity}</td>
            <td className="text-end">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => torol(x)}
              >
                Töröl
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
