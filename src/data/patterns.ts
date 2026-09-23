/**
 * Gap qoliplari — rus tilida gapira boshlashning eng tez yo'li.
 * Bitta qolipni o'rgansangiz, bo'shliqqa so'z almashtirib o'nlab gap tuzasiz.
 */

export interface PatternSlot {
  /** To'liq o'zbekcha gap — savol shu bo'ladi */
  uz: string;
  /** Bo'shliqqa qo'yiladigan ruscha bo'lak */
  fill: string;
  /** To'liq ruscha gap — javob */
  ru: string;
  alt?: string[];
}

export interface Pattern {
  id: string;
  /** "Мне нужно ___" */
  frame: string;
  /** "Menga ___ kerak" */
  uz: string;
  /** O'zbekcha qoida */
  rule: string;
  /** Bitta tayyor misol */
  example: string;
  slots: PatternSlot[];
}

export const PATTERNS: Pattern[] = [
  {
    id: "menya-zovut",
    frame: "Меня зовут ___",
    uz: "Mening ismim ___",
    rule: "Ismni o‘zgartirmay, borligicha qo‘yasiz. Javobda «Очень приятно» deyiladi.",
    example: "Меня зовут Абдувохид.",
    slots: [
      { uz: "Mening ismim Abduvohid", fill: "Абдувохид", ru: "Меня зовут Абдувохид" },
      { uz: "Men O‘zbekistondanman", fill: "из Узбекистана", ru: "Я из Узбекистана" },
      { uz: "Men Toshkentdanman", fill: "из Ташкента", ru: "Я из Ташкента" },
      { uz: "Men dasturchiman", fill: "программист", ru: "Я программист" },
      { uz: "Men 1C o‘rganyapman", fill: "учу 1С", ru: "Я учу 1С" },
      { uz: "Tanishganimdan xursandman", fill: "приятно", ru: "Очень приятно" },
      { uz: "Men bu yerda yangiman", fill: "новенький", ru: "Я здесь новенький" },
    ],
  },
  {
    id: "ne-ponimayu",
    frame: "Я не понимаю ___",
    uz: "Men ___ tushunmayapman",
    rule: "Eng kerakli gap. «Я не понял» — o‘tgan zamon, «Я не понимаю» — hozir tushunmayapman.",
    example: "Извините, я не понимаю.",
    slots: [
      { uz: "Kechirasiz, tushunmayapman", fill: "не понимаю", ru: "Извините, я не понимаю" },
      { uz: "Men bu so‘zni tushunmadim", fill: "это слово", ru: "Я не понял это слово" },
      { uz: "Sekinroq gapiring, iltimos", fill: "помедленнее", ru: "Говорите помедленнее, пожалуйста" },
      { uz: "Takrorlang, iltimos", fill: "повторите", ru: "Повторите, пожалуйста" },
      { uz: "Men rus tilini yaxshi bilmayman", fill: "плохо говорю", ru: "Я плохо говорю по-русски" },
      { uz: "Yozib bering, iltimos", fill: "напишите", ru: "Напишите, пожалуйста" },
      { uz: "Biroz sekinroq, iltimos", fill: "чуть медленнее", ru: "Чуть медленнее, пожалуйста" },
    ],
  },
  {
    id: "skazhite",
    frame: "Скажите, пожалуйста, ___",
    uz: "Ayting-chi, iltimos, ___",
    rule: "Notanish odamdan so‘rashning eng odobli boshlanishi. «Скажите» — вы-shakli.",
    example: "Скажите, пожалуйста, где метро?",
    slots: [
      { uz: "Ayting-chi, metro qayerda?", fill: "где метро", ru: "Скажите, пожалуйста, где метро?" },
      { uz: "Ayting-chi, soat necha?", fill: "сколько времени", ru: "Скажите, пожалуйста, сколько времени?" },
      { uz: "Ayting-chi, bu qanday ishlaydi?", fill: "как это работает", ru: "Скажите, пожалуйста, как это работает?" },
      { uz: "Ayting-chi, hojatxona qayerda?", fill: "где туалет", ru: "Скажите, пожалуйста, где туалет?" },
      { uz: "Ayting-chi, dars qachon boshlanadi?", fill: "когда начинается занятие", ru: "Скажите, пожалуйста, когда начинается занятие?" },
      { uz: "Ayting-chi, bu qancha turadi?", fill: "сколько это стоит", ru: "Скажите, пожалуйста, сколько это стоит?" },
      { uz: "Ayting-chi, qaysi tomonga borish kerak?", fill: "в какую сторону идти", ru: "Скажите, пожалуйста, в какую сторону идти?" },
    ],
  },
  {
    id: "mne-nuzhno",
    frame: "Мне нужно ___",
    uz: "Menga ___ kerak (ish qilish kerak)",
    rule: "«нужно» dan keyin FE’L keladi va u boshlang‘ich shaklda qoladi: нужно идти, нужно купить.",
    example: "Мне нужно идти.",
    slots: [
      { uz: "Menga ketish kerak", fill: "идти", ru: "Мне нужно идти" },
      { uz: "Menga sotib olish kerak", fill: "купить", ru: "Мне нужно купить" },
      { uz: "Menga to‘lash kerak", fill: "заплатить", ru: "Мне нужно заплатить" },
      { uz: "Menga qo‘ng‘iroq qilish kerak", fill: "позвонить", ru: "Мне нужно позвонить" },
      { uz: "Menga hujjatni o‘tkazish kerak", fill: "провести документ", ru: "Мне нужно провести документ" },
      { uz: "Menga bazani yuklab olish kerak", fill: "скачать базу", ru: "Мне нужно скачать базу" },
      { uz: "Menga biroz dam olish kerak", fill: "отдохнуть", ru: "Мне нужно отдохнуть" },
    ],
  },
  {
    id: "nuzhen-nuzhna",
    frame: "Мне нужен / нужна / нужно ___",
    uz: "Menga ___ kerak (narsa kerak)",
    rule: "Bu yerda fe’l emas, NARSA keladi. «нужен» narsaning jinsiga qarab o‘zgaradi: нужен паспорт, нужна ручка, нужно место.",
    example: "Мне нужен пароль.",
    slots: [
      { uz: "Menga parol kerak", fill: "нужен пароль", ru: "Мне нужен пароль" },
      { uz: "Menga ruchka kerak", fill: "нужна ручка", ru: "Мне нужна ручка" },
      { uz: "Menga joy kerak", fill: "нужно место", ru: "Мне нужно место" },
      { uz: "Menga hujjat kerak", fill: "нужен документ", ru: "Мне нужен документ" },
      { uz: "Menga yordam kerak", fill: "нужна помощь", ru: "Мне нужна помощь" },
      { uz: "Menga ro‘yxatdan o‘tish kerak", fill: "нужна регистрация", ru: "Мне нужна регистрация" },
      { uz: "Menga dori kerak", fill: "нужно лекарство", ru: "Мне нужно лекарство" },
    ],
  },
  {
    id: "mozhno",
    frame: "Можно ___?",
    uz: "___ bo‘ladimi? (ruxsat so‘rash)",
    rule: "Ruxsat so‘raganda eng qisqa yo‘l. Keyin fe’lning boshlang‘ich shakli keladi.",
    example: "Можно записать?",
    slots: [
      { uz: "Yozib olsam bo‘ladimi?", fill: "записать", ru: "Можно записать?" },
      { uz: "Savol bersam bo‘ladimi?", fill: "задать вопрос", ru: "Можно задать вопрос?" },
      { uz: "Kirsam bo‘ladimi?", fill: "войти", ru: "Можно войти?" },
      { uz: "Karta bilan to‘lasam bo‘ladimi?", fill: "оплатить картой", ru: "Можно оплатить картой?" },
      { uz: "Ko‘rsam bo‘ladimi?", fill: "посмотреть", ru: "Можно посмотреть?" },
      { uz: "Sekinroq bo‘ladimi?", fill: "помедленнее", ru: "Можно помедленнее?" },
      { uz: "Yana bir marta bo‘ladimi?", fill: "ещё раз", ru: "Можно ещё раз?" },
    ],
  },
  {
    id: "gde-mozhno",
    frame: "Где можно ___?",
    uz: "Qayerda ___ bo‘ladi?",
    rule: "«Где» + «можно» + fe’l. Notanish shaharda eng ko‘p ishlatadigan savolingiz.",
    example: "Где можно поесть?",
    slots: [
      { uz: "Qayerda ovqatlansa bo‘ladi?", fill: "поесть", ru: "Где можно поесть?" },
      { uz: "Qayerda chipta sotib olsa bo‘ladi?", fill: "купить билет", ru: "Где можно купить билет?" },
      { uz: "Qayerda pul yechsa bo‘ladi?", fill: "снять деньги", ru: "Где можно снять деньги?" },
      { uz: "Qayerda telefonni zaryadlasa bo‘ladi?", fill: "зарядить телефон", ru: "Где можно зарядить телефон?" },
      { uz: "Qayerda SIM karta olsa bo‘ladi?", fill: "купить симкарту", ru: "Где можно купить симкарту?" },
      { uz: "Qayerda taksi chaqirsa bo‘ladi?", fill: "вызвать такси", ru: "Где можно вызвать такси?" },
    ],
  },
  {
    id: "chto-znachit",
    frame: "Что значит ___?",
    uz: "___ nima degani?",
    rule: "Darsda notanish atama eshitsangiz shuni ayting. So‘zni o‘zgartirmay qo‘yasiz.",
    example: "Что значит «проводка»?",
    slots: [
      { uz: "«Проводка» nima degani?", fill: "проводка", ru: "Что значит «проводка»?" },
      { uz: "«Регистр» nima degani?", fill: "регистр", ru: "Что значит «регистр»?" },
      { uz: "«Субконто» nima degani?", fill: "субконто", ru: "Что значит «субконто»?" },
      { uz: "Bu so‘z nima degani?", fill: "это слово", ru: "Что значит это слово?" },
      { uz: "Bu qisqartma nima degani?", fill: "это сокращение", ru: "Что значит это сокращение?" },
      { uz: "Bu xato nima degani?", fill: "эта ошибка", ru: "Что значит эта ошибка?" },
    ],
  },
  {
    id: "pokazhite",
    frame: "Покажите, пожалуйста, ___",
    uz: "Ko‘rsating, iltimos, ___",
    rule: "«Покажите» — вы-shakli buyruq, lekin «пожалуйста» bilan muloyim bo‘ladi.",
    example: "Покажите, пожалуйста, ещё раз.",
    slots: [
      { uz: "Yana bir marta ko‘rsating", fill: "ещё раз", ru: "Покажите, пожалуйста, ещё раз" },
      { uz: "Ekranni ko‘rsating", fill: "экран", ru: "Покажите, пожалуйста, экран" },
      { uz: "Misol ko‘rsating", fill: "пример", ru: "Покажите, пожалуйста, пример" },
      { uz: "Qayerda ekanini ko‘rsating", fill: "где это", ru: "Покажите, пожалуйста, где это" },
      { uz: "Qanday qilishni ko‘rsating", fill: "как это сделать", ru: "Покажите, пожалуйста, как это сделать" },
      { uz: "Sekinroq ko‘rsating", fill: "помедленнее", ru: "Покажите, пожалуйста, помедленнее" },
    ],
  },
  {
    id: "u-vas-est",
    frame: "У вас есть ___?",
    uz: "Sizda ___ bormi?",
    rule: "«У вас есть» — «sizda bor» degani. Narsa nomi o‘zgarmaydi.",
    example: "У вас есть вода?",
    slots: [
      { uz: "Sizda suv bormi?", fill: "вода", ru: "У вас есть вода?" },
      { uz: "Sizda non bormi?", fill: "хлеб", ru: "У вас есть хлеб?" },
      { uz: "Sizda wifi bormi?", fill: "вайфай", ru: "У вас есть вайфай?" },
      { uz: "Sizda qo‘llanma bormi?", fill: "инструкция", ru: "У вас есть инструкция?" },
      { uz: "Sizda vaqt bormi?", fill: "время", ru: "У вас есть время?" },
      { uz: "Sizda maydasi bormi?", fill: "мелочь", ru: "У вас есть мелочь?" },
    ],
  },
  {
    id: "skolko-stoit",
    frame: "Сколько стоит ___?",
    uz: "___ qancha turadi?",
    rule: "Bitta narsa — «стоит», ko‘p narsa — «стоят». Boshida «Сколько» o‘zgarmaydi.",
    example: "Сколько стоит билет?",
    slots: [
      { uz: "Chipta qancha turadi?", fill: "билет", ru: "Сколько стоит билет?" },
      { uz: "Bu qancha turadi?", fill: "это", ru: "Сколько стоит это?" },
      { uz: "Bir kilosi qancha turadi?", fill: "килограмм", ru: "Сколько стоит килограмм?" },
      { uz: "Yetkazib berish qancha turadi?", fill: "доставка", ru: "Сколько стоит доставка?" },
      { uz: "Kurs qancha turadi?", fill: "курс", ru: "Сколько стоит курс?" },
      { uz: "Hammasi qancha bo‘ldi?", fill: "всё вместе", ru: "Сколько всё вместе?" },
    ],
  },
  {
    id: "ya-hochu",
    frame: "Я хочу ___",
    uz: "Men ___ xohlayman",
    rule: "«хочу» dan keyin fe’lning boshlang‘ich shakli yoki narsa keladi: хочу пить, хочу чай.",
    example: "Я хочу пить.",
    slots: [
      { uz: "Men ichgim keldi", fill: "пить", ru: "Я хочу пить" },
      { uz: "Men yegim keldi", fill: "есть", ru: "Я хочу есть" },
      { uz: "Men o‘qimoqchiman", fill: "учиться", ru: "Я хочу учиться" },
      { uz: "Men bu yerda ishlamoqchiman", fill: "работать здесь", ru: "Я хочу работать здесь" },
      { uz: "Men savol bermoqchiman", fill: "задать вопрос", ru: "Я хочу задать вопрос" },
      { uz: "Men choy ichmoqchiman", fill: "чай", ru: "Я хочу чай" },
    ],
  },
];

export const PATTERN_COUNT = PATTERNS.length;

export function patternById(id: string): Pattern | undefined {
  return PATTERNS.find((pattern) => pattern.id === id);
}
