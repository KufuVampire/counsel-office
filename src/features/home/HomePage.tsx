import { buildAttorneySchema, buildPersonSchema, usePageMeta } from '@/shared/seo';
import { AboutSection } from './ui/AboutSection';
import { BlogPreviewSection } from './ui/BlogPreviewSection';
import { ContactsSection } from './ui/ContactsSection';
import { FAQSection } from './ui/FAQSection';
import { HeroSection } from './ui/HeroSection';
import { PracticeAreasSection } from './ui/PracticeAreasSection';
import { ProcessSection } from './ui/ProcessSection';

export function HomePage() {
  usePageMeta({
    title: 'Counsel Office — Частная юридическая практика',
    description:
      'Юридическая защита по семейным, арбитражным и банкротным делам. Частная практика адвоката Громова А. И.',
    path: '/',
    jsonLd: [buildAttorneySchema(), buildPersonSchema()],
  });

  return (
    <>
      <HeroSection />
      <PracticeAreasSection />
      <ProcessSection />
      <AboutSection />
      <FAQSection />
      <BlogPreviewSection />
      <ContactsSection />
    </>
  );
}
