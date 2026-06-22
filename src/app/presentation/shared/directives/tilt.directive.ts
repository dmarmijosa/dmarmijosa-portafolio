import { Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Interactive 3D tilt: rotates the host element toward the pointer using
 * CSS 3D transforms, creating a parallax "card lifts off the page" effect.
 * Pure DOM math on the host — no extra state leaks into the component tree.
 */
@Directive({
  selector: '[appTilt]',
  host: {
    class: 'tilt-3d',
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'reset()',
    '(pointerenter)': 'onEnter()',
  },
})
export class TiltDirective {
  /** Maximum rotation in degrees on each axis. */
  readonly maxTilt = input(10);
  /** Lift on the Z axis while hovering (px). */
  readonly lift = input(0);

  private readonly el = inject(ElementRef<HTMLElement>);

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );
  }

  protected onEnter(): void {
    if (this.prefersReducedMotion()) return;
    this.el.nativeElement.style.transition = 'transform 0.08s ease-out';
  }

  protected onMove(event: PointerEvent): void {
    if (this.prefersReducedMotion()) return;
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width; // 0..1
    const py = (event.clientY - rect.top) / rect.height; // 0..1
    const max = this.maxTilt();
    const rotateY = (px - 0.5) * 2 * max;
    const rotateX = -(py - 0.5) * 2 * max;
    host.style.transform =
      `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) ` +
      `rotateY(${rotateY.toFixed(2)}deg) translateZ(${this.lift()}px)`;
  }

  protected reset(): void {
    const host = this.el.nativeElement;
    host.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    host.style.transform =
      'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
  }
}
