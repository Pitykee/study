import { ProductsProvider } from './context/ProductsContext.jsx';
import ProductForm from './components/ProductForm.jsx';
import ProductTable from './components/ProductTable.jsx';
import { BrandsProvider } from './context/BrandsContext.jsx';
import BrandForm from './components/BrandForm.jsx';
import BrandList from './components/BrandList.jsx';

function MeglevoResz() {
  return (
    <ProductsProvider>
      <h2 className="h4 mb-3">Termékkezelő</h2>
      <ProductForm />
      <ProductTable />
    </ProductsProvider>
  );
}

// ÚJ FUNKCIÓ: a(z) brands tábla listája, hozzáadás és törlés
export default function App() {
  return (
    <>
      <MeglevoResz />

      <hr className="my-5" />
      <BrandsProvider>
        <h2 className="h4 mb-3">Márkák</h2>
        <BrandForm />
        <BrandList />
      </BrandsProvider>
    </>
  );
}
