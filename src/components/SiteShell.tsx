import type { ReactNode } from 'react';
import type { Locale } from '@/config/site';
import { LeadProvider } from '@/components/LeadContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PromoBanner } from '@/components/PromoBanner';
import { MobileStickyCall } from '@/components/MobileStickyCall';
import { HtmlLang } from '@/components/HtmlLang';
import { t } from '@/i18n/ui';

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LeadProvider locale={locale}>
      <HtmlLang locale={locale} />
      <a href="#main" className="skip-link">
        {t(locale, 'skip')}
      </a>
      <Header locale={locale} />
      <PromoBanner locale={locale} />
      <main id="main" className="pb-20 md:pb-0">
        {children}
      </main>
      <Footer locale={locale} />
      <MobileStickyCall locale={locale} />
    </LeadProvider>
  );
}
