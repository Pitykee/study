import Header from "./components/Header.jsx";
import LoginForm from "./components/LoginForm.jsx";
import TicketForm from "./components/TicketForm.jsx";
import TicketList from "./components/TicketList.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { TicketsProvider } from "./context/TicketsContext.jsx";

function Tartalom() {
  const { user } = useAuth();
  if (!user) return <LoginForm />;
  return (
    <div className="alert alert-success">
      Üdv, <strong>{user.name}</strong>! Szerepkör: {user.role}
    </div>
  );
}

function MeglevoResz() {
  return (
    <AuthProvider>
      <Header />
      <Tartalom />
    </AuthProvider>
  );
}

export default function App() {
  return (
    <>
      {/* 1. RÉSZ – DEBUG: a meglévő funkció (2 rejtett hiba van benne) */}
      <MeglevoResz />

      <hr className="my-5" />
      <TicketsProvider>
        <h2 className="h4 mb-3">Hibajegyek</h2>
        <TicketForm />
        <TicketList />
      </TicketsProvider>
      {/* 2. RÉSZ – ÚJ FUNKCIÓ: ide kerüljön a(z) "tickets" tábla listája,
          hozzáadás és törlés (lásd README.md). A Context a src/context/,
          a komponensek a src/components/ mappába kerüljenek. */}
    </>
  );
}
