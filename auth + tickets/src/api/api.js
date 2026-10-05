// Közös API segéd – minden feladat ezt használja.
const API = '/api';

async function request(path, options = {}) {
  const res = await fetch(API + path, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`${options.method ?? 'GET'} ${path} → ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const apiGet = (path) => request(path);
export const apiPost = (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) });
export const apiDelete = (path) => request(path, { method: 'DELETE' });
