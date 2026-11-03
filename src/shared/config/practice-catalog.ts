export interface PracticeCatalogItem {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
}

export const PRACTICE_CATALOG: readonly PracticeCatalogItem[] = [
  {
    slug: 'semejnoe-pravo',
    title: 'Семейное право',
    summary:
      'Раздел совместно нажитого имущества, расторжение брака, определение места жительства детей и алиментные обязательства.',
  },
  {
    slug: 'arbitrazh',
    title: 'Арбитражные споры',
    summary:
      'Взыскание задолженности, споры по договорам поставки и подряда, защита интересов бизнеса в арбитражных судах.',
  },
  {
    slug: 'bankrotstvo',
    title: 'Банкротство',
    summary:
      'Законное списание долговых обязательств граждан, защита интересов кредиторов и сопровождение процедур несостоятельности.',
  },
] as const;
