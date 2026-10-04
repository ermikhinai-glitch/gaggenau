import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type Locale } from '@/config/site';
import { isLocale } from '@/i18n/utils';
import { homeSeo } from '@/content/seo';
import { HomePage } from '@/components/home/HomePage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : 'ru') as Locale;
  return {
    title: homeSeo.title[locale],
    description: homeSeo.description[locale],
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <HomePage locale={raw} />;
}
