import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../directives/reveal.directive';

/**
 * Consistent section header: a mono eyebrow label, a two-tone title and an
 * optional subtitle. Centers by default; pass [center]="false" to left-align.
 */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <div appReveal [class.text-center]="center()" [class.mx-auto]="center()" [class.max-w-2xl]="center()">
      <p class="font-mono text-sm font-medium text-accent-400">{{ eyebrow() }}</p>
      <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {{ titleLead() }} <span class="text-gradient">{{ titleAccent() }}</span>
      </h2>
      @if (subtitle()) {
        <p class="mt-4 text-slate-400" [class.mx-auto]="center()">{{ subtitle() }}</p>
      }
    </div>
  `,
})
export class SectionHeadingComponent {
  readonly eyebrow = input.required<string>();
  readonly titleLead = input.required<string>();
  readonly titleAccent = input.required<string>();
  readonly subtitle = input<string>('');
  readonly center = input(true);
}
