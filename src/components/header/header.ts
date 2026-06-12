import { Component, ChangeDetectionStrategy, signal, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ThemeToggleDirective } from '../../directives/theme-toggle';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ThemeToggleDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private authService = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  // Signal-based login state — updates immediately on login/logout
  protected readonly isLoggedIn = signal(
    isPlatformBrowser(this.platformId) && this.authService.isLoggedIn(),
  );

  logout(): void {
    this.authService.logout();
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
