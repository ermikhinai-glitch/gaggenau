import type { ApplianceSlug } from '../../config/site';
import { coffeeMachinesPage } from './coffee-machines';
import { dishwashersPage } from './dishwashers';
import { dryersPage } from './dryers';
import { ovensPage } from './ovens';
import { refrigeratorsPage } from './refrigerators';
import { washingMachinesPage } from './washing-machines';
import type { AppliancePageContent } from './types';

const pages: Record<ApplianceSlug, AppliancePageContent> = {
  'washing-machines': washingMachinesPage,
  dishwashers: dishwashersPage,
  dryers: dryersPage,
  refrigerators: refrigeratorsPage,
  ovens: ovensPage,
  'coffee-machines': coffeeMachinesPage,
};

export function getAppliancePage(slug: string): AppliancePageContent | undefined {
  return pages[slug as ApplianceSlug];
}

export function listAppliancePages(): AppliancePageContent[] {
  return Object.values(pages);
}

export type { AppliancePageContent } from './types';
