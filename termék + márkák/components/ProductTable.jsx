import { useProducts } from '../context/ProductsContext.jsx';

export default function ProductTable() {
  const { products, categories, loading, error } = useProducts();

  if (loading) return <p>Betöltés…</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const kategoria = (id) => categories.find((c) => c.id === id)?.name ?? '-';
  const osszertek = products.reduce((ossz, p) => ossz + p.price, 0);

  return (
    <>
      <table className="table table-striped bg-white">
        <thead><tr><th>Név</th><th>Kategória</th><th className="text-end">Ár</th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{kategoria(p.categoryId)}</td>
              <td className="text-end">{p.price} Ft</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fw-bold">Készlet összértéke: {osszertek} Ft</p>
    </>
  );
}
