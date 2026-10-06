import { AuthProvider } from "./context/AuthContext.jsx";
import UserSwitcher from "./components/UserSwitcher.jsx";
import Orders from "./components/Orders.jsx";
import { ProjectsProvider } from "./context/ProjectsContext.jsx";
import ProjectForm from "./components/ProjectForm.jsx";
import ProjectList from "./components/ProjectList.jsx";

function MeglevoResz() {
  return (
    <AuthProvider>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 m-0">Rendelések</h2>
        <UserSwitcher />
      </div>
      <Orders />
    </AuthProvider>
  );
}

export default function App() {
  return (
    <>
      {/* 1. RÉSZ – DEBUG: a meglévő funkció (2 rejtett hiba van benne) */}
      <MeglevoResz />

      <hr className="my-5" />

      <ProjectsProvider>
        <h2 className="h4 mb-3">Projektek</h2>
        <ProjectForm />
        <ProjectList />
      </ProjectsProvider>
      {/* 2. RÉSZ – ÚJ FUNKCIÓ: ide kerüljön a(z) "projects" tábla listája,
          hozzáadás és törlés (lásd README.md). A Context a src/context/,
          a komponensek a src/components/ mappába kerüljenek. */}
    </>
  );
}
