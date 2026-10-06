# Megoldás

A javított és kiegészített fájlok ebben a mappában vannak, ugyanabban a szerkezetben, mint az `src`. A kódban `JAVÍTÁS` és `ÚJ FUNKCIÓ` kommentek jelölik a változásokat. Kipróbáláshoz másold át a fájlokat az `src` mappába.

## 1. rész – A hibák

1. **Hiányzó Provider.** `useContext` `null`-t ad, ha nincs fölötte Provider → `Cannot destructure property 'user' of ... as it is null`. Javítás: `Feladat1.jsx`-ben `<AuthProvider>` veszi körbe a `Header`-t és a `Tartalom`-at.
2. **Hiányzó `e.preventDefault()`** a `LoginForm` `handleSubmit`-jében → a böngésző elküldi az űrlapot és újratölt, a state elvész.

## 2. rész – Az új funkció (Hibajegyek)

Új fájlok:
- `context/TicketsContext.jsx` – a lista state-je, betöltés `useEffect(…, [])`-ben (`.finally`-ben kapcsolja ki a loadingot), `addTicket` (POST, majd `[...elozo, saved]`), `deleteTicket` (DELETE, majd `filter`), és a `useTickets()` hook, ami érthető hibát dob, ha nincs Provider.
- `components/TicketList.jsx` – a hookból kéri a listát, kezeli a betöltést/hibát/üres listát, `map` + `key={x.id}`, Törlés gomb `window.confirm`-mel.
- `components/TicketForm.jsx` – kontrollált űrlap egy közös `handleChange`-dzsel (`[e.target.name]`), `preventDefault`, mentés után ürítés.

`App.jsx`: a meglévő rész `MeglevoResz` néven maradt, alatta a `TicketsProvider` veszi körbe az új címet, űrlapot és listát.

Ugyanez a minta működik bármelyik táblára – ezt érdemes fejből tudni a második körre.
