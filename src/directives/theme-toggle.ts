import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appThemeToggle]',
})
export class ThemeToggleDirective {
  @HostBinding('attr.aria-pressed')
  get ariaPressed(): string {
    return String(this.isDark);
  }

  @HostBinding('attr.aria-label')
  get ariaLabel(): string {
    return this.isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  isDark = false;

  @HostListener('click')
  toggle(): void {
    this.isDark = !this.isDark;
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark-theme', this.isDark);
    }
  }
}
