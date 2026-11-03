import { useState, type ReactNode } from 'react';
import { ConsultationForm } from '@/features/consultation';
import { ConsultationModalContext } from '@/shared/lib/consultation-modal-context';
import { Dialog } from '@/shared/ui/Dialog';
import { SkipLink } from '@/shared/ui/SkipLink';
import { Footer } from './Footer';
import { Header } from './Header';

export interface SiteLayoutProps {
  readonly children: ReactNode;
  readonly modalContent?: ReactNode;
}

export function SiteLayout({ children, modalContent }: SiteLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialPracticeSlug, setInitialPracticeSlug] = useState<string | undefined>();

  const openModal = (practiceSlug?: string) => {
    setInitialPracticeSlug(practiceSlug);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setInitialPracticeSlug(undefined);
  };

  return (
    <ConsultationModalContext.Provider
      value={{
        isOpen,
        initialPracticeSlug,
        openModal,
        closeModal,
      }}
    >
      <div className="flex min-h-dvh flex-col bg-page text-fg">
        <SkipLink targetId="main" />
        <Header onOpenConsultation={() => openModal()} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <Dialog
          open={isOpen}
          onClose={closeModal}
          title="Запись на первичную консультацию"
          description="Оставьте контакты, и адвокат свяжется с вами для уточнения деталей."
        >
          {isOpen &&
            (modalContent ?? (
              <ConsultationForm
                key={initialPracticeSlug || 'default'}
                initialPracticeSlug={initialPracticeSlug}
                onSuccess={closeModal}
              />
            ))}
        </Dialog>
      </div>
    </ConsultationModalContext.Provider>
  );
}
