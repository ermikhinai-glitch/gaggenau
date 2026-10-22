import { appliances, type ApplianceSlug, type Locale } from '../config/site';

type Localized = Record<Locale, string>;

export type PartItem = {
  sku: string;
  applianceSlug: ApplianceSlug;
  name: Localized;
  note: Localized;
  priceRub: number | null;
};

export const partsPage = {
  slug: 'parts',
  title: {
    ru: 'Оригинальные запчасти Gaggenau',
    en: 'Original Gaggenau parts',
  },
  description: {
    ru: 'Оригинальные запчасти и аксессуары Gaggenau: подбор, заказ и установка при ремонте в Москве и МО.',
    en: 'Original Gaggenau parts and accessories: selection, order and fitting during repair in Moscow and MO.',
  },
  eyebrow: { ru: 'Каталог', en: 'Catalogue' },
  lead: {
    ru: 'Устанавливаем только оригинальные комплектующие Gaggenau. Цены ориентировочные — наличие и стоимость на день заказа подтверждаем при заявке. Деталь под конкретную модель подберём после диагностики.',
    en: 'We install original Gaggenau parts only. Prices are indicative — stock and the price on the order date are confirmed with your request. We match the part to your model after diagnostics.',
  },
  searchPlaceholder: {
    ru: 'Поиск по названию или артикулу',
    en: 'Search by name or part number',
  },
  empty: {
    ru: 'По этой технике в списке пока нет позиций. Оставьте заявку — подберём оригинал по модели.',
    en: 'No listed items for this appliance yet. Leave a request — we will match the original part to your model.',
  },
  order: { ru: 'Заказать', en: 'Order' },
  all: { ru: 'Все', en: 'All' },
  sku: { ru: 'Артикул', en: 'Part no.' },
  price: { ru: 'Цена', en: 'Price' },
  nameCol: { ru: 'Наименование', en: 'Name' },
} as const;

const applianceOrder = appliances.map((item) => item.slug);

