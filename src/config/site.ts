export const siteConfig = {
  workingTitle: {
    ru: 'Официальный сервис Gaggenau',
    en: 'Gaggenau Official Service',
  },
  tagline: {
    ru: 'Ремонт техники Gaggenau · Москва и Подмосковье до 100 км',
    en: 'Gaggenau appliance repair · Moscow and Moscow Region up to 100 km',
  },
  phoneDisplay: '+7 (495) 000-00-00',
  phoneHref: 'tel:+74950000000',
  email: 'ermikhinai@gmail.com',
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
    slug: 'coffee-machines',
    path: 'repair/coffee-machines',
    label: { ru: 'Кофемашины', en: 'Coffee machines' },
  },
] as const;

export type ApplianceSlug = (typeof appliances)[number]['slug'];
