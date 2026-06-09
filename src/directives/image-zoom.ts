import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImageZoom]',
})
export class ImageZoomDirective {
  private zoomed = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'zoom-in');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.35s ease');
  }

  @HostListener('mouseenter')
  onEnter(): void {
    this.zoomed = true;
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.1)');
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.zoomed = false;
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}
