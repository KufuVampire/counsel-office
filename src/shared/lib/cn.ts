import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display',
        'text-h1',
        'text-h2',
        'text-h3',
        'text-body',
        'text-body-lead',
        'text-small',
        'text-caption',
        'text-legal',
      ],
      'text-color': [
        'text-page',
        'text-surface',
        'text-surface-muted',
        'text-inverse',
        'text-inverse-raised',
        'text-hover',
        'text-selected',
        'text-fg',
        'text-fg-muted',
        'text-fg-subtle',
        'text-fg-inverse',
        'text-fg-inverse-muted',
        'text-fg-accent',
        'text-link',
        'text-link-hover',
        'text-primary',
        'text-primary-hover',
        'text-primary-active',
        'text-primary-fg',
        'text-disabled',
        'text-disabled-fg',
        'text-accent',
        'text-accent-soft',
        'text-focus',
        'text-focus-inverse',
        'text-overlay',
        'text-success',
        'text-success-bg',
        'text-warning',
        'text-warning-bg',
        'text-danger',
        'text-danger-bg',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
