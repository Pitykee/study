# Megoldás

A javított és kiegészített fájlok ebben a mappában vannak, ugyanabban a szerkezetben, mint az `src`. A kódban `JAVÍTÁS` és `ÚJ FUNKCIÓ` kommentek jelölik a változásokat. Kipróbáláshoz másold át a fájlokat az `src` mappába.

## 1. rész – A hibák

1. **A `loading` csak hibánál lett `false`.** Javítás: `.finally(() => setLoading(false))`.
2. **Az ár szövegként ment az API-ba** (`"1500"`), és a `reduce` összefűzte: `112460 + "1500"` = `"1124601500"`. Ugyanaz a csapda, mint az interjús `console.log` kérdésnél! Javítás: `price: Number(form.price)`.

## 2. rész – Az új funkció (Márkák)

Új fájlok:
- `context/BrandsContext.jsx` – a lista state-je, betöltés `useEffect(…, [])`-ben (`.finally`-ben kapcsolja ki a loadingot), `addBrand` (POST, majd `[...elozo, saved]`), `deleteBrand` (DELETE, majd `filter`), és a `useBrands()` hook, ami érthető hibát dob, ha nincs Provider.
- `components/BrandList.jsx` – a hookból kéri a listát, kezeli a betöltést/hibát/üres listát, `map` + `key={x.id}`, Törlés gomb `window.confirm`-mel.
- `components/BrandForm.jsx` – kontrollált űrlap egy közös `handleChange`-dzsel (`[e.target.name]`), `preventDefault`, mentés után ürítés.

`App.jsx`: a meglévő rész `MeglevoResz` néven maradt, alatta a `BrandsProvider` veszi körbe az új címet, űrlapot és listát.

Ugyanez a minta működik bármelyik táblára – ezt érdemes fejből tudni a második körre.
