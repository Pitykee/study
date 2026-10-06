import { useState } from "react";
import { useProjects } from "../context/ProjectsContext.jsx";

const URES = { name: "", client: "", deadline: "" };

export default function ProjectForm() {
  const { addProject } = useProjects();
  const [form, setForm] = useState(URES);
  const [hiba, setHiba] = useState(null);

  // egy kezelő minden mezőhöz: az input name attribútuma dönti el, melyik mező
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setHiba(null);
    try {
      await addProject(form);
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
          placeholder="Projekt neve"
          required
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          name="client"
          className="form-control"
          placeholder="Megrendelő"
          required
          value={form.client}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          name="deadline"
          type="date"
          className="form-control"
          placeholder="Határidő"
          required
          value={form.deadline}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <button className="btn btn-primary w-100">Hozzáadás</button>
      </div>
    </form>
  );
}
