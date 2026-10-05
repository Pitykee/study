import { useState } from 'react';
import { apiPost } from '../api/api.js';
import { useNotification } from '../context/NotificationContext.jsx';

const URES = { name: '', email: '', city: '' };

export default function SupplierForm({ onAdded }) {
  const { notify } = useNotification();   // JAVÍTÁS 1: a context-ben notify a neve
  const [form, setForm] = useState(URES);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const saved = await apiPost('/suppliers', form);
      onAdded(saved);
      setForm(URES);
      showNotification(`${saved.name} hozzáadva.`);
    } catch (err) {
      showNotification(err.message, 'danger');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-3">
      <div className="col-md-4"><input name="name" className="form-control" placeholder="Név" required value={form.name} onChange={handleChange} /></div>
      <div className="col-md-4"><input name="email" type="email" className="form-control" placeholder="E-mail" required value={form.email} onChange={handleChange} /></div>
      <div className="col-md-2"><input name="city" className="form-control" placeholder="Város" value={form.city} onChange={handleChange} /></div>
      <div className="col-md-2"><button className="btn btn-primary w-100">Hozzáadás</button></div>
    </form>
  );
}
