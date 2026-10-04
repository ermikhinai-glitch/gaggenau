import { siteConfig, type Locale } from '@/config/site';
import type { UtilityPageContent } from '@/content/utility';
import { CtaPair } from '@/components/CtaPair';

export function UtilityPageView({
  locale,
  page,
}: {
  locale: Locale;
  page: UtilityPageContent;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
      <p className="text-label-caps text-accent-champagne-deep">
        {page.eyebrow[locale]}
      </p>
      <h1 className="mt-3 text-display-hero text-text-primary">
        {page.title[locale]}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-text-secondary">
        {page.lead[locale]}
      </p>

      {page.draftNote ? (
        <p className="mt-6 rounded border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-sm text-status-warning">
          {page.draftNote[locale]}
        </p>
      ) : null}

      {page.slug === 'contacts' ? (
        <dl className="mt-10 space-y-4 rounded-lg border border-hairline bg-surface-container-low p-6">
          <div>
            <dt className="text-label-caps text-text-tertiary">
              {locale === 'ru' ? 'Телефон' : 'Phone'}
            </dt>
            <dd className="mt-1">
              <a
                href={siteConfig.phoneHref}
                className="text-tech-data-lg text-text-primary hover:text-primary"
              >
                {siteConfig.phoneDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-label-caps text-text-tertiary">Email</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-text-primary hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-label-caps text-text-tertiary">
              {locale === 'ru' ? 'Режим' : 'Hours'}
            </dt>
            <dd className="mt-1 text-text-secondary">
              {siteConfig.hours.label[locale]}
            </dd>
          </div>
          <div>
            <dt className="text-label-caps text-text-tertiary">
              {locale === 'ru' ? 'Зона' : 'Area'}
            </dt>
            <dd className="mt-1 text-text-secondary">{siteConfig.geo[locale]}</dd>
          </div>
          <div>
            <dt className="text-label-caps text-text-tertiary">
              {locale === 'ru' ? 'Адрес' : 'Address'}
            </dt>
            <dd className="mt-1 text-text-tertiary">
              {siteConfig.addressPlaceholder[locale]}
            </dd>
          </div>
        </dl>
      ) : null}

      <div className="mt-12 space-y-10">
        {page.sections.map((section) => (
          <section key={section.title.ru}>
            <h2 className="font-display text-2xl text-text-primary">
              {section.title[locale]}
            </h2>
            {section.paragraphs.map((p) => (
              <p
                key={p.ru}
                className="mt-3 text-base leading-relaxed text-text-secondary"
              >
                {p[locale]}
              </p>
            ))}
          </section>
        ))}
      </div>

      {(page.slug === 'about' || page.slug === 'contacts') && (
        <div className="mt-14 border-t border-hairline pt-10">
          <CtaPair locale={locale} />
        </div>
      )}
    </article>
  );
}
