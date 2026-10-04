'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ApplianceSlug } from '@/config/site';
import { LeadModal } from '@/components/LeadModal';
import type { Locale } from '@/config/site';

type LeadContextValue = {
  openLead: (appliance?: ApplianceSlug | '') => void;
  closeLead: () => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [appliance, setAppliance] = useState<ApplianceSlug | ''>('');

  const openLead = useCallback((slug: ApplianceSlug | '' = '') => {
    setAppliance(slug);
    setOpen(true);
  }, []);

  const closeLead = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openLead, closeLead }),
    [openLead, closeLead],
  );

  return (
    <LeadContext.Provider value={value}>
      {children}
      <LeadModal
        locale={locale}
        open={open}
        onClose={closeLead}
        presetAppliance={appliance}
      />
    </LeadContext.Provider>
  );
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) {
    throw new Error('useLead must be used within LeadProvider');
  }
  return ctx;
}
