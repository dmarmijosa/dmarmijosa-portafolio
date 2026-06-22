import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Lightweight inline-SVG icon set (stroke-based, currentColor) so the UI has
 * no external icon dependency. Add new glyphs to the @switch as needed.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (name()) {
        @case ('layout') {
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
        }
        @case ('server') {
          <rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" />
        }
        @case ('smartphone') {
          <rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" />
        }
        @case ('database') {
          <ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        }
        @case ('cloud') {
          <path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.6-1.5A4 4 0 0 0 6.5 19h11Z" />
        }
        @case ('sparkles') {
          <path d="M12 3l1.8 4.8L18.6 9.6 13.8 11.4 12 16.2 10.2 11.4 5.4 9.6 10.2 7.8z" /><path d="M19 15l.7 1.9L21.6 17.6 19.7 18.3 19 20.2 18.3 18.3 16.4 17.6 18.3 16.9z" />
        }
        @case ('external') {
          <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
        }
        @case ('mail') {
          <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" />
        }
        @case ('map-pin') {
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
        }
        @case ('check') {
          <path d="M20 6 9 17l-5-5" />
        }
        @case ('star') {
          <path d="M12 2.5l2.95 6 6.6.96-4.78 4.65 1.13 6.57L12 17.6l-5.9 3.08 1.13-6.57L2.45 9.46l6.6-.96z" />
        }
        @case ('quote') {
          <path d="M7 7h4v4c0 3-2 5-4 5M13 7h4v4c0 3-2 5-4 5" />
        }
        @case ('arrow-down') {
          <path d="M12 5v14M5 12l7 7 7-7" />
        }
        @case ('arrow-right') {
          <path d="M5 12h14M13 5l7 7-7 7" />
        }
        @case ('briefcase') {
          <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
        }
        @case ('github') {
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.1-.3 6.3-1.5 6.3-7A5.4 5.4 0 0 0 19.9 4 5 5 0 0 0 19.8.7S18.5.3 16 2.05a13.4 13.4 0 0 0-7 0C6.5.3 5.2.7 5.2.7A5 5 0 0 0 5.1 4 5.4 5.4 0 0 0 3.7 7.9c0 5.5 3.2 6.7 6.3 7a3.4 3.4 0 0 0-1 2.6V21" />
        }
        @case ('linkedin') {
          <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-12h4v1.5A4 4 0 0 1 16 8Z" /><rect x="2" y="9" width="4" height="11" /><circle cx="4" cy="4" r="2" />
        }
        @case ('globe') {
          <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
        }
        @case ('apple') {
          <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.6 2.3 2.8 2.3 1.1 0 1.6-.7 2.9-.7s1.7.7 2.9.7 2-1.1 2.7-2.1c.9-1.2 1.2-2.4 1.2-2.5 0 0-2.3-.9-2.3-3.6Z" /><path d="M14.2 5.8c.6-.8 1-1.8.9-2.8-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.2Z" />
        }
        @case ('google-play') {
          <path d="M4 3.5 14.5 12 4 20.5c-.4-.2-.6-.6-.6-1.1V4.6c0-.5.2-.9.6-1.1Z" /><path d="m14.5 12 3.2-2.6 2.7 1.5c.9.5.9 1.7 0 2.2l-2.7 1.5L14.5 12Z" /><path d="M4 3.5 17.7 9.4 14.5 12 4 3.5Z" /><path d="M4 20.5 14.5 12l3.2 2.6L4 20.5Z" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input(20);
}
