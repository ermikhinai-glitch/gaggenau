import { siteConfig, type Locale } from '@/config/site';
import { t } from '@/i18n/ui';

export function MobileStickyCall({ locale }: { locale: Locale }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-surface-glass p-3 backdrop-blur-xl md:hidden">
      <a
        href={siteConfig.phoneHref}
        className="btn-lead-glow flex w-full items-center justify-center rounded bg-primary-container px-4 py-3 text-label-caps text-on-primary-container"
      >
        {t(locale, 'cta.call')} · {siteConfig.phoneDisplay}
      </a>
    </div>
  );
}
