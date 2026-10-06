# Megoldás

A javított és kiegészített fájlok ebben a mappában vannak, ugyanabban a szerkezetben, mint az `src`. A kódban `JAVÍTÁS` és `ÚJ FUNKCIÓ` kommentek jelölik a változásokat. Kipróbáláshoz másold át a fájlokat az `src` mappába.

## 1. rész – A hibák

1. **A `toggleTheme` kimaradt a Provider `value`-jából.** A gomb `onClick`-je `undefined` lett, ezért semmi nem történt, hiba nélkül. Javítás: `value={{ theme, toggleTheme }}`.
2. **`theme = ...` értékadás const-ra** → `Assignment to constant variable`. A state-et csak a setterrel lehet módosítani: `setTheme(elozo => elozo === 'light' ? 'dark' : 'light')`.

## 2. rész – Az új funkció (Alkalmazottak)

Új fájlok:
- `context/EmployeesContext.jsx` – a lista state-je, betöltés `useEffect(…, [])`-ben (`.finally`-ben kapcsolja ki a loadingot), `addEmployee` (POST, majd `[...elozo, saved]`), `deleteEmployee` (DELETE, majd `filter`), és a `useEmployees()` hook, ami érthető hibát dob, ha nincs Provider.
- `components/EmployeeList.jsx` – a hookból kéri a listát, kezeli a betöltést/hibát/üres listát, `map` + `key={x.id}`, Törlés gomb `window.confirm`-mel.
- `components/EmployeeForm.jsx` – kontrollált űrlap egy közös `handleChange`-dzsel (`[e.target.name]`), `preventDefault`, mentés után ürítés.

`App.jsx`: a meglévő rész `MeglevoResz` néven maradt, alatta a `EmployeesProvider` veszi körbe az új címet, űrlapot és listát.

Ugyanez a minta működik bármelyik táblára – ezt érdemes fejből tudni a második körre.
