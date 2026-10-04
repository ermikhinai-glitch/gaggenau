'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useState } from 'react';
import {
  appliances,
  siteConfig,
  type ApplianceSlug,
  type Locale,
} from '@/config/site';
import { leadCopy } from '@/content/lead';
import { isBusinessHours } from '@/lib/business-hours';
import { localizePath } from '@/i18n/utils';

type Props = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
  presetAppliance?: ApplianceSlug | '';
};

type FormState = {
  name: string;
  phone: string;
  consent: boolean;
  city: string;
  time: string;
  appliance: ApplianceSlug | '';
  problem: string;
  whatsapp: boolean;
  telegram: boolean;
};

const emptyForm = (appliance: ApplianceSlug | '' = ''): FormState => ({
  name: '',
  phone: '',
  consent: false,
  city: '',
  time: '',
  appliance,
  problem: '',
  whatsapp: false,
  telegram: false,
});

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, '');
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function LeadModal({
  locale,
  open,
  onClose,
  presetAppliance = '',
}: Props) {
  const copy = leadCopy[locale];
  const titleId = useId();
  const [form, setForm] = useState<FormState>(() => emptyForm(presetAppliance));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [networkError, setNetworkError] = useState('');
  const dayMode = useMemo(() => isBusinessHours(), [open, status]);

  useEffect(() => {
    if (open) {
      setForm(emptyForm(presetAppliance));
      setErrors({});
      setStatus('idle');
      setNetworkError('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, presetAppliance]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  function validate(next: FormState) {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!next.name.trim()) nextErrors.name = copy.errorName;
    if (!next.phone.trim() || !isValidPhone(next.phone)) {
      nextErrors.phone = copy.errorPhone;
    }
    if (!next.consent) nextErrors.consent = copy.errorConsent;
    return nextErrors;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setNetworkError('');

    const payload = {
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      consent: form.consent,
      city: form.city.trim() || undefined,
      preferredTime: form.time.trim() || undefined,
      appliance: form.appliance || undefined,
      problem: form.problem.trim() || undefined,
      channels: {
        whatsapp: form.whatsapp,
        telegram: form.telegram,
      },
      locale,
      pagePath:
        typeof window !== 'undefined' ? window.location.pathname : undefined,
      dayMode: isBusinessHours(),
    };

    try {
      // Client stub also logs for local debugging
      console.info('[lead] submit', payload);

      const res = await fetch(siteConfig.leadApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setStatus('success');
    } catch (err) {
      console.error('[lead] submit failed', err);
      setStatus('error');
      setNetworkError(copy.errorNetwork);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-xl border border-hairline bg-surface-raised shadow-2xl sm:rounded-xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-hairline bg-surface-raised/95 px-5 py-4 backdrop-blur">
          <h2 id={titleId} className="font-display text-xl text-text-primary">
            {status === 'success' ? copy.successTitle : copy.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded px-2 py-1 text-sm text-text-tertiary hover:text-text-primary"
          >
            {copy.close}
          </button>
        </div>

        <div className="px-5 py-5">
          {status === 'success' ? (
            <div className="motion-fade-up space-y-4">
              <p className="text-base leading-relaxed text-text-primary">
                {dayMode ? copy.thankyouDay : copy.thankyouNight}
              </p>
              <p className="text-sm text-text-secondary">
                {siteConfig.hours.label[locale]} · {siteConfig.phoneDisplay}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="rounded bg-primary-container px-4 py-2.5 text-label-caps text-on-primary-container"
              >
                {copy.close}
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={onSubmit} noValidate>
              <p className="text-sm text-text-secondary">
                {dayMode ? copy.noticeDay : copy.noticeNight}
              </p>

              <div className="space-y-3">
                <label className="block">
                  <span className="mb-1.5 block text-xs text-text-tertiary">
                    {copy.name} *
                  </span>
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full rounded border border-white/20 bg-[#0e1117] px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-container focus:shadow-[0_0_0_2px_rgba(197,160,89,0.2)]"
                    autoComplete="name"
                    required
                  />
                  {errors.name ? (
                    <span className="mt-1 block text-xs text-error">
                      {errors.name}
                    </span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs text-text-tertiary">
                    {copy.phone} *
                  </span>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className="w-full rounded border border-white/20 bg-[#0e1117] px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary-container focus:shadow-[0_0_0_2px_rgba(197,160,89,0.2)]"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+7"
                    required
                  />
                  {errors.phone ? (
                    <span className="mt-1 block text-xs text-error">
                      {errors.phone}
                    </span>
                  ) : null}
                </label>

                <label className="flex items-start gap-3 text-sm text-text-secondary">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, consent: e.target.checked }))
                    }
                    className="lux-checkbox mt-0.5"
                  />
                  <span>
                    {copy.consent}{' '}
                    <Link
                      href={localizePath(locale, 'privacy')}
                      className="text-accent-champagne-bright underline-offset-2 hover:underline"
                      onClick={onClose}
                    >
                      {copy.privacy}
                    </Link>
                  </span>
                </label>
                {errors.consent ? (
                  <span className="block text-xs text-error">
                    {errors.consent}
                  </span>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-lead-glow w-full rounded bg-primary-container px-4 py-3 text-label-caps text-on-primary-container disabled:opacity-60"
              >
                {status === 'submitting' ? copy.submitting : copy.submit}
              </button>

              {networkError ? (
                <p className="text-sm text-error">{networkError}</p>
              ) : null}

              <details className="rounded border border-hairline bg-surface-container-low/60 p-3">
                <summary className="cursor-pointer text-sm text-text-secondary">
                  {copy.optional}
                  <span className="ml-2 text-xs text-text-tertiary">
                    {copy.optionalHint}
                  </span>
                </summary>
                <div className="mt-4 space-y-3">
                  <label className="block">
                    <span className="mb-1.5 block text-xs text-text-tertiary">
                      {copy.city}
                    </span>
                    <input
                      value={form.city}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, city: e.target.value }))
                      }
                      className="w-full rounded border border-white/20 bg-[#0e1117] px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary-container"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs text-text-tertiary">
                      {copy.time}
                    </span>
                    <input
                      value={form.time}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, time: e.target.value }))
                      }
                      className="w-full rounded border border-white/20 bg-[#0e1117] px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary-container"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs text-text-tertiary">
                      {copy.appliance}
                    </span>
                    <select
                      value={form.appliance}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          appliance: e.target.value as ApplianceSlug | '',
                        }))
                      }
                      className={`lux-select ${form.appliance ? '' : 'lux-select--empty'}`}
                    >
                      <option value="">{copy.applianceEmpty}</option>
                      {appliances.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.label[locale]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs text-text-tertiary">
                      {copy.problem}
                    </span>
                    <textarea
                      value={form.problem}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, problem: e.target.value }))
                      }
                      rows={3}
                      className="w-full resize-y rounded border border-white/20 bg-[#0e1117] px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary-container"
                    />
                  </label>
                  <fieldset>
                    <legend className="mb-2 text-xs text-text-tertiary">
                      {copy.channels}
                    </legend>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm text-text-secondary">
                        <input
                          type="checkbox"
                          checked={form.whatsapp}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              whatsapp: e.target.checked,
                            }))
                          }
                          className="lux-checkbox"
                        />
                        {copy.whatsapp}
                      </label>
                      <label className="inline-flex items-center gap-2 text-sm text-text-secondary">
                        <input
                          type="checkbox"
                          checked={form.telegram}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              telegram: e.target.checked,
                            }))
                          }
                          className="lux-checkbox"
                        />
                        {copy.telegram}
                      </label>
                    </div>
                  </fieldset>
                </div>
              </details>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
