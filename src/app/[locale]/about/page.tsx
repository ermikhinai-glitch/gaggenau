import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/config/site';
import { isLocale } from '@/i18n/utils';
import { getUtilityPage } from '@/content/utility';
import { UtilityPageView } from '@/components/utility/UtilityPageView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : 'ru') as Locale;
  const page = getUtilityPage('about');
  return {
    title: page.title[locale],
    description: page.description[locale],
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <UtilityPageView locale={raw} page={getUtilityPage('about')} />;
}
