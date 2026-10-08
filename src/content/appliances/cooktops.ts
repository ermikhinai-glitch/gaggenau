import type { AppliancePageContent } from './types';

export const cooktopsPage: AppliancePageContent = {
  slug: 'cooktops',
  heroImage: '/images/home/cooktops.webp',
  badge: {
    ru: 'Ремонт Gaggenau · Москва и МО',
    en: 'Gaggenau repair · Moscow and MO',
  },
  title: { ru: 'Ремонт', en: 'Repair of' },
  titleAccent: {
    ru: 'варочных панелей Gaggenau',
    en: 'Gaggenau cooktops',
  },
  subtitle: {
    ru: 'Выезд инженера, диагностика и ремонт варочных панелей Gaggenau. Оригинальные запчасти, гарантия на работы 12 месяцев.',
    en: 'On-site visit, diagnostics and repair for Gaggenau cooktops. Original parts, 12-month labour warranty.',
  },
  faultsTitle: { ru: 'Типовые неисправности', en: 'Common faults' },
  faults: [
    {
      title: { ru: 'Не греет конфорка', en: 'Zone won’t heat' },
      text: {
        ru: 'Индуктор, силовая плата, датчики, реле нагрева.',
        en: 'Inductor, power board, sensors, heating relays.',
      },
    },
    {
      title: { ru: 'Не реагирует сенсор', en: 'Touch controls unresponsive' },
      text: {
        ru: 'Панель управления, стекло, электроника касания.',
        en: 'Control panel, glass, touch electronics.',
      },
    },
    {
      title: { ru: 'Ошибка на дисплее', en: 'Display error' },
      text: {
        ru: 'Код ошибки разбираем на месте и подтверждаем неисправный узел.',
        en: 'We decode the error on site and confirm the faulty assembly.',
      },
    },
    {
      title: { ru: 'Самопроизвольное отключение', en: 'Shuts off by itself' },
      text: {
        ru: 'Перегрев, датчики, питание, плата управления.',
        en: 'Overheat protection, sensors, power supply, control board.',
      },
    },
  ],
  faqTitle: {
    ru: 'Вопросы по варочным панелям',
    en: 'Cooktop FAQ',
  },
  faq: [
    {
      q: { ru: 'Ремонтируете только Gaggenau?', en: 'Do you repair only Gaggenau?' },
      a: {
        ru: 'Да, эта страница — только варочные панели Gaggenau.',
        en: 'Yes — this page covers Gaggenau cooktops only.',
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
      q: { ru: 'Нужно ли отключать панель заранее?', en: 'Should I switch the cooktop off beforehand?' },
      a: {
        ru: 'Достаточно не пользоваться панелью перед визитом и обеспечить доступ к ней и к электропитанию.',
        en: 'Please leave the cooktop unused before the visit and keep access to the unit and its power supply.',
      },
    },
  ],
};
