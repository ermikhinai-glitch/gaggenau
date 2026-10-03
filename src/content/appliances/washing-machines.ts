import type { AppliancePageContent } from './types';

export const washingMachinesPage: AppliancePageContent = {
  slug: 'washing-machines',
  heroImage: '/images/home/washing-machines.png',
  badge: {
    ru: 'Ремонт Gaggenau · Москва и МО',
    en: 'Gaggenau repair · Moscow and MO',
  },
  title: { ru: 'Ремонт', en: 'Repair of' },
  titleAccent: {
    ru: 'стиральных машин Gaggenau',
    en: 'Gaggenau washing machines',
  },
  subtitle: {
    ru: 'Выезд инженера, диагностика и ремонт стиральных машин Gaggenau. Оригинальные запчасти, гарантия на работы 12 месяцев.',
    en: 'On-site visit, diagnostics and repair for Gaggenau washing machines. Original parts, 12-month labour warranty.',
  },
  faultsTitle: { ru: 'Типовые неисправности', en: 'Common faults' },
  faults: [
    {
      title: { ru: 'Не сливает / не отжимает', en: 'No drain / no spin' },
      text: {
        ru: 'Помпа, засор, датчик уровня, электроника управления.',
        en: 'Drain pump, blockage, level sensor, control electronics.',
      },
    },
    {
      title: { ru: 'Не набирает воду', en: 'No water fill' },
      text: {
        ru: 'Клапан подачи, давление в сети, ошибки Aquastop.',
        en: 'Inlet valve, water pressure, Aquastop faults.',
      },
    },
    {
      title: { ru: 'Шум и вибрация', en: 'Noise and vibration' },
      text: {
        ru: 'Подшипники, амортизаторы, крепление барабана.',
        en: 'Bearings, shock absorbers, drum mounting.',
      },
    },
    {
      title: { ru: 'Ошибка на дисплее', en: 'Display error' },
      text: {
        ru: 'Коды ошибок модулей — расшифровка и ремонт после осмотра.',
        en: 'Module error codes — decoded and repaired after inspection.',
      },
    },
  ],
  faqTitle: {
    ru: 'Вопросы по стиральным машинам',
    en: 'Washing machine FAQ',
  },
  faq: [
    {
      q: { ru: 'Ремонтируете только Gaggenau?', en: 'Do you repair only Gaggenau?' },
      a: {
        ru: 'Да, эта страница — только стиральные машины Gaggenau.',
        en: 'Yes — this page covers Gaggenau washing machines only.',
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
      q: { ru: 'Нужно ли отключать воду и электричество заранее?', en: 'Should I shut off water and power in advance?' },
      a: {
        ru: 'Желательно обеспечить доступ к кранам и розетке. Инженер подскажет на звонке.',
        en: 'Please keep access to the shut-off valves and power. The engineer will confirm on the call.',
      },
    },
  ],
};
