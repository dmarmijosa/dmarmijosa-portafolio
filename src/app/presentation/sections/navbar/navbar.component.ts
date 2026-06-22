import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { GetProfileUseCase } from '../../../core/application/use-cases/get-profile.use-case';

interface NavLink {
  readonly id: string;
  readonly label: string;
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
        aria-label="Navegación principal"
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
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <a
          [href]="profile.linkedin"
          target="_blank"
          rel="noopener"
          class="rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform hover:scale-105"
        >
          Contáctame
        </a>
      </nav>
    </header>
  `,
})
export class NavbarComponent {
  protected readonly profile = inject(GetProfileUseCase).profile();
  protected readonly scrolled = signal(false);

  protected readonly links: readonly NavLink[] = [
    { id: 'about', label: 'Sobre mí' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'apps', label: 'Apps' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'certs', label: 'Certificaciones' },
    { id: 'contact', label: 'Contacto' },
  ];

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }
}
