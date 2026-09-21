# Moskva Cho'ntak Tarjimon

O'zbekcha ↔ ruscha tarjimon. Kirill yoki lotin — farqi yo'q.

**O'zbekchadan ruschaga:** ruscha javob chiqadi, tagida o'sha gapning o'zbekcha ma'nosi.

```
bu qancha turadi?  →   Сколько это стоит?
                       bu qancha turadi?
```

**Ruschadan o'zbekchaga:** o'zbekcha javob chiqadi, tagida ruschasi.

```
Сколько это стоит? →   bu qancha turadi?
                       Сколько это стоит?
```

Yo'nalishni yuqoridagi tugmadan tanlaysiz. Noto'g'ri tomonga yozib yuborsangiz,
ilova matnni tanib, yo'nalishni **o'zi to'g'irlaydi**.

**Texnologiya:** React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · PWA (Workbox)

---

## Internetsiz ishlaydi

Ilova internetga bog'liq emas. Birinchi marta ochganingizdan keyin hamma narsa telefonda qoladi:

- **158 ta tayyor gap** — ikki tomondan ham qidiriladi (shundan 77 tasi 1C darsi va atamalari)
- **450 ta so'z** — ikki tomonlama; lug'atda yo'q gapni so'zma-so'z tarjima qiladi
  (ruschada so'z o'zagi bo'yicha ham qidiradi: «хлеба» → «хлеб» → *non*)
- **Shriftlar ilova ichida** — Google'ga chiqmaydi, Rossiyada bloklansa ham ko'rinishi buzilmaydi
- **Saqlangan gaplar** va **tarix** — telefon xotirasida
- **Ovoz (Eshitish)** — telefonning o'z ovoz motori

Internet yo'qligini o'zi sezadi va tepada «Internetsiz rejim» deb yozib qo'yadi.

**VPN bilan:** har bir internet so'roviga 9 soniyalik chek qo'yilgan. Javob kelmasa kutib
o'tirmaydi — darrov telefonning o'z lug'atiga o'tadi va tarjimani baribir beradi.

## 1C ERP uchun

Lug'atda ikkita alohida bo'lim bor:

- **1C darsi** — darsda kerak bo'ladigan gaplar: «Объясните помедленнее», «Покажите ещё раз»,
  «Здесь выходит ошибка», «Где это найти?», «Можно записать?» va boshqalar.
- **1C atamalari** — 51 ta atama ruscha ko'rinishida, tagida o'zbekcha izohi bilan:

  | Ruscha | O'zbekcha izoh |
  |---|---|
  | Справочник | ma'lumotnoma — mijozlar, tovarlar ro'yxati |
  | Проводка | provodka — schyotlar bo'yicha yozuv |
  | Регистр накопления | to'planma registr — qoldiq va aylanma |
  | Табличная часть | jadval qismi — hujjatdagi qatorlar |
  | Обработка | ishlov — maxsus vazifa bajaruvchi dastur |

  Darsda notanish atama eshitsangiz — «Rus → O'zb» rejimida yozasiz, izohi chiqadi.

## Nimalar bor

- **Yo'nalish tugmasi** — «O'zb → Rus» / «Rus → O'zb», tanlovingiz eslab qolinadi.
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
    russian.ts          teskari indeks, ruscha o'zak, yo'nalishni aniqlash
    translate.ts        onlayn zanjir + VPN uchun vaqt cheki
    claude.ts           claude.ai ichidagi sample imkoniyati
    device.ts           ovoz va nusxa olish
    types.ts
  hooks/
    useLocalStorage.ts  useOnline.ts  useInstall.ts
  components/           Composer, DirectionSwitch, ResultPlate, PhraseRow,
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
