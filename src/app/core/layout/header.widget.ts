import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  HostListener,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Subscription, filter } from 'rxjs';

interface NavigationItem {
  readonly href: string;
  readonly label: string;
  readonly sectionId?: string;
  readonly isRoute?: boolean;
}

interface ProfileInfo {
  readonly name: string;
  readonly handle: string;
  readonly role: string;
}

@Component({
  selector: 'app-header-widget',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="site-header">
      <!-- Compositor-accelerated Scroll Progress Hairline -->
      <div class="scroll-progress-track" aria-hidden="true">
        <div
          class="scroll-progress-bar"
          [style.transform]="'scaleX(' + scrollRatio() + ')'"
        ></div>
      </div>

      <div class="header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 sm:h-[4.25rem]">
          <!-- Brand / Identity -->
          <a
            routerLink="/"
            (click)="onBrandClick($event)"
            class="brand-link group flex items-center gap-3"
          >
            <div class="brand-monogram" aria-hidden="true">
              <span>JD</span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <span class="brand-name">{{ profileInfo.name }}</span>
              </div>
              <span class="brand-handle">{{ profileInfo.handle }} · {{ profileInfo.role }}</span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <nav
            class="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Navegación principal"
          >
            @for (item of navigationItems; track item.label) {
              <a
                [href]="item.href"
                (click)="navigateItem($event, item)"
                class="nav-pill"
                [class.is-active]="isItemActive(item)"
                [attr.aria-current]="isItemActive(item) ? 'page' : null"
              >
                {{ item.label }}
              </a>
            }

            <div class="nav-divider" aria-hidden="true"></div>

            <a
              routerLink="/architectures"
              class="cta-arch-btn btn-tactile"
              [class.is-active-route]="currentPath().startsWith('/architectures')"
            >
              <span>RFCs & Archify</span>
            </a>

            <button
              type="button"
              class="theme-btn btn-tactile"
              (click)="toggleTheme()"
              [attr.aria-pressed]="theme() === 'light'"
              aria-label="Cambiar tema claro u oscuro"
              [title]="theme() === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'"
            >
              @if (theme() === 'light') {
                <fa-icon [icon]="faSun" aria-hidden="true"></fa-icon>
              } @else {
                <fa-icon [icon]="faMoon" aria-hidden="true"></fa-icon>
              }
            </button>
          </nav>

          <!-- Mobile Actions -->
          <div class="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              class="theme-btn btn-tactile"
              (click)="toggleTheme()"
              [attr.aria-pressed]="theme() === 'light'"
              aria-label="Cambiar tema claro u oscuro"
            >
              @if (theme() === 'light') {
                <fa-icon [icon]="faSun" aria-hidden="true"></fa-icon>
              } @else {
                <fa-icon [icon]="faMoon" aria-hidden="true"></fa-icon>
              }
            </button>

            <button
              type="button"
              class="mobile-toggle btn-tactile"
              [attr.aria-expanded]="isMobileMenuOpen()"
              aria-controls="mobile-menu"
              aria-label="Abrir o cerrar menú de navegación"
              (click)="toggleMobileMenu()"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                @if (!isMobileMenuOpen()) {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h12" />
                } @else {
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                }
              </svg>
              <span class="font-mono text-xs font-semibold">{{ isMobileMenuOpen() ? 'Cerrar' : 'Menú' }}</span>
            </button>
          </div>
        </div>

        <!-- Mobile Menu Drawer -->
        @if (isMobileMenuOpen()) {
          <div id="mobile-menu" class="mobile-drawer lg:hidden">
            <nav class="flex flex-col gap-1 py-3" role="navigation" aria-label="Navegación móvil">
              @for (item of navigationItems; track item.label) {
                <a
                  [href]="item.href"
                  (click)="navigateItem($event, item); closeMobileMenu()"
                  class="mobile-nav-item"
                  [class.is-active]="isItemActive(item)"
                >
                  <span>{{ item.label }}</span>
                </a>
              }
              <a
                routerLink="/architectures"
                (click)="closeMobileMenu()"
                class="mobile-nav-item is-highlight mt-1"
              >
                <span>Explorar RFCs & Diagramas Archify</span>
              </a>
            </nav>
          </div>
        }
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .site-header {
        position: relative;
        background-color: var(--color-header-glass);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        border-bottom: 1px solid var(--color-border);
      }

      .scroll-progress-track {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: transparent;
        overflow: hidden;
        z-index: 10;
      }

      .scroll-progress-bar {
        width: 100%;
        height: 100%;
        transform-origin: 0 50%;
        background-color: var(--color-accent);
        will-change: transform;
      }

      .brand-link {
        text-decoration: none;
        color: var(--color-text);
        min-height: 2.75rem;
      }

      .brand-monogram {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.375rem;
        background-color: var(--color-surface-2);
        border: 1px solid var(--color-border-strong);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Fira Code', monospace;
        font-weight: 700;
        font-size: 0.85rem;
        color: var(--color-accent);
        transition: border-color var(--duration-fast) var(--ease-out);
      }

      @media (hover: hover) and (pointer: fine) {
        .brand-link:hover .brand-monogram {
          border-color: var(--color-accent);
        }
      }

      .brand-name {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        font-size: 1.05rem;
        letter-spacing: -0.02em;
        color: var(--color-text);
      }

      .brand-handle {
        font-family: 'Fira Code', monospace;
        font-size: 0.72rem;
        color: var(--color-muted);
      }

      .nav-pill {
        display: inline-flex;
        align-items: center;
        min-height: 2.75rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.825rem;
        font-weight: 500;
        color: var(--color-muted);
        text-decoration: none;
        transition: color var(--duration-fast) var(--ease-out),
                    background-color var(--duration-fast) var(--ease-out);
      }

      @media (hover: hover) and (pointer: fine) {
        .nav-pill:hover {
          color: var(--color-text);
          background-color: var(--color-surface-2);
        }
      }

      .nav-pill.is-active {
        color: var(--color-text);
        background-color: var(--color-surface-2);
        font-weight: 600;
      }

      .nav-divider {
        width: 1px;
        height: 1.25rem;
        background-color: var(--color-border);
        margin: 0 0.5rem;
      }

      .cta-arch-btn {
        min-height: 2.75rem;
        padding: 0.5rem 0.9rem;
        border-radius: 0.375rem;
        font-family: 'Fira Code', monospace;
        font-size: 0.76rem;
        font-weight: 600;
        color: var(--color-text);
        background-color: var(--color-surface);
        border: 1px solid var(--color-border-strong);
        margin-right: 0.375rem;
      }

      .cta-arch-btn.is-active-route {
        background-color: var(--color-accent);
        border-color: var(--color-accent);
        color: var(--color-accent-contrast);
      }

      @media (hover: hover) and (pointer: fine) {
        .cta-arch-btn:hover {
          border-color: var(--color-accent);
          background-color: var(--color-surface-2);
        }
        .cta-arch-btn.is-active-route:hover {
          background-color: var(--color-accent-hover);
          color: var(--color-accent-contrast);
        }
      }

      .theme-btn {
        min-width: 2.75rem;
        min-height: 2.75rem;
        padding: 0;
        border-radius: 0.375rem;
        background-color: var(--color-surface);
        border: 1px solid var(--color-border-strong);
        color: var(--color-text);
      }

      .mobile-toggle {
        min-height: 2.75rem;
        padding: 0 0.75rem;
        border-radius: 0.375rem;
        background-color: var(--color-surface);
        border: 1px solid var(--color-border-strong);
        color: var(--color-text);
      }

      @media (hover: hover) and (pointer: fine) {
        .theme-btn:hover,
        .mobile-toggle:hover {
          border-color: var(--color-accent);
          background-color: var(--color-surface-2);
        }
      }

      .mobile-drawer {
        border-top: 1px solid var(--color-border);
      }

      .mobile-nav-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 2.75rem;
        padding: 0.65rem 0.875rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-secondary);
        text-decoration: none;
      }

      .mobile-nav-item.is-active {
        background-color: var(--color-surface-2);
        color: var(--color-text);
        font-weight: 600;
      }

      .mobile-nav-item.is-highlight {
        background-color: var(--color-accent);
        color: var(--color-accent-contrast);
        font-family: 'Fira Code', monospace;
        font-size: 0.8rem;
        font-weight: 600;
      }
    `,
  ],
})
export class HeaderWidgetComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private routerSub?: Subscription;

  readonly faSun = faSun;
  readonly faMoon = faMoon;

  readonly profileInfo: ProfileInfo = {
    name: 'Jesus Diez',
    handle: '@jdev-king',
    role: 'AI & Cloud Architect',
  };

  readonly navigationItems: NavigationItem[] = [
    { href: '#hero-section', label: 'Inicio', sectionId: 'hero-section' },
    { href: '#pipeline', label: 'Pipeline', sectionId: 'pipeline' },
    { href: '#enterprise-pipeline', label: 'Productos & B2B', sectionId: 'enterprise-pipeline' },
    { href: '#work', label: 'Experiencia', sectionId: 'work' },
    { href: '#skills', label: 'Stack', sectionId: 'skills' },
    { href: '#projects', label: 'Open Source', sectionId: 'projects' },
    { href: '/contact', label: 'Contacto', isRoute: true },
  ];

  readonly isMobileMenuOpen = signal(false);
  readonly activeSection = signal<string>('hero-section');
  readonly currentPath = signal<string>('/');
  readonly scrollRatio = signal<number>(0);
  readonly theme = signal<'dark' | 'light'>('dark');

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (typeof window === 'undefined') return;
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    const ratio = total > 0 ? Math.min(Math.max(current / total, 0), 1) : 0;
    this.scrollRatio.set(ratio);

    if (this.currentPath() === '/' || this.currentPath() === '') {
      this.detectActiveSection();
    }
  }

  private detectActiveSection(): void {
    const sectionIds = ['hero-section', 'pipeline', 'architectures-showcase', 'enterprise-pipeline', 'work', 'skills', 'projects', 'articles'];
    const viewportMid = window.innerHeight * 0.35;
    let currentId = 'hero-section';

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportMid) {
          currentId = id;
        }
      }
    }
    this.activeSection.set(currentId);
  }

  isItemActive(item: NavigationItem): boolean {
    const path = this.currentPath();
    if (item.isRoute) {
      return path === item.href || path.startsWith(item.href + '/');
    }
    if (path !== '/' && path !== '') {
      return false;
    }
    return this.activeSection() === item.sectionId;
  }

  onBrandClick(event: Event): void {
    if (this.currentPath() === '/' || this.currentPath() === '') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navigateItem(event: Event, item: NavigationItem): void {
    event.preventDefault();
    if (item.isRoute) {
      this.router.navigateByUrl(item.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = item.sectionId || item.href.replace('#', '');
    if (this.currentPath() !== '/' && this.currentPath() !== '') {
      this.router.navigateByUrl('/').then(() => {
        setTimeout(() => {
          this.scrollToElement(targetId);
        }, 120);
      });
    } else {
      this.scrollToElement(targetId);
    }
  }

  private scrollToElement(id: string): void {
    if (id === 'hero-section') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (saved === 'light' || saved === 'dark') {
        this.theme.set(saved);
      }
      document.documentElement.setAttribute('data-theme', this.theme());
      this.currentPath.set(window.location.pathname || '/');
      this.onScroll();
    }

    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.currentPath.set(e.urlAfterRedirects.split('?')[0].split('#')[0] || '/');
        this.closeMobileMenu();
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  toggleTheme(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    }
  }
}

