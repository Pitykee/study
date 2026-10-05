import { useState, useEffect } from "react";
import { apiGet } from "../api/api.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductGrid() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [hiba, setHiba] = useState(null);

  useEffect(() => {
    apiGet("/products")
      .then(setProducts)
      .catch((e) => setHiba(e.message));
  }, []);

  if (hiba) return <div className="alert alert-danger">{hiba}</div>;

  return (
    <div className="row g-3">
      {products.map((p) => (
        <div className="col-12 col-md-6 col-lg-3" key={p.id}>
          <div className="card h-100">
            <div className="card-body d-flex flex-column">
              <h3 className="h6">{p.name}</h3>
              <p className="fw-bold">{p.price.toLocaleString("hu-HU")} Ft</p>
              <button
                className="btn btn-sm btn-primary mt-auto"
                onClick={() => addToCart(p)}
              >
                Kosárba
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
