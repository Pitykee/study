import { CartProvider } from "./context/CartContext.jsx";
import CartBadge from "./components/CartBadge.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import { WarehousesProvider } from "./context/WarehousesContext.jsx";
import WarehouseForm from "./components/WarehouseForm.jsx";
import WarehouseList from "./components/WarehouseList.jsx";

function MeglevoResz() {
  return (
    <CartProvider>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 m-0">Webshop</h2>
        <CartBadge />
      </div>
      <ProductGrid />
    </CartProvider>
  );
}

export default function App() {
  return (
    <>
      {/* 1. RÉSZ – DEBUG: a meglévő funkció (2 rejtett hiba van benne) */}
      <MeglevoResz />

      <hr className="my-5" />

      <WarehousesProvider>
        <h2 className="h4 mb-3">Raktárak</h2>
        <WarehouseForm />
        <WarehouseList />
      </WarehousesProvider>

      {/* 2. RÉSZ – ÚJ FUNKCIÓ: ide kerüljön a(z) "warehouses" tábla listája,
          hozzáadás és törlés (lásd README.md). A Context a src/context/,
          a komponensek a src/components/ mappába kerüljenek. */}
    </>
  );
}
