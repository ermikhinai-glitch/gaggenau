import { NextResponse } from 'next/server';

type LeadBody = {
  name?: string;
  phone?: string;
  consent?: boolean;
  city?: string;
  preferredTime?: string;
  appliance?: string;
  problem?: string;
  channels?: { whatsapp?: boolean; telegram?: boolean };
  locale?: string;
  pagePath?: string;
  dayMode?: boolean;
};

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

/**
 * Lead intake stub.
 *
 * TODO: send notifications to Telegram bot + email (operator channels)
 * using server-side secrets from env (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
 * SMTP_*). Do not hardcode secrets in the repo.
 */
export async function POST(request: Request) {
  let body: LeadBody;

  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';
  const consent = Boolean(body.consent);

  if (!name || !phone || !consent || !isValidPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: 'validation_failed' },
      { status: 400 },
    );
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    name,
    phone,
    consent,
    city: body.city?.trim() || null,
    preferredTime: body.preferredTime?.trim() || null,
    appliance: body.appliance || null,
    problem: body.problem?.trim() || null,
    channels: {
      whatsapp: Boolean(body.channels?.whatsapp),
      telegram: Boolean(body.channels?.telegram),
    },
    locale: body.locale ?? 'ru',
    pagePath: body.pagePath ?? null,
    dayMode: Boolean(body.dayMode),
  };

  // Stub: log only. Replace with TG/email delivery before production.
  console.info('[api/lead] new request', lead);

  return NextResponse.json({ ok: true });
}
