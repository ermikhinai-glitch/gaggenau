import type { AppliancePageContent } from './types';

export const dishwashersPage: AppliancePageContent = {
  slug: 'dishwashers',
  heroImage: '/images/home/dishwashers.png',
  badge: {
    ru: 'Ремонт Gaggenau · Москва и МО',
    en: 'Gaggenau repair · Moscow and MO',
  },
  title: { ru: 'Ремонт', en: 'Repair of' },
  titleAccent: {
    ru: 'посудомоечных машин Gaggenau',
    en: 'Gaggenau dishwashers',
  },
  subtitle: {
    ru: 'Выезд инженера, диагностика и ремонт посудомоечных машин Gaggenau. Оригинальные запчасти, гарантия на работы 12 месяцев.',
    en: 'On-site visit, diagnostics and repair for Gaggenau dishwashers. Original parts, 12-month labour warranty.',
  },
  faultsTitle: { ru: 'Типовые неисправности', en: 'Common faults' },
  faults: [
    {
      title: { ru: 'Не моет / плохо сушит', en: 'Poor wash / dry' },
      text: {
        ru: 'Циркуляционный насос, ТЭН, сенсоры, система сушки.',
        en: 'Circulation pump, heater, sensors, drying system.',
      },
    },
    {
      title: { ru: 'Протечка / Aquastop', en: 'Leak / Aquastop' },
      text: {
        ru: 'Уплотнения, патрубки, датчик протечки, поддон.',
        en: 'Seals, hoses, leak sensor, base tray.',
      },
    },
    {
      title: { ru: 'Не сливает воду', en: 'Won’t drain' },
      text: {
        ru: 'Сливной насос, засор фильтра или шланга.',
        en: 'Drain pump, filter or hose blockage.',
      },
    },
    {
      title: { ru: 'Ошибка на панели', en: 'Panel error' },
      text: {
        ru: 'Электроника и датчики — код разбираем при диагностике.',
        en: 'Electronics and sensors — codes are decoded during diagnostics.',
      },
    },
  ],
  faqTitle: {
    ru: 'Вопросы по посудомоечным машинам',
    en: 'Dishwasher FAQ',
  },
  faq: [
    {
      q: { ru: 'Ремонтируете только Gaggenau?', en: 'Do you repair only Gaggenau?' },
      a: {
        ru: 'Да, эта страница — только посудомоечные машины Gaggenau.',
        en: 'Yes — this page covers Gaggenau dishwashers only.',
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
      q: { ru: 'Нужно ли освобождать шкаф от посуды?', en: 'Should I empty the dishwasher?' },
      a: {
        ru: 'Да, желательно убрать посуду и обеспечить доступ к фильтру и подключениям.',
        en: 'Yes — please remove dishes and keep access to the filter and connections.',
      },
    },
  ],
};
