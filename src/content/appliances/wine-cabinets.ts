import type { AppliancePageContent } from './types';

export const wineCabinetsPage: AppliancePageContent = {
  slug: 'wine-cabinets',
  heroImage: '/images/home/wine-cabinets.webp',
  badge: {
    ru: 'Ремонт Gaggenau · Москва и МО',
    en: 'Gaggenau repair · Moscow and MO',
  },
  title: { ru: 'Ремонт', en: 'Repair of' },
  titleAccent: {
    ru: 'винных шкафов Gaggenau',
    en: 'Gaggenau wine cabinets',
  },
  subtitle: {
    ru: 'Выезд инженера, диагностика и ремонт винных шкафов Gaggenau. Оригинальные запчасти, гарантия на работы 12 месяцев.',
    en: 'On-site visit, diagnostics and repair for Gaggenau wine cabinets. Original parts, 12-month labour warranty.',
  },
  faultsTitle: { ru: 'Типовые неисправности', en: 'Common faults' },
  faults: [
    {
      title: { ru: 'Не держит температуру', en: 'Temperature won’t hold' },
      text: {
        ru: 'Зоны охлаждения, компрессор, датчики и электроника.',
        en: 'Cooling zones, compressor, sensors and electronics.',
      },
    },
    {
      title: { ru: 'Конденсат / влажность', en: 'Condensation / humidity' },
      text: {
        ru: 'Уплотнение двери, дренаж, режим влажности.',
        en: 'Door seal, drain, humidity mode.',
      },
    },
    {
      title: { ru: 'Шум / вибрация', en: 'Noise / vibration' },
      text: {
        ru: 'Компрессор, вентиляторы, крепление полок.',
        en: 'Compressor, fans, shelf mounting.',
      },
    },
    {
      title: { ru: 'Подсветка и ошибки панели', en: 'Lighting and panel errors' },
      text: {
        ru: 'Свет внутри камеры и коды на дисплее — диагностика на месте.',
        en: 'Interior light and display codes — on-site diagnostics.',
      },
    },
  ],
  faqTitle: {
    ru: 'Вопросы по винным шкафам',
    en: 'Wine cabinet FAQ',
  },
  faq: [
    {
      q: { ru: 'Ремонтируете только Gaggenau?', en: 'Do you repair only Gaggenau?' },
      a: {
        ru: 'Да, эта страница — только винные шкафы Gaggenau.',
        en: 'Yes — this page covers Gaggenau wine cabinets only.',
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
      q: { ru: 'Нужно ли вынимать бутылки заранее?', en: 'Should I remove the bottles in advance?' },
      a: {
        ru: 'Не обязательно. Если для доступа понадобится освободить полки — инженер скажет при согласовании визита.',
        en: 'Not required. If shelves need to be cleared for access, the engineer will say so when scheduling.',
      },
    },
  ],
};
