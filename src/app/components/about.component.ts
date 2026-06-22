import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE, RECOMMENDATIONS } from '../data/portfolio.data';
import { RevealDirective } from '../directives/reveal.directive';
import { TiltDirective } from '../directives/tilt.directive';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TiltDirective, IconComponent],
  template: `
    <section id="about" class="relative mx-auto max-w-6xl px-6 py-24">
      <div class="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div appReveal>
          <p class="font-mono text-sm font-medium text-accent-400">// sobre mí</p>
          <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ingeniero de software, <span class="text-gradient">apasionado por el detalle</span>
          </h2>
          <p class="mt-6 text-lg leading-relaxed text-slate-300">
            {{ profile.summary }}
          </p>
          <p class="mt-4 text-base leading-relaxed text-slate-400">
            Más allá del código, valoro el equilibrio vida-trabajo y disfruto del diseño gráfico,
            la naturaleza, la familia y la música. 40 certificaciones entre 2016 y 2026 reflejan
            mi compromiso con la mejora continua.
          </p>
        </div>

        <div class="scene-3d space-y-4" appReveal [delay]="120">
          <p class="flex items-center gap-2 text-sm font-medium text-slate-400">
            <app-icon name="quote" [size]="18" /> Lo que dicen de mí
          </p>
          @for (rec of recommendations; track rec.author) {
            <article
              appTilt
              [maxTilt]="6"
              class="rounded-2xl glass border-glow p-5"
            >
              <p class="text-sm leading-relaxed text-slate-200">“{{ rec.text }}”</p>
              <footer class="mt-3">
                <p class="text-sm font-semibold text-white">{{ rec.author }}</p>
                <p class="text-xs text-brand-300">{{ rec.role }}</p>
              </footer>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly profile = PROFILE;
  protected readonly recommendations = RECOMMENDATIONS;
}
