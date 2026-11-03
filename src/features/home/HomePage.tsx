import { AboutSection } from './ui/AboutSection';
import { BlogPreviewSection } from './ui/BlogPreviewSection';
import { ContactsSection } from './ui/ContactsSection';
import { FAQSection } from './ui/FAQSection';
import { HeroSection } from './ui/HeroSection';
import { PracticeAreasSection } from './ui/PracticeAreasSection';
import { ProcessSection } from './ui/ProcessSection';

export function HomePage() {
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
