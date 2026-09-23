/**
 * Rolli dialoglar — ilova qarshi tomonning gapini ovozda o'qiydi,
 * siz o'z gapingizni yozasiz yoki aytasiz.
 */

export type Speaker = "them" | "you";

export interface DialogueLine {
  who: Speaker;
  ru: string;
  /** "them" uchun — ma'nosi. "you" uchun — topshiriq. */
  uz: string;
  alt?: string[];
}

export interface Dialogue {
  id: string;
  title: string;
  /** O'zbekcha vaziyat izohi */
  scene: string;
  lines: DialogueLine[];
}

export const DIALOGUES: Dialogue[] = [
  {
    id: "dars-tanishuv",
    title: "Birinchi dars — tanishuv",
    scene: "Kursga birinchi kun keldingiz. O‘qituvchi siz bilan tanishmoqchi.",
    lines: [
      { who: "them", ru: "Здравствуйте! Проходите, садитесь.", uz: "Assalomu alaykum! Kiring, o‘tiring." },
      { who: "you", ru: "Здравствуйте!", uz: "Salomlashing", alt: ["Здравствуйте", "Добрый день"] },
      { who: "them", ru: "Как вас зовут?", uz: "Ismingiz nima?" },
      { who: "you", ru: "Меня зовут Абдувохид.", uz: "Ismingizni ayting", alt: ["Меня зовут Абдувохид"] },
      { who: "them", ru: "Очень приятно. Откуда вы?", uz: "Tanishganimdan xursandman. Qayerdansiz?" },
      { who: "you", ru: "Я из Узбекистана.", uz: "O‘zbekistondan ekaningizni ayting", alt: ["Я из Узбекистана", "Из Узбекистана"] },
      { who: "them", ru: "Вы раньше работали с 1С?", uz: "Ilgari 1C bilan ishlaganmisiz?" },
      { who: "you", ru: "Нет, я начинающий.", uz: "Yo‘q, yangi boshlovchi ekaningizni ayting", alt: ["Нет, я новичок", "Я начинающий"] },
      { who: "them", ru: "Ничего страшного. Начнём с простого.", uz: "Hechqisi yo‘q. Oddiydan boshlaymiz." },
      { who: "you", ru: "Спасибо.", uz: "Rahmat ayting", alt: ["Спасибо", "Спасибо большое"] },
    ],
  },
  {
    id: "dars-savol",
    title: "Dars o‘rtasida savol berish",
    scene: "O‘qituvchi tez gapiryapti, siz ulgurmayapsiz.",
    lines: [
      { who: "them", ru: "Здесь мы создаём справочник и заполняем реквизиты.", uz: "Bu yerda ma’lumotnoma yaratamiz va rekvizitlarni to‘ldiramiz." },
      { who: "you", ru: "Извините, я не понял.", uz: "Tushunmaganingizni ayting", alt: ["Извините, я не понял", "Я не понимаю"] },
      { who: "them", ru: "Что именно непонятно?", uz: "Aynan nimasi tushunarsiz?" },
      { who: "you", ru: "Что значит «реквизит»?", uz: "«Реквизит» nima degani — so‘rang", alt: ["Что такое реквизит?"] },
      { who: "them", ru: "Реквизит — это поле, например дата или сумма.", uz: "Rekvizit — bu maydon, masalan sana yoki summa." },
      { who: "you", ru: "Покажите, пожалуйста, ещё раз.", uz: "Yana bir marta ko‘rsatishini so‘rang", alt: ["Покажите ещё раз", "Можно ещё раз?"] },
      { who: "them", ru: "Конечно, смотрите на экран.", uz: "Albatta, ekranga qarang." },
      { who: "you", ru: "Можно записать?", uz: "Yozib olishga ruxsat so‘rang", alt: ["Можно записать?"] },
      { who: "them", ru: "Да, конечно.", uz: "Ha, albatta." },
    ],
  },
  {
    id: "dars-xato",
    title: "Ekranda xato chiqdi",
    scene: "Amaliyot paytida dastur xato berdi.",
    lines: [
      { who: "you", ru: "Извините, у меня здесь ошибка.", uz: "Xato chiqqanini ayting", alt: ["У меня ошибка", "Здесь ошибка"] },
      { who: "them", ru: "Покажите, что написано.", uz: "Nima yozilganini ko‘rsating." },
      { who: "you", ru: "Я не понимаю это сообщение.", uz: "Xabarni tushunmaganingizni ayting", alt: ["Не понимаю это сообщение"] },
      { who: "them", ru: "Это значит, что документ не проведён.", uz: "Bu hujjat o‘tkazilmagan degani." },
      { who: "you", ru: "Что мне нужно сделать?", uz: "Nima qilish kerakligini so‘rang", alt: ["Что делать?", "Что нужно сделать?"] },
      { who: "them", ru: "Нажмите «Провести и закрыть».", uz: "«Провести и закрыть» ni bosing." },
      { who: "you", ru: "Теперь работает. Спасибо!", uz: "Endi ishlayotganini ayting va rahmat ayting", alt: ["Работает, спасибо"] },
    ],
  },
  {
    id: "tanaffus",
    title: "Tanaffusda",
    scene: "Hamkasbingiz bilan oshxonada.",
    lines: [
      { who: "them", ru: "Привет! Пойдём пообедаем?", uz: "Salom! Tushlik qilamizmi?" },
      { who: "you", ru: "Да, пойдём.", uz: "Rozilik bildiring", alt: ["Да, пойдём", "Давай", "Да, конечно"] },
      { who: "them", ru: "Что будешь есть?", uz: "Nima yeysan?" },
      { who: "you", ru: "Я не ем свинину.", uz: "Cho‘chqa go‘shti yemasligingizni ayting", alt: ["Я не ем свинину"] },
      { who: "them", ru: "Понял. Здесь есть курица и рыба.", uz: "Tushundim. Bu yerda tovuq va baliq bor." },
      { who: "you", ru: "Тогда курицу, пожалуйста.", uz: "Tovuq so‘rang", alt: ["Курицу, пожалуйста", "Я возьму курицу"] },
      { who: "them", ru: "Сколько ты здесь уже?", uz: "Bu yerda qancha bo‘lding?" },
      { who: "you", ru: "Я здесь недавно.", uz: "Yaqinda kelganingizni ayting", alt: ["Недавно", "Я недавно приехал"] },
    ],
  },
  {
    id: "ofis-kirish",
    title: "Ofisga kirish",
    scene: "Binoning kirishida qorovul to‘xtatdi.",
    lines: [
      { who: "them", ru: "Здравствуйте. Вы к кому?", uz: "Assalomu alaykum. Kimning oldiga?" },
      { who: "you", ru: "Здравствуйте. Я на курс по 1С.", uz: "1C kursiga kelganingizni ayting", alt: ["Я на занятие", "Я на курс"] },
      { who: "them", ru: "Ваш паспорт, пожалуйста.", uz: "Pasportingizni bering." },
      { who: "you", ru: "Вот мой паспорт.", uz: "Pasportni uzating", alt: ["Вот паспорт", "Пожалуйста"] },
      { who: "them", ru: "Третий этаж, кабинет двенадцать.", uz: "Uchinchi qavat, 12-xona." },
      { who: "you", ru: "Скажите, пожалуйста, где лифт?", uz: "Lift qayerdaligini so‘rang", alt: ["Где лифт?"] },
      { who: "them", ru: "Прямо и направо.", uz: "To‘g‘riga, keyin o‘ngga." },
      { who: "you", ru: "Спасибо большое.", uz: "Rahmat ayting", alt: ["Спасибо", "Большое спасибо"] },
    ],
  },
  {
    id: "taksi-metro",
    title: "Taksi va metro",
    scene: "Kursga kech qolyapsiz, taksi chaqirdingiz.",
    lines: [
      { who: "them", ru: "Здравствуйте, куда едем?", uz: "Assalomu alaykum, qayerga boramiz?" },
      { who: "you", ru: "Вот адрес, пожалуйста.", uz: "Manzilni ko‘rsating", alt: ["Вот адрес", "По этому адресу"] },
      { who: "them", ru: "Хорошо. Это минут двадцать.", uz: "Yaxshi. Yigirma daqiqacha." },
      { who: "you", ru: "Можно побыстрее? Я опаздываю.", uz: "Tezroq borishni so‘rang — kechikyapsiz", alt: ["Я опаздываю", "Можно быстрее?"] },
      { who: "them", ru: "Постараюсь. Пробки небольшие.", uz: "Harakat qilaman. Tirbandlik katta emas." },
      { who: "you", ru: "Сколько стоит поездка?", uz: "Qancha turishini so‘rang", alt: ["Сколько стоит?"] },
      { who: "them", ru: "Четыреста рублей.", uz: "To‘rt yuz rubl." },
      { who: "you", ru: "Можно оплатить картой?", uz: "Karta bilan to‘lash mumkinmi — so‘rang", alt: ["Можно картой?"] },
      { who: "them", ru: "Да, конечно. Приехали.", uz: "Ha, albatta. Yetib keldik." },
      { who: "you", ru: "Остановите здесь, пожалуйста.", uz: "Shu yerda to‘xtatishni so‘rang", alt: ["Остановите здесь"] },
    ],
  },
];

export function dialogueById(id: string): Dialogue | undefined {
  return DIALOGUES.find((dialogue) => dialogue.id === id);
}
