import Image from 'next/image';
import Link from 'next/link';
import { appliances, siteConfig, type Locale } from '@/config/site';
import type { AppliancePageContent } from '@/content/appliances/types';
import { localizePath } from '@/i18n/utils';
import { CtaPair } from '@/components/CtaPair';
import { homeContent } from '@/content/home';
import { t } from '@/i18n/ui';

export function ApplianceLanding({
  locale,
  page,
}: {
  locale: Locale;
  page: AppliancePageContent;
}) {
  const others = appliances.filter((a) => a.slug !== page.slug);

  return (
    <>
      <section className="relative isolate min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={page.heroImage}
            alt=""
            fill
            priority
            className="motion-hero-bg object-cover opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-base via-surface-base/90 to-surface-base/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-transparent to-surface-base/50" />
        </div>

        <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-16 md:px-8">
          <p className="motion-fade-up text-label-caps text-accent-champagne-bright">
            {page.badge[locale]}
          </p>
          <h1 className="motion-fade-up mt-4 max-w-3xl text-display-hero text-text-primary">
            {page.title[locale]}{' '}
            <span className="text-accent-champagne-bright">
              {page.titleAccent[locale]}
            </span>
          </h1>
          <p className="motion-fade-up mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            {page.subtitle[locale]}
          </p>
          <p className="motion-fade-up mt-3 text-sm text-text-tertiary">
            {t(locale, 'sla.callback')} · {t(locale, 'sla.visit')} ·{' '}
            {siteConfig.geo[locale]}
          </p>
          <div className="motion-fade-up mt-8">
            <CtaPair locale={locale} appliance={page.slug} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-headline-lg text-text-primary">
          {page.faultsTitle[locale]}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {page.faults.map((fault) => (
            <div
              key={fault.title.ru}
              className="rounded-lg border border-hairline bg-surface-container-low p-5"
            >
              <h3 className="font-display text-lg text-text-primary">
                {fault.title[locale]}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                {fault.text[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-container-lowest/70">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <h2 className="text-headline-lg text-text-primary">
            {homeContent.process.title[locale]}
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-4">
            {homeContent.process.steps.map((step) => (
              <li key={step.n}>
                <span className="font-tech text-sm text-accent-champagne-base">
                  {step.n}
                </span>
                <h3 className="mt-2 font-display text-base text-text-primary">
                  {step.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {step.text[locale]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-headline-lg text-text-primary">
          {homeContent.terms.title[locale]}
        </h2>
        <p className="mt-4 max-w-3xl text-text-secondary">
          {homeContent.terms.body[locale]}
        </p>
      </section>

      <section className="border-y border-hairline bg-surface-container-low/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <h2 className="text-headline-lg text-text-primary">
            {homeContent.trust.title[locale]}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {homeContent.trust.points.slice(0, 3).map((point) => (
              <li
                key={point.title.ru}
                className="border-l border-metallic/50 pl-4"
              >
                <p className="font-display text-lg text-text-primary">
                  {point.title[locale]}
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {point.text[locale]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="text-headline-lg text-text-primary">
          {page.faqTitle[locale]}
        </h2>
        <div className="mt-8 divide-y divide-hairline border-y border-hairline">
          {page.faq.map((item) => (
            <details key={item.q.ru} className="group py-4">
              <summary className="cursor-pointer list-none font-display text-lg text-text-primary">
                <span className="flex items-center justify-between gap-4">
                  {item.q[locale]}
                  <span className="text-accent-champagne-base transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm text-text-secondary">
                {item.a[locale]}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline bg-gradient-to-br from-surface-container to-surface-container-lowest">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="text-headline-lg text-text-primary">
              {t(locale, 'cta.request')}
            </h2>
            <p className="mt-2 text-text-secondary">
              {locale === 'ru'
                ? 'Тип техники уже выбран для этой страницы — можно сразу оставить контакты.'
                : 'Appliance type is preselected for this page — leave your contacts right away.'}
            </p>
          </div>
          <CtaPair locale={locale} appliance={page.slug} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="font-display text-xl text-text-primary">
          {locale === 'ru' ? 'Другая техника Gaggenau' : 'Other Gaggenau appliances'}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {others.map((item) => (
            <Link
              key={item.slug}
              href={localizePath(locale, item.path)}
              className="rounded border border-hairline px-4 py-2 text-sm text-text-secondary transition hover:border-metallic hover:text-primary"
            >
              {item.label[locale]}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
