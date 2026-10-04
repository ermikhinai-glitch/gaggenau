import type { ApplianceSlug } from '@/config/site';

export type LocalizedString = { ru: string; en: string };

export type AppliancePageContent = {
  slug: ApplianceSlug;
  heroImage: string;
  badge: LocalizedString;
  title: LocalizedString;
  titleAccent: LocalizedString;
  subtitle: LocalizedString;
  faultsTitle: LocalizedString;
  faults: { title: LocalizedString; text: LocalizedString }[];
  faqTitle: LocalizedString;
  faq: { q: LocalizedString; a: LocalizedString }[];
};
