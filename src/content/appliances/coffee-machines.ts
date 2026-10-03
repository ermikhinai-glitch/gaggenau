import type { AppliancePageContent } from './types';

export const coffeeMachinesPage: AppliancePageContent = {
  slug: 'coffee-machines',
  heroImage: '/images/home/coffee-machines.png',
  badge: {
    ru: 'Ремонт Gaggenau · Москва и МО',
    en: 'Gaggenau repair · Moscow and MO',
  },
  title: { ru: 'Ремонт', en: 'Repair of' },
  titleAccent: {
    ru: 'кофемашин Gaggenau',
    en: 'Gaggenau coffee machines',
  },
  subtitle: {
    ru: 'Выезд инженера, диагностика и ремонт встроенных кофемашин Gaggenau. Оригинальные запчасти, гарантия на работы 12 месяцев.',
    en: 'On-site visit, diagnostics and repair for built-in Gaggenau coffee machines. Original parts, 12-month labour warranty.',
  },
  faultsTitle: { ru: 'Типовые неисправности', en: 'Common faults' },
  faults: [
    {
      title: { ru: 'Не мелет / не заваривает', en: 'No grind / no brew' },
      text: {
        ru: 'Жернова, заварочный блок, привод, датчики.',
        en: 'Burrs, brew unit, drive, sensors.',
      },
    },
    {
      title: { ru: 'Протечка', en: 'Leak' },
      text: {
        ru: 'Уплотнения, гидросистема, соединения с водопроводом.',
        en: 'Seals, hydraulic circuit, plumbed connections.',
      },
    },
    {
      title: { ru: 'Ошибка на дисплее', en: 'Display error' },
      text: {
        ru: 'Электроника и сервисные коды — разбор при диагностике.',
        en: 'Electronics and service codes — decoded during diagnostics.',
      },
    },
    {
      title: { ru: 'Накипь / слабый поток', en: 'Scale / weak flow' },
      text: {
        ru: 'Каналы, клапаны, помпа, качество воды.',
        en: 'Channels, valves, pump, water quality.',
      },
    },
  ],
  faqTitle: {
    ru: 'Вопросы по кофемашинам',
    en: 'Coffee machine FAQ',
  },
  faq: [
    {
      q: { ru: 'Ремонтируете только Gaggenau?', en: 'Do you repair only Gaggenau?' },
      a: {
        ru: 'Да, эта страница — только кофемашины Gaggenau.',
        en: 'Yes — this page covers Gaggenau coffee machines only.',
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
      q: { ru: 'Можно ли обслужить без снятия фасада?', en: 'Can you service without removing the facade?' },
      a: {
        ru: 'Часто да. Если нужен демонтаж из ниши — согласуем до начала работ.',
        en: 'Often yes. If removal from the niche is needed, we agree before work starts.',
      },
    },
  ],
};
