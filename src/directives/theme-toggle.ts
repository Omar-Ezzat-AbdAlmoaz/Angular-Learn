import { Directive, effect, signal } from '@angular/core';

@Directive({
  selector: '[appThemeToggle]',
  host: {
    '(click)': 'toggle()',
    '[attr.aria-pressed]': 'isDark()',
    '[attr.aria-label]': "isDark() ? 'Switch to light mode' : 'Switch to dark mode'",
  },
})
export class ThemeToggleDirective {
  protected isDark = signal(false);

  constructor() {
    effect(() => {
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('dark-theme', this.isDark());
      }
    });
  }

  protected toggle(): void {
    this.isDark.update((v) => !v);
  }
}
