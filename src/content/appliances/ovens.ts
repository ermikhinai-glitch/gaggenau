import type { AppliancePageContent } from './types';

/** Demo content for task 5 — full five packs in task 6 */
export const ovensPage: AppliancePageContent = {
  slug: 'ovens',
  heroImage: '/images/home/ovens.png',
  badge: {
    ru: 'Ремонт Gaggenau · Москва и МО',
    en: 'Gaggenau repair · Moscow and MO',
  },
  title: {
    ru: 'Ремонт',
    en: 'Repair of',
  },
  titleAccent: {
    ru: 'духовых шкафов Gaggenau',
    en: 'Gaggenau ovens',
  },
  subtitle: {
    ru: 'Выезд инженера, диагностика и ремонт духовых шкафов Gaggenau. Оригинальные запчасти, гарантия на работы 12 месяцев.',
    en: 'On-site visit, diagnostics and repair for Gaggenau ovens. Original parts, 12-month labour warranty.',
  },
  faultsTitle: {
    ru: 'Типовые неисправности',
    en: 'Common faults',
  },
  faults: [
    {
      title: { ru: 'Не нагревает', en: 'No heat' },
      text: {
        ru: 'ТЭН, силовая плата, датчики температуры, реле.',
        en: 'Heating element, power board, temperature sensors, relays.',
      },
    },
    {
      title: { ru: 'Ошибка на дисплее', en: 'Display error' },
      text: {
        ru: 'Сбой электроники, датчиков или связи модулей — разбор кода при осмотре.',
        en: 'Electronics, sensors or module communication — we decode on inspection.',
      },
    },
    {
      title: { ru: 'Дверь / замок', en: 'Door / lock' },
      text: {
        ru: 'Не закрывается, не открывается после пиролиза, люфт петель.',
        en: 'Won’t close/open after pyrolysis, hinge play.',
      },
    },
    {
      title: { ru: 'Пар / комби-режимы', en: 'Steam / combi modes' },
      text: {
        ru: 'Парогенератор, клапаны, накипь, датчики уровня воды.',
        en: 'Steam generator, valves, scale, water level sensors.',
      },
    },
  ],
  faqTitle: {
    ru: 'Вопросы по духовым шкафам',
    en: 'Oven FAQ',
  },
  faq: [
    {
      q: {
        ru: 'Ремонтируете только Gaggenau?',
        en: 'Do you repair only Gaggenau?',
      },
      a: {
        ru: 'Да, эта страница и сервис — только духовые шкафы Gaggenau.',
        en: 'Yes — this page and service cover Gaggenau ovens only.',
      },
    },
    {
      q: {
        ru: 'Как быстро приедете?',
        en: 'How soon can you visit?',
      },
      a: {
        ru: 'В рабочие часы возможен выезд от 30 минут при наличии мастера; точное время согласуем при звонке. Ответ на заявку — в течение 15 минут с 8:00 до 22:00.',
        en: 'During business hours a visit from 30 minutes is possible when an engineer is available; exact time is confirmed on the call. Callback within 15 minutes from 8:00 to 22:00.',
      },
    },
    {
      q: {
        ru: 'Нужен ли демонтаж встроенного шкафа?',
        en: 'Do you need to uninstall a built-in oven?',
      },
      a: {
        ru: 'Часто ремонт возможен на месте. Если нужен доступ сзади или снятие — согласуем до начала работ.',
        en: 'Often repair is done in place. If rear access or removal is needed, we agree before work starts.',
      },
    },
  ],
};
