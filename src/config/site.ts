export const siteConfig = {
  workingTitle: {
    ru: 'Официальный сервис Gaggenau',
    en: 'Gaggenau Official Service',
  },
  tagline: {
    ru: 'Ремонт техники Gaggenau · Москва и МО',
    en: 'Gaggenau appliance repair · Moscow and MO',
  },
  phoneDisplay: '+7 (495) 000-00-00',
  phoneHref: 'tel:+74950000000',
  phones: [
    {
      display: '+7 (495) 000-00-00',
      prefix: '+7',
      rest: '(495) 000-00-00',
      href: 'tel:+74950000000',
    },
    {
      display: '8 (800) 000-00-00',
      prefix: '8',
      rest: '(800) 000-00-00',
      href: 'tel:+78000000000',
    },
  ],
  email: 'service-gaggenau@gmail.com',
  hours: {
    label: {
      ru: 'Ежедневно 8:00–22:00',
      en: 'Daily 8:00–22:00',
    },
    startHour: 8,
    endHour: 22,
    timeZone: 'Europe/Moscow',
  },
  geo: {
    ru: 'Москва и МО',
    en: 'Moscow and MO',
  },
  leadApiUrl: '/api/lead.php',
} as const;

export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

export const appliances = [
  {
    slug: 'washing-machines',
    path: 'repair/washing-machines',
    label: { ru: 'Стиральные машины', en: 'Washing machines' },
  },
  {
    slug: 'dishwashers',
    path: 'repair/dishwashers',
    label: { ru: 'Посудомоечные машины', en: 'Dishwashers' },
  },
  {
    slug: 'dryers',
    path: 'repair/dryers',
    label: { ru: 'Сушильные машины', en: 'Dryers' },
  },
  {
    slug: 'refrigerators',
    path: 'repair/refrigerators',
    label: { ru: 'Холодильники', en: 'Refrigerators' },
  },
  {
    slug: 'ovens',
    path: 'repair/ovens',
    label: { ru: 'Духовые шкафы', en: 'Ovens' },
  },
  {
    slug: 'cooktops',
    path: 'repair/cooktops',
    label: { ru: 'Варочные панели', en: 'Cooktops' },
  },
  {
    slug: 'hoods',
    path: 'repair/hoods',
    label: { ru: 'Вытяжки', en: 'Hoods' },
  },
  {
    slug: 'coffee-machines',
    path: 'repair/coffee-machines',
    label: { ru: 'Кофемашины', en: 'Coffee machines' },
  },
  {
    slug: 'connection',
    path: 'repair/connection',
    label: { ru: 'Подключение', en: 'Connection' },
  },
] as const;

export type ApplianceSlug = (typeof appliances)[number]['slug'];
