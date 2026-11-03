import { useEffect, useState } from 'react';

export interface PresenceResult {
  readonly isMounted: boolean;
  readonly state: 'open' | 'closed';
  readonly onAnimationEnd: () => void;
}

export function usePresence(open: boolean): PresenceResult {
  const [isMounted, setIsMounted] = useState<boolean>(open);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
    }
  }, [open]);

  const onAnimationEnd = () => {
    if (!open) {
      setIsMounted(false);
    }
  };

  return {
    isMounted: isMounted || open,
    state: open ? 'open' : 'closed',
    onAnimationEnd,
  };
}
