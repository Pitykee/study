import { useProjects } from '../context/ProjectsContext.jsx';

export default function ProjectList() {
  const { projects, loading, error, deleteProject } = useProjects();

  if (loading) return <p>Betöltés…</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (projects.length === 0) return <p className="text-muted">Nincs még adat.</p>;

  async function torol(x) {
    if (!window.confirm(`Biztosan törlöd: ${x.name}?`)) return;
    try {
      await deleteProject(x.id);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <table className="table table-striped bg-white">
      <thead><tr><th>Projekt neve</th><th>Megrendelő</th><th>Határidő</th><th></th></tr></thead>
      <tbody>
        {projects.map((x) => (
          <tr key={x.id}>
            <td>{x.name}</td><td>{x.client}</td><td>{x.deadline}</td>
            <td className="text-end">
              <button className="btn btn-sm btn-outline-danger" onClick={() => torol(x)}>Törlés</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
