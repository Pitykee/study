import { useEffect, useState } from "react";
import { useWarehouses } from "../context/WarehousesContext.jsx";

const URES = { name: "", city: "", capacity: "" };

export default function WarehouseForm() {
  const { addWarehouse } = useWarehouses();
  const [form, setForm] = useState(URES);
  const [hiba, setHiba] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setHiba(null);
    try {
      await addWarehouse({ ...form, capacity: Number(form.capacity) });
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
          name="city"
          className="form-control"
          placeholder="Város"
          required
          value={form.city}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          name="capacity"
          type="number"
          min="0"
          className="form-control"
          placeholder="Kapacitás (db)"
          required
          value={form.capacity}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <button className="btn btn-primary w-100">Hozzáadás</button>
      </div>
    </form>
  );
}
