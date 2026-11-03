export type SectionTone = 'page' | 'muted' | 'inverse';
export type SectionSpacing = 'default' | 'sm';

export const sectionToneStyles: Record<SectionTone, string> = {
  page: 'bg-page text-fg',
  muted: 'bg-surface-muted text-fg',
  inverse: 'bg-inverse text-fg-inverse',
};

export const sectionSpacingStyles: Record<SectionSpacing, string> = {
  default: 'py-section',
  sm: 'py-section-sm',
};
