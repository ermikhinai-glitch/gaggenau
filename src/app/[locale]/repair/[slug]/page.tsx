import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { appliances, type Locale } from '@/config/site';
import { isLocale } from '@/i18n/utils';
import { getAppliancePage } from '@/content/appliances';
import { getApplianceSeo } from '@/content/seo';
import { ApplianceLanding } from '@/components/appliances/ApplianceLanding';

export function generateStaticParams() {
  return appliances.flatMap((appliance) =>
    (['ru', 'en'] as const).map((locale) => ({
      locale,
      slug: appliance.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : 'ru') as Locale;
  const seo = getApplianceSeo(slug, locale);
  return { title: seo.title, description: seo.description };
}

export default async function RepairPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const page = getAppliancePage(slug);
  if (!page) notFound();
  return <ApplianceLanding locale={raw} page={page} />;
}
