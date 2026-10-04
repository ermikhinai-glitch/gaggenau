import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig, type Locale } from '@/config/site';
import { isLocale, localizePath } from '@/i18n/utils';
import { t } from '@/i18n/ui';
import { isBusinessHours } from '@/lib/business-hours';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : 'ru') as Locale;
  return {
    title:
      locale === 'ru' ? 'Заявка принята' : 'Request received',
    description: siteConfig.tagline[locale],
  };
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const day = isBusinessHours();

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-4 py-20 md:px-8">
      <p className="text-label-caps text-accent-champagne-deep">
        {locale === 'ru' ? 'Статус' : 'Status'}
      </p>
      <h1 className="mt-3 text-display-hero text-text-primary">
        {locale === 'ru' ? 'Заявка принята' : 'Request received'}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-text-secondary">
        {day ? t(locale, 'thankyou.day') : t(locale, 'thankyou.night')}
      </p>
      <p className="mt-4 text-sm text-text-tertiary">
        {siteConfig.hours.label[locale]} · {siteConfig.phoneDisplay}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={siteConfig.phoneHref}
          className="rounded border border-metallic px-5 py-3 text-label-caps text-accent-champagne-bright"
        >
          {t(locale, 'cta.call')}
        </a>
        <Link
          href={localizePath(locale)}
          className="rounded bg-primary-container px-5 py-3 text-label-caps text-on-primary-container"
        >
          {locale === 'ru' ? 'На главную' : 'Back home'}
        </Link>
      </div>
    </section>
  );
}
