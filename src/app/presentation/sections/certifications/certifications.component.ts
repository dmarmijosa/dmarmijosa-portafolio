import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GetCredentialsUseCase } from '../../../core/application/use-cases/get-credentials.use-case';
import { LocaleService } from '../../shared/i18n/locale.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { IconComponent } from '../../shared/components/icon.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading.component';

@Component({
  selector: 'app-certifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TiltDirective, IconComponent, SectionHeadingComponent],
  template: `
    <section id="certs" class="relative mx-auto max-w-6xl px-6 py-24">
      <div class="mb-14">
        <app-section-heading
          [eyebrow]="loc.t('certs.eyebrow')"
          [titleLead]="loc.t('certs.titleLead')"
          [titleAccent]="loc.t('certs.titleAccent')"
          [subtitle]="loc.t('certs.subtitle')"
        />
      </div>

      <div class="scene-3d grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        @for (cert of certifications(); track $index; let i = $index) {
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
  protected readonly loc = inject(LocaleService);
  private readonly getCredentials = inject(GetCredentialsUseCase);
  protected readonly certifications = computed(() =>
    this.getCredentials.certifications(this.loc.locale()),
  );
}
