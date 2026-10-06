import { useState, useEffect } from "react";
import { apiGet } from "./api/api.js";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import SupplierForm from "./components/SupplierForm.jsx";
import SupplierTable from "./components/SupplierTable.jsx";
import { CustomersProvider } from "./context/CustomersContext.jsx";
import CustomerForm from "./components/CustomerForm.jsx";
import CustomerList from "./components/CustomerList.jsx";

function Beszallitok() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    apiGet("/suppliers").then(setSuppliers);
  }, []);

  return (
    <>
      <h2 className="h4 mb-3">Beszállítók</h2>
      <SupplierForm onAdded={(s) => setSuppliers((elozo) => [...elozo, s])} />
      <SupplierTable suppliers={suppliers} />
    </>
  );
}

function MeglevoResz() {
  return (
    <NotificationProvider>
      <Beszallitok />
    </NotificationProvider>
  );
}

export default function App() {
  return (
    <>
      {/* 1. RÉSZ – DEBUG: a meglévő funkció (2 rejtett hiba van benne) */}
      <MeglevoResz />

      <hr className="my-5" />

      <CustomersProvider>
        <h2 className="h4 mb-3">Ügyfelek</h2>
        <CustomerForm />
        <CustomerList />
      </CustomersProvider>
      {/* 2. RÉSZ – ÚJ FUNKCIÓ: ide kerüljön a(z) "customers" tábla listája,
          hozzáadás és törlés (lásd README.md). A Context a src/context/,
          a komponensek a src/components/ mappába kerüljenek. */}
    </>
  );
}
