// MOCK: Все данные сайта и практики вымышленные для демонстрации
export const siteConfig = {
  brandName: 'Counsel Office',
  tagline: 'Частная юридическая практика',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://counsel-office.example',
  isIndexable: import.meta.env.VITE_INDEXABLE === 'true',
  phone: '+7 (000) 000-00-00', // MOCK
  phoneClean: '+70000000000', // MOCK
  email: 'hello@counsel-office.example', // MOCK
  telegram: '@counsel_office_mock', // MOCK
  telegramUrl: 'https://t.me/counsel_office_mock', // MOCK
  address: 'г. Город, ул. Примерная, д. 1, офис 00', // MOCK
  workingHours: 'Пн–Пт 10:00–19:00', // MOCK
  workingFormat: 'Онлайн и в офисе', // MOCK
  disclaimer:
    'Материалы сайта носят исключительно информационный характер, не являются публичной офертой и индивидуальной юридической консультацией.',
} as const;