export const partsCatalog: PartItem[] = [
  {
    sku: 'BA058115',
    applianceSlug: 'ovens',
    name: { ru: 'Нагревательный элемент', en: 'Heating element' },
    note: {
      ru: 'Для камня для выпечки и жаровни GN 340.',
      en: 'For baking stone and GN 340 roaster.',
    },
    priceRub: 34800,
  },
  {
    sku: 'BA018105',
    applianceSlug: 'ovens',
    name: { ru: 'Телескопические направляющие 76 см', en: 'Telescopic rails 76 cm' },
    note: {
      ru: 'Одноуровневые, для духовых шкафов серии 400.',
      en: 'Single-level rails for 400 series ovens.',
    },
    priceRub: 52400,
  },
  {
    sku: 'BA016105',
    applianceSlug: 'ovens',
    name: { ru: 'Телескопические направляющие 60 см', en: 'Telescopic rails 60 cm' },
    note: {
      ru: 'Для духовых шкафов серий 200 и 400.',
      en: 'For 200 and 400 series ovens.',
    },
    priceRub: 41750,
  },
  {
    sku: 'BA036105',
    applianceSlug: 'ovens',
    name: { ru: 'Решётка хромированная', en: 'Chrome wire rack' },
    note: {
      ru: 'Для духовых шкафов серий 200 и 400.',
      en: 'For 200 and 400 series ovens.',
    },
    priceRub: 18600,
  },
  {
    sku: 'BA226105',
    applianceSlug: 'ovens',
    name: { ru: 'Эмалированный противень', en: 'Enamelled baking tray' },
    note: {
      ru: 'Для духовых шкафов серий 200 и 400.',
      en: 'For 200 and 400 series ovens.',
    },
    priceRub: 19250,
  },
  {
    sku: 'BA058133',
    applianceSlug: 'ovens',
    name: { ru: 'Камень для выпечки', en: 'Baking stone' },
    note: {
      ru: 'Для духовых шкафов 76 см серии 400.',
      en: 'For 76 cm 400 series ovens.',
    },
    priceRub: 54900,
  },
  {
    sku: 'GZ010011',
    applianceSlug: 'ovens',
    name: { ru: 'Шланг подвода воды', en: 'Water inlet hose' },
    note: {
      ru: 'Гибкий шланг для духовых шкафов / комби-пар.',
      en: 'Flexible hose for ovens / combi-steam.',
    },
    priceRub: 16850,
  },
  {
    sku: 'GN410130',
    applianceSlug: 'ovens',
    name: { ru: 'Крышка гастроёмкости 1/3 GN', en: 'Gastronorm lid 1/3 GN' },
    note: {
      ru: 'Нержавеющая сталь, для пароварок.',
      en: 'Stainless steel, for steam ovens.',
    },
    priceRub: 12400,
  },
  {
    sku: 'GN154230',
    applianceSlug: 'ovens',
    name: { ru: 'Перфорированный лоток 2/3 GN', en: 'Perforated tray 2/3 GN' },
    note: {
      ru: 'Антипригарный, пароварки 60 см серий 200 и 400.',
      en: 'Non-stick, 60 cm 200 and 400 series steam ovens.',
    },
    priceRub: 28750,
  },
  {
    sku: 'GN124230',
    applianceSlug: 'ovens',
    name: { ru: 'Перфорированный поддон 2/3 GN', en: 'Perforated pan 2/3 GN' },
    note: {
      ru: 'Нержавеющая сталь, пароварки 60 см серий 200 и 400.',
      en: 'Stainless steel, 60 cm 200 and 400 series steam ovens.',
    },
    priceRub: 24300,
  },
  {
    sku: 'KF001010',
    applianceSlug: 'hoods',
    name: { ru: 'Угольный фильтр', en: 'Charcoal filter' },
    note: {
      ru: 'Расходник для вытяжек в режиме рециркуляции.',
      en: 'Consumable for recirculation hoods.',
    },
    priceRub: 34000,
  },
  {
    sku: 'AD754048',
    applianceSlug: 'hoods',
    name: { ru: 'Воздухосборник', en: 'Air collector' },
    note: {
      ru: 'Для круглых каналов Ø 150 мм, выход Ø 200 мм.',
      en: 'For round ducts Ø 150 mm, outlet Ø 200 mm.',
    },
    priceRub: 31200,
  },
  {
    sku: 'AS070001',
    applianceSlug: 'hoods',
    name: { ru: 'Соединительное колено', en: 'Duct elbow' },
    note: {
      ru: 'Удлинение вытяжной трубы.',
      en: 'Extends the exhaust duct.',
    },
    priceRub: 18450,
  },
  {
    sku: 'CA060300',
    applianceSlug: 'cooktops',
    name: { ru: 'Сенсор приготовления', en: 'Cooking sensor' },
    note: {
      ru: 'Контроль температуры для flexInduction.',
      en: 'Temperature control for flexInduction.',
    },
    priceRub: 38600,
  },
  {
    sku: 'CKP420010',
    applianceSlug: 'cooktops',
    name: { ru: 'Комплект ручек управления', en: 'Control knob set' },
    note: {
      ru: 'Для комби-панелей Vario / варочных панелей.',
      en: 'For Vario / cooktop controls.',
    },
    priceRub: 112800,
  },
  {
    sku: 'CA052300',
    applianceSlug: 'cooktops',
    name: { ru: 'Противень для жарки', en: 'Frying tray' },
    note: {
      ru: 'Литой алюминий с антипригарным покрытием, flexInduction.',
      en: 'Cast aluminium with non-stick coating, flexInduction.',
    },
    priceRub: 42500,
  },
  {
    sku: 'CA051300',
    applianceSlug: 'cooktops',
    name: { ru: 'Противень Teppan Yaki flexInduction', en: 'Teppan Yaki griddle, flexInduction' },
    note: {
      ru: 'Литой алюминий.',
      en: 'Cast aluminium.',
    },
    priceRub: 78900,
  },
  {
    sku: 'GN232230',
    applianceSlug: 'cooktops',
    name: { ru: 'Противень Teppan Yaki 2/3 GN', en: 'Teppan Yaki tray 2/3 GN' },
    note: {
      ru: 'Нержавеющая сталь, для варочных панелей.',
      en: 'Stainless steel, for cooktops.',
    },
    priceRub: 64750,
  },
  {
    sku: 'GN232110',
    applianceSlug: 'cooktops',
    name: { ru: 'Противень Teppan Yaki CX 480', en: 'Teppan Yaki tray CX 480' },
    note: {
      ru: 'Для индукционной поверхности CX 480.',
      en: 'For the CX 480 induction cooktop.',
    },
    priceRub: 72400,
  },
  {
    sku: 'VA461001',
    applianceSlug: 'cooktops',
    name: { ru: 'Чугунный эмалированный противень', en: 'Enamelled cast-iron tray' },
    note: {
      ru: 'Для жарки на всей поверхности.',
      en: 'For full-surface frying.',
    },
    priceRub: 44200,
  },
  {
    sku: 'VA440010',
    applianceSlug: 'cooktops',
    name: { ru: 'Крышка из нержавеющей стали', en: 'Stainless steel lid' },
    note: {
      ru: 'Для приборов шириной 38 см.',
      en: 'For 38 cm appliances.',
    },
    priceRub: 48650,
  },
  {
    sku: 'VA200080',
    applianceSlug: 'cooktops',
    name: { ru: 'Соединительный элемент панели и вытяжки', en: 'Cooktop–hood connector' },
    note: {
      ru: 'Установка в одну нишу, подходит к AL 200 180.',
      en: 'Combined niche fit, suits AL 200 180.',
    },
    priceRub: 74300,
  },
  {
    sku: 'LS041001',
    applianceSlug: 'cooktops',
    name: { ru: 'Защитный кожух', en: 'Protective cover' },
    note: {
      ru: 'Для комбинирования с газовыми панелями.',
      en: 'For combining with gas cooktops.',
    },
    priceRub: 17800,
  },
  {
    sku: 'DA041160',
    applianceSlug: 'dishwashers',
    name: { ru: 'Короб Vario drawer', en: 'Vario drawer' },
    note: {
      ru: 'Третий уровень для столовых приборов.',
      en: 'Third-level cutlery drawer.',
    },
    priceRub: 67500,
  },
  {
    sku: 'DA043000',
    applianceSlug: 'dishwashers',
    name: { ru: 'Держатель высоких бокалов', en: 'Stemware holder' },
    note: {
      ru: 'Для посудомоечных машин серий 200 и 400.',
      en: 'For 200 and 400 series dishwashers.',
    },
    priceRub: 14250,
  },
  {
    sku: 'WA027400',
    applianceSlug: 'washing-machines',
    name: { ru: 'Соединительный элемент с полкой', en: 'Stacking kit with shelf' },
    note: {
      ru: 'Для установки стиральной машины в колонну.',
      en: 'For installing the washing machine in a column.',
    },
    priceRub: 51000,
  },
  {
    sku: 'WA027500',
    applianceSlug: 'dryers',
    name: { ru: 'Соединительный элемент с полкой', en: 'Stacking kit with shelf' },
    note: {
      ru: 'Для установки сушильной машины в колонну.',
      en: 'For installing the dryer in a column.',
    },
    priceRub: 58750,
  },
  {
    sku: 'RA461116',
    applianceSlug: 'refrigerators',
    name: { ru: 'Вентиляционная решётка', en: 'Ventilation grille' },
    note: {
      ru: 'Для холодильников RF.',
      en: 'For RF refrigerators.',
    },
    priceRub: 29800,
  },
  {
    sku: 'RA030100',
    applianceSlug: 'refrigerators',
    name: { ru: 'Контейнер для продуктов', en: 'Storage container' },
    note: {
      ru: 'Для холодильников и морозильных камер.',
      en: 'For refrigerators and freezers.',
    },
    priceRub: 16450,
  },
  {
    sku: 'WM481010',
    applianceSlug: 'washing-machines',
    name: { ru: 'Сливная помпа', en: 'Drain pump' },
    note: { ru: 'Слив и отжим.', en: 'Drain and spin.' },
    priceRub: 52400,
  },
  {
    sku: 'WM481020',
    applianceSlug: 'washing-machines',
    name: { ru: 'Датчик уровня', en: 'Water level sensor' },
    note: { ru: 'Контроль уровня воды.', en: 'Water level control.' },
    priceRub: 27850,
  },
  {
    sku: 'WM481030',
    applianceSlug: 'washing-machines',
    name: { ru: 'Клапан подачи воды', en: 'Inlet valve' },
    note: { ru: 'Набор воды.', en: 'Water fill.' },
    priceRub: 31600,
  },
  {
    sku: 'WM481040',
    applianceSlug: 'washing-machines',
    name: { ru: 'ТЭН', en: 'Heating element' },
    note: { ru: 'Нагрев воды.', en: 'Water heating.' },
    priceRub: 41200,
  },
  {
    sku: 'WM481050',
    applianceSlug: 'washing-machines',
    name: { ru: 'Датчик температуры', en: 'Temperature sensor' },
    note: { ru: 'Контроль нагрева воды.', en: 'Water temperature control.' },
    priceRub: 24750,
  },
  {
    sku: 'WM481060',
    applianceSlug: 'washing-machines',
    name: { ru: 'Модуль управления', en: 'Control module' },
    note: { ru: 'Электроника управления и коды ошибок.', en: 'Control electronics and error codes.' },
    priceRub: 134800,
  },
  {
    sku: 'WM481070',
    applianceSlug: 'washing-machines',
    name: { ru: 'Подшипники', en: 'Bearings' },
    note: { ru: 'Шум и вибрация барабана.', en: 'Drum noise and vibration.' },
    priceRub: 61500,
  },
  {
    sku: 'WM481080',
    applianceSlug: 'washing-machines',
    name: { ru: 'Амортизаторы', en: 'Shock absorbers' },
    note: { ru: 'Гашение вибрации при отжиме.', en: 'Spin vibration damping.' },
    priceRub: 43900,
  },
  {
    sku: 'DS482010',
    applianceSlug: 'dishwashers',
    name: { ru: 'Циркуляционный насос', en: 'Circulation pump' },
    note: { ru: 'Мойка и подача воды на коромысла.', en: 'Wash cycle and spray-arm flow.' },
    priceRub: 78600,
  },
  {
    sku: 'DS482020',
    applianceSlug: 'dishwashers',
    name: { ru: 'ТЭН', en: 'Heating element' },
    note: { ru: 'Нагрев воды.', en: 'Water heating.' },
    priceRub: 46800,
  },
  {
    sku: 'DS482030',
    applianceSlug: 'dishwashers',
    name: { ru: 'Датчик температуры', en: 'Temperature sensor' },
    note: { ru: 'Контроль нагрева.', en: 'Heating control.' },
    priceRub: 26400,
  },
  {
    sku: 'DS482040',
    applianceSlug: 'dishwashers',
    name: { ru: 'Сливной насос', en: 'Drain pump' },
    note: { ru: 'Слив воды.', en: 'Water drain.' },
    priceRub: 51250,
  },
  {
    sku: 'DS482050',
    applianceSlug: 'dishwashers',
    name: { ru: 'Фильтр', en: 'Filter' },
    note: { ru: 'Засор на сливе.', en: 'Drain blockage.' },
    priceRub: 18900,
  },
  {
    sku: 'DS482060',
    applianceSlug: 'dishwashers',
    name: { ru: 'Уплотнитель двери', en: 'Door seal' },
    note: { ru: 'Протечки по контуру двери.', en: 'Leaks around the door.' },
    priceRub: 36750,
  },
  {
    sku: 'DS482070',
    applianceSlug: 'dishwashers',
    name: { ru: 'Датчик протечки', en: 'Leak sensor' },
    note: { ru: 'Срабатывание Aquastop.', en: 'Aquastop trips.' },
    priceRub: 29400,
  },
  {
    sku: 'DY483010',
    applianceSlug: 'dryers',
    name: { ru: 'ТЭН', en: 'Heating element' },
    note: { ru: 'Нагрев при сушке.', en: 'Drying heat.' },
    priceRub: 49800,
  },
  {
    sku: 'DY483020',
    applianceSlug: 'dryers',
    name: { ru: 'Термодатчик', en: 'Temperature sensor' },
    note: { ru: 'Контроль нагрева.', en: 'Heat control.' },
    priceRub: 28350,
  },
  {
    sku: 'DY483030',
    applianceSlug: 'dryers',
    name: { ru: 'Вентилятор', en: 'Fan' },
    note: { ru: 'Поток воздуха в барабане.', en: 'Airflow through the drum.' },
    priceRub: 44600,
  },
  {
    sku: 'DY483040',
    applianceSlug: 'dryers',
    name: { ru: 'Ремень привода', en: 'Drive belt' },
    note: { ru: 'Вращение барабана.', en: 'Drum rotation.' },
    priceRub: 21800,
  },
  {
    sku: 'DY483050',
    applianceSlug: 'dryers',
    name: { ru: 'Двигатель', en: 'Motor' },
    note: { ru: 'Привод барабана.', en: 'Drum drive.' },
    priceRub: 112400,
  },
  {
    sku: 'DY483060',
    applianceSlug: 'dryers',
    name: { ru: 'Подшипники', en: 'Bearings' },
    note: { ru: 'Шум и вибрация.', en: 'Noise and vibration.' },
    priceRub: 56200,
  },
  {
    sku: 'DY483070',
    applianceSlug: 'dryers',
    name: { ru: 'Плата управления', en: 'Control board' },
    note: { ru: 'Ошибки панели и датчики.', en: 'Panel errors and sensors.' },
    priceRub: 129750,
  },
  {
    sku: 'RF484010',
    applianceSlug: 'refrigerators',
    name: { ru: 'Компрессор', en: 'Compressor' },
    note: { ru: 'Охлаждение камер.', en: 'Cabinet cooling.' },
    priceRub: 164900,
  },
  {
    sku: 'RF484020',
    applianceSlug: 'refrigerators',
    name: { ru: 'Датчик температуры', en: 'Temperature sensor' },
    note: { ru: 'Удержание температуры.', en: 'Temperature hold.' },
    priceRub: 31850,
  },
  {
    sku: 'RF484030',
    applianceSlug: 'refrigerators',
    name: { ru: 'Уплотнитель двери', en: 'Door seal' },
    note: { ru: 'Иней и вода в камере.', en: 'Frost and water in the cabinet.' },
    priceRub: 47600,
  },
  {
    sku: 'RF484040',
    applianceSlug: 'refrigerators',
    name: { ru: 'Вентилятор', en: 'Fan' },
    note: { ru: 'Циркуляция воздуха и шум.', en: 'Air circulation and noise.' },
    priceRub: 52800,
  },
  {
    sku: 'RF484050',
    applianceSlug: 'refrigerators',
    name: { ru: 'Модуль управления', en: 'Control module' },
    note: { ru: 'Ошибки на дисплее.', en: 'Display errors.' },
    priceRub: 148500,
  },
  {
    sku: 'WN485010',
    applianceSlug: 'wine-cabinets',
    name: { ru: 'Компрессор', en: 'Compressor' },
    note: { ru: 'Зоны охлаждения.', en: 'Cooling zones.' },
    priceRub: 172400,
  },
  {
    sku: 'WN485020',
    applianceSlug: 'wine-cabinets',
    name: { ru: 'Датчик температуры', en: 'Temperature sensor' },
    note: { ru: 'Удержание температуры.', en: 'Temperature hold.' },
    priceRub: 35450,
  },
  {
    sku: 'WN485030',
    applianceSlug: 'wine-cabinets',
    name: { ru: 'Уплотнитель двери', en: 'Door seal' },
    note: { ru: 'Конденсат и влажность.', en: 'Condensation and humidity.' },
    priceRub: 51200,
  },
  {
    sku: 'WN485040',
    applianceSlug: 'wine-cabinets',
    name: { ru: 'Вентилятор', en: 'Fan' },
    note: { ru: 'Шум и вибрация.', en: 'Noise and vibration.' },
    priceRub: 58600,
  },
  {
    sku: 'WN485050',
    applianceSlug: 'wine-cabinets',
    name: { ru: 'Подсветка камеры', en: 'Cabinet lighting' },
    note: { ru: 'Свет внутри камеры.', en: 'Interior light.' },
    priceRub: 39450,
  },
  {
    sku: 'OV486010',
    applianceSlug: 'ovens',
    name: { ru: 'ТЭН камеры', en: 'Cavity heating element' },
    note: { ru: 'Нагрев камеры.', en: 'Cavity heating.' },
    priceRub: 72800,
  },
  {
    sku: 'OV486020',
    applianceSlug: 'ovens',
    name: { ru: 'Силовая плата', en: 'Power board' },
    note: { ru: 'Питание нагрева.', en: 'Heating power supply.' },
    priceRub: 156400,
  },
  {
    sku: 'OV486030',
    applianceSlug: 'ovens',
    name: { ru: 'Датчик температуры', en: 'Temperature sensor' },
    note: { ru: 'Контроль нагрева.', en: 'Heat control.' },
    priceRub: 29650,
  },
  {
    sku: 'OV486040',
    applianceSlug: 'ovens',
    name: { ru: 'Замок двери', en: 'Door lock' },
    note: { ru: 'Закрытие двери, в том числе после пиролиза.', en: 'Door closing, including after pyrolysis.' },
    priceRub: 58900,
  },
  {
    sku: 'OV486050',
    applianceSlug: 'ovens',
    name: { ru: 'Петли двери', en: 'Door hinges' },
    note: { ru: 'Люфт и ход двери.', en: 'Door play and travel.' },
    priceRub: 49750,
  },
  {
    sku: 'OV486060',
    applianceSlug: 'ovens',
    name: { ru: 'Парогенератор', en: 'Steam generator' },
    note: { ru: 'Пар и комби-режимы.', en: 'Steam and combi modes.' },
    priceRub: 138200,
  },
  {
    sku: 'CK487010',
    applianceSlug: 'cooktops',
    name: { ru: 'Индуктор', en: 'Inductor' },
    note: { ru: 'Нагрев зоны.', en: 'Zone heating.' },
    priceRub: 94600,
  },
  {
    sku: 'CK487020',
    applianceSlug: 'cooktops',
    name: { ru: 'Силовая плата', en: 'Power board' },
    note: { ru: 'Питание конфорок.', en: 'Zone power supply.' },
    priceRub: 169800,
  },
  {
    sku: 'CK487030',
    applianceSlug: 'cooktops',
    name: { ru: 'Датчик температуры', en: 'Temperature sensor' },
    note: { ru: 'Перегрев и отключение зоны.', en: 'Overheat and zone shutdown.' },
    priceRub: 32400,
  },
  {
    sku: 'CK487040',
    applianceSlug: 'cooktops',
    name: { ru: 'Реле нагрева', en: 'Heating relay' },
    note: { ru: 'Включение нагрева.', en: 'Heat switching.' },
    priceRub: 41850,
  },
  {
    sku: 'CK487050',
    applianceSlug: 'cooktops',
    name: { ru: 'Стекло панели', en: 'Glass panel' },
    note: { ru: 'Сенсорное управление и поверхность.', en: 'Touch controls and the surface.' },
    priceRub: 124500,
  },
  {
    sku: 'HD488010',
    applianceSlug: 'hoods',
    name: { ru: 'Двигатель', en: 'Motor' },
    note: { ru: 'Тяга вытяжки.', en: 'Extraction airflow.' },
    priceRub: 108700,
  },
  {
    sku: 'HD488020',
    applianceSlug: 'hoods',
    name: { ru: 'Жировой фильтр', en: 'Grease filter' },
    note: { ru: 'Фильтрация воздуха.', en: 'Air filtration.' },
    priceRub: 29900,
  },
  {
    sku: 'HD488030',
    applianceSlug: 'hoods',
    name: { ru: 'Крыльчатка', en: 'Impeller' },
    note: { ru: 'Шум и дисбаланс вентилятора.', en: 'Fan noise and imbalance.' },
    priceRub: 47250,
  },
  {
    sku: 'HD488040',
    applianceSlug: 'hoods',
    name: { ru: 'Плата управления', en: 'Control board' },
    note: { ru: 'Управление вытяжкой.', en: 'Hood control.' },
    priceRub: 121600,
  },
  {
    sku: 'CM489010',
    applianceSlug: 'coffee-machines',
    name: { ru: 'Жернова', en: 'Burrs' },
    note: { ru: 'Помол.', en: 'Grinding.' },
    priceRub: 62400,
  },
  {
    sku: 'CM489020',
    applianceSlug: 'coffee-machines',
    name: { ru: 'Заварочный блок', en: 'Brew unit' },
    note: { ru: 'Заваривание.', en: 'Brewing.' },
    priceRub: 136800,
  },
  {
    sku: 'CM489030',
    applianceSlug: 'coffee-machines',
    name: { ru: 'Помпа', en: 'Pump' },
    note: { ru: 'Подача воды и слабый поток.', en: 'Water feed and weak flow.' },
    priceRub: 71500,
  },
  {
    sku: 'CM489040',
    applianceSlug: 'coffee-machines',
    name: { ru: 'Клапан', en: 'Valve' },
    note: { ru: 'Гидросистема и накипь.', en: 'Water circuit and scale.' },
    priceRub: 42300,
  },
  {
    sku: 'CM489050',
    applianceSlug: 'coffee-machines',
    name: { ru: 'Уплотнения', en: 'Seals' },
    note: { ru: 'Протечки гидросистемы.', en: 'Water-circuit leaks.' },
    priceRub: 31750,
  },
  {
    sku: 'CN490010',
    applianceSlug: 'connection',
    name: { ru: 'Удлинённый шланг подачи воды', en: 'Extended water inlet hose' },
    note: {
      ru: 'Если точка воды дальше штатного шланга: стиральные и посудомоечные машины, сушильные с подачей воды, кофемашины, пароварки, холодильники с водопроводом.',
      en: 'When the water point is beyond the standard hose: washing machines and dishwashers, dryers with a water feed, coffee machines, steam ovens, refrigerators with a water line.',
    },
    priceRub: 24900,
  },
  {
    sku: 'CN490020',
    applianceSlug: 'connection',
    name: { ru: 'Заливной шланг', en: 'Inlet hose' },
    note: {
      ru: 'Штатное подключение к воде.',
      en: 'Standard water connection.',
    },
    priceRub: 16800,
  },
  {
    sku: 'CN490030',
    applianceSlug: 'connection',
    name: { ru: 'Сливной шланг', en: 'Drain hose' },
    note: {
      ru: 'Слив в канализацию: стиральные и посудомоечные машины, конденсационные сушильные.',
      en: 'Drain to the waste: washing machines, dishwashers and condenser dryers.',
    },
    priceRub: 18450,
  },
  {
    sku: 'CN490040',
    applianceSlug: 'connection',
    name: { ru: 'Шланг Aquastop', en: 'Aquastop hose' },
    note: {
      ru: 'Защита от протечки на заливных машинах.',
      en: 'Leak protection on water-inlet appliances.',
    },
    priceRub: 29600,
  },
  {
    sku: 'CN490050',
    applianceSlug: 'connection',
    name: { ru: 'Кабель подключения', en: 'Connection cable' },
    note: {
      ru: 'Подключение к электросети встроенной техники.',
      en: 'Mains connection for built-in appliances.',
    },
    priceRub: 22750,
  },
  {
    sku: 'CN490060',
    applianceSlug: 'connection',
    name: { ru: 'Комплект крепления в нишу', en: 'Niche fixing kit' },
    note: {
      ru: 'Крепление и выравнивание встроенной техники.',
      en: 'Securing and levelling a built-in appliance.',
    },
    priceRub: 38400,
  },
];

export function sortedPartsCatalog(): PartItem[] {
  return [...partsCatalog].sort((a, b) => {
    const byAppliance = applianceOrder.indexOf(a.applianceSlug) - applianceOrder.indexOf(b.applianceSlug);
    if (byAppliance !== 0) return byAppliance;
    return (a.sku ? 1 : 0) - (b.sku ? 1 : 0);
  });
}

export function formatPartPrice(amount: number | null, locale: Locale): string {
  if (amount == null) return locale === 'ru' ? 'По запросу' : 'On request';
  const formatted = new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US').format(amount);
  return locale === 'ru' ? `${formatted} ₽` : `${formatted} RUB`;
}
