export default function SupplierTable({ suppliers }) {
  return (
    <table className="table table-striped bg-white">
      <thead><tr><th>Név</th><th>E-mail</th><th>Város</th></tr></thead>
      <tbody>
        {suppliers.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td><td>{s.email}</td><td>{s.city || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
