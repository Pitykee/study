import { ProductsProvider } from "./context/ProductsContext.jsx";
import ProductForm from "./components/ProductForm.jsx";
import ProductTable from "./components/ProductTable.jsx";
import { BrandsProvider } from "./context/BrandsContext.jsx";
import BrandList from "./components/BrandList.jsx";
import BrandForm from "./components/BrandForm.jsx";

function MeglevoResz() {
  return (
    <ProductsProvider>
      <h2 className="h4 mb-3">Termékkezelő</h2>
      <ProductForm />
      <ProductTable />
    </ProductsProvider>
  );
}

export default function App() {
  return (
    <>
      {/* 1. RÉSZ – DEBUG: a meglévő funkció (2 rejtett hiba van benne) */}
      <MeglevoResz />

      <hr className="my-5" />

      <BrandsProvider>
        <h2 className="h4 mb-3">Márkák</h2>
        <BrandForm />
        <BrandList />
      </BrandsProvider>
      {/* 2. RÉSZ – ÚJ FUNKCIÓ: ide kerüljön a(z) "brands" tábla listája,
          hozzáadás és törlés (lásd README.md). A Context a src/context/,
          a komponensek a src/components/ mappába kerüljenek. */}
    </>
  );
}
