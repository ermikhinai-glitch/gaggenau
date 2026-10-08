import type { AppliancePageContent } from './types';

export const connectionPage: AppliancePageContent = {
  slug: 'connection',
  heroImage: '/images/home/connection.webp',
  badge: {
    ru: 'Подключение Gaggenau · Москва и МО',
    en: 'Gaggenau connection · Moscow and MO',
  },
  title: { ru: 'Подключение', en: 'Connection of' },
  titleAccent: {
    ru: 'техники Gaggenau',
    en: 'Gaggenau appliances',
  },
  subtitle: {
    ru: 'Выезд инженера, подключение и ввод в эксплуатацию техники Gaggenau. Вода, электричество, встройка и первый запуск.',
    en: 'Engineer visit, connection and commissioning of Gaggenau appliances. Water, power, installation and first start.',
  },
  faultsTitle: { ru: 'Что входит', en: 'What’s included' },
  faults: [
    {
      title: { ru: 'Вода и слив', en: 'Water and drain' },
      text: {
        ru: 'Подключение к воде и канализации для стиральных и посудомоечных машин.',
        en: 'Water and drain hookup for washing machines and dishwashers.',
      },
    },
    {
      title: { ru: 'Электричество', en: 'Power' },
      text: {
        ru: 'Подключение к электросети с проверкой линии и защитных автоматов.',
        en: 'Connection to the electrical supply with a check of the line and breakers.',
      },
    },
    {
      title: { ru: 'Встройка и уровень', en: 'Installation and levelling' },
      text: {
        ru: 'Установка в нишу, выравнивание и крепление встроенной техники.',
        en: 'Fitting into the niche, levelling and securing built-in appliances.',
      },
    },
    {
      title: { ru: 'Первый запуск', en: 'First start' },
      text: {
        ru: 'Проверка режимов и пробный запуск после подключения.',
        en: 'Mode check and a test run after connection.',
      },
    },
  ],
  faqTitle: {
    ru: 'Вопросы по подключению',
    en: 'Connection FAQ',
  },
  faq: [
    {
      q: { ru: 'Подключаете только Gaggenau?', en: 'Do you connect only Gaggenau?' },
      a: {
        ru: 'Да, подключаем технику Gaggenau.',
        en: 'Yes — we connect Gaggenau appliances.',
      },
    },
    {
      q: { ru: 'Как быстро приедете?', en: 'How soon can you visit?' },
      a: {
        ru: 'В рабочие часы возможен выезд от 30 минут при наличии мастера; точное время согласуем при звонке. Ответ на заявку — в течение 15 минут с 8:00 до 22:00.',
        en: 'During business hours a visit from 30 minutes is possible when an engineer is available; exact time is confirmed on the call. Callback within 15 minutes from 8:00 to 22:00.',
      },
    },
    {
      q: { ru: 'Что подготовить до визита?', en: 'What should I prepare before the visit?' },
      a: {
        ru: 'Нужен доступ к технике, воде, сливу и электрощиту. Точки подключения лучше согласовать заранее.',
        en: 'Please keep access to the appliance, water, drain and electrical panel. Connection points are best agreed in advance.',
      },
    },
  ],
};
