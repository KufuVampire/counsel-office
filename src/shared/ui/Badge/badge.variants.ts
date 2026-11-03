export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export const badgeToneStyles: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-fg-muted border border-line-subtle',
  accent: 'bg-accent-soft text-fg-accent border border-transparent',
  success: 'bg-success-bg text-success border border-transparent',
  warning: 'bg-warning-bg text-warning border border-transparent',
  danger: 'bg-danger-bg text-danger border border-transparent',
};
