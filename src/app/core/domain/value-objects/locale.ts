/** Supported UI/content locales. Spanish is the default. */
export type Locale = 'es' | 'en';

export const SUPPORTED_LOCALES: readonly Locale[] = ['es', 'en'];
export const DEFAULT_LOCALE: Locale = 'es';

/** Narrows any BCP-47 tag (e.g. "en-US") to a supported locale. */
export function resolveLocale(tag: string | null | undefined): Locale {
  if (!tag) return DEFAULT_LOCALE;
  return tag.toLowerCase().startsWith('en') ? 'en' : 'es';
}
