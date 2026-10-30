import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  template: `
    <header
      class="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-contrast mb-8 lg:mb-12 relative"
    >
      <!-- Top Scroll Progress Bar -->
      <div
        class="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 z-50 transition-all duration-75 ease-out shadow-sm shadow-blue-500/50"
        [style.width.%]="scrollPercent()"
      ></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 lg:h-20">
          <!-- Logo/Brand Section -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="group flex flex-col">
              <span class="text-xl sm:text-2xl font-mono font-bold tracking-tight group-hover:text-blue-400 transition-colors">
                {{ profileInfo.name }}
              </span>
              <span class="text-xs sm:text-sm font-mono text-muted -mt-0.5">
                {{ profileInfo.handle }}
              </span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <nav
            class="hidden lg:flex items-center gap-1.5"
            role="navigation"
            aria-label="Main navigation"
          >
            <a
              *ngFor="let item of navigationItems; trackBy: trackByNavItem"
              [href]="item.href"
              [target]="item.isExternal ? '_blank' : '_self'"
              [rel]="item.isExternal ? 'noopener noreferrer' : null"
              class="nav-link px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200"
              [class.text-blue-400]="activeHref() === item.href"
              [class.bg-blue-500_10]="activeHref() === item.href"
              [class.text-muted]="activeHref() !== item.href"
              [attr.aria-label]="item.label"
              [attr.aria-current]="activeHref() === item.href ? 'page' : null"
            >
              {{ item.label }}
            </a>
            
            <div class="w-px h-5 bg-contrast mx-2"></div>

            <button
              class="p-2 rounded-lg border border-contrast hover:border-blue-500/40 text-muted hover:text-white transition-all cursor-pointer"
              (click)="toggleTheme()"
              [attr.aria-pressed]="theme() === 'light'"
              aria-label="Toggle theme"
            >
              @if (theme() === 'light') {
                <fa-icon [icon]="faSun" class="text-amber-500"></fa-icon>
              } @else {
                <fa-icon [icon]="faMoon" class="text-blue-400"></fa-icon>
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
    { href: '#pipeline', label: 'Pipeline Scrubber' },
    { href: '#work', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '/architectures', label: 'Architectures' },
    { href: '/contact', label: 'Contact' },
  ];

  readonly isMobileMenuOpen = signal(false);
  readonly activeHref = signal<string>('');
  readonly scrollPercent = signal<number>(0);

  private observer?: IntersectionObserver;

  readonly theme = signal<'dark' | 'light'>('dark');

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (typeof window === 'undefined') return;
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    this.scrollPercent.set(total > 0 ? Math.min(Math.max((current / total) * 100, 0), 100) : 0);
  }

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
    this.onScroll();
    const ids = ['hero-section', 'pipeline', 'work', 'skills', 'projects', 'articles'];
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
