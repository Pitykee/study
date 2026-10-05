# Megoldás

A javított és kiegészített fájlok ebben a mappában vannak, ugyanabban a szerkezetben, mint az `src`. A kódban `JAVÍTÁS` és `ÚJ FUNKCIÓ` kommentek jelölik a változásokat. Kipróbáláshoz másold át a fájlokat az `src` mappába.

## 1. rész – A hibák

1. **`useEffect(..., [])`, pedig a `user`-től függ.** Az első megjelenéskor még nincs bejelentkezett felhasználó, utána pedig soha nem fut újra. Javítás: `[user]` (és ha nincs user, ürítjük a listát).
2. **`user.role === 'Admin'`**, de az adatbázisban `'admin'` van (kisbetűvel). A Network → Response vagy a React DevTools mutatja a pontos értéket.

## 2. rész – Az új funkció (Projektek)

Új fájlok:
- `context/ProjectsContext.jsx` – a lista state-je, betöltés `useEffect(…, [])`-ben (`.finally`-ben kapcsolja ki a loadingot), `addProject` (POST, majd `[...elozo, saved]`), `deleteProject` (DELETE, majd `filter`), és a `useProjects()` hook, ami érthető hibát dob, ha nincs Provider.
- `components/ProjectList.jsx` – a hookból kéri a listát, kezeli a betöltést/hibát/üres listát, `map` + `key={x.id}`, Törlés gomb `window.confirm`-mel.
- `components/ProjectForm.jsx` – kontrollált űrlap egy közös `handleChange`-dzsel (`[e.target.name]`), `preventDefault`, mentés után ürítés.

`App.jsx`: a meglévő rész `MeglevoResz` néven maradt, alatta a `ProjectsProvider` veszi körbe az új címet, űrlapot és listát.

Ugyanez a minta működik bármelyik táblára – ezt érdemes fejből tudni a második körre.
