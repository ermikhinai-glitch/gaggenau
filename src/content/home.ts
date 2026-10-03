import { appliances } from '../config/site';

export const homeContent = {
  hero: {
    badge: {
      ru: 'Специализированный сервис · Москва и МО',
      en: 'Specialized service · Moscow and Moscow Region',
    },
    titleLead: {
      ru: 'Ремонт техники',
      en: 'Repair of',
    },
    titleAccent: {
      ru: 'Gaggenau',
      en: 'Gaggenau appliances',
    },
    subtitle: {
      ru: 'Выезд инженера, диагностика и ремонт техники Gaggenau. Оригинальные запчасти, прозрачные условия и быстрый ответ в рабочие часы.',
      en: 'On-site engineer visit, diagnostics and repair for Gaggenau appliances. Original parts, clear terms, and a fast response during business hours.',
    },
  },
  sla: [
    {
      label: { ru: 'Ответ', en: 'Callback' },
      value: { ru: '15 минут', en: '15 minutes' },
      text: {
        ru: 'Перезвоним в рабочие часы 8:00–22:00',
        en: 'We call back during 8:00–22:00',
      },
    },
    {
      label: { ru: 'Выезд', en: 'Visit' },
      value: { ru: 'от 30 минут', en: 'from 30 min' },
      text: {
        ru: 'Минимально возможный срок при наличии мастера',
        en: 'Fastest possible when an engineer is available',
      },
    },
    {
      label: { ru: 'Запчасти', en: 'Parts' },
      value: { ru: 'Оригинал', en: 'Original' },
      text: {
        ru: 'Устанавливаем только оригинальные комплектующие',
        en: 'We install original parts only',
      },
    },
    {
      label: { ru: 'Гарантия', en: 'Warranty' },
      value: { ru: '12 месяцев', en: '12 months' },
      text: {
        ru: 'На работы; на запчасти — гарантия производителя',
        en: 'On labour; parts covered by manufacturer warranty',
      },
    },
  ],
  appliancesSection: {
    eyebrow: { ru: 'Услуги', en: 'Services' },
    title: {
      ru: 'Обслуживаемая техника Gaggenau',
      en: 'Gaggenau appliances we service',
    },
    lead: {
      ru: 'Выберите тип техники Gaggenau — откроется страница с типовыми неисправностями и заявкой.',
      en: 'Choose your Gaggenau appliance type — open the page with common faults and a request form.',
    },
    more: { ru: 'Подробнее', en: 'Learn more' },
  },
  applianceCards: {
    'washing-machines': {
      series: { ru: 'Стиральные модули', en: 'Laundry' },
      description: {
        ru: 'Диагностика и ремонт стиральных машин Gaggenau с выездом инженера.',
        en: 'Diagnostics and repair of Gaggenau washing machines with an engineer visit.',
      },
      image: '/images/home/washing-machines.webp',
    },
    dishwashers: {
      series: { ru: 'Посудомойки', en: 'Dishcare' },
      description: {
        ru: 'Устранение протечек, ошибок и сбоев сушки у посудомоечных машин Gaggenau.',
        en: 'Leaks, error codes and drying issues on Gaggenau dishwashers.',
      },
      image: '/images/home/dishwashers.webp',
    },
    refrigerators: {
      series: { ru: 'Охлаждение', en: 'Cooling' },
      description: {
        ru: 'Холодильники Gaggenau: охлаждение, шумы, электроника, герметичность контура.',
        en: 'Gaggenau refrigeration: cooling, noise, electronics, sealed systems.',
      },
      image: '/images/home/refrigerators.webp',
    },
    ovens: {
      series: { ru: 'Серии 200 / 400', en: 'Series 200 / 400' },
      description: {
        ru: 'Духовые шкафы Gaggenau: нагрев, электроника, калибровка режимов.',
        en: 'Gaggenau ovens: heating, electronics, mode calibration.',
      },
      image: '/images/home/ovens.webp',
    },
    'coffee-machines': {
      series: { ru: 'Кофесистемы', en: 'Coffee systems' },
      description: {
        ru: 'Встроенные кофемашины Gaggenau: помол, заварочный блок, ошибки и протечки.',
        en: 'Built-in Gaggenau coffee machines: grind, brew unit, errors and leaks.',
      },
      image: '/images/home/coffee-machines.webp',
    },
  },
  process: {
    eyebrow: { ru: 'Процесс', en: 'Process' },
    title: { ru: 'Как это работает', en: 'How it works' },
    steps: [
      {
        n: '01',
        title: { ru: 'Заявка или звонок', en: 'Request or call' },
        text: {
          ru: 'Оставьте контакты на сайте или позвоните — оба канала равноправны.',
          en: 'Leave your contacts online or call — both channels are equal.',
        },
      },
      {
        n: '02',
        title: { ru: 'Связь со специалистом', en: 'Specialist contact' },
        text: {
          ru: 'В рабочие часы перезвоним в течение 15 минут и уточним детали.',
          en: 'During business hours we call back within 15 minutes.',
        },
      },
      {
        n: '03',
        title: { ru: 'Выезд и диагностика', en: 'Visit and diagnostics' },
        text: {
          ru: 'Инженер приезжает к вам; срок выезда согласуем при звонке.',
          en: 'An engineer visits you; timing is confirmed on the call.',
        },
      },
      {
        n: '04',
        title: { ru: 'Ремонт', en: 'Repair' },
        text: {
          ru: 'После согласования выполняем ремонт с оригинальными запчастями.',
          en: 'After approval we repair using original parts.',
        },
      },
    ],
  },
  terms: {
    eyebrow: { ru: 'Условия', en: 'Terms' },
    title: {
      ru: 'Выезд и диагностика',
      en: 'Visit and diagnostics',
    },
    body: {
      ru: 'Стоимость ремонта определяется после осмотра на месте. Выезд и диагностика входят в условия сервиса при выполнении ремонта; при отказе от ремонта оплачиваются отдельно.',
      en: 'Repair cost is confirmed after on-site inspection. Visit and diagnostics are included under service terms when repair is completed; if you decline repair, they are billed separately.',
    },
  },
  trust: {
    eyebrow: { ru: 'Доверие', en: 'Trust' },
    title: {
      ru: 'Гарантия и подход к технике Gaggenau',
      en: 'Warranty and our approach to Gaggenau',
    },
    points: [
      {
        title: { ru: 'Гарантия на работы — 12 месяцев', en: '12-month labour warranty' },
        text: {
          ru: 'Фиксированный срок на выполненные работы.',
          en: 'A fixed term on completed labour.',
        },
      },
      {
        title: { ru: 'Запчасти — гарантия производителя', en: 'Parts — manufacturer warranty' },
        text: {
          ru: 'Отдельно от гарантии на работы.',
          en: 'Separate from the labour warranty.',
        },
      },
      {
        title: { ru: 'Только оригинальные запчасти', en: 'Original parts only' },
        text: {
          ru: 'Без аналогов «на замену бренду».',
          en: 'No off-brand substitutes.',
        },
      },
      {
        title: { ru: 'Зона выезда — Москва и МО', en: 'Service area — Moscow and MO' },
        text: {
          ru: 'Точный адрес и возможность выезда уточняем при звонке.',
          en: 'Exact address and visit feasibility are confirmed on the call.',
        },
      },
    ],
  },
  reviews: {
    eyebrow: { ru: 'Отзывы', en: 'Reviews' },
    title: { ru: 'Отзывы клиентов', en: 'Customer reviews' },
    badge: {
      ru: 'Демонстрация',
      en: 'Demo',
    },
    note: {
      ru: 'Пока показаны примеры текстов для макета. Перед запуском заменим на реальные отзывы или скроем блок.',
      en: 'Sample copy for layout only. Before launch we will replace these with real reviews or hide the block.',
    },
    items: [
      {
        name: { ru: 'Виталий', en: 'Vitaliy' },
        text: {
          ru: 'Приехали быстро, объяснили причину ошибки на духовке и согласовали ремонт без давления.',
          en: 'They arrived quickly, explained the oven fault and agreed the repair without pressure.',
        },
      },
      {
        name: { ru: 'Алексей', en: 'Alexey' },
        text: {
          ru: 'По холодильнику всё сделали аккуратно, детали оригинальные, документы на работы передали.',
          en: 'Fridge work was careful, parts were original, paperwork was provided.',
        },
      },
      {
        name: { ru: 'Артур', en: 'Artur' },
        text: {
          ru: 'Удобно, что можно и позвонить, и оставить заявку — перезвонили в тот же день.',
          en: 'Helpful that I could call or leave a request — they called back the same day.',
        },
      },
    ],
  },
  faq: {
    eyebrow: { ru: 'FAQ', en: 'FAQ' },
    title: {
      ru: 'Ответы на ключевые вопросы',
      en: 'Answers to key questions',
    },
    items: [
      {
        q: {
          ru: 'Как быстро вы перезвоните?',
          en: 'How fast do you call back?',
        },
        a: {
          ru: 'Ежедневно с 8:00 до 22:00 — в течение 15 минут. Ночью заявку примем, свяжемся после 8:00.',
          en: 'Daily 8:00–22:00 — within 15 minutes. Overnight requests are accepted; we contact after 8:00.',
        },
      },
      {
        q: {
          ru: 'Выезд от 30 минут — это гарантия?',
          en: 'Is “from 30 minutes” a guarantee?',
        },
        a: {
          ru: 'Это минимально возможный срок в рабочие часы по зоне обслуживания при наличии мастера. Точное время согласуем при звонке.',
          en: 'It is the fastest possible during business hours in the service area when an engineer is available. Exact timing is confirmed on the call.',
        },
      },
      {
        q: {
          ru: 'Бесплатны ли выезд и диагностика?',
          en: 'Are visit and diagnostics free?',
        },
        a: {
          ru: 'Да — если выполняется ремонт. При отказе от ремонта выезд и диагностика оплачиваются отдельно.',
          en: 'Yes — when repair is completed. If you decline repair, visit and diagnostics are billed separately.',
        },
      },
      {
        q: {
          ru: 'Ремонтируете только Gaggenau?',
          en: 'Do you repair only Gaggenau?',
        },
        a: {
          ru: 'Да, на сайте и в сервисе — только техника Gaggenau.',
          en: 'Yes — this service focuses only on Gaggenau appliances.',
        },
      },
      {
        q: {
          ru: 'Какая гарантия?',
          en: 'What warranty do you provide?',
        },
        a: {
          ru: 'На работы — 12 месяцев. На запчасти — гарантия производителя.',
          en: '12 months on labour. Parts follow the manufacturer warranty.',
        },
      },
    ],
  },
  about: {
    eyebrow: { ru: 'О сервисе', en: 'About' },
    title: {
      ru: 'Премиальный сервис ремонта Gaggenau',
      en: 'A premium Gaggenau repair service',
    },
    body: {
      ru: 'Мы помогаем частным клиентам в Москве и МО быстро связаться с инженером и восстановить технику без лишних шагов на сайте.',
      en: 'We help private clients in Moscow and MO reach an engineer quickly and restore appliances without unnecessary website steps.',
    },
    link: { ru: 'Подробнее о сервисе', en: 'More about the service' },
  },
  bottomCta: {
    title: {
      ru: 'Нужна консультация или выезд инженера?',
      en: 'Need advice or an engineer visit?',
    },
    text: {
      ru: 'Позвоните или оставьте заявку — ответим в рабочие часы в течение 15 минут.',
      en: 'Call or leave a request — we reply within 15 minutes during business hours.',
    },
  },
} as const;

export const homeApplianceOrder = appliances.map((a) => a.slug);
