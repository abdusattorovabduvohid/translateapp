/** Cho'ntak lug'at — Moskvada kerak bo'ladigan tayyor gaplar. */

export type CategoryId =
  | "salom"
  | "odc"
  | "atama"
  | "dokon"
  | "yol"
  | "ovqat"
  | "ish"
  | "shifokor"
  | "vaqt";

export interface Category {
  id: CategoryId;
  name: string;
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
    id: "odc",
    name: "1C darsi",
    items: [
      { uz: "sekinroq tushuntiring", ru: "Объясните помедленнее, пожалуйста", back: "iltimos, sekinroq tushuntiring", alt: ["sekin tushuntiring"] },
      { uz: "takrorlab bering", ru: "Повторите, пожалуйста", back: "iltimos, takrorlang", alt: ["takrorlang", "qaytaring"] },
      { uz: "yana bir marta ko‘rsating", ru: "Покажите ещё раз, пожалуйста", back: "iltimos, yana bir marta ko‘rsating", alt: ["yana korsating"] },
      { uz: "men tushunmadim", ru: "Я не понял", back: "men tushunmadim" },
      { uz: "men tushundim", ru: "Я понял", back: "men tushundim", alt: ["tushundim"] },
      { uz: "bu nima degani", ru: "Что это значит?", back: "bu nima degani?", alt: ["nima degani"] },
      { uz: "bu qanday ishlaydi", ru: "Как это работает?", back: "bu qanday ishlaydi?" },
      { uz: "misol ko‘rsating", ru: "Покажите пример, пожалуйста", back: "iltimos, misol ko‘rsating", alt: ["misol"] },
      { uz: "qayerdan topaman", ru: "Где это найти?", back: "buni qayerdan topaman?", alt: ["qayerdan topaman"] },
      { uz: "qaysi bo‘limda", ru: "В каком разделе?", back: "qaysi bo‘limda?", alt: ["qaysi razdelda"] },
      { uz: "qo‘llanma bormi", ru: "Есть документация?", back: "qo‘llanma (hujjat) bormi?", alt: ["instruksiya bormi", "dokumentatsiya"] },
      { uz: "yozib olsam bo‘ladimi", ru: "Можно записать?", back: "yozib olsam bo‘ladimi?", alt: ["yozib olsam"] },
      { uz: "video yozib olsam bo‘ladimi", ru: "Можно записать видео?", back: "video yozib olsam bo‘ladimi?" },
      { uz: "ekranni ko‘rsating", ru: "Покажите экран, пожалуйста", back: "iltimos, ekranni ko‘rsating", alt: ["ekran"] },
      { uz: "men yangi boshlovchiman", ru: "Я начинающий", back: "men yangi boshlovchiman", alt: ["yangi boshlovchiman", "yangiman"] },
      { uz: "vazifa bormi", ru: "Есть задание?", back: "vazifa bormi?", alt: ["zadaniya bormi"] },
      { uz: "uyga vazifa", ru: "Домашнее задание", back: "uyga vazifa" },
      { uz: "dars qachon boshlanadi", ru: "Когда начинается занятие?", back: "dars qachon boshlanadi?", alt: ["dars qachon"] },
      { uz: "tanaffus bo‘ladimi", ru: "Будет перерыв?", back: "tanaffus bo‘ladimi?", alt: ["pereriv"] },
      { uz: "shu yerda xato chiqdi", ru: "Здесь выходит ошибка", back: "shu yerda xato chiqyapti", alt: ["xato chiqdi", "oshibka"] },
      { uz: "dastur ochilmayapti", ru: "Программа не открывается", back: "dastur ochilmayapti" },
      { uz: "bazani qayerdan yuklab olaman", ru: "Где скачать базу?", back: "bazani qayerdan yuklab olaman?", alt: ["baza qayerdan"] },
      { uz: "parolni bering", ru: "Дайте пароль, пожалуйста", back: "iltimos, parolni bering", alt: ["parol"] },
      { uz: "saqlashni unutdim", ru: "Я забыл сохранить", back: "saqlashni unutdim" },
      { uz: "yordam bera olasizmi", ru: "Можете помочь?", back: "yordam bera olasizmi?" },
      { uz: "keyinroq savol bersam bo‘ladimi", ru: "Можно задать вопрос позже?", back: "keyinroq savol bersam bo‘ladimi?" },
    ],
  },
  {
    id: "atama",
    name: "1C atamalari",
    items: [
      { uz: "spravochnik", ru: "Справочник", back: "ma’lumotnoma — mijozlar, tovarlar ro‘yxati", alt: ["malumotnoma"] },
      { uz: "hujjat 1c", ru: "Документ", back: "hujjat — operatsiyani qayd qiluvchi yozuv" },
      { uz: "hujjatlar jurnali", ru: "Журнал документов", back: "hujjatlar jurnali" },
      { uz: "registr", ru: "Регистр сведений", back: "ma’lumotlar registri — o‘zgarmas ma’lumot saqlanadi" },
      { uz: "toplanma registr", ru: "Регистр накопления", back: "to‘planma registr — qoldiq va aylanma" },
      { uz: "buxgalteriya registri", ru: "Регистр бухгалтерии", back: "buxgalteriya registri" },
      { uz: "provodka", ru: "Проводка", back: "provodka — schyotlar bo‘yicha yozuv" },
      { uz: "schyotlar rejasi", ru: "План счетов", back: "schyotlar rejasi" },
      { uz: "subkonto", ru: "Субконто", back: "subkonto — analitik kesim" },
      { uz: "nomenklatura", ru: "Номенклатура", back: "nomenklatura — tovar va xizmatlar ro‘yxati" },
      { uz: "kontragent", ru: "Контрагент", back: "kontragent — mijoz yoki yetkazib beruvchi" },
      { uz: "ombor 1c", ru: "Склад", back: "ombor" },
      { uz: "qoldiq 1c", ru: "Остаток", back: "qoldiq" },
      { uz: "kirim", ru: "Приход", back: "kirim — tovar kelishi" },
      { uz: "chiqim", ru: "Расход", back: "chiqim — tovar chiqishi" },
      { uz: "tannarx", ru: "Себестоимость", back: "tannarx" },
      { uz: "partiya", ru: "Партия", back: "partiya — bir xil narxdagi tovar to‘plami" },
      { uz: "olchov birligi", ru: "Единица измерения", back: "o‘lchov birligi (dona, kg, litr)" },
      { uz: "hisobot", ru: "Отчёт", back: "hisobot" },
      { uz: "ishlov", ru: "Обработка", back: "ishlov — maxsus vazifa bajaruvchi dastur" },
      { uz: "konfigurator", ru: "Конфигуратор", back: "konfigurator — dastur tahrirlanadigan rejim" },
      { uz: "konfiguratsiya", ru: "Конфигурация", back: "konfiguratsiya — dasturning tuzilishi" },
      { uz: "kengaytma", ru: "Расширение", back: "kengaytma — asosiy dasturga tegmay qo‘shimcha qilish" },
      { uz: "yangilanish 1c", ru: "Обновление", back: "yangilanish" },
      { uz: "malumotlar bazasi", ru: "База данных", back: "ma’lumotlar bazasi" },
      { uz: "sorov", ru: "Запрос", back: "so‘rov — bazadan ma’lumot olish" },
      { uz: "sorovlar tili", ru: "Язык запросов", back: "so‘rovlar tili" },
      { uz: "modul", ru: "Модуль", back: "modul — kod yoziladigan joy" },
      { uz: "protsedura", ru: "Процедура", back: "protsedura — javob qaytarmaydigan kod bo‘lagi" },
      { uz: "funksiya", ru: "Функция", back: "funksiya — javob qaytaradigan kod bo‘lagi" },
      { uz: "forma", ru: "Форма", back: "forma — ekrandagi ko‘rinish" },
      { uz: "boshqariladigan forma", ru: "Управляемые формы", back: "boshqariladigan formalar" },
      { uz: "rekvizit", ru: "Реквизит", back: "rekvizit — maydon (masalan: sana, summa)" },
      { uz: "jadval qismi", ru: "Табличная часть", back: "jadval qismi — hujjatdagi qatorlar" },
      { uz: "sanab otilgan", ru: "Перечисление", back: "sanab o‘tilgan ro‘yxat — tayyor variantlar" },
      { uz: "rol", ru: "Роль", back: "rol — foydalanuvchi huquqlari to‘plami" },
      { uz: "kirish huquqlari", ru: "Права доступа", back: "kirish huquqlari" },
      { uz: "foydalanuvchi", ru: "Пользователь", back: "foydalanuvchi" },
      { uz: "reglament vazifa", ru: "Регламентное задание", back: "reglament vazifa — avtomatik bajariladigan ish" },
      { uz: "hujjatni otkazish", ru: "Проведение документа", back: "hujjatni o‘tkazish — hisobga olish" },
      { uz: "otkazishni bekor qilish", ru: "Распроведение", back: "o‘tkazishni bekor qilish" },
      { uz: "oyni yopish", ru: "Закрытие месяца", back: "oyni yopish" },
      { uz: "aylanma saldo", ru: "Оборотно-сальдовая ведомость", back: "aylanma-saldo qaydnomasi" },
      { uz: "asosiy vositalar", ru: "Основные средства", back: "asosiy vositalar (OS)" },
      { uz: "qqs", ru: "НДС", back: "QQS — qo‘shilgan qiymat solig‘i" },
      { uz: "otladchik", ru: "Отладчик", back: "otladchik — xatoni qidirish vositasi" },
      { uz: "toxtash nuqtasi", ru: "Точка останова", back: "to‘xtash nuqtasi — kodni shu yerda to‘xtatadi" },
      { uz: "chop etish shakli", ru: "Печатная форма", back: "chop etish shakli" },
      { uz: "mijoz buyurtmasi", ru: "Заказ клиента", back: "mijoz buyurtmasi" },
      { uz: "tovar kelishi", ru: "Поступление товаров", back: "tovar kelib tushishi" },
      { uz: "tovar sotilishi", ru: "Реализация товаров", back: "tovar sotilishi" },
    ],
  },
  {
    id: "dokon",
    name: "Do‘kon / Bozor",
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
