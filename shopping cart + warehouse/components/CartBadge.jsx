import { useCart } from '../context/CartContext.jsx';

export default function CartBadge() {
  const { cart } = useCart();
  const darab = cart.reduce((ossz, t) => ossz + t.qty, 0);
  return <span className="badge bg-primary fs-6">Kosár: {darab} db</span>;
}
