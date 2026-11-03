import { cn } from '@/shared/lib/cn';
import { type SpinnerSize, spinnerPixelSizes } from './spinner.variants';

export interface SpinnerProps {
  readonly size?: SpinnerSize;
  readonly className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const pixel = spinnerPixelSizes[size];

  return (
    <svg
      width={pixel}
      height={pixel}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('inline-block animate-spin', className)}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
