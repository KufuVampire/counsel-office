import type { SVGProps } from 'react';
import { cn } from '@/shared/lib/cn';
import {
  type SealMarkSize,
  type SealMarkTone,
  sealMarkPixelSizes,
  sealMarkToneColors,
} from './seal-mark.variants';

export interface SealMarkProps extends Omit<SVGProps<SVGSVGElement>, 'size'> {
  readonly size?: SealMarkSize;
  readonly tone?: SealMarkTone;
  readonly className?: string;
}

export function SealMark({ size = 'md', tone = 'oxblood', className, ...rest }: SealMarkProps) {
  const pixel = sealMarkPixelSizes[size];
  const colors = sealMarkToneColors[tone];

  return (
    <svg
      width={pixel}
      height={pixel}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('inline-block shrink-0 select-none', className)}
      {...rest}
    >
      {/* Outer organic wax seal border */}
      <circle cx="50" cy="50" r="46" fill={colors.bg} stroke={colors.border} strokeWidth="3" />
      {/* Delicate inner decorative dashed ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke={colors.ring}
        strokeWidth="1.2"
        strokeDasharray="3 3"
        opacity="0.75"
      />
      {/* Classic serif ligature/monogram */}
      <text
        x="50"
        y="58"
        fill={colors.text}
        fontFamily="Literata Variable, Georgia, serif"
        fontSize="30"
        fontWeight="500"
        letterSpacing="2"
        textAnchor="middle"
      >
        CO
      </text>
    </svg>
  );
}
