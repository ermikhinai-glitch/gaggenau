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
      href: 'contacts',
    },
    {
      label: { ru: 'Выезд', en: 'Visit' },
      value: { ru: 'от 30 минут', en: 'from 30 min' },
      text: {
        ru: 'Минимально возможный срок при наличии мастера',
        en: 'Fastest possible when an engineer is available',
      },
      href: 'about',
    },
    {
      label: { ru: 'Запчасти', en: 'Parts' },
      value: { ru: 'Оригинал', en: 'Original' },
      text: {
        ru: 'Устанавливаем только оригинальные комплектующие',
        en: 'We install original parts only',
      },
      href: 'parts',
    },
    {
      label: { ru: 'Гарантия', en: 'Warranty' },
      value: { ru: '12 месяцев', en: '12 months' },
      text: {
        ru: 'На работы; на запчасти — гарантия производителя',
        en: 'On labour; parts covered by manufacturer warranty',
      },
      href: 'warranty',
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
    dryers: {
      series: { ru: 'Сушка', en: 'Drying' },
      description: {
        ru: 'Сушильные машины Gaggenau: нагрев, барабан, ошибки панели и шум.',
        en: 'Gaggenau dryers: heating, drum, panel errors and noise.',
      },
      image: '/images/home/dryers.webp',
    },
    refrigerators: {
      series: { ru: 'Охлаждение', en: 'Cooling' },
      description: {
        ru: 'Холодильники Gaggenau: охлаждение, шумы, электроника, герметичность контура.',
        en: 'Gaggenau refrigeration: cooling, noise, electronics, sealed systems.',
      },
      image: '/images/home/refrigerators.webp',
    },
    'wine-cabinets': {
      series: { ru: 'Охлаждение', en: 'Cooling' },
      description: {
        ru: 'Винные шкафы Gaggenau: температура зон, влажность, вибрация и подсветка.',
        en: 'Gaggenau wine cabinets: zone temperature, humidity, vibration and lighting.',
      },
      image: '/images/home/wine-cabinets.webp',
    },
    ovens: {
      series: { ru: 'Серии 200 / 400', en: 'Series 200 / 400' },
      description: {
        ru: 'Духовые шкафы Gaggenau: нагрев, электроника, калибровка режимов.',
        en: 'Gaggenau ovens: heating, electronics, mode calibration.',
      },
      image: '/images/home/ovens.webp',
    },
    cooktops: {
      series: { ru: 'Варочные панели', en: 'Cooktops' },
      description: {
        ru: 'Варочные панели Gaggenau: конфорки, сенсор, электроника и нагрев.',
        en: 'Gaggenau cooktops: zones, touch controls, electronics and heating.',
      },
      image: '/images/home/cooktops.webp',
    },
    hoods: {
      series: { ru: 'Вытяжки', en: 'Hoods' },
      description: {
        ru: 'Вытяжки Gaggenau: тяга, двигатель, освещение и панель управления.',
        en: 'Gaggenau hoods: extraction, motor, lighting and control panel.',
      },
      image: '/images/home/hoods.webp',
    },
    'coffee-machines': {
      series: { ru: 'Кофесистемы', en: 'Coffee systems' },
      description: {
        ru: 'Встроенные кофемашины Gaggenau: помол, заварочный блок, ошибки и протечки.',
        en: 'Built-in Gaggenau coffee machines: grind, brew unit, errors and leaks.',
      },
      image: '/images/home/coffee-machines.webp',
    },
    connection: {
      series: { ru: 'Подключение', en: 'Connection' },
      description: {
        ru: 'Подключение и ввод в эксплуатацию техники Gaggenau: вода, электричество, встройка.',
        en: 'Connection and commissioning of Gaggenau appliances: water, power, installation.',
      },
      image: '/images/home/connection.webp',
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
    note: {
      ru: 'В отзыве публикуются имя и город. Отзыв появляется в этом блоке после проверки модерации.',
      en: 'Reviews show your name and city. The review appears in this block after moderation.',
    },
    cta: { ru: 'Оставить отзыв', en: 'Leave a review' },
    form: {
      title: { ru: 'Оставить отзыв', en: 'Leave a review' },
      lead: {
        ru: 'Укажите имя, город и как прошёл ремонт.',
        en: 'Enter your name, city and how the repair went.',
      },
      name: { ru: 'Имя', en: 'Name' },
      namePh: { ru: 'Как к вам обращаться', en: 'Your name' },
      city: { ru: 'Город', en: 'City' },
      cityPh: { ru: 'Москва', en: 'Moscow' },
      text: { ru: 'Отзыв', en: 'Review' },
      textPh: {
        ru: 'Например: приехали быстро, объяснили причину…',
        en: 'For example: they arrived quickly, explained the issue…',
      },
      consent: {
        ru: 'Отзыв добавится на сайте после проверки',
        en: 'The review will be added to the site after verification',
      },
      submit: { ru: 'Отправить отзыв', en: 'Send review' },
      submitting: { ru: 'Отправляем…', en: 'Sending…' },
      close: { ru: 'Закрыть', en: 'Close' },
      successTitle: { ru: 'Спасибо', en: 'Thank you' },
      success: {
        ru: 'Отзыв отправлен. Он появится в блоке после проверки модерации.',
        en: 'The review has been sent. It will appear in this block after moderation.',
      },
      errorName: { ru: 'Укажите имя', en: 'Enter your name' },
      errorCity: { ru: 'Укажите город', en: 'Enter your city' },
      errorText: { ru: 'Напишите отзыв', en: 'Write a review' },
      errorConsent: {
        ru: 'Подтвердите, что отзыв появится после проверки',
        en: 'Confirm that the review will appear after verification',
      },
      errorNetwork: {
        ru: 'Не удалось отправить. Попробуйте ещё раз.',
        en: 'Could not send. Please try again.',
      },
    },
    items: [
      {
        name: { ru: 'Виталий', en: 'Vitaliy' },
        city: { ru: 'Москва', en: 'Moscow' },
        text: {
          ru: 'Приехали быстро, объяснили причину ошибки на духовке и согласовали ремонт без давления.',
          en: 'They arrived quickly, explained the oven fault and agreed the repair without pressure.',
        },
      },
      {
        name: { ru: 'Алексей', en: 'Alexey' },
        city: { ru: 'Химки', en: 'Khimki' },
        text: {
          ru: 'По холодильнику всё сделали аккуратно, детали оригинальные, документы на работы передали.',
          en: 'Fridge work was careful, parts were original, paperwork was provided.',
        },
      },
      {
        name: { ru: 'Артур', en: 'Artur' },
        city: { ru: 'Одинцово', en: 'Odintsovo' },
        text: {
          ru: 'Удобно, что можно и позвонить, и оставить заявку — перезвонили в тот же день.',
          en: 'Helpful that I could call or leave a request — they called back the same day.',
        },
      },
      {
        name: { ru: 'Елена', en: 'Elena' },
        city: { ru: 'Мытищи', en: 'Mytishchi' },
        text: {
          ru: 'Посудомоечная машина выдавала ошибку. Диагностику сделали на месте, запчасть привезли на следующий визит.',
          en: 'The dishwasher showed an error. They diagnosed it on site and brought the part on the next visit.',
        },
      },
      {
        name: { ru: 'Дмитрий', en: 'Dmitry' },
        city: { ru: 'Красногорск', en: 'Krasnogorsk' },
        text: {
          ru: 'На варочной панели не включалась зона. Мастер нашёл причину, работу и сроки назвал сразу.',
          en: 'A cooktop zone would not switch on. The engineer found the cause and stated the work and timing at once.',
        },
      },
      {
        name: { ru: 'Ольга', en: 'Olga' },
        city: { ru: 'Королёв', en: 'Korolev' },
        text: {
          ru: 'Стиральная машина останавливалась на отжиме. После ремонта отжимает как раньше, документы оставили.',
          en: 'The washing machine stopped on spin. After the repair it spins as before, and they left the paperwork.',
        },
      },
      {
        name: { ru: 'Сергей', en: 'Sergey' },
        city: { ru: 'Подольск', en: 'Podolsk' },
        text: {
          ru: 'Кофемашина не грела воду. Приехали в согласованное окно, починили без лишних допродаж.',
          en: 'The coffee machine was not heating water. They arrived in the agreed window and repaired it without extra upsells.',
        },
      },
      {
        name: { ru: 'Марина', en: 'Marina' },
        city: { ru: 'Балашиха', en: 'Balashikha' },
        text: {
          ru: 'Вытяжка стала шуметь сильнее обычного. Подтянули крепления и заменили фильтр — шум ушёл.',
          en: 'The hood got louder than usual. They tightened the mounts and replaced the filter — the noise went away.',
        },
      },
      {
        name: { ru: 'Игорь', en: 'Igor' },
        city: { ru: 'Люберцы', en: 'Lyubertsy' },
        text: {
          ru: 'В винном шкафу плавала температура. Настроили зоны и объяснили, как следить за режимом.',
          en: 'The wine cabinet temperature was drifting. They set the zones and explained how to keep the mode stable.',
        },
      },
      {
        name: { ru: 'Анна', en: 'Anna' },
        city: { ru: 'Москва', en: 'Moscow' },
        text: {
          ru: 'Духовка не набирала температуру. Мастер приехал в тот же день, заменил тэн, проверил работу на месте.',
          en: 'The oven was not reaching temperature. The engineer came the same day, replaced the heating element and checked it on site.',
        },
      },
      {
        name: { ru: 'Павел', en: 'Pavel' },
        city: { ru: 'Москва', en: 'Moscow' },
        text: {
          ru: 'Холодильник Gaggenau начал шуметь по ночам. Нашли износ вентилятора, поставили оригинал, шум пропал.',
          en: 'The Gaggenau fridge started making noise at night. They found a worn fan, fitted an original part, and the noise stopped.',
        },
      },
      {
        name: { ru: 'Наталья', en: 'Natalia' },
        city: { ru: 'Москва', en: 'Moscow' },
        text: {
          ru: 'Посудомойка не сливала воду. Диагностику сделали сразу, ремонт согласовали по сумме, без сюрпризов.',
          en: 'The dishwasher was not draining. They diagnosed it at once and agreed the repair cost with no surprises.',
        },
      },
      {
        name: { ru: 'Кирилл', en: 'Kirill' },
        city: { ru: 'Москва', en: 'Moscow' },
        text: {
          ru: 'Индукционная панель отключалась на середине готовки. Прошили модуль, панель держит заданную мощность.',
          en: 'The induction hob cut out mid-cooking. They flashed the module, and it now holds the set power.',
        },
      },
      {
        name: { ru: 'Юлия', en: 'Yulia' },
        city: { ru: 'Москва', en: 'Moscow' },
        text: {
          ru: 'Кофемашина выдавала ошибку помола. Разобрали, почистили узел, кофе снова идёт как раньше.',
          en: 'The coffee machine showed a grind error. They took it apart, cleaned the unit, and coffee runs as before.',
        },
      },
      {
        name: { ru: 'Андрей', en: 'Andrey' },
        city: { ru: 'Москва', en: 'Moscow' },
        text: {
          ru: 'Сушильная машина не закрывала цикл. Заменили датчик, документы на работу передали в тот же визит.',
          en: 'The dryer would not finish the cycle. They replaced the sensor and handed over the paperwork on the same visit.',
        },
      },
      {
        name: { ru: 'Вероника', en: 'Veronika' },
        city: { ru: 'Коммунарка', en: 'Kommunarka' },
        text: {
          ru: 'В Новой Москве выехали без задержки. Духовка с паром не набирала пар — устранили на первом визите.',
          en: 'They came out to New Moscow without delay. The steam oven was not making steam — fixed on the first visit.',
        },
      },
      {
        name: { ru: 'Роман', en: 'Roman' },
        city: { ru: 'Московский', en: 'Moskovsky' },
        text: {
          ru: 'Варочная панель в доме в Новой Москве моргала ошибкой. Заменили модуль управления, проверили все зоны.',
          en: 'The cooktop in a New Moscow house was flashing an error. They replaced the control module and checked every zone.',
        },
      },
      {
        name: { ru: 'Светлана', en: 'Svetlana' },
        city: { ru: 'Щербинка', en: 'Shcherbinka' },
        text: {
          ru: 'Посудомоечная машина текла на стыке. Уплотнитель поставили оригинальный, протечка ушла.',
          en: 'The dishwasher leaked at the joint. They fitted an original seal, and the leak stopped.',
        },
      },
      {
        name: { ru: 'Максим', en: 'Maxim' },
        city: { ru: 'Саларьево', en: 'Salaryevo' },
        text: {
          ru: 'Холодильник на кухне в Новой Москве не держал холод. Заправили контур, температуру выставили по норме.',
          en: 'The fridge in a New Moscow kitchen was not holding the cold. They charged the circuit and set the temperature to spec.',
        },
      },
      {
        name: { ru: 'Екатерина', en: 'Ekaterina' },
        city: { ru: 'Барвиха', en: 'Barvikha' },
        text: {
          ru: 'Приехали на участок в Барвихе вовремя. Винный шкаф сбивал зоны — откалибровали, режим держит стабильно.',
          en: 'They arrived on time at the Barvikha property. The wine cabinet was losing its zones — they calibrated it, and the mode stays stable.',
        },
      },
      {
        name: { ru: 'Николай', en: 'Nikolay' },
        city: { ru: 'Жуковка', en: 'Zhukovka' },
        text: {
          ru: 'Газовая панель Gaggenau в Жуковке не держала пламя. Заменили термопару, все конфорки зажигаются ровно.',
          en: 'The Gaggenau gas hob in Zhukovka would not hold the flame. They replaced the thermocouple, and all burners ignite evenly.',
        },
      },
      {
        name: { ru: 'Ирина', en: 'Irina' },
        city: { ru: 'Горки-2', en: 'Gorki-2' },
        text: {
          ru: 'Духовой шкаф серии 400 в Горках-2 пищал и не запускал режим. Плату проверили, ошибку сняли, работает тихо.',
          en: 'The 400 series oven in Gorki-2 beeped and would not start. They checked the board, cleared the error, and it runs quietly.',
        },
      },
      {
        name: { ru: 'Александр', en: 'Alexander' },
        city: { ru: 'Николина Гора', en: 'Nikolina Gora' },
        text: {
          ru: 'Вытяжка в доме на Николиной Горе потеряла тягу. Почистили канал, заменили фильтр — тяга вернулась.',
          en: 'The hood in a house at Nikolina Gora lost suction. They cleaned the duct and replaced the filter — suction is back.',
        },
      },
      {
        name: { ru: 'Татьяна', en: 'Tatiana' },
        city: { ru: 'Усово', en: 'Usovo' },
        text: {
          ru: 'Кофемашина в Усово не нагревала бойлер. Деталь привезли с собой, ремонт занял один визит.',
          en: 'The coffee machine in Usovo was not heating the boiler. They brought the part with them, and the repair took one visit.',
        },
      },
      {
        name: { ru: 'Владимир', en: 'Vladimir' },
        city: { ru: 'Сколково', en: 'Skolkovo' },
        text: {
          ru: 'Стиральная машина в Сколково не набирала воду. Клапан заменили на оригинал, цикл проходит до конца.',
          en: 'The washing machine in Skolkovo was not taking in water. They replaced the valve with an original, and the cycle now finishes.',
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
