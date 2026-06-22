import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EDUCATION, EXPERIENCES } from '../data/portfolio.data';
import { RevealDirective } from '../directives/reveal.directive';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, IconComponent],
  template: `
    <section id="experience" class="relative mx-auto max-w-6xl px-6 py-24">
      <div class="mb-14 text-center" appReveal>
        <p class="font-mono text-sm font-medium text-accent-400">// trayectoria</p>
        <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Experiencia <span class="text-gradient">profesional</span>
        </h2>
      </div>

      <div class="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <!-- Timeline -->
        <ol class="relative border-l border-white/10 pl-8">
          @for (exp of experiences; track exp.company; let i = $index) {
            <li class="relative mb-10 last:mb-0" appReveal [delay]="i * 80">
              <span
                class="absolute -left-[2.6rem] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-ink-950"
                [class]="exp.current ? 'bg-gradient-to-br from-brand-500 to-accent-500' : 'bg-ink-700'"
              >
                <app-icon name="briefcase" [size]="13" />
              </span>
              <div class="rounded-2xl glass p-5">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="font-display text-lg font-bold text-white">{{ exp.role }}</h3>
                  @if (exp.current) {
                    <span class="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-semibold text-emerald-300">Actual</span>
                  }
                </div>
                <p class="text-sm font-medium text-brand-300">{{ exp.company }}</p>
                <p class="mt-0.5 text-xs text-slate-500">{{ exp.period }} · {{ exp.location }}</p>
                <ul class="mt-3 space-y-1.5">
                  @for (h of exp.highlights; track h) {
                    <li class="flex gap-2 text-sm text-slate-400">
                      <span class="mt-0.5 shrink-0 text-accent-400"><app-icon name="check" [size]="15" /></span>
                      <span>{{ h }}</span>
                    </li>
                  }
                </ul>
              </div>
            </li>
          }
        </ol>

        <!-- Education -->
        <div appReveal [delay]="120">
          <h3 class="mb-4 font-display text-lg font-bold text-white">Educación</h3>
          <div class="space-y-4">
            @for (edu of education; track edu.institution) {
              <article class="rounded-2xl glass border-glow p-5">
                <p class="font-semibold text-white">{{ edu.institution }}</p>
                <p class="mt-1 text-sm text-slate-300">{{ edu.title }}</p>
                <p class="mt-1 text-xs text-slate-500">{{ edu.period }}</p>
              </article>
            }
          </div>

          <div class="mt-6 rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent-500/10 p-5 ring-1 ring-brand-500/20">
            <p class="font-display text-3xl font-bold text-white">40</p>
            <p class="mt-1 text-sm text-slate-300">certificaciones obtenidas entre 2016 y 2026 — formación continua en Angular, NestJS, IA y arquitectura.</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  protected readonly experiences = EXPERIENCES;
  protected readonly education = EDUCATION;
}
