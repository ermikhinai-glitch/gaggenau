import { appliances, siteConfig, type ApplianceSlug, type Locale } from '../config/site';

type Localized = Record<Locale, string>;

export const homeSeo = {
  title: {
    ru: 'Ремонт техники Gaggenau в Москве и МО | Официальный сервис',
    en: 'Gaggenau appliance repair in Moscow and MO | Official service',
  },
  description: {
    ru: 'Выезд инженера, диагностика и ремонт техники Gaggenau. Оригинальные запчасти, ответ за 15 минут в рабочие часы 8:00–22:00.',
    en: 'Engineer visit, diagnostics and repair of Gaggenau appliances. Original parts, callback within 15 minutes during 8:00–22:00.',
  },
} as const;

const applianceSeo: Record<
  ApplianceSlug,
  { title: Localized; description: Localized }
> = {
  'washing-machines': {
    title: {
      ru: 'Ремонт стиральных машин Gaggenau в Москве и МО',
      en: 'Gaggenau washing machine repair in Moscow and MO',
    },
    description: {
      ru: 'Диагностика и ремонт стиральных машин Gaggenau с выездом. Оригинальные запчасти, гарантия на работы 12 месяцев.',
      en: 'On-site diagnostics and repair of Gaggenau washing machines. Original parts, 12-month labour warranty.',
    },
  },
  dishwashers: {
    title: {
      ru: 'Ремонт посудомоечных машин Gaggenau в Москве и МО',
      en: 'Gaggenau dishwasher repair in Moscow and MO',
    },
    description: {
      ru: 'Ремонт посудомоечных машин Gaggenau: протечки, ошибки, сушка. Выезд инженера по Москве и МО.',
      en: 'Gaggenau dishwasher repair: leaks, errors, drying issues. Engineer visits across Moscow and MO.',
    },
  },
  dryers: {
    title: {
      ru: 'Ремонт сушильных машин Gaggenau в Москве и МО',
      en: 'Gaggenau dryer repair in Moscow and MO',
    },
    description: {
      ru: 'Ремонт сушильных машин Gaggenau: нагрев, барабан, ошибки панели. Выезд инженера по Москве и МО.',
      en: 'Gaggenau dryer repair: heating, drum, panel errors. Engineer visits across Moscow and MO.',
    },
  },
  refrigerators: {
    title: {
      ru: 'Ремонт холодильников Gaggenau в Москве и МО',
      en: 'Gaggenau refrigerator repair in Moscow and MO',
    },
    description: {
      ru: 'Ремонт холодильников Gaggenau: охлаждение, шумы, электроника. Оригинальные запчасти и прозрачные условия.',
      en: 'Gaggenau refrigerator repair: cooling, noise, electronics. Original parts and clear terms.',
    },
  },
  'wine-cabinets': {
    title: {
      ru: 'Ремонт винных шкафов Gaggenau в Москве и МО',
      en: 'Gaggenau wine cabinet repair in Moscow and MO',
    },
    description: {
      ru: 'Ремонт винных шкафов Gaggenau: температура, влажность, вибрация и подсветка. Оригинальные запчасти, выезд по Москве и МО.',
      en: 'Gaggenau wine cabinet repair: temperature, humidity, vibration and lighting. Original parts, visits across Moscow and MO.',
    },
  },
  ovens: {
    title: {
      ru: 'Ремонт духовых шкафов Gaggenau в Москве и МО',
      en: 'Gaggenau oven repair in Moscow and MO',
    },
    description: {
      ru: 'Ремонт духовых шкафов Gaggenau: нагрев, режимы, электроника. Специализированный сервис в Москве и МО.',
      en: 'Gaggenau oven repair: heating, modes, electronics. Specialized service in Moscow and MO.',
    },
  },
  cooktops: {
    title: {
      ru: 'Ремонт варочных панелей Gaggenau в Москве и МО',
      en: 'Gaggenau cooktop repair in Moscow and MO',
    },
    description: {
      ru: 'Ремонт варочных панелей Gaggenau: конфорки, сенсор, электроника. Выезд инженера по Москве и МО.',
      en: 'Gaggenau cooktop repair: zones, touch controls, electronics. Engineer visits across Moscow and MO.',
    },
  },
  hoods: {
    title: {
      ru: 'Ремонт вытяжек Gaggenau в Москве и МО',
      en: 'Gaggenau hood repair in Moscow and MO',
    },
    description: {
      ru: 'Ремонт вытяжек Gaggenau: тяга, двигатель, освещение. Выезд инженера по Москве и МО.',
      en: 'Gaggenau hood repair: extraction, motor, lighting. Engineer visits across Moscow and MO.',
    },
  },
  'coffee-machines': {
    title: {
      ru: 'Ремонт кофемашин Gaggenau в Москве и МО',
      en: 'Gaggenau coffee machine repair in Moscow and MO',
    },
    description: {
      ru: 'Ремонт встроенных кофемашин Gaggenau: помол, заварочный блок, ошибки и протечки. Выезд по Москве и МО.',
      en: 'Built-in Gaggenau coffee machine repair: grind, brew unit, errors and leaks. Visits across Moscow and MO.',
    },
  },
  connection: {
    title: {
      ru: 'Подключение техники Gaggenau в Москве и МО',
      en: 'Gaggenau appliance connection in Moscow and MO',
    },
    description: {
      ru: 'Подключение техники Gaggenau: вода, электричество, встройка и первый запуск. Выезд инженера по Москве и МО.',
      en: 'Gaggenau appliance connection: water, power, installation and first start. Engineer visits across Moscow and MO.',
    },
  },
};

export function getApplianceSeo(slug: string, locale: Locale) {
  const key = slug as ApplianceSlug;
  const entry = applianceSeo[key];
  if (entry) {
    return {
      title: entry.title[locale],
      description: entry.description[locale],
    };
  }
  const label = appliances.find((a) => a.slug === slug)?.label[locale] ?? slug;
  return {
    title:
      locale === 'ru'
        ? `Ремонт: ${label} Gaggenau · ${siteConfig.geo.ru}`
        : `${label} Gaggenau repair · ${siteConfig.geo.en}`,
    description: siteConfig.tagline[locale],
  };
}

export function withBrandTitle(pageTitle: string, locale: Locale): string {
  const brand = locale === 'ru' ? 'Gaggenau' : 'Gaggenau';
  const geo = siteConfig.geo[locale];
  if (pageTitle.includes('Gaggenau') || pageTitle.includes(geo)) {
    return pageTitle;
  }
  return `${pageTitle} · ${brand} · ${geo}`;
}

export const defaultOgImagePath = '/images/home/hero-kitchen.webp';
