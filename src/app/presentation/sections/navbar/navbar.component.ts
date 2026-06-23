import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { GetProfileUseCase } from '../../../core/application/use-cases/get-profile.use-case';
import { LocaleService } from '../../shared/i18n/locale.service';

interface NavLink {
  readonly id: string;
  readonly key: string;
}

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
  },
  template: `
    <header
      class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      [class.py-2]="scrolled()"
      [class.py-4]="!scrolled()"
    >
      <nav
        class="mx-4 flex items-center justify-between rounded-2xl px-5 transition-all duration-300"
        [class.glass-strong]="scrolled()"
        [class.py-3]="scrolled()"
        [class.py-2]="!scrolled()"
        aria-label="Danny Armijos"
      >
        <a href="#top" class="font-display text-lg font-bold tracking-tight text-white">
          <span class="text-gradient">DA</span><span class="text-brand-400">.</span>
        </a>

        <ul class="hidden items-center gap-1 lg:flex">
          @for (link of links; track link.id) {
            <li>
              <a
                [href]="'#' + link.id"
                class="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {{ loc.t(link.key) }}
              </a>
            </li>
          }
        </ul>

        <div class="flex items-center gap-2">
          <button
            type="button"
            (click)="loc.toggle()"
            class="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10"
            [attr.aria-label]="loc.t('lang.label')"
          >
            <span aria-hidden="true">🌐</span> {{ loc.t('lang.toggle') }}
          </button>
          <a
            [href]="profile().linkedin"
            target="_blank"
            rel="noopener"
            class="hidden rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform hover:scale-105 sm:inline-block"
          >
            {{ loc.t('nav.cta') }}
          </a>
        </div>
      </nav>
    </header>
  `,
})
export class NavbarComponent {
  protected readonly loc = inject(LocaleService);
  private readonly getProfile = inject(GetProfileUseCase);
  protected readonly profile = computed(() => this.getProfile.profile(this.loc.locale()));
  protected readonly scrolled = signal(false);

  protected readonly links: readonly NavLink[] = [
    { id: 'about', key: 'nav.about' },
    { id: 'skills', key: 'nav.skills' },
    { id: 'projects', key: 'nav.projects' },
    { id: 'apps', key: 'nav.apps' },
    { id: 'experience', key: 'nav.experience' },
    { id: 'certs', key: 'nav.certs' },
    { id: 'contact', key: 'nav.contact' },
  ];

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }
}
