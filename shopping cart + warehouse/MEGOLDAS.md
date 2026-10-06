# Megoldás

A javított és kiegészített fájlok ebben a mappában vannak, ugyanabban a szerkezetben, mint az `src`. A kódban `JAVÍTÁS` és `ÚJ FUNKCIÓ` kommentek jelölik a változásokat. Kipróbáláshoz másold át a fájlokat az `src` mappába.

## 1. rész – A hibák

1. **Rossz URL:** `apiGet('/product')` → 404. A Network fülön azonnal látszik. Javítás: `/products`.
2. **State mutáció:** `meglevo.qty += 1; setCart(cart)` – ugyanaz a tömb, ezért a React nem rajzol újra. Javítás: `map`-pel új tömb, a módosított tételből új objektum: `{ ...t, qty: t.qty + 1 }`.

## 2. rész – Az új funkció (Raktárak)

Új fájlok:
- `context/WarehousesContext.jsx` – a lista state-je, betöltés `useEffect(…, [])`-ben (`.finally`-ben kapcsolja ki a loadingot), `addWarehouse` (POST, majd `[...elozo, saved]`), `deleteWarehouse` (DELETE, majd `filter`), és a `useWarehouses()` hook, ami érthető hibát dob, ha nincs Provider.
- `components/WarehouseList.jsx` – a hookból kéri a listát, kezeli a betöltést/hibát/üres listát, `map` + `key={x.id}`, Törlés gomb `window.confirm`-mel.
- `components/WarehouseForm.jsx` – kontrollált űrlap egy közös `handleChange`-dzsel (`[e.target.name]`), `preventDefault`, mentés után ürítés.

`App.jsx`: a meglévő rész `MeglevoResz` néven maradt, alatta a `WarehousesProvider` veszi körbe az új címet, űrlapot és listát.

Ugyanez a minta működik bármelyik táblára – ezt érdemes fejből tudni a második körre.
