# Moskva Cho'ntak Tarjimon

O'zbekchadan ruschaga tarjimon. Kirill yoki lotin yozuvida yozasiz — ruscha javob chiqadi,
tagida o'sha ruscha gapning o'zbekcha ma'nosi turadi:

```
Сколько это стоит?
bu qancha turadi?
```

**Texnologiya:** React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · PWA (Workbox)

---

## Internetsiz ishlaydi

Ilova internetga bog'liq emas. Birinchi marta ochganingizdan keyin hamma narsa telefonda qoladi:

- **90 ta tayyor gap** — cho'ntak lug'at
- **~330 ta so'z** — lug'atda yo'q gapni so'zma-so'z tarjima qiladi
- **Shriftlar ilova ichida** — Google'ga chiqmaydi, Rossiyada bloklansa ham ko'rinishi buzilmaydi
- **Saqlangan gaplar** va **tarix** — telefon xotirasida
- **Ovoz (Eshitish)** — telefonning o'z ovoz motori

Internet yo'qligini o'zi sezadi va tepada «Internetsiz rejim» deb yozib qo'yadi.

**VPN bilan:** har bir internet so'roviga 9 soniyalik chek qo'yilgan. Javob kelmasa kutib
o'tirmaydi — darrov telefonning o'z lug'atiga o'tadi va tarjimani baribir beradi.

## Nimalar bor

- **★ Saqlash** — doimiy ishlatadigan gaplaringiz «Saqlangan» bo'limida turadi.
- **Zaxira** — saqlangan gaplarni matn qilib nusxalaysiz (Telegramga tashlang), keyin tiklaysiz.
- **Ko'rsatish** — ruscha gapni butun ekranga katta qilib chiqaradi.
- **Eshitish** (ru-RU), **Nusxa**, **Tarix** (oxirgi 25 ta).
- **Telefonga o'rnatish** — ilova kabi ochiladi.

---

## Loyiha tuzilishi

```
src/
  data/
    phrasebook.ts       tayyor gaplar (kategoriyalar bilan)
    words.ts            so'zlar lug'ati
  lib/
    uzbek.ts            kirill→lotin, indeks, qo'shimcha kesish, so'zma-so'z
    translate.ts        onlayn zanjir + VPN uchun vaqt cheki
    claude.ts           claude.ai ichidagi sample imkoniyati
    device.ts           ovoz va nusxa olish
    types.ts
  hooks/
    useLocalStorage.ts  useOnline.ts  useInstall.ts
  components/           Masthead, Composer, ResultPlate, PhraseRow,
                        BookPanel, SavedPanel, HistoryPanel, Tabs, ShowOverlay …
  fonts/                woff2 (Vite bundle qiladi)
  index.css             palitra (3 ta mavzu holati) + Tailwind tokenlari
  App.tsx  main.tsx
api/translate.js        Vercel serverless tarjima (ixtiyoriy)
scripts/make-artifact.mjs
```

### Buyruqlar

```bash
npm install      # bir marta
npm run dev      # http://localhost:5173
npm run build    # tsc --noEmit + vite build → dist/
npm run preview  # yig'ilgan versiyani ko'rish
npm run artifact # build + claude.ai artefakti uchun dist/artifact.html
```

---

## Tarjima qayerdan keladi

Tartib bilan urinadi, birinchi ishlaganida to'xtaydi:

1. **Tayyor gaplar** — bir zumda, internetsiz
2. **Saqlangan gaplaringiz** — internetsiz
3. **So'zlar lug'ati** (bitta so'z yozsangiz) — internetsiz
4. **Claude** — claude.ai ichida ochilganda
5. **`/api/translate`** — Vercelda, `ANTHROPIC_API_KEY` qo'yilgan bo'lsa (eng sifatli)
6. **Bepul web tarjima** (MyMemory)
7. **So'zma-so'z** — internet yo'q yoki sekin bo'lsa, oxirgi chora

---

## Vercelga qo'yish

### GitHub orqali (tavsiya etiladi)

1. Papkani GitHub'ga repo qilib yuklang (`.gitignore` bor — `node_modules` va `dist` ketmaydi).
2. [vercel.com/new](https://vercel.com/new) → **Import Git Repository**.
3. Vercel Vite'ni o'zi taniydi: Build `npm run build`, Output `dist`. O'zgartirish shart emas.
4. **Deploy**.

### CLI orqali

```bash
npm i -g vercel
vercel
```

> **Muhim:** Moskvaga jo'nashdan **oldin** saytni telefonda bir marta oching va
> «Telefonga o'rnatish» ni bosing. Shunda hamma narsa telefonga tushadi va
> u yerda internetsiz ham ishlayveradi.

## Claude tarjimasini yoqish (ixtiyoriy, pullik)

Kalitsiz ham ilova ishlayveradi. Sifatli tarjima uchun:

1. [console.anthropic.com](https://console.anthropic.com) → **API Keys**.
2. Vercel: **Settings → Environment Variables** → `ANTHROPIC_API_KEY` = `sk-ant-...`
3. **Redeploy**.

> Kalitni hech qachon `src/` ichiga yozmang — u brauzerga tushadi va hammaga ko'rinadi.
> Kalit faqat `api/translate.js` da, serverda ishlatiladi.

Model `api/translate.js` da `claude-opus-5`. Arzonroq kerak bo'lsa `claude-haiku-4-5` qiling.

---

## Lug'atga qo'shish

**Tayyor gap** — `src/data/phrasebook.ts`:

```ts
{ uz: "bu qancha turadi", ru: "Сколько это стоит?", back: "bu qancha turadi?",
  alt: ["qancha turadi", "narxi qancha"] }
```

`alt` — bir xil gapning boshqacha yozilishlari.

**So'z** — `src/data/words.ts`:

```ts
"non": "хлеб",
"bor-": "идти",     // fe'llar oxiriga "-" qo'yiladi
```

O'zgartirgandan keyin `npm run build` va qaytadan deploy qiling — service worker
telefonlardagi eski nusxani o'zi yangilaydi.
