# 2. feladat – Téma

A feladat két részből áll, ahogy az éles interjúfeladat is:

1. **Debug:** a meglévő funkcióban (Világos/sötét téma (ThemeContext)) **2 rejtett hiba** van – keresd meg és javítsd.
2. **Új funkció:** az adatbázisban van egy **`employees`** (alkalmazottak) tábla, amihez a felületen még semmi nincs. Írd meg a **listázást, a hozzáadást és a törlést**, Context-tel.

A megoldás a `megoldas` mappában van (ugyanilyen szerkezetben) – csak a végén nézd meg!

## Indítás

1. Telepítsd a **Node.js**-t (nodejs.org, LTS verzió) – ha már megvan, ugord át.
2. Nyisd meg ezt a mappát VS Code-ban (**File → Open Folder**).
3. **Terminal → New Terminal**, és:

```bash
npm install     # csak első alkalommal
npm start       # backend + React egyszerre, egy terminálban
```

4. A böngésző magától megnyílik: **http://localhost:5173**
5. Leállítás: **Ctrl + C**. Tesztadatok visszaállítása: `npm run reset`.

Egyszerre csak egy feladatot futtass.

## Projekt szerkezet

```
src/
  main.jsx            belépési pont
  App.jsx             fő komponens – itt a helye az új funkciónak is (komment jelöli)
  api/api.js          backend-hívások: apiGet, apiPost, apiDelete
  context/            Context fájlok (Provider + saját hook)
  components/         felület komponensei
db.json               az "adatbázis" (json-server API-ként szolgálja ki)
```

---

## 1. rész – Debug

Tünetek, ebben a sorrendben fogsz rájuk bukkanni:

- A „Sötét mód” gomb nem csinál semmit, és hibaüzenet sincs.
- Ha ez megvan: kattintásra piros hiba jelenik meg a Console-ban.

Mindig egy hibát javíts, utána teszteld újra.

---

## 2. rész – Új funkció: Alkalmazottak

### Az adatbázis tábla: `employees`

| Oszlop | Jelentés | Típus | Kötelező |
| --- | --- | --- | --- |
| `id` | azonosító | szám | automatikus (a backend adja) |
| `name` | Név | szöveg | igen |
| `position` | Beosztás | szöveg | igen |
| `email` | E-mail | e-mail | igen |

### Az API

| Művelet | Kérés | Body |
| --- | --- | --- |
| lista | `GET /api/employees` | – |
| hozzáadás | `POST /api/employees` | `{"name": "Tóth Gábor", "position": "Fejlesztő", "email": "gabor@ceg.hu"}` |
| törlés | `DELETE /api/employees/:id` | – |

Nézd meg előbb a böngészőben: **http://localhost:5173/api/employees**

### Követelmények

- [ ] `src/context/EmployeesContext.jsx`: Provider a listával, `loading` és `error` állapottal, `addEmployee` és `deleteEmployee` függvénnyel, valamint egy `useEmployees()` hook.
- [ ] `src/components/EmployeeList.jsx`: táblázat az összes oszloppal, betöltés közben „Betöltés…”, üres listánál üzenet, soronként **Törlés** gomb megerősítéssel.
- [ ] `src/components/EmployeeForm.jsx`: űrlap a mezőkkel, kötelező mezők ellenőrzése, mentés után az űrlap kiürül.
- [ ] Az új elem **azonnal** megjelenik a listában, a törölt azonnal eltűnik – oldalfrissítés nélkül.
- [ ] Az `App.jsx`-ben a komment helyére: a Provider, benne a cím, az űrlap és a lista.
- [ ] Ellenőrzés: frissítés után is megvan / eltűnt az elem (vagyis tényleg a backendbe ment).

### Javasolt sorrend

1. API megnézése a böngészőben (mezőnevek!)
2. Context: betöltés `useEffect`-tel → tedd be az App-ba, és nézd meg a React DevTools-ban, megjött-e az adat
3. Lista komponens → tesztelés
4. Űrlap + `add…` → tesztelés
5. Törlés gomb + `delete…` → tesztelés

## Tippek

- Context-hibánál: van-e **Provider** a komponens fölött, mi van a **`value`**-ban, **ugyanazon a néven** kéri-e a komponens?
- `useEffect`: mi van a függőségi tömbben, és mi kellene, hogy legyen?
- State: új tömböt adsz a setternek (`[...elozo, uj]`, `filter`), vagy a régit módosítod?
- Szám mezőnél: az input mindig szöveget ad → `Number()`.
- F12 → **Console**, **Network** (státuszkód, Payload, Response), **React DevTools**.
