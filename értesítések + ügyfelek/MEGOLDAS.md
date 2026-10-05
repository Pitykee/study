# Megoldás

A javított és kiegészített fájlok ebben a mappában vannak, ugyanabban a szerkezetben, mint az `src`. A kódban `JAVÍTÁS` és `ÚJ FUNKCIÓ` kommentek jelölik a változásokat. Kipróbáláshoz másold át a fájlokat az `src` mappába.

## 1. rész – A hibák

1. **Rossz név:** a Provider `notify`-t ad, a `SupplierForm` `showNotification`-t kér → `showNotification is not a function`. Javítás: `const { notify } = useNotification();`
2. **`useEffect(..., [])`** az időzítőnél: csak egyszer, az első megjelenéskor fut, amikor még nincs üzenet, ezért az időzítő soha nem indul. Javítás: `[uzenet]`.

## 2. rész – Az új funkció (Ügyfelek)

Új fájlok:
- `context/CustomersContext.jsx` – a lista state-je, betöltés `useEffect(…, [])`-ben (`.finally`-ben kapcsolja ki a loadingot), `addCustomer` (POST, majd `[...elozo, saved]`), `deleteCustomer` (DELETE, majd `filter`), és a `useCustomers()` hook, ami érthető hibát dob, ha nincs Provider.
- `components/CustomerList.jsx` – a hookból kéri a listát, kezeli a betöltést/hibát/üres listát, `map` + `key={x.id}`, Törlés gomb `window.confirm`-mel.
- `components/CustomerForm.jsx` – kontrollált űrlap egy közös `handleChange`-dzsel (`[e.target.name]`), `preventDefault`, mentés után ürítés.

`App.jsx`: a meglévő rész `MeglevoResz` néven maradt, alatta a `CustomersProvider` veszi körbe az új címet, űrlapot és listát.

Ugyanez a minta működik bármelyik táblára – ezt érdemes fejből tudni a második körre.
