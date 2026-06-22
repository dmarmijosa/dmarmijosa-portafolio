import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GetMobileAppsUseCase } from '../../../core/application/use-cases/get-mobile-apps.use-case';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { IconComponent } from '../../shared/components/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-apps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    RevealDirective,
    TiltDirective,
    IconComponent,
    SectionHeadingComponent,
  ],
  template: `
    <section id="apps" class="relative overflow-hidden py-24">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mb-14">
          <app-section-heading
            eyebrow="// apps móviles"
            titleLead="En las"
            titleAccent="tiendas"
            subtitle="Aplicaciones publicadas en App Store y Google Play."
          />
        </div>

        @for (app of apps; track app.name) {
          <article
            appReveal
            class="scene-3d grid items-center gap-10 rounded-3xl glass-strong border-glow p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <!-- 3D phone mockup -->
            <div class="flex justify-center">
              <div
                appTilt
                [maxTilt]="12"
                class="relative h-[26rem] w-[13rem] rounded-[2.5rem] border border-white/10 bg-ink-900 p-3 shadow-2xl shadow-brand-900/60"
              >
                <!-- notch -->
                <div class="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black"></div>
                <!-- screen -->
                <div
                  class="layer-pop flex h-full w-full flex-col items-center justify-center gap-5 rounded-[2rem] bg-gradient-to-br p-6 text-center"
                  [class]="app.accent"
                >
                  <img
                    [ngSrc]="app.iconUrl"
                    width="112"
                    height="112"
                    [alt]="'Icono de ' + app.name"
                    class="h-28 w-28 rounded-3xl shadow-xl ring-1 ring-white/30"
                  />
                  <div>
                    <p class="font-display text-xl font-bold text-white drop-shadow">{{ app.name }}</p>
                    <p class="mt-1 text-sm text-white/85">{{ app.tagline }}</p>
                  </div>
                </div>
                <!-- floating badge -->
                <div
                  class="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-xl glass-strong px-3 py-2 text-xs font-semibold text-white shadow-xl animate-bob"
                  style="transform: translateX(-50%) translateZ(60px);"
                >
                  <app-icon name="star" [size]="14" /> {{ app.category }}
                </div>
              </div>
            </div>

            <!-- Details -->
            <div>
              <h3 class="font-display text-3xl font-bold text-white">{{ app.name }}</h3>
              <p class="mt-4 leading-relaxed text-slate-300">{{ app.description }}</p>

              <ul class="mt-6 grid gap-2.5 sm:grid-cols-2">
                @for (feature of app.features; track feature) {
                  <li class="flex items-start gap-2 text-sm text-slate-300">
                    <span class="mt-0.5 shrink-0 text-accent-400"><app-icon name="check" [size]="16" /></span>
                    <span>{{ feature }}</span>
                  </li>
                }
              </ul>

              <ul class="mt-6 flex flex-wrap gap-1.5">
                @for (tech of app.tech; track tech) {
                  <li class="rounded-md bg-brand-500/10 px-2 py-0.5 text-xs font-medium text-brand-300">{{ tech }}</li>
                }
              </ul>

              <!-- Store badges -->
              <div class="mt-8 flex flex-wrap gap-3">
                @if (app.appStoreUrl) {
                  <a
                    [href]="app.appStoreUrl"
                    target="_blank"
                    rel="noopener"
                    class="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-black px-5 py-2.5 text-white transition-transform hover:scale-105"
                    aria-label="Descargar en el App Store"
                  >
                    <app-icon name="apple" [size]="26" />
                    <span class="text-left leading-tight">
                      <span class="block text-[0.62rem] uppercase tracking-wide text-slate-400">Descárgalo en el</span>
                      <span class="block font-display text-base font-semibold">App Store</span>
                    </span>
                  </a>
                }
                @if (app.googlePlayUrl) {
                  <a
                    [href]="app.googlePlayUrl"
                    target="_blank"
                    rel="noopener"
                    class="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-black px-5 py-2.5 text-white transition-transform hover:scale-105"
                    aria-label="Disponible en Google Play"
                  >
                    <app-icon name="google-play" [size]="24" />
                    <span class="text-left leading-tight">
                      <span class="block text-[0.62rem] uppercase tracking-wide text-slate-400">Disponible en</span>
                      <span class="block font-display text-base font-semibold">Google Play</span>
                    </span>
                  </a>
                }
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class AppsComponent {
  protected readonly apps = inject(GetMobileAppsUseCase).execute();
}
