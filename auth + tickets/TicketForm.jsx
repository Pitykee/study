import { useState } from "react";
import { useTickets } from "../context/TicketsContext";

const URES = { title: "", priority: "alacsony", reporter: "" };

export default function TicketForm() {
  const { addTicket } = useTickets();
  const [form, setForm] = useState(URES);
  const [hiba, setHiba] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setHiba(null);
    try {
      await addTicket(form);
      setForm(URES);
    } catch (err) {
      setHiba(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="row g-2mb-3">
      {hiba && <div className="alert alert-danger">{hiba}</div>}
      <div className="col-md-5">
        <input
          name="title"
          className="form-control"
          placeholder="Cím"
          required
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <select
          name="priority"
          className="form-select"
          aria-label="Prioritás:"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="alacsony">alacsony</option>
          <option value="közepes">közepes</option>
          <option value="magas">magas</option>
        </select>
      </div>
      <div className="col-md-2">
        <input
          name="reporter"
          className="form-control"
          placeholder="Bejelentő"
          value={form.reporter}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <button className="btn btn-primary w-100">Hozzáadás</button>
      </div>
    </form>
  );
}
