import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [hiba, setHiba] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault(); // JAVÍTÁS 2: ne töltse újra az oldalt
    setHiba(null);
    try {
      await login(email);
    } catch (err) {
      setHiba(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card card-body"
      style={{ maxWidth: 400 }}
    >
      <h3 className="h5">Bejelentkezés</h3>
      {hiba && <div className="alert alert-danger py-2">{hiba}</div>}
      <input
        className="form-control mb-2"
        type="email"
        placeholder="anna@ceg.hu"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary">Belépés</button>
      <small className="text-muted mt-2">
        Teszt: anna@ceg.hu vagy peter@ceg.hu
      </small>
    </form>
  );
}
