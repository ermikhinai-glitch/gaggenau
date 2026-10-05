import type { AppliancePageContent } from './types';

export const dryersPage: AppliancePageContent = {
  slug: 'dryers',
  heroImage: '/images/home/dryers.webp',
  badge: {
    ru: 'Ремонт Gaggenau · Москва и МО',
    en: 'Gaggenau repair · Moscow and MO',
  },
  title: { ru: 'Ремонт', en: 'Repair of' },
  titleAccent: {
    ru: 'сушильных машин Gaggenau',
    en: 'Gaggenau dryers',
  },
  subtitle: {
    ru: 'Выезд инженера, диагностика и ремонт сушильных машин Gaggenau. Оригинальные запчасти, гарантия на работы 12 месяцев.',
    en: 'On-site visit, diagnostics and repair for Gaggenau dryers. Original parts, 12-month labour warranty.',
  },
  faultsTitle: { ru: 'Типовые неисправности', en: 'Common faults' },
  faults: [
    {
      title: { ru: 'Не сушит / слабый нагрев', en: 'Won’t dry / weak heat' },
      text: {
        ru: 'ТЭН, термодатчики, система нагрева, вентилятор.',
        en: 'Heater, thermistors, heating system, fan.',
      },
    },
    {
      title: { ru: 'Не крутится барабан', en: 'Drum won’t spin' },
      text: {
        ru: 'Ремень, двигатель, подшипники, электроника привода.',
        en: 'Belt, motor, bearings, drive electronics.',
      },
    },
    {
      title: { ru: 'Ошибка на панели', en: 'Panel error' },
      text: {
        ru: 'Плата управления и датчики — код разбираем при диагностике.',
        en: 'Control board and sensors — codes are decoded during diagnostics.',
      },
    },
    {
      title: { ru: 'Шум / вибрация', en: 'Noise / vibration' },
      text: {
        ru: 'Подшипники, ролики, крепления, дисбаланс загрузки.',
        en: 'Bearings, rollers, mounts, load imbalance.',
      },
    },
  ],
  faqTitle: {
    ru: 'Вопросы по сушильным машинам',
    en: 'Dryer FAQ',
  },
  faq: [
    {
      q: { ru: 'Ремонтируете только Gaggenau?', en: 'Do you repair only Gaggenau?' },
      a: {
        ru: 'Да, эта страница — только сушильные машины Gaggenau.',
        en: 'Yes — this page covers Gaggenau dryers only.',
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
      q: { ru: 'Нужно ли освобождать сушилку перед визитом?', en: 'Should I empty the dryer before the visit?' },
      a: {
        ru: 'Да, желательно вынуть бельё и обеспечить доступ к машине и вентиляционным/электрическим подключениям.',
        en: 'Yes — please remove laundry and keep access to the unit and vent/electrical connections.',
      },
    },
  ],
};
