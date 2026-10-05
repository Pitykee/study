import { useAuth } from '../context/AuthContext.jsx';

export default function UserSwitcher() {
  const { user, users, loginAs } = useAuth();
  return (
    <select className="form-select w-auto" value={user?.id ?? ''} onChange={(e) => loginAs(e.target.value)}>
      <option value="">– Válassz felhasználót –</option>
      {users.map((u) => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
    </select>
  );
}
