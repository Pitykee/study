import { useEmployees } from "../context/EmployeesContext.jsx";

export default function EmployeeList() {
  const { employees, loading, error, deleteEmployee } = useEmployees();

  if (loading) return <p>Betöltés...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (employees.length === 0)
    return <p className="text-muted">Nincs még adat.</p>;

  async function torol(x) {
    if (!window.confirm(`Biztosan törlöd: ${x.name}`)) return;
    try {
      await deleteEmployee(x.id);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <table className="table table-striped bg-white">
      <thead>
        <tr>
          <th>Név</th>
          <th>Pozíció</th>
          <th>E-mail</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees.map((x) => (
          <tr key={x.id}>
            <td>{x.name}</td>
            <td>{x.position}</td>
            <td>{x.email}</td>
            <td></td>
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
