export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerTone = 'subtle' | 'default' | 'strong';

export const dividerToneStyles: Record<DividerTone, string> = {
  subtle: 'border-line-subtle',
  default: 'border-line',
  strong: 'border-line-strong',
};

export const dividerOrientationStyles: Record<DividerOrientation, string> = {
  horizontal: 'w-full border-t',
  vertical: 'h-full border-l inline-block',
};
