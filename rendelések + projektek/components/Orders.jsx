import { useState, useEffect } from 'react';
import { apiGet } from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiGet('/products').then(setProducts);
  }, []);

  // a bejelentkezett felhasználó rendelései
  useEffect(() => {
    if (!user) return;
    apiGet(`/orders?userId=${user.id}`).then(setOrders);
  }, [user]);   // JAVÍTÁS 1: bejelentkezéskor / váltáskor újratölt

  const termek = (id) => products.find((p) => p.id === id);

  if (!user) return <p className="text-muted">Válassz felhasználót a rendelések megtekintéséhez.</p>;

  return (
    <>
      {user.role === 'admin' /* JAVÍTÁS 2: kisbetűvel van az adatbázisban */ && (
        <div className="alert alert-info">Admin nézet: minden rendelést kezelhetsz.</div>
      )}
      <h3 className="h5">{user.name} rendelései</h3>
      <table className="table table-striped bg-white">
        <thead><tr><th>Dátum</th><th>Termék</th><th>Db</th><th className="text-end">Összeg</th></tr></thead>
        <tbody>
          {orders.map((o) => {
            const p = termek(o.productId);
            return (
              <tr key={o.id}>
                <td>{o.date}</td>
                <td>{p?.name ?? '…'}</td>
                <td>{o.quantity}</td>
                <td className="text-end">{p ? (p.price * o.quantity).toLocaleString('hu-HU') : '…'} Ft</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
