import type { Locale } from '@/config/site';

export const ui = {
  ru: {
    'nav.services': 'Услуги',
    'nav.about': 'О сервисе',
    'nav.contacts': 'Контакты',
    'nav.privacy': 'Политика конфиденциальности',
    'nav.terms': 'Договор оферты',
    'cta.call': 'Позвонить',
    'cta.request': 'Оставить заявку',
    'cta.requestShort': 'Заявка',
    'lang.ru': 'RU',
    'lang.en': 'EN',
    'thankyou.day':
      'Заявка успешно создана. Специалист перезвонит в течение 15 минут.',
    'thankyou.night':
      'Заявка успешно создана. Специалист свяжется после 8:00.',
    'sla.callback': 'перезвоним в течение 15 минут',
    'sla.visit': 'выезд специалиста от 30 минут',
    'footer.geo': 'Москва и Подмосковье до 100 км',
    'footer.note':
      'Специализированный сервис ремонта техники Gaggenau. Выезд к клиенту.',
    'footer.rights': 'Все права защищены.',
    'open.now': 'Сейчас открыто',
    'skip': 'К содержанию',
  },
  en: {
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contacts': 'Contacts',
    'nav.privacy': 'Privacy policy',
    'nav.terms': 'Terms of service',
    'cta.call': 'Call',
    'cta.request': 'Request a visit',
    'cta.requestShort': 'Request',
    'lang.ru': 'RU',
    'lang.en': 'EN',
    'thankyou.day':
      'Request received. A specialist will call you back within 15 minutes.',
    'thankyou.night':
      'Request received. A specialist will contact you after 8:00.',
    'sla.callback': 'callback within 15 minutes',
    'sla.visit': 'engineer visit from 30 minutes',
    'footer.geo': 'Moscow and suburbs within 100 km',
    'footer.note':
      'Specialized Gaggenau appliance repair. On-site service.',
    'footer.rights': 'All rights reserved.',
    'open.now': 'Open now',
    'skip': 'Skip to content',
  },
} as const;

export type UiKey = keyof (typeof ui)['ru'];

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key] ?? ui.ru[key] ?? key;
}
