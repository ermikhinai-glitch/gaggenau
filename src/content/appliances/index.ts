import type { ApplianceSlug } from '../../config/site';
import { ovensPage } from './ovens';
import type { AppliancePageContent } from './types';

const pages: Partial<Record<ApplianceSlug, AppliancePageContent>> = {
  ovens: ovensPage,
};

export function getAppliancePage(slug: ApplianceSlug): AppliancePageContent | undefined {
  return pages[slug];
}

export function listAppliancePages(): AppliancePageContent[] {
  return Object.values(pages) as AppliancePageContent[];
}

export type { AppliancePageContent } from './types';
