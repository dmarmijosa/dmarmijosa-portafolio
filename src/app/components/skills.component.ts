import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILL_GROUPS } from '../data/portfolio.data';
import { RevealDirective } from '../directives/reveal.directive';
import { TiltDirective } from '../directives/tilt.directive';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TiltDirective, IconComponent],
  template: `
    <section id="skills" class="relative overflow-hidden py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mb-14 text-center" appReveal>
          <p class="font-mono text-sm font-medium text-accent-400">// stack tecnológico</p>
          <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Tecnologías que <span class="text-gradient">domino</span>
          </h2>
        </div>

        <div class="scene-3d grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (group of groups; track group.title; let i = $index) {
            <article
              appReveal
              [delay]="i * 70"
              appTilt
              [maxTilt]="9"
              class="group rounded-2xl glass border-glow p-6 transition-shadow hover:shadow-2xl hover:shadow-brand-500/20"
            >
              <div class="layer-pop">
                <div
                  class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/80 to-accent-500/80 text-white shadow-lg"
                >
                  <app-icon [name]="group.icon" [size]="24" />
                </div>
                <h3 class="font-display text-lg font-bold text-white">{{ group.title }}</h3>
                <ul class="mt-4 flex flex-wrap gap-2">
                  @for (skill of group.skills; track skill) {
                    <li
                      class="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
                    >
                      {{ skill }}
                    </li>
                  }
                </ul>
              </div>
            </article>
          }
        </div>
      </div>

      <!-- Infinite tech marquee -->
      <div class="relative mt-16 flex select-none overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div class="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          @for (item of marquee; track $index) {
            <span class="font-display text-xl font-semibold text-slate-600">{{ item }}</span>
          }
        </div>
        <div class="flex shrink-0 animate-marquee items-center gap-8 pr-8" aria-hidden="true">
          @for (item of marquee; track $index) {
            <span class="font-display text-xl font-semibold text-slate-600">{{ item }}</span>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  protected readonly groups = SKILL_GROUPS;
  protected readonly marquee = [
    'Angular', '•', 'NestJS', '•', 'TypeScript', '•', 'React Native', '•', 'RxJS',
    '•', 'Signals', '•', 'Node.js', '•', 'PostgreSQL', '•', 'MongoDB', '•',
    'Docker', '•', 'AWS', '•', 'Tailwind', '•', 'LangChain', '•',
  ];
}
