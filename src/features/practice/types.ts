import type { AccordionEntry } from '@/shared/ui/Accordion';

export interface PracticeDetails {
  readonly slug: string;
  readonly title: string;
  readonly lead: string;
  readonly services: readonly string[];
  readonly workflow: readonly string[];
  readonly faq: readonly AccordionEntry[];
}
