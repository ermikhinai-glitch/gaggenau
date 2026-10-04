'use client';

import { siteConfig, type ApplianceSlug, type Locale } from '@/config/site';
import { t } from '@/i18n/ui';
import { useLead } from '@/components/LeadContext';

export function CtaPair({
  locale,
  appliance,
  className = '',
}: {
  locale: Locale;
  appliance?: ApplianceSlug;
  className?: string;
}) {
  const { openLead } = useLead();

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={siteConfig.phoneHref}
        className="inline-flex items-center justify-center rounded border border-metallic px-5 py-3 text-label-caps text-accent-champagne-bright transition hover:bg-surface-container"
      >
        {t(locale, 'cta.call')}
      </a>
      <button
        type="button"
        onClick={() => openLead(appliance ?? '')}
        className="btn-lead-glow inline-flex items-center justify-center rounded bg-primary-container px-5 py-3 text-label-caps text-on-primary-container"
      >
        {t(locale, 'cta.request')}
      </button>
    </div>
  );
}
