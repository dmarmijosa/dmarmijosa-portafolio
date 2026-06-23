import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GetProfileUseCase } from '../../../core/application/use-cases/get-profile.use-case';
import { GetCredentialsUseCase } from '../../../core/application/use-cases/get-credentials.use-case';
import { LocaleService } from '../../shared/i18n/locale.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RevealDirective, TiltDirective, IconComponent],
  template: `
    <section id="about" class="relative mx-auto max-w-6xl px-6 py-24">
      <div class="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <!-- Portrait -->
        <div class="scene-3d flex justify-center lg:justify-start" appReveal>
          <figure
            appTilt
            [maxTilt]="9"
            class="relative w-full max-w-xs rounded-3xl glass-strong border-glow p-3 shadow-2xl shadow-brand-900/50"
          >
            <img
              [ngSrc]="profile().photoUrl"
              width="360"
              height="360"
              [alt]="'Foto de ' + profile().name"
              class="aspect-square w-full rounded-2xl object-cover"
            />
            <figcaption
              class="layer-pop absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-xl glass-strong px-4 py-2 text-sm font-semibold text-white shadow-xl"
              style="transform: translateX(-50%) translateZ(50px);"
            >
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              {{ profile().name }}
            </figcaption>
          </figure>
        </div>

        <!-- Copy + recommendations -->
        <div>
          <div appReveal>
            <p class="font-mono text-sm font-medium text-accent-400">{{ loc.t('about.eyebrow') }}</p>
            <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {{ loc.t('about.titleLead') }} <span class="text-gradient">{{ loc.t('about.titleAccent') }}</span>
            </h2>
            <p class="mt-6 text-lg leading-relaxed text-slate-300">{{ profile().summary }}</p>
            <p class="mt-4 text-base leading-relaxed text-slate-400">{{ loc.t('about.extra') }}</p>
          </div>

          <div class="scene-3d mt-8 space-y-4" appReveal [delay]="120">
            <p class="flex items-center gap-2 text-sm font-medium text-slate-400">
              <app-icon name="quote" [size]="18" /> {{ loc.t('about.recommendations') }}
            </p>
            @for (rec of recommendations(); track $index) {
              <article appTilt [maxTilt]="6" class="rounded-2xl glass border-glow p-5">
                <p class="text-sm leading-relaxed text-slate-200">“{{ rec.text }}”</p>
                <footer class="mt-3">
                  <p class="text-sm font-semibold text-white">{{ rec.author }}</p>
                  <p class="text-xs text-brand-300">{{ rec.role }}</p>
                </footer>
              </article>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly loc = inject(LocaleService);
  private readonly getProfile = inject(GetProfileUseCase);
  private readonly getCredentials = inject(GetCredentialsUseCase);

  protected readonly profile = computed(() => this.getProfile.profile(this.loc.locale()));
  protected readonly recommendations = computed(() =>
    this.getCredentials.recommendations(this.loc.locale()),
  );
}
