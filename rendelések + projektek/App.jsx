import { AuthProvider } from './context/AuthContext.jsx';
import UserSwitcher from './components/UserSwitcher.jsx';
import Orders from './components/Orders.jsx';
import { ProjectsProvider } from './context/ProjectsContext.jsx';
import ProjectForm from './components/ProjectForm.jsx';
import ProjectList from './components/ProjectList.jsx';

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

// ÚJ FUNKCIÓ: a(z) projects tábla listája, hozzáadás és törlés
export default function App() {
  return (
    <>
      <MeglevoResz />

      <hr className="my-5" />
      <ProjectsProvider>
        <h2 className="h4 mb-3">Projektek</h2>
        <ProjectForm />
        <ProjectList />
      </ProjectsProvider>
    </>
  );
}
