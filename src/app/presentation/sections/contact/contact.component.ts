import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GetProfileUseCase } from '../../../core/application/use-cases/get-profile.use-case';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, IconComponent],
  template: `
    <section id="contact" class="relative mx-auto max-w-5xl px-6 py-24">
      <div
        class="relative overflow-hidden rounded-3xl glass-strong border-glow px-8 py-16 text-center"
        appReveal
      >
        <!-- glow -->
        <div class="pointer-events-none absolute inset-0 -z-10">
          <div class="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl animate-pulse-glow"></div>
        </div>

        <p class="font-mono text-sm font-medium text-accent-400">// hablemos</p>
        <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          ¿Construimos algo <span class="text-gradient">juntos</span>?
        </h2>
        <p class="mx-auto mt-5 max-w-xl text-lg text-slate-300">
          Estoy abierto a nuevas oportunidades como desarrollador front-end / full stack.
          Escríbeme y conversemos sobre tu proyecto.
        </p>

        <div class="mt-9 flex flex-wrap justify-center gap-4">
          <a
            [href]="'mailto:' + profile.email"
            class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 font-semibold text-white shadow-xl shadow-brand-500/30 transition-transform hover:scale-105"
          >
            <app-icon name="mail" [size]="18" /> {{ profile.email }}
          </a>
        </div>

        <div class="mt-8 flex justify-center gap-3">
          <a [href]="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white">
            <app-icon name="linkedin" [size]="20" />
          </a>
          <a [href]="profile.github" target="_blank" rel="noopener" aria-label="GitHub"
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white">
            <app-icon name="github" [size]="20" />
          </a>
          <a [href]="profile.website" target="_blank" rel="noopener" aria-label="Sitio web"
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white">
            <app-icon name="globe" [size]="20" />
          </a>
        </div>
      </div>

      <footer class="mt-16 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
        <p>© {{ year }} {{ profile.name }}. Diseñado y desarrollado con Angular & Tailwind CSS · Clean Architecture.</p>
        <p class="mt-1 inline-flex items-center gap-1.5">
          <app-icon name="map-pin" [size]="14" /> {{ profile.location }}
        </p>
      </footer>
    </section>
  `,
})
export class ContactComponent {
  protected readonly profile = inject(GetProfileUseCase).profile();
  protected readonly year = new Date().getFullYear();
}
