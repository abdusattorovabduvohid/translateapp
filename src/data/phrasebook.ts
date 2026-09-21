/**
 * Cho'ntak lug'at — Moskvada kerak bo'ladigan tayyor gaplar.
 * Kategoriya ranglari Moskva metro liniyalaridan olingan.
 */

export type CategoryId =
  | "salom"
  | "dokon"
  | "yol"
  | "ovqat"
  | "ish"
  | "shifokor"
  | "vaqt";

export interface Category {
  id: CategoryId;
  name: string;
  /** CSS o'zgaruvchisi — metro liniyasi rangi */
  color: string;
}

export interface PhraseSeed {
  /** O'zbekcha asosiy shakl */
  uz: string;
  /** Ruscha tarjima (kirill) */
  ru: string;
  /** Ruscha gapning o'zbekcha ma'nosi */
  back: string;
  /** Boshqacha yozilishlari — qidirishda topilsin */
  alt?: string[];
}

export interface Phrase extends PhraseSeed {
  category: Category;
}

interface CategorySeed extends Category {
  items: PhraseSeed[];
}

const SEED: CategorySeed[] = [
  {
    id: "salom",
    name: "Salomlashish",
    color: "var(--color-m-red)",
    items: [
      { uz: "salom", ru: "Здравствуйте", back: "assalomu alaykum", alt: ["assalomu alaykum", "assalom", "salom alaykum"] },
      { uz: "xayrli tong", ru: "Доброе утро", back: "xayrli tong", alt: ["hayrli tong"] },
      { uz: "xayrli kun", ru: "Добрый день", back: "xayrli kun", alt: ["hayrli kun"] },
      { uz: "xayrli kech", ru: "Добрый вечер", back: "xayrli kech", alt: ["hayrli kech"] },
      { uz: "xayr", ru: "До свидания", back: "xayr, ko‘rishguncha", alt: ["hayr", "korishguncha"] },
      { uz: "rahmat", ru: "Спасибо", back: "rahmat", alt: ["rahmat sizga"] },
      { uz: "katta rahmat", ru: "Большое спасибо", back: "katta rahmat" },
      { uz: "iltimos", ru: "Пожалуйста", back: "iltimos", alt: ["marhamat"] },
      { uz: "kechirasiz", ru: "Извините, пожалуйста", back: "kechirasiz, iltimos", alt: ["uzr", "kechiring"] },
      { uz: "ha", ru: "Да", back: "ha" },
      { uz: "yo‘q", ru: "Нет", back: "yo‘q", alt: ["yoq"] },
      { uz: "yaxshimisiz", ru: "Как вы поживаете?", back: "qalaysiz, yaxshimisiz?", alt: ["qalaysiz", "yahshimisiz"] },
      { uz: "mening ismim", ru: "Меня зовут …", back: "mening ismim …", alt: ["ismim"] },
      { uz: "tanishganimdan xursandman", ru: "Очень приятно", back: "tanishganimdan xursandman" },
      { uz: "men rus tilini bilmayman", ru: "Я не говорю по-русски", back: "men rus tilida gapirmayman", alt: ["rus tilini bilmayman"] },
      { uz: "sekinroq gapiring", ru: "Говорите помедленнее, пожалуйста", back: "iltimos, sekinroq gapiring", alt: ["sekin gapiring"] },
      { uz: "tushunmadim", ru: "Я не понял, извините", back: "kechirasiz, tushunmadim", alt: ["tushunmayapman"] },
      { uz: "yordam bering", ru: "Помогите, пожалуйста", back: "iltimos, yordam bering", alt: ["yordam"] },
      { uz: "yozib bering", ru: "Напишите, пожалуйста", back: "iltimos, yozib bering" },
      { uz: "yaxshi", ru: "Хорошо", back: "yaxshi, mayli", alt: ["mayli", "xop"] },
    ],
  },
  {
    id: "dokon",
    name: "Do‘kon / Bozor",
    color: "var(--color-m-green)",
    items: [
      { uz: "bu qancha turadi", ru: "Сколько это стоит?", back: "bu qancha turadi?", alt: ["qancha turadi", "narxi qancha", "bu qancha"] },
      { uz: "arzonroq bo‘ladimi", ru: "Можно подешевле?", back: "arzonroq bo‘ladimi?", alt: ["arzonroq", "chegirma bormi"] },
      { uz: "qimmat", ru: "Это дорого", back: "bu qimmat" },
      { uz: "menga shu kerak", ru: "Мне нужно вот это", back: "menga mana shu kerak", alt: ["shu kerak", "mana shu"] },
      { uz: "sizda bormi", ru: "У вас есть …?", back: "sizda … bormi?", alt: ["bormi"] },
      { uz: "olaman", ru: "Я возьму", back: "olaman", alt: ["shuni olaman"] },
      { uz: "karta bilan to‘lasa bo‘ladimi", ru: "Можно оплатить картой?", back: "karta bilan to‘lasa bo‘ladimi?", alt: ["karta bilan", "kartada tolasa boladimi"] },
      { uz: "chek bering", ru: "Дайте чек, пожалуйста", back: "iltimos, chek bering", alt: ["chek"] },
      { uz: "paket bering", ru: "Дайте пакет, пожалуйста", back: "iltimos, paket bering", alt: ["qop bering", "xalta bering"] },
      { uz: "bitta", ru: "Одну штуку, пожалуйста", back: "bitta, iltimos", alt: ["bir dona"] },
      { uz: "kilosi qancha", ru: "Сколько стоит килограмм?", back: "bir kilosi qancha?", alt: ["kilo qancha"] },
      { uz: "faqat ko‘ryapman", ru: "Я просто смотрю", back: "shunchaki ko‘ryapman", alt: ["koryapman"] },
      { uz: "maydasi yo‘q", ru: "У меня нет мелочи", back: "mayda pulim yo‘q", alt: ["mayda yoq"] },
    ],
  },
  {
    id: "yol",
    name: "Yo‘l / Metro",
    color: "var(--color-m-blue)",
    items: [
      { uz: "metro qayerda", ru: "Где метро?", back: "metro qayerda?", alt: ["metro qayerda joylashgan"] },
      { uz: "men qayerdaman", ru: "Где я нахожусь?", back: "men qayerdaman?", alt: ["bu yer qayer"] },
      { uz: "qanday boraman", ru: "Как мне туда добраться?", back: "u yerga qanday boraman?", alt: ["qanday borsam boladi"] },
      { uz: "uzoqmi", ru: "Это далеко?", back: "bu uzoqmi?", alt: ["uzoq mi"] },
      { uz: "chipta qancha", ru: "Сколько стоит билет?", back: "chipta qancha turadi?", alt: ["bilet qancha"] },
      { uz: "shu yerda to‘xtating", ru: "Остановите здесь, пожалуйста", back: "iltimos, shu yerda to‘xtating", alt: ["toxtating", "shu yerda tohtang"] },
      { uz: "taksi chaqiring", ru: "Вызовите такси, пожалуйста", back: "iltimos, taksi chaqiring", alt: ["taksi chaqir"] },
      { uz: "shu yerda tushaman", ru: "Я выхожу здесь", back: "men shu yerda tushaman", alt: ["tushaman"] },
      { uz: "men adashib qoldim", ru: "Я заблудился", back: "men adashib qoldim", alt: ["adashdim"] },
      { uz: "bu avtobus u yerga boradimi", ru: "Этот автобус идёт туда?", back: "bu avtobus u yerga boradimi?", alt: ["bu avtobus boradimi"] },
      { uz: "necha bekat", ru: "Сколько остановок?", back: "necha bekat?", alt: ["nechta bekat"] },
      { uz: "mana manzil", ru: "Вот адрес", back: "mana manzil", alt: ["manzil"] },
      { uz: "qaysi tomonga", ru: "В какую сторону?", back: "qaysi tomonga?", alt: ["qay tomonga"] },
    ],
  },
  {
    id: "ovqat",
    name: "Ovqat",
    color: "var(--color-m-orange)",
    items: [
      { uz: "menyu bering", ru: "Дайте меню, пожалуйста", back: "iltimos, menyu bering", alt: ["menyu"] },
      { uz: "hisob bering", ru: "Счёт, пожалуйста", back: "iltimos, hisob bering", alt: ["hisob", "schyot"] },
      { uz: "suv bering", ru: "Воды, пожалуйста", back: "iltimos, suv bering" },
      { uz: "choy bering", ru: "Чай, пожалуйста", back: "choy, iltimos" },
      { uz: "men cho‘chqa go‘shti yemayman", ru: "Я не ем свинину", back: "men cho‘chqa go‘shti yemayman", alt: ["chochqa goshti yemayman", "chochqa yemayman"] },
      { uz: "bu halolmi", ru: "Это халяль?", back: "bu halolmi?", alt: ["halolmi", "halal mi"] },
      { uz: "achchiq bo‘lmasin", ru: "Не острое, пожалуйста", back: "achchiq bo‘lmasin, iltimos", alt: ["achchiq emas"] },
      { uz: "juda mazali", ru: "Очень вкусно", back: "juda mazali", alt: ["mazali"] },
      { uz: "olib ketaman", ru: "С собой, пожалуйста", back: "olib ketaman", alt: ["ozimga", "olib ketish"] },
      { uz: "nima maslahat berasiz", ru: "Что вы посоветуете?", back: "nima maslahat berasiz?", alt: ["nima maslahat"] },
    ],
  },
  {
    id: "ish",
    name: "Ish / Hujjat",
    color: "var(--color-m-brown)",
    items: [
      { uz: "men ish qidiryapman", ru: "Я ищу работу", back: "men ish qidiryapman", alt: ["ish qidiryapman", "ish kerak"] },
      { uz: "ish haqi qancha", ru: "Какая зарплата?", back: "ish haqi qancha?", alt: ["oylik qancha", "zarplata qancha"] },
      { uz: "qachon ishga chiqay", ru: "Когда мне выйти на работу?", back: "qachon ishga chiqay?", alt: ["qachon ishga kelay"] },
      { uz: "mana mening pasportim", ru: "Вот мой паспорт", back: "mana mening pasportim", alt: ["pasportim"] },
      { uz: "menga ro‘yxatdan o‘tish kerak", ru: "Мне нужна регистрация", back: "menga ro‘yxatdan o‘tish kerak", alt: ["registratsiya kerak", "royxatdan otish"] },
      { uz: "men patent rasmiylashtirmoqchiman", ru: "Я хочу оформить патент", back: "men patent rasmiylashtirmoqchiman" },
      { uz: "shartnoma bering", ru: "Дайте, пожалуйста, договор", back: "iltimos, shartnoma bering", alt: ["dogovor bering"] },
      { uz: "kechirasiz, kechikdim", ru: "Извините, я опоздал", back: "kechirasiz, kechikdim", alt: ["kechikdim", "kech qoldim"] },
      { uz: "ish vaqti qachongacha", ru: "До которого часа работа?", back: "ish qachongacha?", alt: ["ish vaqti"] },
      { uz: "telefon raqamingiz", ru: "Ваш номер телефона, пожалуйста", back: "telefon raqamingizni bering", alt: ["raqamingiz"] },
      { uz: "pulni qachon berasiz", ru: "Когда будет оплата?", back: "pulni qachon berasiz?", alt: ["qachon tolaysiz"] },
    ],
  },
  {
    id: "shifokor",
    name: "Shifokor",
    color: "var(--color-m-purple)",
    items: [
      { uz: "tez yordam chaqiring", ru: "Вызовите скорую!", back: "tez yordam chaqiring!", alt: ["skoriy"] },
      { uz: "shifokor chaqiring", ru: "Вызовите врача, пожалуйста", back: "iltimos, shifokor chaqiring", alt: ["shifokor kerak"] },
      { uz: "menga yomon", ru: "Мне плохо", back: "ahvolim yomon", alt: ["ahvolim yomon", "yomon bolyapman"] },
      { uz: "shu yerim og‘riyapti", ru: "У меня болит вот здесь", back: "mana bu yerim og‘riyapti", alt: ["ogriyapti"] },
      { uz: "haroratim bor", ru: "У меня температура", back: "haroratim bor", alt: ["isitmam bor"] },
      { uz: "dorixona qayerda", ru: "Где аптека?", back: "dorixona qayerda?", alt: ["apteka qayerda"] },
      { uz: "menga dori kerak", ru: "Мне нужно лекарство", back: "menga dori kerak", alt: ["dori kerak"] },
      { uz: "allergiyam bor", ru: "У меня аллергия", back: "allergiyam bor" },
    ],
  },
  {
    id: "vaqt",
    name: "Raqam / Vaqt",
    color: "var(--color-m-cyan)",
    items: [
      { uz: "soat necha", ru: "Сколько времени?", back: "soat necha bo‘ldi?", alt: ["soat nechchi"] },
      { uz: "biroz kuting", ru: "Подождите немного, пожалуйста", back: "iltimos, biroz kuting", alt: ["kuting"] },
      { uz: "bir ikki uch", ru: "Один, два, три", back: "bir, ikki, uch", alt: ["sanoq"] },
      { uz: "to‘rt besh olti", ru: "Четыре, пять, шесть", back: "to‘rt, besh, olti" },
      { uz: "yetti sakkiz to‘qqiz o‘n", ru: "Семь, восемь, девять, десять", back: "yetti, sakkiz, to‘qqiz, o‘n" },
      { uz: "yuz ming", ru: "Сто, тысяча", back: "yuz, ming" },
    ],
  },
];

export const CATEGORIES: Category[] = SEED.map(({ items: _items, ...cat }) => cat);

export const PHRASES: Phrase[] = SEED.flatMap((cat) => {
  const { items, ...category } = cat;
  return items.map((item) => ({ ...item, category }));
});
