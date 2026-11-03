export type TextSize = 'body-lg' | 'body' | 'small' | 'caption';
export type TextTone = 'default' | 'muted' | 'subtle' | 'inverse' | 'accent';

export const textSizeStyles: Record<TextSize, string> = {
  'body-lg': 'text-body-lg',
  body: 'text-body',
  small: 'text-small',
  caption: 'text-caption',
};

export const textToneStyles: Record<TextTone, string> = {
  default: 'text-fg',
  muted: 'text-fg-muted',
  subtle: 'text-fg-subtle',
  inverse: 'text-fg-inverse',
  accent: 'text-fg-accent',
};
