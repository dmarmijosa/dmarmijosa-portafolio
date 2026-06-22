import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CERTIFICATIONS } from '../data/portfolio.data';
import { RevealDirective } from '../directives/reveal.directive';
import { TiltDirective } from '../directives/tilt.directive';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-certifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TiltDirective, IconComponent],
  template: `
    <section id="certs" class="relative mx-auto max-w-6xl px-6 py-24">
      <div class="mb-14 text-center" appReveal>
        <p class="font-mono text-sm font-medium text-accent-400">// aprendizaje continuo</p>
        <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Certificaciones <span class="text-gradient">destacadas</span>
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-slate-400">
          Una muestra de las más relevantes de un total de 40 — incluyendo la certificación oficial de NestJS.
        </p>
      </div>

      <div class="scene-3d grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        @for (cert of certifications; track cert.name; let i = $index) {
          <article
            appReveal
            [delay]="(i % 3) * 70"
            appTilt
            [maxTilt]="7"
            class="flex items-start gap-3 rounded-2xl glass p-4"
            [class.border-glow]="cert.key"
          >
            <span
              class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              [class]="cert.key ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : 'bg-white/5 text-brand-300'"
            >
              <app-icon [name]="cert.key ? 'star' : 'check'" [size]="17" />
            </span>
            <div class="min-w-0">
              <p class="text-sm font-semibold leading-snug text-white">{{ cert.name }}</p>
              <p class="mt-0.5 text-xs text-slate-400">{{ cert.issuer }} · {{ cert.date }}</p>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class CertificationsComponent {
  protected readonly certifications = CERTIFICATIONS;
}
