import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  DEFAULT_LOCALE,
  Locale,
  resolveLocale,
} from '../../../core/domain/value-objects/locale';
import { UI_TRANSLATIONS } from './ui.translations';

const STORAGE_KEY = 'portfolio.locale';

/**
 * Holds the active UI/content locale as a signal. Initializes from a stored
 * preference, falling back to the browser language (`navigator.language`).
 * Persists changes and keeps <html lang> in sync.
 */
@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly locale = signal<Locale>(this.detectInitialLocale());

  constructor() {
    effect(() => {
      const current = this.locale();
      if (!isPlatformBrowser(this.platformId)) return;
      try {
        localStorage.setItem(STORAGE_KEY, current);
      } catch {
        /* storage may be unavailable (private mode) */
      }
      document.documentElement.lang = current;
    });
  }

  /** Translate a UI key for the active locale, with optional interpolation. */
  t(key: string, params?: Record<string, string>): string {
    const dict = UI_TRANSLATIONS[this.locale()];
    let value = dict[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replace(`{${k}}`, v);
      }
    }
    return value;
  }

  setLocale(locale: Locale): void {
    this.locale.set(locale);
  }

  toggle(): void {
    this.locale.update((l) => (l === 'es' ? 'en' : 'es'));
  }

  private detectInitialLocale(): Locale {
    if (!isPlatformBrowser(this.platformId)) return DEFAULT_LOCALE;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === 'es' || stored === 'en') return stored;
    } catch {
      /* ignore */
    }
    return resolveLocale(navigator.language);
  }
}
