/**
 * So'zlar lug'ati — internetsiz so'zma-so'z tarjima uchun.
 * Fe'llar oxirida "-" turadi (o'zak), qolganlari to'liq shakl.
 */
export const WORDS: Record<string, string> = {
  // olmosh va so'roq
  "men": "я", "sen": "ты", "siz": "вы", "u": "он", "biz": "мы", "ular": "они",
  "bu": "это", "shu": "это", "mening": "мой", "sizning": "ваш", "uning": "его",
  "bizning": "наш", "o‘zim": "сам",
  "kim": "кто", "nima": "что", "qayer": "где", "qayerda": "где", "qayerga": "куда",
  "qayerdan": "откуда", "qachon": "когда", "qanday": "как", "nega": "почему",
  "qancha": "сколько", "nechta": "сколько", "qaysi": "какой",
  "hamma": "все", "hech kim": "никто", "hech nima": "ничего", "bor": "есть", "yo‘q": "нет",
  "ha": "да", "mayli": "ладно", "albatta": "конечно", "balki": "может быть",
  "ham": "тоже", "yana": "ещё", "lekin": "но", "chunki": "потому что", "agar": "если",
  "bilan": "с", "uchun": "для", "keyin": "потом",

  // odamlar
  "ota": "отец", "ona": "мать", "aka": "старший брат", "uka": "младший брат",
  "opa": "старшая сестра", "singil": "младшая сестра", "o‘g‘il": "сын", "qiz": "дочь",
  "xotin": "жена", "er": "муж", "bola": "ребёнок", "oila": "семья", "do‘st": "друг",
  "qo‘shni": "сосед", "odam": "человек", "ayol": "женщина", "erkak": "мужчина",
  "mehmon": "гость", "sotuvchi": "продавец", "xaridor": "покупатель",
  "boshliq": "начальник", "ishchi": "рабочий", "haydovchi": "водитель",
  "politsiya": "полиция", "militsiya": "полиция",

  // ovqat
  "non": "хлеб", "suv": "вода", "choy": "чай", "qahva": "кофе", "sut": "молоко",
  "go‘sht": "мясо", "mol go‘shti": "говядина", "qo‘y go‘shti": "баранина",
  "tovuq": "курица", "baliq": "рыба", "tuxum": "яйцо", "guruch": "рис", "osh": "плов",
  "sho‘rva": "суп", "somsa": "самса", "yog‘": "масло", "tuz": "соль", "shakar": "сахар",
  "qalampir": "перец", "kartoshka": "картошка", "piyoz": "лук", "sabzi": "морковь",
  "pomidor": "помидор", "bodring": "огурец", "karam": "капуста", "olma": "яблоко",
  "uzum": "виноград", "anor": "гранат", "qovun": "дыня", "tarvuz": "арбуз",
  "banan": "банан", "apelsin": "апельсин", "limon": "лимон", "asal": "мёд",
  "pishloq": "сыр", "qatiq": "кефир", "smetana": "сметана", "makaron": "макароны",
  "kolbasa": "колбаса", "konfet": "конфеты", "muzqaymoq": "мороженое", "sharbat": "сок",
  "meva": "фрукты", "sabzavot": "овощи", "yong‘oq": "орехи", "un": "мука",
  "ovqat": "еда", "nonushta": "завтрак", "tushlik": "обед", "kechki ovqat": "ужин",
  "achchiq": "острый", "shirin": "сладкий", "nordon": "кислый",

  // joylar
  "do‘kon": "магазин", "bozor": "рынок", "oshxona": "кухня", "restoran": "ресторан",
  "kafe": "кафе", "bank": "банк", "pochta": "почта", "shifoxona": "больница",
  "poliklinika": "поликлиника", "dorixona": "аптека", "maktab": "школа",
  "universitet": "университет", "masjid": "мечеть", "mehmonxona": "гостиница",
  "uy": "дом", "kvartira": "квартира", "xona": "комната", "hojatxona": "туалет",
  "hammom": "ванная", "ishxona": "офис", "zavod": "завод", "qurilish": "стройка",
  "bekat": "остановка", "vokzal": "вокзал", "aeroport": "аэропорт", "metro": "метро",
  "ko‘cha": "улица", "shahar maydoni": "площадь", "park": "парк", "bog‘": "сад",
  "yer": "место", "shahar": "город", "qishloq": "деревня", "mamlakat": "страна",

  // transport
  "avtobus": "автобус", "tramvay": "трамвай", "trolleybus": "троллейбус",
  "taksi": "такси", "mashina": "машина", "poyezd": "поезд", "samolyot": "самолёт",
  "chipta": "билет", "yo‘l": "дорога", "benzin": "бензин", "velosiped": "велосипед",
  "yuk": "груз", "chamadon": "чемодан",

  // ish va hujjat
  "ish": "работа", "oylik": "зарплата", "pul": "деньги", "shartnoma": "договор",
  "hujjat": "документ", "pasport": "паспорт", "patent": "патент",
  "registratsiya": "регистрация", "viza": "виза", "ariza": "заявление",
  "imzo": "подпись", "muhr": "печать", "nusxa": "копия", "ma’lumotnoma": "справка",
  "soliq": "налог", "kvitansiya": "квитанция", "smena": "смена", "ta’til": "отпуск",
  "narx": "цена", "hisob": "счёт", "chek": "чек", "karta": "карта",
  "naqd": "наличные", "bank kartasi": "банковская карта",

  // salomatlik
  "bosh": "голова", "ko‘z": "глаз", "quloq": "ухо", "burun": "нос", "og‘iz": "рот",
  "tish": "зуб", "til": "язык", "bo‘yin": "шея", "qo‘l": "рука", "oyoq": "нога",
  "barmoq": "палец", "qorin": "живот", "yurak": "сердце", "orqa": "спина",
  "teri": "кожа", "qon": "кровь", "dori": "лекарство", "og‘riq": "боль",
  "isitma": "температура", "yo‘tal": "кашель", "shamollash": "простуда",
  "jarohat": "рана", "shifokor": "врач", "hamshira": "медсестра",
  "tez yordam": "скорая помощь", "kasal": "больной",

  // uy-ro'zg'or
  "eshik": "дверь", "deraza": "окно", "stol": "стол", "stul": "стул",
  "karavot": "кровать", "ko‘rpa": "одеяло", "yostiq": "подушка", "sovun": "мыло",
  "sochiq": "полотенце", "kalit": "ключ", "chiroq": "свет", "telefon": "телефон",
  "zaryadka": "зарядка", "internet": "интернет", "kompyuter": "компьютер",
  "televizor": "телевизор", "kiyim": "одежда", "ko‘ylak": "рубашка", "shim": "брюки",
  "poyabzal": "обувь", "etik": "сапоги", "palto": "пальто", "kurtka": "куртка",
  "qalpoq": "шапка", "qo‘lqop": "перчатки", "sumka": "сумка", "hamyon": "кошелёк",
  "paket": "пакет", "qog‘oz": "бумага", "ruchka": "ручка",

  // vaqt
  "kun": "день", "tun": "ночь", "ertalab": "утром", "kechqurun": "вечером",
  "hafta": "неделя", "oy": "месяц", "yil": "год", "soat": "час", "daqiqa": "минута",
  "vaqt": "время", "dushanba": "понедельник", "seshanba": "вторник",
  "chorshanba": "среда", "payshanba": "четверг", "juma": "пятница",
  "shanba": "суббота", "yakshanba": "воскресенье", "bugun": "сегодня",
  "ertaga": "завтра", "kecha": "вчера", "hozir": "сейчас", "doim": "всегда",
  "hech qachon": "никогда", "ba’zan": "иногда", "erta": "рано", "kech": "поздно",

  // raqam
  "bir": "один", "ikki": "два", "uch": "три", "to‘rt": "четыре", "besh": "пять",
  "olti": "шесть", "yetti": "семь", "sakkiz": "восемь", "to‘qqiz": "девять",
  "o‘n": "десять", "yigirma": "двадцать", "o‘ttiz": "тридцать", "qirq": "сорок",
  "ellik": "пятьдесят", "oltmish": "шестьдесят", "yetmish": "семьдесят",
  "sakson": "восемьдесят", "to‘qson": "девяносто", "yuz": "сто", "ming": "тысяча",
  "million": "миллион", "yarim": "половина", "birinchi": "первый", "ikkinchi": "второй",

  // sifat
  "katta": "большой", "kichik": "маленький", "yaxshi": "хороший", "yomon": "плохой",
  "yangi": "новый", "eski": "старый", "issiq": "горячий", "sovuq": "холодный",
  "baland": "высокий", "past": "низкий", "uzoq": "далеко", "yaqin": "близко",
  "tez": "быстро", "sekin": "медленно", "arzon": "дешёвый", "qimmat": "дорогой",
  "oson": "лёгкий", "qiyin": "трудный", "toza": "чистый", "iflos": "грязный",
  "to‘liq": "полный", "bo‘sh": "пустой", "ochiq": "открыто", "yopiq": "закрыто",
  "chiroyli": "красивый", "mazali": "вкусный", "ko‘p": "много", "oz": "мало",
  "boshqa": "другой", "o‘ng": "направо", "chap": "налево", "to‘g‘ri": "прямо",
  "yuqori": "вверх", "quyi": "вниз",

  // ob-havo
  "ob-havo": "погода", "qor": "снег", "yomg‘ir": "дождь", "shamol": "ветер",
  "quyosh": "солнце", "muz": "лёд", "bulut": "облако",

  // fe'l (o'zak)
  "bor-": "идти", "kel-": "приходить", "ket-": "уходить", "qil-": "делать",
  "ber-": "дать", "ol-": "взять", "ye-": "есть", "ich-": "пить", "gapir-": "говорить",
  "ayt-": "сказать", "eshit-": "слышать", "ko‘r-": "видеть", "bil-": "знать",
  "tushun-": "понимать", "o‘qi-": "читать", "yoz-": "писать", "ishla-": "работать",
  "uxla-": "спать", "tur-": "встать", "o‘tir-": "сидеть", "yur-": "ходить",
  "kut-": "ждать", "so‘ra-": "спросить", "top-": "найти", "yo‘qot-": "потерять",
  "sotib ol-": "купить", "sot-": "продать", "to‘la-": "платить", "och-": "открыть",
  "yop-": "закрыть", "boshla-": "начать", "tugat-": "закончить", "sev-": "любить",
  "xohla-": "хотеть", "kerak": "нужно", "mumkin": "можно", "yordam ber-": "помочь",
  "chaqir-": "вызвать", "to‘xta-": "остановиться", "bo‘l-": "быть",

  // kompyuter va 1C
  "dastur": "программа", "kod": "код", "xato": "ошибка", "fayl": "файл",
  "papka": "папка", "tugma": "кнопка", "oyna": "окно", "ekran": "экран",
  "sichqoncha": "мышка", "klaviatura": "клавиатура", "parol": "пароль",
  "login": "логин", "server": "сервер", "baza": "база", "jadval": "таблица",
  "maydon": "поле", "satr": "строка", "ustun": "колонка", "hisobot": "отчёт",
  "sozlama": "настройка", "yangilanish": "обновление", "versiya": "версия",
  "saqlash": "сохранить", "o‘chirish": "удалить", "qo‘shish": "добавить",
  "tahrirlash": "редактировать", "qidirish": "поиск", "chop etish": "печать",
  "yuklab olish": "скачать", "tekshirish": "проверить", "ulanish": "подключение",
  "kirish": "вход", "chiqish": "выход", "tizim": "система", "hisob yozuvi": "учётная запись",

  // ish jarayoni va buxgalteriya
  "ombor": "склад", "qoldiq": "остаток", "kirim": "приход", "chiqim": "расход",
  "tannarx": "себестоимость", "mijoz": "клиент", "yetkazib beruvchi": "поставщик",
  "buyurtma": "заказ", "yetkazib berish": "доставка", "to‘lov": "оплата",
  "summa": "сумма", "miqdor": "количество", "chegirma": "скидка", "solig‘i": "налог",
  "buxgalteriya": "бухгалтерия", "omborchi": "кладовщик", "boshqaruv": "управление",

  // o'qish
  "dars": "занятие", "o‘qituvchi": "преподаватель", "talaba": "студент",
  "kurs": "курс", "vazifa": "задание", "misol": "пример", "qo‘llanma": "инструкция",
  "amaliyot": "практика", "savol": "вопрос", "javob": "ответ", "mavzu": "тема",
  "daftar": "тетрадь", "imtihon": "экзамен", "guruh": "группа",

  // xushmuomalalik
  "rahmat": "спасибо", "iltimos": "пожалуйста", "kechirasiz": "извините",
  "salom": "здравствуйте", "xayr": "до свидания", "marhamat": "пожалуйста",
};
