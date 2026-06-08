import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[appImageZoom]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()',
    '[class.zoomed]': 'zoomed()',
    '[style.display]': '"block"',
    '[style.cursor]': '"zoom-in"',
    '[style.transition]': '"transform 0.35s ease"',
    '[style.transform]': 'zoomed() ? "scale(1.1)" : null',
  },
})
export class ImageZoomDirective {
  protected zoomed = signal(false);

  protected onEnter(): void {
    this.zoomed.set(true);
  }

  protected onLeave(): void {
    this.zoomed.set(false);
  }
}
