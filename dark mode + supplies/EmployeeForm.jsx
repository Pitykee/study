import { useState } from "react";
import { useEmployees } from "../context/EmployeesContext.jsx";

const URES = { name: "", position: "", email: "" };

export default function EmployeeForm() {
  const { addEmployee } = useEmployees();
  const [form, setForm] = useState(URES);
  const [hiba, setHiba] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setHiba(null);
    try {
      await addEmployee(form);
      setForm(URES);
    } catch (err) {
      setHiba(err.messsage);
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
          name="pasition"
          className="form-control"
          placeholder="Pozíció"
          required
          value={form.position}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          name="email"
          className="form-control"
          placeholder="E-mail"
          required
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <button className="btn btn-primary w-100">Hozzáadás</button>
      </div>
    </form>
  );
}
