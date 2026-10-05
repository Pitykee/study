import { createContext, useContext, useState, useEffect } from 'react';
import { apiGet, apiPost, apiDelete } from '../api/api.js';

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) LISTA betöltése az API-ból, egyszer
  useEffect(() => {
    apiGet('/projects')
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // 2) HOZZÁADÁS: a backend visszaadja az elmentett elemet (id-vel együtt)
  async function addProject(data) {
    const saved = await apiPost('/projects', data);
    setProjects((elozo) => [...elozo, saved]);          // új tömb!
  }

  // 3) TÖRLÉS: előbb a backendből, utána a listából
  async function deleteProject(id) {
    await apiDelete(`/projects/${id}`);
    setProjects((elozo) => elozo.filter((x) => x.id !== id));
  }

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, addProject, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects csak ProjectsProvider-en belül használható!');
  return ctx;
}
