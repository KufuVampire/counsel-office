export type ContainerSize = 'narrow' | 'reading' | 'content' | 'wide';

export const containerSizeStyles: Record<ContainerSize, string> = {
  narrow: 'max-w-narrow',
  reading: 'max-w-reading',
  content: 'max-w-content',
  wide: 'max-w-wide',
};
