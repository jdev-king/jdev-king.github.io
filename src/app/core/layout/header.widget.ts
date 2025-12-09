import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

interface NavigationItem {
  readonly href: string;
  readonly label: string;
  readonly isExternal?: boolean;
}

interface ProfileInfo {
  readonly name: string;
  readonly handle: string;
}

/**
 * Responsive Header Widget Component
 *
 * Features:
 * - Mobile-first responsive design with hamburger menu
 * - Smooth animations and transitions
 * - Accessibility improvements (ARIA labels, keyboard navigation)
 * - OnPush change detection for optimal performance
 * - Type-safe navigation configuration
 */
@Component({
  selector: 'app-header-widget',
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <header
      class="sticky top-0 z-50 bg-surface backdrop-blur-sm border-b border-contrast mb-8 lg:mb-12"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 lg:h-20">
          <!-- Logo/Brand Section -->
          <div class="flex-shrink-0">
            <h1 class="text-xl sm:text-2xl font-mono font-bold">
              {{ profileInfo.name }}
            </h1>
            <h2 class="text-sm sm:text-base font-mono text-muted -mt-1">
              {{ profileInfo.handle }}
            </h2>
          </div>

          <!-- Desktop Navigation -->
          <nav
            class="hidden lg:flex items-center gap-3"
            role="navigation"
            aria-label="Main navigation"
          >
            
            <a
              *ngFor="let item of navigationItems; trackBy: trackByNavItem"
              [href]="item.href"
              [target]="item.isExternal ? '_blank' : '_self'"
              [rel]="item.isExternal ? 'noopener noreferrer' : null"
              class="nav-link transition-colors duration-300 font-medium relative group"
              [attr.aria-label]="item.label"
              [attr.aria-current]="item.href.startsWith('#') && activeHref() === item.href ? 'page' : null"
            >
              {{ item.label }}
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                [style.backgroundColor]="'var(--color-accent)'"
              ></span>
            </a>
            <button
              class="px-3 py-2 rounded-full border border-contrast"
              (click)="toggleTheme()"
              [attr.aria-pressed]="theme() === 'light'"
              aria-label="Toggle theme"
            >
              @if (theme() === 'light') {
                <fa-icon [icon]="faSun"></fa-icon>
              } @else {
                <fa-icon [icon]="faMoon"></fa-icon>
              }
            </button>
          </nav>

          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden p-2 rounded-md transition-colors duration-300 focus:outline-none"
            [attr.aria-expanded]="isMobileMenuOpen()"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            (click)="toggleMobileMenu()"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                *ngIf="!isMobileMenuOpen()"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              <path
                *ngIf="isMobileMenuOpen()"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation Menu -->
        <div
          id="mobile-menu"
          class="lg:hidden transition-all duration-300 ease-in-out"
          [class]="
            'lg:hidden transition-all duration-300 ease-in-out ' +
            (isMobileMenuOpen()
              ? 'max-h-screen opacity-100 visible'
              : 'max-h-0 opacity-0 invisible overflow-hidden')
          "
          [attr.aria-hidden]="!isMobileMenuOpen()"
        >
          <nav
            class="py-4 space-y-2"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <button
              class="block px-4 py-3 rounded-md border border-contrast"
              (click)="toggleTheme()"
              [attr.aria-pressed]="theme() === 'light'"
              aria-label="Toggle theme"
            >
              @if (theme() === 'light') {
                <fa-icon [icon]="faSun"></fa-icon>
              } @else {
                <fa-icon [icon]="faMoon"></fa-icon>
              }
            </button>
            <a
              *ngFor="let item of navigationItems; trackBy: trackByNavItem"
              [href]="item.href"
              [target]="item.isExternal ? '_blank' : '_self'"
              [rel]="item.isExternal ? 'noopener noreferrer' : null"
              class="block px-4 py-3 transition-colors duration-300 font-medium rounded-md"
              [attr.aria-label]="item.label"
              (click)="closeMobileMenu()"
              [attr.aria-current]="item.href.startsWith('#') && activeHref() === item.href ? 'page' : null"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .nav-link {
        position: relative;
        display: inline-block;
      }

      .nav-link::before {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: currentColor;
        transition: width 0.3s ease;
      }

      .nav-link:hover::before {
        width: 100%;
      }

      /* Smooth mobile menu animation */
      #mobile-menu {
        transform-origin: top;
      }

      /* Focus styles for better accessibility */
      .nav-link:focus {
        outline: 2px solid var(--color-text);
        outline-offset: 4px;
        border-radius: 4px;
      }

      /* Enhanced mobile menu styling */
      @media (max-width: 1023px) {
        .container {
          padding-left: 1rem;
          padding-right: 1rem;
        }
      }

      /* Backdrop blur fallback */
      @supports not (backdrop-filter: blur(12px)) {
        header {
          background-color: var(--color-bg);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeaderWidgetComponent implements OnInit, OnDestroy {
  readonly faSun = faSun;
  readonly faMoon = faMoon;
  /**
   * Profile information configuration
   */
  readonly profileInfo: ProfileInfo = {
    name: 'Jesus Diez',
    handle: '@jdev-king',
  };

  /**
   * Navigation items configuration
   */
  readonly navigationItems: NavigationItem[] = [
    { href: '/', label: 'Home' },
    { href: '#work', label: 'Work' },
    { href: '#projects', label: 'Projects' },
    { href: '/mastering-stack', label: 'Mastering Stack' },
    { href: '/architectures', label: 'Architectures' },
    { href: '/contact', label: 'Contact' },
  ];

  /**
   * Mobile menu open state using Angular signals for reactive state management
   */
  readonly isMobileMenuOpen = signal(false);

  readonly activeHref = signal<string>('');

  private observer?: IntersectionObserver;

  readonly theme = signal<'dark' | 'light'>('dark');

  /**
   * Toggle mobile menu visibility
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((current) => !current);
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  /**
   * TrackBy function for navigation items to optimize *ngFor performance
   * @param index - The index of the item
   * @param item - The navigation item
   * @returns The unique identifier for the item
   */
  trackByNavItem(index: number, item: NavigationItem): string {
    return item.href;
  }

  ngOnInit(): void {
    const initial = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (initial) this.theme.set(initial);
    document.documentElement.setAttribute('data-theme', this.theme());
    const ids = ['work', 'projects'];
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible.length) {
          const id = visible[0].target.id;
          this.activeHref.set(`#${id}`);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.observer!.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleTheme(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }
}
