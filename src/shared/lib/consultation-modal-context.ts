import { createContext, useContext } from 'react';

export interface ConsultationModalContextValue {
  readonly isOpen: boolean;
  readonly initialPracticeSlug?: string;
  readonly openModal: (practiceSlug?: string) => void;
  readonly closeModal: () => void;
}

export const ConsultationModalContext = createContext<ConsultationModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function useConsultationModal(): ConsultationModalContextValue {
  return useContext(ConsultationModalContext);
}
