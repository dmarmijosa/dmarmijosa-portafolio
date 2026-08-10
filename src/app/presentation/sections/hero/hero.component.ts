import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GetProfileUseCase } from '../../../core/application/use-cases/get-profile.use-case';
import { LocaleService } from '../../shared/i18n/locale.service';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, TiltDirective, IconComponent],
  host: {
    '(pointermove)': 'onPointer($event)',
  },
  template: `
    <section
      id="top"
      class="scene-3d relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div class="pointer-events-none absolute inset-0 -z-10">
        <img
          ngSrc="portfolio-sage-hero-art.png"
          fill
          sizes="100vw"
          alt=""
          aria-hidden="true"
          class="absolute inset-0 h-full w-full object-cover opacity-[0.22] mix-blend-screen"
          priority
        />
        <div class="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/55 to-ink-950/92"></div>
        <div
          class="absolute -left-20 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-500/25 blur-3xl animate-float-slow"
          [style.transform]="bgShift(2)"
        ></div>
        <div
          class="absolute right-0 top-1/4 h-[24rem] w-[24rem] rounded-full bg-accent-400/15 blur-3xl animate-float-rev"
          [style.transform]="bgShift(-3)"
        ></div>
        <div
          class="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-brand-600/18 blur-3xl animate-float-slow"
          [style.transform]="bgShift(1.5)"
        ></div>
        <div
          class="absolute inset-0 opacity-[0.05]"
          style="background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:54px 54px;"
        ></div>
      </div>

      <div class="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <span
            class="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-400/10 px-4 py-1.5 text-sm font-medium text-accent-400"
          >
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-brand-500"></span>
            </span>
            {{ profile().availability }}
          </span>

          <p class="eyebrow-label mt-8">{{ loc.t('hero.eyebrow') }}</p>

          <h1 class="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] tracking-wide text-paper sm:text-6xl lg:text-7xl">
            {{ loc.t('hero.greeting') }}<br />
            <span class="text-gradient animate-gradient">{{ profile().name }}</span>
          </h1>

          <p class="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
            {{ profile().headline }}
          </p>

          <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-widest text-slate-400">
            <span class="inline-flex items-center gap-1.5">
              <app-icon name="map-pin" [size]="16" /> {{ profile().location }}
            </span>
            <span class="inline-flex items-center gap-1.5">
              <app-icon name="globe" [size]="16" /> {{ profile().modality }}
            </span>
          </div>

          <div class="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              class="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 font-semibold shadow-xl shadow-brand-500/30 transition-transform hover:scale-105"
            >
              {{ loc.t('hero.viewProjects') }}
              <app-icon name="arrow-down" [size]="18" />
            </a>
            <a
              [href]="profile().github"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-paper transition-colors hover:bg-white/10"
            >
              <app-icon name="github" [size]="18" /> GitHub
            </a>
          </div>

          <dl class="mt-12 grid max-w-md grid-cols-4 gap-4">
            @for (stat of stats(); track $index) {
              <div class="text-center">
                <dt class="font-display text-2xl font-bold text-paper sm:text-3xl">{{ stat.value }}</dt>
                <dd class="mt-1 font-mono text-[10px] uppercase leading-tight tracking-wider text-slate-400">{{ stat.label }}</dd>
              </div>
            }
          </dl>
        </div>

        <div class="scene-3d hidden justify-center lg:flex">
          <div
            appTilt
            [maxTilt]="14"
            class="relative w-full max-w-sm rounded-3xl glass-strong border-glow p-7 shadow-2xl shadow-brand-900/50"
          >
            <div class="layer-pop">
              <div class="flex items-center gap-4">
                <img
                  [ngSrc]="profile().photoUrl"
                  width="64"
                  height="64"
                  [alt]="profile().name"
                  class="h-16 w-16 rounded-2xl object-cover shadow-lg ring-2 ring-brand-400/40"
                  priority
                />
                <div>
                  <p class="font-display text-lg font-bold uppercase tracking-wide text-paper">{{ profile().name }}</p>
                  <p class="font-mono text-xs uppercase tracking-widest text-brand-300">{{ loc.t('hero.cardRole') }}</p>
                </div>
              </div>

              <div class="mt-6 space-y-3 font-mono text-sm">
                <p class="text-slate-400"><span class="text-accent-400">const</span>&nbsp;<span class="text-brand-300">stack</span>&nbsp;= {{ '{' }}</p>
                <p class="pl-4 text-slate-300">front: <span class="text-brand-400">'Angular React'</span>,</p>
                <p class="pl-4 text-slate-300">back: <span class="text-brand-400">'NestJS Spring'</span>,</p>
                <p class="pl-4 text-slate-300">mobile: <span class="text-brand-400">'Flutter · Ionic'</span>,</p>
                <p class="pl-4 text-slate-300">cloud: <span class="text-brand-400">'AWS · GCP'</span>,</p>
                <p class="text-slate-400">{{ '}' }};</p>
              </div>
            </div>

            <div
              class="absolute -right-6 -top-6 flex h-16 w-16 items-center justify-center rounded-2xl glass text-brand-400 shadow-xl animate-bob"
              style="transform: translateZ(60px);"
              aria-hidden="true"
            >
              <app-icon name="sparkles" [size]="28" />
            </div>
            <div
              class="absolute -bottom-5 -left-5 flex h-14 w-14 items-center justify-center rounded-2xl glass text-accent-400 shadow-xl animate-bob"
              style="transform: translateZ(50px); animation-delay: 1s;"
              aria-hidden="true"
            >
              <app-icon name="cloud" [size]="24" />
            </div>
          </div>
        </div>
      </div>

      <div class="pointer-events-none absolute bottom-16 right-8 hidden text-right font-mono text-[10px] uppercase tracking-[0.4em] text-slate-400 lg:block" aria-hidden="true">
        scroll
        <span class="mx-auto mt-2 block h-11 w-px bg-gradient-to-b from-accent-400 to-transparent animate-drip"></span>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly loc = inject(LocaleService);
  private readonly getProfile = inject(GetProfileUseCase);
  protected readonly profile = computed(() => this.getProfile.profile(this.loc.locale()));
  protected readonly stats = computed(() => this.getProfile.stats(this.loc.locale()));

  private readonly px = signal(0);
  private readonly py = signal(0);

  protected onPointer(event: PointerEvent): void {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    this.px.set(event.clientX / window.innerWidth - 0.5);
    this.py.set(event.clientY / window.innerHeight - 0.5);
  }

  protected bgShift(depth: number): string {
    const x = this.px() * depth * 26;
    const y = this.py() * depth * 26;
    return `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }
}
