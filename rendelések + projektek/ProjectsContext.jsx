import { createContext, useContext, useState, useEffect } from "react";

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Hiba: " + res.status);
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function addProject(data) {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Hiba: " + res.status);
    const saved = await res.json();
    setProjects((elozo) => [...elozo, saved]);
  }

  async function deleteProject(id) {
    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Hiba: " + res.status);
    setProjects((elozo) => elozo.filter((x) => x.id !== id));
  }

  return (
    <ProjectsContext.Provider
      value={{ projects, loading, error, addProject, deleteProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx)
    throw new Error("useProjects csak ProjectsProvider-en belül használható!");
  return ctx;
}
