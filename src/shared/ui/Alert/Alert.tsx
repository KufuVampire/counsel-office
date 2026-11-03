import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { type AlertTone, alertToneStyles } from './alert.variants';

export interface AlertProps {
  readonly tone?: AlertTone;
  readonly title?: string;
  readonly role?: 'status' | 'alert';
  readonly className?: string;
  readonly children: ReactNode;
}

export function Alert({
  tone = 'neutral',
  title,
  role = 'status',
  className,
  children,
}: AlertProps) {
  const styles = alertToneStyles[tone];

  return (
    <div
      role={role}
      className={cn('rounded-lg border p-4 font-sans text-small', styles.container, className)}
    >
      {title && (
        <h4 className={cn('mb-1 font-medium font-sans text-small leading-tight', styles.title)}>
          {title}
        </h4>
      )}
      <div className="leading-normal">{children}</div>
    </div>
  );
}
