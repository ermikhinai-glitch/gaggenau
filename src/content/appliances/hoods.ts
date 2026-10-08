import type { AppliancePageContent } from './types';

export const hoodsPage: AppliancePageContent = {
  slug: 'hoods',
  heroImage: '/images/home/hoods.webp',
  badge: {
    ru: 'Ремонт Gaggenau · Москва и МО',
    en: 'Gaggenau repair · Moscow and MO',
  },
  title: { ru: 'Ремонт', en: 'Repair of' },
  titleAccent: {
    ru: 'вытяжек Gaggenau',
    en: 'Gaggenau hoods',
  },
  subtitle: {
    ru: 'Выезд инженера, диагностика и ремонт вытяжек Gaggenau. Оригинальные запчасти, гарантия на работы 12 месяцев.',
    en: 'On-site visit, diagnostics and repair for Gaggenau hoods. Original parts, 12-month labour warranty.',
  },
  faultsTitle: { ru: 'Типовые неисправности', en: 'Common faults' },
  faults: [
    {
      title: { ru: 'Слабая тяга', en: 'Weak extraction' },
      text: {
        ru: 'Двигатель, фильтры, воздуховод, плата управления.',
        en: 'Motor, filters, duct, control board.',
      },
    },
    {
      title: { ru: 'Не включается', en: 'Won’t start' },
      text: {
        ru: 'Питание, панель управления, двигатель, электроника.',
        en: 'Power, control panel, motor, electronics.',
      },
    },
    {
      title: { ru: 'Шум / вибрация', en: 'Noise / vibration' },
      text: {
        ru: 'Крыльчатка, подшипники, крепления, дисбаланс вентилятора.',
        en: 'Impeller, bearings, mounts, fan imbalance.',
      },
    },
    {
      title: { ru: 'Не работает свет', en: 'Lights out' },
      text: {
        ru: 'Лампы, блок питания подсветки, панель управления.',
        en: 'Lamps, lighting power supply, control panel.',
      },
    },
  ],
  faqTitle: {
    ru: 'Вопросы по вытяжкам',
    en: 'Hood FAQ',
  },
  faq: [
    {
      q: { ru: 'Ремонтируете только Gaggenau?', en: 'Do you repair only Gaggenau?' },
      a: {
        ru: 'Да, эта страница — только вытяжки Gaggenau.',
        en: 'Yes — this page covers Gaggenau hoods only.',
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
      q: { ru: 'Нужен ли доступ к воздуховоду?', en: 'Do you need access to the duct?' },
      a: {
        ru: 'Да, нужен свободный доступ к вытяжке и по возможности к воздуховоду и электропитанию.',
        en: 'Yes — please keep access to the hood and, if possible, to the duct and power supply.',
      },
    },
  ],
};
