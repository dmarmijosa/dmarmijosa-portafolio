import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { GetProfileUseCase } from '../../../core/application/use-cases/get-profile.use-case';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TiltDirective, IconComponent],
  host: {
    '(pointermove)': 'onPointer($event)',
  },
  template: `
    <section
      id="top"
      class="scene-3d relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <!-- Animated gradient mesh background (parallax) -->
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div
          class="absolute -left-20 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-600/30 blur-3xl animate-float-slow"
          [style.transform]="bgShift(2)"
        ></div>
        <div
          class="absolute right-0 top-1/4 h-[24rem] w-[24rem] rounded-full bg-accent-500/20 blur-3xl animate-float-rev"
          [style.transform]="bgShift(-3)"
        ></div>
        <div
          class="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/20 blur-3xl animate-float-slow"
          [style.transform]="bgShift(1.5)"
        ></div>
        <!-- grid overlay -->
        <div
          class="absolute inset-0 opacity-[0.06]"
          style="background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:54px 54px;"
        ></div>
      </div>

      <div class="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <!-- Left: copy -->
        <div>
          <span
            class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300"
          >
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            {{ profile.availability }}
          </span>

          <h1 class="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hola, soy<br />
            <span class="text-gradient animate-gradient">{{ profile.name }}</span>
          </h1>

          <p class="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
            {{ profile.headline }}
          </p>

          <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <span class="inline-flex items-center gap-1.5">
              <app-icon name="map-pin" [size]="16" /> {{ profile.location }}
            </span>
            <span class="inline-flex items-center gap-1.5">
              <app-icon name="globe" [size]="16" /> {{ profile.modality }}
            </span>
          </div>

          <div class="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              class="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 font-semibold text-white shadow-xl shadow-brand-500/30 transition-transform hover:scale-105"
            >
              Ver proyectos
              <app-icon name="arrow-down" [size]="18" />
            </a>
            <a
              [href]="profile.github"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <app-icon name="github" [size]="18" /> GitHub
            </a>
          </div>

          <!-- Stats -->
          <dl class="mt-12 grid max-w-md grid-cols-4 gap-4">
            @for (stat of stats; track stat.label) {
              <div class="text-center">
                <dt class="font-display text-2xl font-bold text-white sm:text-3xl">{{ stat.value }}</dt>
                <dd class="mt-1 text-xs leading-tight text-slate-400">{{ stat.label }}</dd>
              </div>
            }
          </dl>
        </div>

        <!-- Right: 3D card -->
        <div class="scene-3d hidden justify-center lg:flex">
          <div
            appTilt
            [maxTilt]="14"
            class="relative w-full max-w-sm rounded-3xl glass-strong border-glow p-7 shadow-2xl shadow-brand-900/50"
          >
            <div class="layer-pop">
              <div class="flex items-center gap-4">
                <div
                  class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 font-display text-2xl font-bold text-white shadow-lg"
                >
                  DA
                </div>
                <div>
                  <p class="font-display text-lg font-bold text-white">{{ profile.name }}</p>
                  <p class="text-sm text-brand-300">Full Stack Developer</p>
                </div>
              </div>

              <div class="mt-6 space-y-3 font-mono text-sm">
                <p class="text-slate-400"><span class="text-fuchsia-400">const</span>&nbsp;<span class="text-accent-300">stack</span>&nbsp;= {{ '{' }}</p>
                <p class="pl-4 text-slate-300">front: <span class="text-emerald-300">'Angular React'</span>,</p>
                <p class="pl-4 text-slate-300">back: <span class="text-emerald-300">'NestJS Spring'</span>,</p>
                <p class="pl-4 text-slate-300">mobile: <span class="text-emerald-300">'Flutter · Ionic'</span>,</p>
                <p class="pl-4 text-slate-300">cloud: <span class="text-emerald-300">'AWS · GCP'</span>,</p>
                <p class="text-slate-400">{{ '}' }};</p>
              </div>
            </div>

            <!-- Floating 3D badges -->
            <div
              class="absolute -right-6 -top-6 flex h-16 w-16 items-center justify-center rounded-2xl glass text-2xl shadow-xl animate-bob"
              style="transform: translateZ(60px);"
              aria-hidden="true"
            >⚡</div>
            <div
              class="absolute -bottom-5 -left-5 flex h-14 w-14 items-center justify-center rounded-2xl glass text-xl shadow-xl animate-bob"
              style="transform: translateZ(50px); animation-delay: 1s;"
              aria-hidden="true"
            >🚀</div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  private readonly getProfile = inject(GetProfileUseCase);
  protected readonly profile = this.getProfile.profile();
  protected readonly stats = this.getProfile.stats();

  /** Normalized pointer offset from screen center, range roughly [-0.5, 0.5]. */
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

  /** Parallax translate for background blobs; depth controls intensity. */
  protected bgShift(depth: number): string {
    const x = this.px() * depth * 26;
    const y = this.py() * depth * 26;
    return `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }
}
