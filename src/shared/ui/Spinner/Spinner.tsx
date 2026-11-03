import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { type SpinnerSize, spinnerPixelSizes } from './spinner.variants';

export interface SpinnerProps {
  readonly size?: SpinnerSize;
  readonly className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const pixel = spinnerPixelSizes[size];

  return (
    <Loader2
      width={pixel}
      height={pixel}
      aria-hidden="true"
      className={cn('inline-block animate-spin', className)}
    />
  );
}
