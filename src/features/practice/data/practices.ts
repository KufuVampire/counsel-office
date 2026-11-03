import type { PracticeDetails } from '../types';
import { arbitrazhPractice } from './practices/arbitrazh';
import { bankrotstvoPractice } from './practices/bankrotstvo';
import { semejnoePravoPractice } from './practices/semejnoe-pravo';

export const PRACTICES: readonly PracticeDetails[] = [
  semejnoePravoPractice,
  arbitrazhPractice,
  bankrotstvoPractice,
];

export const PRACTICES_MAP: Readonly<Record<string, PracticeDetails>> = {
  'semejnoe-pravo': semejnoePravoPractice,
  arbitrazh: arbitrazhPractice,
  bankrotstvo: bankrotstvoPractice,
};

export function getPracticeBySlug(slug: string): PracticeDetails | undefined {
  return PRACTICES_MAP[slug];
}
