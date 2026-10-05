import { ThemeProvider } from "./context/ThemeContext.jsx";
import Panel from "./components/Panel.jsx";
import { EmployeesProvider } from "./context/EmployeesContext.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeList from "./components/EmployeeList.jsx";

function MeglevoResz() {
  return (
    <ThemeProvider>
      <Panel />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <>
      {/* 1. RÉSZ – DEBUG: a meglévő funkció (2 rejtett hiba van benne) */}
      <MeglevoResz />

      <hr className="my-5" />

      <EmployeesProvider>
        <h2 className="h4 mb-3">Alkalmazottak</h2>
        <EmployeeForm />
        <EmployeeList />
      </EmployeesProvider>

      {/* 2. RÉSZ – ÚJ FUNKCIÓ: ide kerüljön a(z) "employees" tábla listája,
          hozzáadás és törlés (lásd README.md). A Context a src/context/,
          a komponensek a src/components/ mappába kerüljenek. */}
    </>
  );
}
