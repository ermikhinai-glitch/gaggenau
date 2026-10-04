import Image from 'next/image';
import Link from 'next/link';
import { appliances, siteConfig, type Locale } from '@/config/site';
import { homeContent } from '@/content/home';
import { localizePath } from '@/i18n/utils';
import { CtaPair } from '@/components/CtaPair';
import { t } from '@/i18n/ui';

export function HomePage({ locale }: { locale: Locale }) {
  const c = homeContent;

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/home/hero-kitchen.webp"
            alt=""
            fill
            priority
            className="motion-hero-bg object-cover object-center opacity-55"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-base via-surface-base/85 to-surface-base/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-transparent to-surface-base/40" />
        </div>

        <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 pb-20 pt-16 md:px-8 md:pb-24 md:pt-20">
          <p className="motion-fade-up text-label-caps text-accent-champagne-bright">
            {c.hero.badge[locale]}
          </p>
          <h1 className="motion-fade-up mt-4 max-w-4xl text-display-hero text-text-primary [animation-delay:80ms]">
            {siteConfig.workingTitle[locale]}
          </h1>
          <p className="motion-fade-up mt-3 max-w-2xl font-display text-2xl font-medium text-accent-champagne-bright md:text-3xl [animation-delay:120ms]">
            {c.hero.titleLead[locale]} {c.hero.titleAccent[locale]}
          </p>
          <p className="motion-fade-up mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg [animation-delay:160ms]">
            {c.hero.subtitle[locale]} {siteConfig.geo[locale]}.
          </p>

          <div className="motion-fade-up mt-8 [animation-delay:200ms]">
            <CtaPair locale={locale} />
          </div>

          <dl className="motion-fade-up mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 [animation-delay:260ms]">
            {c.sla.map((item) => (
              <div
                key={item.label.ru}
                className="border-l border-metallic/50 pl-3"
              >
                <dt className="text-label-caps text-text-tertiary">
                  {item.label[locale]}
                </dt>
                <dd className="mt-1 text-tech-data-lg text-text-primary">
                  {item.value[locale]}
                </dd>
                <p className="mt-1 text-xs leading-snug text-text-tertiary">
                  {item.text[locale]}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <p className="text-label-caps text-accent-champagne-deep">
          {c.appliancesSection.eyebrow[locale]}
        </p>
        <h2 className="mt-3 text-headline-lg text-text-primary">
          {c.appliancesSection.title[locale]}
        </h2>
        <p className="mt-3 max-w-2xl text-text-secondary">
          {c.appliancesSection.lead[locale]}
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {appliances.map((item) => {
            const card = c.applianceCards[item.slug];
            return (
              <Link
                key={item.slug}
                href={localizePath(locale, item.path)}
                className="card-lux-glow group relative block overflow-hidden rounded-lg border border-hairline bg-surface-container-low"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-label-caps text-text-tertiary">
                    {card.series[locale]}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-text-primary">
                    {item.label[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {card.description[locale]}
                  </p>
                  <span className="mt-4 inline-block text-sm text-accent-champagne-bright">
                    {c.appliancesSection.more[locale]} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-container-lowest/80">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <p className="text-label-caps text-accent-champagne-deep">
            {c.process.eyebrow[locale]}
          </p>
          <h2 className="mt-3 text-headline-lg text-text-primary">
            {c.process.title[locale]}
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {c.process.steps.map((step) => (
              <li key={step.n} className="border-t border-metallic/40 pt-4">
                <span className="font-tech text-sm text-accent-champagne-base">
                  {step.n}
                </span>
                <h3 className="mt-2 font-display text-lg text-text-primary">
                  {step.title[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {step.text[locale]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <p className="text-label-caps text-accent-champagne-deep">
          {c.terms.eyebrow[locale]}
        </p>
        <h2 className="mt-3 text-headline-lg text-text-primary">
          {c.terms.title[locale]}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
          {c.terms.body[locale]}
        </p>
      </section>

      <section className="relative overflow-hidden border-y border-hairline">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Image
            src="/images/home/trust.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-surface-base/85" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <p className="text-label-caps text-accent-champagne-deep">
            {c.trust.eyebrow[locale]}
          </p>
          <h2 className="mt-3 max-w-2xl text-headline-lg text-text-primary">
            {c.trust.title[locale]}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {c.trust.points.map((point) => (
              <div
                key={point.title.ru}
                className="rounded-lg border border-hairline bg-surface-raised/80 p-5"
              >
                <h3 className="font-display text-lg text-text-primary">
                  {point.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {point.text[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-label-caps text-accent-champagne-deep">
              {c.reviews.eyebrow[locale]}
            </p>
            <h2 className="mt-3 text-headline-lg text-text-primary">
              {c.reviews.title[locale]}
            </h2>
          </div>
          <span className="rounded border border-outline-variant px-2 py-1 text-[11px] uppercase tracking-wider text-status-warning">
            {c.reviews.badge[locale]}
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-text-tertiary">
          {c.reviews.note[locale]}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {c.reviews.items.map((item) => (
            <blockquote
              key={item.name.ru}
              className="border-l border-metallic/50 pl-4"
            >
              <p className="text-sm leading-relaxed text-text-secondary">
                “{item.text[locale]}”
              </p>
              <footer className="mt-3 text-sm text-text-primary">
                {item.name[locale]}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-y border-hairline bg-surface-container-lowest/60">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <p className="text-label-caps text-accent-champagne-deep">
            {c.faq.eyebrow[locale]}
          </p>
          <h2 className="mt-3 text-headline-lg text-text-primary">
            {c.faq.title[locale]}
          </h2>
          <div className="mt-8 divide-y divide-hairline border-y border-hairline">
            {c.faq.items.map((item) => (
              <details key={item.q.ru} className="group py-4">
                <summary className="cursor-pointer list-none font-display text-lg text-text-primary marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {item.q[locale]}
                    <span className="text-accent-champagne-base transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
                  {item.a[locale]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <p className="text-label-caps text-accent-champagne-deep">
          {c.about.eyebrow[locale]}
        </p>
        <h2 className="mt-3 max-w-2xl text-headline-lg text-text-primary">
          {c.about.title[locale]}
        </h2>
        <p className="mt-4 max-w-2xl text-text-secondary">{c.about.body[locale]}</p>
        <Link
          href={localizePath(locale, 'about')}
          className="mt-6 inline-block text-sm text-accent-champagne-bright hover:underline"
        >
          {c.about.link[locale]} →
        </Link>
      </section>

      <section className="border-t border-hairline bg-gradient-to-br from-surface-container-low to-surface-container-lowest">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="text-headline-lg text-text-primary">
              {c.bottomCta.title[locale]}
            </h2>
            <p className="mt-3 max-w-xl text-text-secondary">
              {c.bottomCta.text[locale]}
            </p>
            <p className="mt-2 text-sm text-text-tertiary">
              {t(locale, 'sla.callback')} · {t(locale, 'sla.visit')}
            </p>
          </div>
          <CtaPair locale={locale} />
        </div>
      </section>
    </>
  );
}
