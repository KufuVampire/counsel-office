export type AlertTone = 'neutral' | 'success' | 'warning' | 'danger';

export const alertToneStyles: Record<AlertTone, { container: string; title: string }> = {
  neutral: {
    container: 'bg-surface-muted border-line text-fg',
    title: 'text-fg',
  },
  success: {
    container: 'bg-success-bg border-success text-success',
    title: 'text-success',
  },
  warning: {
    container: 'bg-warning-bg border-warning text-warning',
    title: 'text-warning',
  },
  danger: {
    container: 'bg-danger-bg border-danger text-danger',
    title: 'text-danger',
  },
};
