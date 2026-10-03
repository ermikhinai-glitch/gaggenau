import { siteConfig } from '../config/site';

/** Business hours check in Europe/Moscow (R8–R9). */
export function isBusinessHours(date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: siteConfig.hours.timeZone,
    hour: 'numeric',
    hour12: false,
  }).formatToParts(date);
  const hourPart = parts.find((p) => p.type === 'hour');
  const hour = Number(hourPart?.value ?? '0');
  // 8:00 inclusive … 22:00 exclusive
  return hour >= siteConfig.hours.startHour && hour < siteConfig.hours.endHour;
}
