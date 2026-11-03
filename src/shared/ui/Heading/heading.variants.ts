export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4';
export type HeadingTone = 'default' | 'muted' | 'inverse' | 'accent';

export const headingSizeStyles: Record<HeadingSize, string> = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
};

export const headingToneStyles: Record<HeadingTone, string> = {
  default: 'text-fg',
  muted: 'text-fg-muted',
  inverse: 'text-fg-inverse',
  accent: 'text-fg-accent',
};
