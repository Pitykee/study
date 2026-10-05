import { useState } from 'react';
import { useBrands } from '../context/BrandsContext.jsx';

const URES = { name: '', country: '' };

export default function BrandForm() {
  const { addBrand } = useBrands();
  const [form, setForm] = useState(URES);
  const [hiba, setHiba] = useState(null);

  // egy kezelő minden mezőhöz: az input name attribútuma dönti el, melyik mező
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setHiba(null);
    try {
      await addBrand(form);
      setForm(URES);
    } catch (err) {
      setHiba(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="row g-2 mb-3">
      {hiba && <div className="alert alert-danger">{hiba}</div>}
      <div className="col-md-5">
        <input name="name" className="form-control" placeholder="Név" required
               value={form.name} onChange={handleChange} />
      </div>
      <div className="col-md-5">
        <input name="country" className="form-control" placeholder="Ország" required
               value={form.country} onChange={handleChange} />
      </div>
      <div className="col-md-2">
        <button className="btn btn-primary w-100">Hozzáadás</button>
      </div>
    </form>
  );
}
