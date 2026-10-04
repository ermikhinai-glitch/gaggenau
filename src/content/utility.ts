import type { Locale } from '@/config/site';

type Localized = Record<Locale, string>;

export type UtilitySlug = 'about' | 'contacts' | 'privacy' | 'terms' | 'warranty';

export type UtilitySection = {
  title: Localized;
  paragraphs: Localized[];
};

export type UtilityPageContent = {
  slug: UtilitySlug;
  title: Localized;
  description: Localized;
  eyebrow: Localized;
  lead: Localized;
  sections: UtilitySection[];
  draftNote?: Localized;
};

export const utilityPages: Record<UtilitySlug, UtilityPageContent> = {
  about: {
    slug: 'about',
    title: {
      ru: 'О сервисе',
      en: 'About the service',
    },
    description: {
      ru: 'Специализированный сервис ремонта техники Gaggenau в Москве и Подмосковье до 100 км.',
      en: 'Specialized Gaggenau appliance repair service in Moscow and suburbs within 100 km.',
    },
    eyebrow: { ru: 'О компании', en: 'Company' },
    lead: {
      ru: 'Мы помогаем частным клиентам быстро связаться с инженером и восстановить технику Gaggenau — без лишних шагов на сайте.',
      en: 'We help private clients reach an engineer quickly and restore Gaggenau appliances — without unnecessary website steps.',
    },
    sections: [
      {
        title: { ru: 'Фокус', en: 'Focus' },
        paragraphs: [
          {
            ru: 'Работаем только с техникой Gaggenau: стиральные и посудомоечные машины, холодильники, духовые шкафы и кофемашины.',
            en: 'We service Gaggenau appliances only: washing machines, dishwashers, refrigerators, ovens and coffee machines.',
          },
        ],
      },
      {
        title: { ru: 'Как устроена работа', en: 'How we work' },
        paragraphs: [
          {
            ru: 'Заявка или звонок → связь со специалистом в рабочие часы → выезд и диагностика → ремонт с оригинальными запчастями после согласования.',
            en: 'Request or call → specialist contact during business hours → visit and diagnostics → repair with original parts after approval.',
          },
          {
            ru: 'Ежедневно с 8:00 до 22:00 (Europe/Moscow) перезваниваем в течение 15 минут. Ночью заявку принимаем и связываемся после 8:00.',
            en: 'Daily 8:00–22:00 (Europe/Moscow) we call back within 15 minutes. Overnight requests are accepted; we contact after 8:00.',
          },
        ],
      },
      {
        title: { ru: 'Гарантия', en: 'Warranty' },
        paragraphs: [
          {
            ru: 'На выполненные работы — 12 месяцев. На установленные запчасти действует гарантия производителя.',
            en: '12 months on completed labour. Installed parts follow the manufacturer warranty.',
          },
        ],
      },
    ],
  },

  contacts: {
    slug: 'contacts',
    title: {
      ru: 'Контакты',
      en: 'Contacts',
    },
    description: {
      ru: 'Телефон, email и режим работы сервиса Gaggenau в Москве и Подмосковье до 100 км.',
      en: 'Phone, email and business hours for Gaggenau service in Moscow and suburbs within 100 km.',
    },
    eyebrow: { ru: 'Связь', en: 'Get in touch' },
    lead: {
      ru: 'Позвоните или оставьте заявку на сайте — оба канала равноправны. В рабочие часы специалист ответит в течение 15 минут.',
      en: 'Call or leave a request on the site — both channels are equal. During business hours a specialist replies within 15 minutes.',
    },
    sections: [
      {
        title: { ru: 'Зона выезда', en: 'Service area' },
        paragraphs: [
          {
            ru: 'Москва и Подмосковье до 100 км. Точный адрес и возможность выезда уточняем при звонке.',
            en: 'Moscow and suburbs within 100 km. Exact address and visit feasibility are confirmed on the call.',
          },
        ],
      },
      {
        title: { ru: 'Режим работы', en: 'Hours' },
        paragraphs: [
          {
            ru: 'Ежедневно 8:00–22:00 по московскому времени. Заявки принимаем круглосуточно через форму на сайте.',
            en: 'Daily 8:00–22:00 Moscow time. Website requests are accepted around the clock.',
          },
        ],
      },
    ],
  },

  privacy: {
    slug: 'privacy',
    title: {
      ru: 'Политика конфиденциальности',
      en: 'Privacy policy',
    },
    description: {
      ru: 'Информация об обработке персональных данных на сайте сервиса Gaggenau.',
      en: 'Information about personal data processing on the Gaggenau service website.',
    },
    eyebrow: { ru: 'Персональные данные', en: 'Personal data' },
    lead: {
      ru: 'Этот текст — рабочая оболочка до финальной редакции юриста. Он описывает общий порядок обработки данных, которые вы оставляете в форме заявки.',
      en: 'This is a working shell pending final legal review. It outlines how we process data submitted in the request form.',
    },
    draftNote: {
      ru: 'Черновик для запуска сайта. Перед рекламой и боевым трафиком заменить на утверждённую редакцию.',
      en: 'Draft for site launch. Replace with an approved version before paid traffic.',
    },
    sections: [
      {
        title: { ru: 'Какие данные собираем', en: 'What we collect' },
        paragraphs: [
          {
            ru: 'Обязательные поля заявки: имя, телефон, согласие на обработку персональных данных. По желанию: город, удобное время звонка, тип техники, описание проблемы, предпочтение WhatsApp и/или Telegram.',
            en: 'Required request fields: name, phone, consent to personal data processing. Optional: city, preferred call time, appliance type, problem description, WhatsApp and/or Telegram preference.',
          },
          {
            ru: 'Также могут сохраняться технические сведения, необходимые для работы формы (например, язык страницы и адрес страницы отправки).',
            en: 'Technical details needed for the form may also be stored (for example page language and the submit page path).',
          },
        ],
      },
      {
        title: { ru: 'Зачем обрабатываем', en: 'Why we process data' },
        paragraphs: [
          {
            ru: 'Чтобы связаться с вами по заявке, уточнить детали выезда и оказать сервис ремонта техники Gaggenau.',
            en: 'To contact you about the request, clarify visit details and provide Gaggenau repair service.',
          },
        ],
      },
      {
        title: { ru: 'Кому передаём', en: 'Who receives data' },
        paragraphs: [
          {
            ru: 'Данные заявки направляются оператору сервиса по каналам уведомлений (например, email и Telegram), чтобы обработать обращение. Мы не продаём персональные данные третьим лицам.',
            en: 'Request data is sent to the service operator via notification channels (for example email and Telegram) to handle the inquiry. We do not sell personal data to third parties.',
          },
        ],
      },
      {
        title: { ru: 'Согласие и отзыв', en: 'Consent and withdrawal' },
        paragraphs: [
          {
            ru: 'Отправляя форму, вы подтверждаете согласие на обработку указанных данных. Чтобы уточнить или отозвать согласие, свяжитесь с нами по контактам на сайте.',
            en: 'By submitting the form you consent to processing the data provided. To clarify or withdraw consent, contact us using the details on the site.',
          },
        ],
      },
    ],
  },

  warranty: {
    slug: 'warranty',
    title: {
      ru: 'Гарантии',
      en: 'Warranty',
    },
    description: {
      ru: 'Гарантия на ремонт техники Gaggenau: 12 месяцев на работы, оригинальные запчасти, поддержка после выезда.',
      en: 'Gaggenau repair warranty: 12 months on labour, original parts, support after the visit.',
    },
    eyebrow: { ru: 'Надёжность сервиса', en: 'Service reliability' },
    lead: {
      ru: 'Гарантии на ремонт техники Gaggenau — прозрачные условия по работам, запчастям и сопровождению после выезда.',
      en: 'Warranty on Gaggenau repairs — clear terms for labour, parts and follow-up after the visit.',
    },
    sections: [
      {
        title: { ru: 'Специализация на Gaggenau', en: 'Gaggenau specialization' },
        paragraphs: [
          {
            ru: 'Работаем только с техникой бренда Gaggenau: стиральные и посудомоечные машины, холодильники, духовые шкафы и кофемашины. Знаем типовые неисправности и узлы серии.',
            en: 'We service Gaggenau appliances only: washing machines, dishwashers, refrigerators, ovens and coffee machines. We know common faults and series-specific assemblies.',
          },
        ],
      },
      {
        title: { ru: 'Гарантия на работы — 12 месяцев', en: '12-month labour warranty' },
        paragraphs: [
          {
            ru: 'На выполненные работы даём фиксированную гарантию 12 месяцев. Если в гарантийный срок проявится дефект, связанный с выполненным ремонтом, устраняем его по условиям сервиса.',
            en: 'Completed labour is covered by a fixed 12-month warranty. If a defect related to the repair appears within that term, we resolve it under service terms.',
          },
        ],
      },
      {
        title: { ru: 'Оригинальные запчасти', en: 'Original parts' },
        paragraphs: [
          {
            ru: 'Устанавливаем только оригинальные комплектующие. На запчасти действует гарантия производителя — отдельно от гарантии на работы.',
            en: 'We install original parts only. Parts are covered by the manufacturer warranty — separate from the labour warranty.',
          },
          {
            ru: 'Качественный ремонт с правильными деталями — основа долгой и стабильной работы техники.',
            en: 'A proper repair with the right parts is the basis for long, stable appliance performance.',
          },
        ],
      },
      {
        title: { ru: 'Выезд в Москве и Подмосковье до 100 км', en: 'On-site service in Moscow and suburbs within 100 km' },
        paragraphs: [
          {
            ru: 'Инженер выезжает к клиенту в Москве и Подмосковье до 100 км. Диагностика на месте, согласование объёма работ до ремонта. Точный адрес и возможность выезда уточняем при звонке.',
            en: 'An engineer visits the client in Moscow and the Moscow Region. On-site diagnostics, scope agreed before repair. Exact address and visit feasibility are confirmed on the call.',
          },
        ],
      },
      {
        title: { ru: 'На связи после ремонта', en: 'Support after repair' },
        paragraphs: [
          {
            ru: 'После ремонта остаёмся на связи: вопросы по эксплуатации, гарантийные случаи, повторная диагностика при необходимости. Звонок или заявка на сайте — оба канала равноправны.',
            en: 'After repair we stay available: usage questions, warranty cases, and a follow-up visit if needed. Call or website request — both channels are equal.',
          },
        ],
      },
      {
        title: { ru: 'Прозрачные условия', en: 'Clear terms' },
        paragraphs: [
          {
            ru: 'Стоимость ремонта определяется после осмотра. Выезд и диагностика входят в условия при выполнении ремонта; при отказе от ремонта оплачиваются отдельно. Подробности — в договоре оферты.',
            en: 'Repair cost is set after inspection. Visit and diagnostics are included when repair proceeds; if repair is declined they are charged separately. Details are in the terms of service.',
          },
        ],
      },
    ],
  },

  terms: {
    slug: 'terms',
    title: {
      ru: 'Договор оферты',
      en: 'Terms of service',
    },
    description: {
      ru: 'Условия оказания услуг сервиса ремонта техники Gaggenau — черновик-оболочка.',
      en: 'Draft shell of service terms for Gaggenau appliance repair.',
    },
    eyebrow: { ru: 'Условия сервиса', en: 'Service terms' },
    lead: {
      ru: 'Ниже — каркас условий оказания услуг. Финальный текст оферты утверждается заказчиком/юристом до запуска рекламы.',
      en: 'Below is a framework of service terms. The final offer text is approved by the client/lawyer before advertising.',
    },
    draftNote: {
      ru: 'Черновик. Не является финальной юридической редакцией.',
      en: 'Draft. Not a final legal edition.',
    },
    sections: [
      {
        title: { ru: 'Предмет', en: 'Subject' },
        paragraphs: [
          {
            ru: 'Сервис принимает заявки на диагностику и ремонт бытовой техники бренда Gaggenau с выездом к клиенту в Москве и Подмосковье до 100 км.',
            en: 'The service accepts requests for diagnostics and repair of Gaggenau household appliances with a visit to the client in Moscow and suburbs within 100 km.',
          },
        ],
      },
      {
        title: { ru: 'Заявка и связь', en: 'Request and contact' },
        paragraphs: [
          {
            ru: 'Клиент оставляет заявку на сайте или звонит по указанному телефону. В рабочие часы оператор связывается в течение 15 минут; вне рабочих часов — после 8:00.',
            en: 'The client submits a website request or calls the listed number. During business hours the operator contacts within 15 minutes; outside hours — after 8:00.',
          },
        ],
      },
      {
        title: { ru: 'Выезд и диагностика', en: 'Visit and diagnostics' },
        paragraphs: [
          {
            ru: 'Стоимость ремонта определяется после осмотра на месте. Выезд и диагностика входят в условия сервиса при выполнении ремонта; при отказе от ремонта оплачиваются отдельно. Порядок оплаты обсуждается вне сайта.',
            en: 'Repair cost is determined after on-site inspection. Visit and diagnostics are included under service terms when repair proceeds; if repair is declined they are charged separately. Payment arrangements are discussed off-site.',
          },
        ],
      },
      {
        title: { ru: 'Запчасти и гарантия', en: 'Parts and warranty' },
        paragraphs: [
          {
            ru: 'Используются оригинальные запчасти. Гарантия на работы — 12 месяцев; на запчасти — гарантия производителя.',
            en: 'Original parts are used. Labour warranty is 12 months; parts follow the manufacturer warranty.',
          },
        ],
      },
    ],
  },
};

export function getUtilityPage(slug: UtilitySlug): UtilityPageContent {
  return utilityPages[slug];
}
