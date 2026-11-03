import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared/lib/cn';
import {
  type DividerOrientation,
  type DividerTone,
  dividerOrientationStyles,
  dividerToneStyles,
} from './divider.variants';

export interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
  readonly orientation?: DividerOrientation;
  readonly tone?: DividerTone;
  readonly className?: string;
}

export function Divider({
  orientation = 'horizontal',
  tone = 'subtle',
  className,
  ...rest
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cn(
          dividerOrientationStyles.vertical,
          dividerToneStyles[tone],
          'self-stretch',
          className,
        )}
      />
    );
  }

  return (
    <hr
      className={cn(
        'border-0',
        dividerOrientationStyles.horizontal,
        dividerToneStyles[tone],
        className,
      )}
      {...rest}
    />
  );
}
