import type { Locale } from '../config/site';

export const ui = {
  ru: {
    'nav.services': 'Услуги',
    'nav.about': 'О сервисе',
    'nav.contacts': 'Контакты',
    'cta.call': 'Позвонить',
    'cta.request': 'Оставить заявку',
    'lang.ru': 'RU',
    'lang.en': 'EN',
    'thankyou.day':
      'Заявка успешно создана. Специалист перезвонит в течение 15 минут.',
    'thankyou.night':
      'Заявка успешно создана. Специалист свяжется после 8:00.',
    'sla.callback': 'перезвоним в течение 15 минут',
    'sla.visit': 'выезд специалиста от 30 минут',
    'scaffold.eyebrow': 'Каркас · Задача 2',
    'scaffold.title': 'i18n и плейсхолдеры',
    'scaffold.body':
      'Локали RU/EN, конфиг телефона и working title. Переключатель языка в шапке — в задаче 3.',
    'scaffold.switchHint': 'Сейчас:',
  },
  en: {
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contacts': 'Contacts',
    'cta.call': 'Call',
    'cta.request': 'Request a visit',
    'lang.ru': 'RU',
    'lang.en': 'EN',
    'thankyou.day':
      'Request received. A specialist will call you back within 15 minutes.',
    'thankyou.night':
      'Request received. A specialist will contact you after 8:00.',
    'sla.callback': 'callback within 15 minutes',
    'sla.visit': 'engineer visit from 30 minutes',
    'scaffold.eyebrow': 'Scaffold · Task 2',
    'scaffold.title': 'i18n and placeholders',
    'scaffold.body':
      'RU/EN locales, phone config and working title. Language switch lands in task 3.',
    'scaffold.switchHint': 'Current:',
  },
} as const;

export type UiKey = keyof (typeof ui)['ru'];

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key] ?? ui.ru[key] ?? key;
}
