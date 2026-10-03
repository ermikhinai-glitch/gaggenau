import type { Locale } from '../config/site';

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
    'footer.geo': 'Москва и МО',
    'footer.note':
      'Специализированный сервис ремонта техники Gaggenau. Выезд к клиенту.',
    'footer.rights': 'Все права защищены.',
    'open.now': 'Сейчас открыто',
    'scaffold.eyebrow': 'Каркас · Задача 3',
    'scaffold.title': 'Глобальная оболочка',
    'scaffold.body':
      'Шапка, футер, промо-баннер и sticky «Позвонить» на мобиле. Модалка заявки — в задаче 7.',
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
    'footer.geo': 'Moscow and MO',
    'footer.note':
      'Specialized Gaggenau appliance repair. On-site service.',
    'footer.rights': 'All rights reserved.',
    'open.now': 'Open now',
    'scaffold.eyebrow': 'Scaffold · Task 3',
    'scaffold.title': 'Global chrome',
    'scaffold.body':
      'Header, footer, promo banner and mobile sticky call bar. Lead modal comes in task 7.',
  },
} as const;

export type UiKey = keyof (typeof ui)['ru'];

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key] ?? ui.ru[key] ?? key;
}
