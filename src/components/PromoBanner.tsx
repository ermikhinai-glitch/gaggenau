'use client';

import { promoA } from '@/content/promo';
import type { Locale } from '@/config/site';
import { useLead } from '@/components/LeadContext';

export function PromoBanner({ locale }: { locale: Locale }) {
  const { openLead } = useLead();

  return (
    <section
      aria-label={locale === 'ru' ? 'Акция' : 'Promotion'}
      className="border-b border-metallic/40 bg-gradient-to-r from-surface-container-lowest via-surface-container to-surface-container-low"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="min-w-0">
          <p className="text-label-caps text-accent-champagne-deep">
            {locale === 'ru' ? 'Акция' : 'Offer'}
          </p>
          <h2 className="mt-1 font-display text-lg font-medium text-text-primary md:text-xl">
            {promoA.title[locale]}
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-text-secondary">
            {promoA.subtitle[locale]}
          </p>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-text-tertiary">
            {promoA.fineprint[locale]}
          </p>
        </div>
        <button
          type="button"
          onClick={() => openLead()}
          className="shrink-0 self-start rounded border border-metallic px-4 py-2.5 text-label-caps text-accent-champagne-bright transition hover:bg-surface-container-high"
        >
          {promoA.cta[locale]}
        </button>
      </div>
    </section>
  );
}
