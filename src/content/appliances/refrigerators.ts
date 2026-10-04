import type { AppliancePageContent } from './types';

export const refrigeratorsPage: AppliancePageContent = {
  slug: 'refrigerators',
  heroImage: '/images/home/refrigerators.webp',
  badge: {
    ru: 'Ремонт Gaggenau · Москва и Подмосковье до 100 км',
    en: 'Gaggenau repair · Moscow and suburbs within 100 km',
  },
  title: { ru: 'Ремонт', en: 'Repair of' },
  titleAccent: {
    ru: 'холодильников Gaggenau',
    en: 'Gaggenau refrigerators',
  },
  subtitle: {
    ru: 'Выезд инженера, диагностика и ремонт холодильников Gaggenau. Оригинальные запчасти, гарантия на работы 12 месяцев.',
    en: 'On-site visit, diagnostics and repair for Gaggenau refrigerators. Original parts, 12-month labour warranty.',
  },
  faultsTitle: { ru: 'Типовые неисправности', en: 'Common faults' },
  faults: [
    {
      title: { ru: 'Не холодит', en: 'Not cooling' },
      text: {
        ru: 'Компрессор, электроника, датчики, герметичность контура.',
        en: 'Compressor, electronics, sensors, sealed system integrity.',
      },
    },
    {
      title: { ru: 'Иней / вода в камере', en: 'Frost / water in cabinet' },
      text: {
        ru: 'Оттайка, дренаж, уплотнение двери, вентилятор.',
        en: 'Defrost system, drain, door seal, fan.',
      },
    },
    {
      title: { ru: 'Шум', en: 'Noise' },
      text: {
        ru: 'Вентиляторы, компрессор, вибрация корпуса.',
        en: 'Fans, compressor, cabinet vibration.',
      },
    },
    {
      title: { ru: 'Ошибка на дисплее', en: 'Display error' },
      text: {
        ru: 'Сбой модулей управления — диагностика по коду на месте.',
        en: 'Control module faults — on-site code diagnostics.',
      },
    },
  ],
  faqTitle: {
    ru: 'Вопросы по холодильникам',
    en: 'Refrigerator FAQ',
  },
  faq: [
    {
      q: { ru: 'Ремонтируете только Gaggenau?', en: 'Do you repair only Gaggenau?' },
      a: {
        ru: 'Да, эта страница — только холодильники Gaggenau.',
        en: 'Yes — this page covers Gaggenau refrigerators only.',
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
      q: { ru: 'Нужно ли размораживать заранее?', en: 'Should I defrost in advance?' },
      a: {
        ru: 'Не обязательно. Если потребуется — инженер скажет при согласовании визита.',
        en: 'Not required. If needed, the engineer will advise when scheduling.',
      },
    },
  ],
};
