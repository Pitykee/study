import { useState } from 'react';
import { useCustomers } from '../context/CustomersContext.jsx';

const URES = { name: '', email: '', phone: '' };

export default function CustomerForm() {
  const { addCustomer } = useCustomers();
  const [form, setForm] = useState(URES);
  const [hiba, setHiba] = useState(null);

  // egy kezelő minden mezőhöz: az input name attribútuma dönti el, melyik mező
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setHiba(null);
    try {
      await addCustomer(form);
      setForm(URES);
    } catch (err) {
      setHiba(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-3">
      {hiba && <div className="alert alert-danger">{hiba}</div>}
      <div className="col-md-4">
        <input name="name" className="form-control" placeholder="Név" required
               value={form.name} onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <input name="email" type="email" className="form-control" placeholder="E-mail" required
               value={form.email} onChange={handleChange} />
      </div>
      <div className="col-md-3">
        <input name="phone" className="form-control" placeholder="Telefon"
               value={form.phone} onChange={handleChange} />
      </div>
      <div className="col-md-2">
        <button className="btn btn-primary w-100">Hozzáadás</button>
      </div>
    </form>
  );
}
