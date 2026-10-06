import { useState } from "react";
import { useProducts } from "../context/ProductsContext.jsx";

const URES = { name: "", price: "", categoryId: "1" };

export default function ProductForm() {
  const { categories, addProduct } = useProducts();
  const [form, setForm] = useState(URES);
  const [hiba, setHiba] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // JAVÍTÁS 2: az input szöveget ad, számmá kell alakítani
      await addProduct({
        ...form,
        price: Number(form.price),
        categoryId: Number(form.categoryId),
      });
      setForm(URES);
    } catch (err) {
      setHiba(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-3">
      {hiba && <div className="alert alert-danger">{hiba}</div>}
      <div className="col-md-4">
        <input
          name="name"
          className="form-control"
          placeholder="Név"
          required
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          name="price"
          type="number"
          min="0"
          className="form-control"
          placeholder="Ár"
          required
          value={form.price}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <select
          name="categoryId"
          className="form-select"
          value={form.categoryId}
          onChange={handleChange}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-2">
        <button className="btn btn-primary w-100">Hozzáadás</button>
      </div>
    </form>
  );
}
