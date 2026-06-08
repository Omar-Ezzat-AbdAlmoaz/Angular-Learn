import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleDirective } from '../../directives/theme-toggle';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ThemeToggleDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
