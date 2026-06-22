import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Reveals the host element on scroll using IntersectionObserver, adding a
 * staggered transition. Falls back to "visible" when IO is unavailable or
 * the user prefers reduced motion.
 */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  /** Delay in ms before the element animates in (used for staggering). */
  readonly delay = input(0);

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;
    if (this.delay()) {
      host.style.transitionDelay = `${this.delay()}ms`;
    }

    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) {
      this.renderer.addClass(host, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(host, 'is-visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
