export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export const avatarPixelSizes: Record<AvatarSize, number> = {
  sm: 32,
  md: 44,
  lg: 64,
  xl: 96,
};

export const avatarTextStyles: Record<AvatarSize, string> = {
  sm: 'text-caption font-medium',
  md: 'text-small font-medium',
  lg: 'text-h4 font-serif',
  xl: 'text-h2 font-serif',
};
