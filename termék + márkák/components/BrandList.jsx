import { useBrands } from '../context/BrandsContext.jsx';

export default function BrandList() {
  const { brands, loading, error, deleteBrand } = useBrands();

  if (loading) return <p>Betöltés…</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (brands.length === 0) return <p className="text-muted">Nincs még adat.</p>;

  async function torol(x) {
    if (!window.confirm(`Biztosan törlöd: ${x.name}?`)) return;
    try {
      await deleteBrand(x.id);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <table className="table table-striped bg-white">
      <thead><tr><th>Név</th><th>Ország</th><th></th></tr></thead>
      <tbody>
        {brands.map((x) => (
          <tr key={x.id}>
            <td>{x.name}</td><td>{x.country}</td>
            <td className="text-end">
              <button className="btn btn-sm btn-outline-danger" onClick={() => torol(x)}>Törlés</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
