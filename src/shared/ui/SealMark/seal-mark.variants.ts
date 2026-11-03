export type SealMarkSize = 'sm' | 'md' | 'lg' | 'xl';
export type SealMarkTone = 'oxblood' | 'spruce' | 'inverse';

export const sealMarkPixelSizes: Record<SealMarkSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 112,
};

export const sealMarkToneColors: Record<
  SealMarkTone,
  {
    bg: string;
    border: string;
    text: string;
    ring: string;
  }
> = {
  oxblood: {
    bg: '#7c2f30',
    border: '#983f3d',
    text: '#f6f7f6',
    ring: '#e4bfbc',
  },
  spruce: {
    bg: '#1d3833',
    border: '#2d594f',
    text: '#eef4f2',
    ring: '#84ada3',
  },
  inverse: {
    bg: '#152a26',
    border: '#84ada3',
    text: '#f6f7f6',
    ring: '#568c80',
  },
};
