// Демо-проект: компания и контакты вымышленные
export const siteConfig = {
  brandName: 'Counsel Office',
  tagline: 'Частная юридическая практика',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://counsel-office.vercel.app',
  isIndexable: import.meta.env.VITE_INDEXABLE === 'true',
  // Веб-приложение Google Apps Script (apps-script/Code.gs): адрес публичный, он и так виден в бандле
  consultationEndpoint:
    import.meta.env.VITE_CONSULTATION_ENDPOINT ||
    'https://script.google.com/macros/s/AKfycbym-2Ygl48I5NLD0RgdOnBH1Wbz7jRdeJuCwDbwPP1DZ0IKLB1PZFPmGnh1IAt6Hyti/exec',
  phone: '+7 (495) 000-00-00',
  phoneClean: '+74950000000',
  email: 'hello@counsel-office.example',
  telegram: '@counsel_office_demo',
  telegramUrl: 'https://t.me/counsel_office_demo',
  city: 'Москва',
  streetAddress: 'ул. Покровка, д. 27, офис 12',
  address: 'Москва, ул. Покровка, д. 27, офис 12',
  workingHours: 'Пн–Пт 10:00–19:00',
  workingFormat: 'Онлайн и в офисе',
  disclaimer:
    'Материалы сайта носят исключительно информационный характер, не являются публичной офертой и индивидуальной юридической консультацией.',
  demoNotice: 'Демо-проект: компания, специалист и контакты вымышлены.',
} as const;
