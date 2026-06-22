import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GetSkillsUseCase } from '../../../core/application/use-cases/get-skills.use-case';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { IconComponent } from '../../shared/components/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TiltDirective, IconComponent, SectionHeadingComponent],
  template: `
    <section id="skills" class="relative overflow-hidden py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mb-14">
          <app-section-heading eyebrow="// stack tecnológico" titleLead="Tecnologías que" titleAccent="domino" />
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
                    <li class="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
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
  protected readonly groups = inject(GetSkillsUseCase).execute();
  protected readonly marquee = [
    'Angular', '•', 'NestJS', '•', 'TypeScript', '•', 'Flutter', '•', 'RxJS',
    '•', 'Signals', '•', 'Node.js', '•', 'PostgreSQL', '•', 'MongoDB', '•',
    'Docker', '•', 'AWS', '•', 'Tailwind', '•', 'Clean Architecture', '•',
  ];
}
