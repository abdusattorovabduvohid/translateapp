/**
 * Grammatika kartalari — faqat gapira boshlash uchun kerak bo'ladigan minimum.
 * Har biri bir ekranga sig'adi va darhol mashqqa ulanadi.
 */

export interface GrammarRow {
  ru: string;
  uz: string;
  hint?: string;
}

export interface GrammarCard {
  id: string;
  title: string;
  /** Bir gapda mohiyati */
  lead: string;
  rows: GrammarRow[];
  /** Eng ko'p uchraydigan xato */
  warn?: string;
  /** Darhol mashq qilish uchun qolip id'lari */
  patterns?: string[];
}

export const GRAMMAR: GrammarCard[] = [
  {
    id: "klaviatura",
    title: "Rus klaviaturasini qo‘shish",
    lead: "Kirillda yozolmasangiz ham mashq ishlaydi — lotinda yozing, ilova o‘zi kirillga o‘giradi. Lekin klaviaturani qo‘shib qo‘ygan yaxshi.",
    rows: [
      { ru: "Android", uz: "Sozlamalar → Tizim → Til va kiritish → Klaviatura → Tillar → Ruscha" },
      { ru: "iPhone", uz: "Настройки → Основные → Клавиатура → Клавиатуры → Новая → Русская" },
      { ru: "Gboard", uz: "Bo‘shliq tugmasini bosib turing → tilni almashtiring" },
      { ru: "spasibo", uz: "→ спасибо", hint: "lotinda yozsangiz ham to‘g‘ri deb qabul qilinadi" },
      { ru: "pozhaluysta", uz: "→ пожалуйста", hint: "zh = ж, y = й" },
      { ru: "zdravstvuyte", uz: "→ здравствуйте" },
    ],
    warn: "Lotinda yozish vaqtinchalik yechim. Kirillda yozsangiz, harflar esda tezroq qoladi.",
  },
  {
    id: "olmosh",
    title: "Olmoshlar va fe’l oxirlari",
    lead: "Rus tilida fe’l kim haqida ekaniga qarab oxiri o‘zgaradi. Shuning uchun «я», «вы» ni tushirib qoldirsa ham tushunishadi.",
    rows: [
      { ru: "я делаю", uz: "men qilaman", hint: "-ю" },
      { ru: "ты делаешь", uz: "sen qilasan", hint: "-ешь" },
      { ru: "вы делаете", uz: "siz qilasiz", hint: "-ете · odobli shakl" },
      { ru: "он / она делает", uz: "u qiladi", hint: "-ет" },
      { ru: "мы делаем", uz: "biz qilamiz", hint: "-ем" },
      { ru: "они делают", uz: "ular qilishadi", hint: "-ют" },
      { ru: "я работаю, вы работаете", uz: "men ishlayman, siz ishlaysiz" },
      { ru: "я понимаю, вы понимаете", uz: "men tushunaman, siz tushunasiz" },
    ],
    warn: "Notanish odamga har doim «вы». «ты» — faqat do‘st va bolalarga.",
    patterns: ["menya-zovut", "ne-ponimayu"],
  },
  {
    id: "nuzhno-mozhno",
    title: "нужно · можно · хочу",
    lead: "Bu uchtasi eng tez ish beradigan qoida. Ulardan keyin fe’l O‘ZGARMAYDI — boshlang‘ich shaklda qoladi.",
    rows: [
      { ru: "Мне нужно идти", uz: "Menga ketish kerak" },
      { ru: "Мне нужно купить", uz: "Menga sotib olish kerak" },
      { ru: "Можно войти?", uz: "Kirsam bo‘ladimi?" },
      { ru: "Можно записать?", uz: "Yozib olsam bo‘ladimi?" },
      { ru: "Я хочу пить", uz: "Ichgim keldi" },
      { ru: "Я хочу учиться", uz: "O‘qimoqchiman" },
      { ru: "Надо подождать", uz: "Kutish kerak", hint: "надо = нужно" },
    ],
    warn: "«Мне нужно идти» — to‘g‘ri. «Мне нужно иду» — xato. Fe’lga tegmang.",
    patterns: ["mne-nuzhno", "mozhno", "ya-hochu"],
  },
  {
    id: "jins",
    title: "Jins: нужен · нужна · нужно",
    lead: "Narsa so‘ralganda «нужен» narsaning jinsiga moslashadi. Oxirgi harfiga qarang.",
    rows: [
      { ru: "нужен паспорт", uz: "pasport kerak", hint: "undosh bilan tugagan → нужен" },
      { ru: "нужен пароль", uz: "parol kerak" },
      { ru: "нужна ручка", uz: "ruchka kerak", hint: "-а / -я bilan tugagan → нужна" },
      { ru: "нужна помощь", uz: "yordam kerak", hint: "-ь ko‘pincha ayol jinsi" },
      { ru: "нужно место", uz: "joy kerak", hint: "-о / -е bilan tugagan → нужно" },
      { ru: "мой телефон", uz: "mening telefonim" },
      { ru: "моя работа", uz: "mening ishim" },
      { ru: "моё время", uz: "mening vaqtim" },
    ],
    warn: "Adashsangiz ham tushunishadi. Lekin «нужно» + fe’l har doim to‘g‘ri — shubhalansangiz shuni ishlating.",
    patterns: ["nuzhen-nuzhna"],
  },
  {
    id: "kelishik",
    title: "Uchta kelishik — shuncha yetadi",
    lead: "Rus tilida 6 ta kelishik bor, lekin gapirish uchun uchtasi kifoya: kim/nima · kimni/nimani · qayerda.",
    rows: [
      { ru: "Это документ", uz: "Bu hujjat", hint: "kim/nima — asl shakl" },
      { ru: "Я вижу документ", uz: "Men hujjatni ko‘ryapman", hint: "jonsiz narsa o‘zgarmaydi" },
      { ru: "Я вижу Ивана", uz: "Men Ivanni ko‘ryapman", hint: "odam bo‘lsa -а qo‘shiladi" },
      { ru: "Я читаю книгу", uz: "Men kitob o‘qiyapman", hint: "книга → книгу (-а → -у)" },
      { ru: "в офисе", uz: "ofisda", hint: "qayerda? → -е" },
      { ru: "на работе", uz: "ishda", hint: "работа → работе" },
      { ru: "в Москве", uz: "Moskvada", hint: "Москва → Москве" },
      { ru: "в офис", uz: "ofisga", hint: "qayerga? → asl shakl" },
    ],
    warn: "«в» — ichiga, «на» — ustiga yoki tadbirga: в офисе, но на работе, на занятии.",
    patterns: ["gde-mozhno"],
  },
  {
    id: "savol",
    title: "So‘roq so‘zlar",
    lead: "Sakkizta so‘z — deyarli har qanday savolni bera olasiz. Boshiga qo‘yiladi, qolgani o‘zgarmaydi.",
    rows: [
      { ru: "Что это?", uz: "Bu nima?" },
      { ru: "Кто это?", uz: "Bu kim?" },
      { ru: "Где метро?", uz: "Metro qayerda?" },
      { ru: "Куда идти?", uz: "Qayerga borish kerak?" },
      { ru: "Когда занятие?", uz: "Dars qachon?" },
      { ru: "Почему не работает?", uz: "Nega ishlamayapti?" },
      { ru: "Сколько стоит?", uz: "Qancha turadi?" },
      { ru: "Как это работает?", uz: "Bu qanday ishlaydi?" },
    ],
    warn: "«Где» — qayerda (turgan joy), «Куда» — qayerga (harakat). Adashtirmang.",
    patterns: ["skazhite", "chto-znachit"],
  },
  {
    id: "inkor",
    title: "не va нет farqi",
    lead: "O‘zbekchada ikkalasi ham «yo‘q». Rus tilida ikki xil ish qiladi.",
    rows: [
      { ru: "Нет", uz: "Yo‘q (javob)" },
      { ru: "У меня нет денег", uz: "Menda pul yo‘q", hint: "нет = mavjud emas" },
      { ru: "Я не понимаю", uz: "Men tushunmayapman", hint: "не = fe’l oldida inkor" },
      { ru: "Я не знаю", uz: "Men bilmayman" },
      { ru: "Это не работает", uz: "Bu ishlamayapti" },
      { ru: "Я ещё не сделал", uz: "Men hali qilmadim" },
      { ru: "Нет, спасибо", uz: "Yo‘q, rahmat" },
    ],
    warn: "«не» fe’ldan oldin, alohida yoziladi: «не работает», «неработает» emas.",
  },
  {
    id: "son",
    title: "Sonlar va narx",
    lead: "Do‘konda va ishda kerak. Narxda «рубль» soniga qarab o‘zgaradi.",
    rows: [
      { ru: "один, два, три, четыре, пять", uz: "1, 2, 3, 4, 5" },
      { ru: "шесть, семь, восемь, девять, десять", uz: "6, 7, 8, 9, 10" },
      { ru: "двадцать, тридцать, сорок, пятьдесят", uz: "20, 30, 40, 50" },
      { ru: "сто, двести, тысяча", uz: "100, 200, 1000" },
      { ru: "один рубль", uz: "1 rubl", hint: "1, 21, 31…" },
      { ru: "два рубля", uz: "2 rubl", hint: "2, 3, 4…" },
      { ru: "пять рублей", uz: "5 rubl", hint: "5 dan yuqori" },
      { ru: "полтора часа", uz: "bir yarim soat" },
    ],
    warn: "«сорок» — 40 (qirq), «четыре» — 4. O‘xshaydi, lekin boshqa.",
    patterns: ["skolko-stoit"],
  },
  {
    id: "zamon",
    title: "Uch zamon bitta fe’lda",
    lead: "Bitta fe’lni uch zamonda ayta olsangiz, hikoya qila olasiz.",
    rows: [
      { ru: "я делал", uz: "men qildim", hint: "erkak: -л" },
      { ru: "я делала", uz: "men qildim", hint: "ayol: -ла" },
      { ru: "я делаю", uz: "men qilaman / qilyapman" },
      { ru: "я буду делать", uz: "men qilaman (keyin)" },
      { ru: "я работал вчера", uz: "kecha ishladim" },
      { ru: "я работаю сейчас", uz: "hozir ishlayapman" },
      { ru: "я буду работать завтра", uz: "ertaga ishlayman" },
      { ru: "я понял", uz: "tushundim", hint: "eng ko‘p ishlatiladigan o‘tgan zamon" },
    ],
    warn: "O‘tgan zamonda erkak «-л», ayol «-ла». Siz erkak bo‘lsangiz: «я понял», «я сделал».",
  },
];

export function grammarById(id: string): GrammarCard | undefined {
  return GRAMMAR.find((card) => card.id === id);
}
