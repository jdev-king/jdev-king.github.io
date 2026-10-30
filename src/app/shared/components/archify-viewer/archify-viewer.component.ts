import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  signal,
  computed,
  ChangeDetectionStrategy,
  inject,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-archify-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #viewerContainer
      class="archify-container group my-8 rounded-xl border border-contrast bg-surface overflow-hidden shadow-2xl transition-all duration-300"
      [class.fullscreen]="isFullscreen()"
    >
      <!-- Toolbar Header -->
      <div
        class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0d1117] border-b border-contrast text-xs text-muted font-mono"
      >
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Archify Interactive
          </span>
          <span class="text-gray-400 font-medium hidden sm:inline">{{ title }}</span>
        </div>

        <div class="flex items-center gap-2">
          <!-- Standalone Open Link -->
          <a
            [href]="src"
            target="_blank"
            rel="noopener noreferrer"
            class="px-2.5 py-1 rounded-md bg-gray-800/80 hover:bg-gray-700 text-gray-200 transition-colors flex items-center gap-1.5 border border-gray-700/60"
            title="Abrir gráfico interactivo en nueva pestaña"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            <span class="hidden md:inline">Abrir pestaña</span>
          </a>

          <!-- Reload Button -->
          <button
            type="button"
            (click)="reloadIframe()"
            class="p-1.5 rounded-md bg-gray-800/80 hover:bg-gray-700 text-gray-200 transition-colors border border-gray-700/60"
            title="Recargar gráfico"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>

          <!-- Fullscreen Toggle -->
          <button
            type="button"
            (click)="toggleFullscreen()"
            class="px-2.5 py-1 rounded-md bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 transition-colors flex items-center gap-1.5 border border-blue-500/30"
            title="Pantalla completa"
          >
            <svg *ngIf="!isFullscreen()" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
            </svg>
            <svg *ngIf="isFullscreen()" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span>{{ isFullscreen() ? 'Cerrar' : 'Maximizar' }}</span>
          </button>
        </div>
      </div>

      <!-- Iframe Container -->
      <div class="relative w-full overflow-hidden bg-[#07090c]" [style.height]="currentHeight()">
        <!-- Hint Bar -->
        <div
          class="absolute bottom-2 left-3 z-10 pointer-events-none px-2.5 py-1 rounded bg-black/75 backdrop-blur text-[11px] text-gray-300 font-mono flex items-center gap-2 border border-white/10"
        >
          <span>🖱️ Arrastra (pan)</span>
          <span>•</span>
          <span>🔍 Zoom</span>
          <span>•</span>
          <span>✨ Clic en nodos</span>
        </div>

        <iframe
          #frameElement
          [src]="sanitizedSrc()"
          class="w-full h-full border-0 transition-opacity duration-300"
          [title]="title"
          loading="lazy"
          allow="fullscreen"
        ></iframe>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .archify-container.fullscreen {
      position: fixed;
      inset: 0;
      z-index: 9999;
      margin: 0;
      border-radius: 0;
      width: 100vw;
      height: 100vh;
      background: #07090c;
    }
    .archify-container.fullscreen > div:last-child {
      height: calc(100vh - 49px) !important;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchifyViewerComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);

  @Input({ required: true }) src!: string;
  @Input() title: string = 'Architecture Diagram';
  @Input() height: string = '560px';

  @ViewChild('viewerContainer') viewerContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('frameElement') frameElement?: ElementRef<HTMLIFrameElement>;

  readonly isFullscreen = signal(false);
  readonly currentTheme = signal<'dark' | 'light'>('dark');
  private observer?: MutationObserver;

  readonly currentHeight = computed(() => {
    return this.isFullscreen() ? '100%' : this.height;
  });

  readonly sanitizedSrc = computed<SafeResourceUrl>(() => {
    const base = this.src;
    const theme = this.currentTheme();
    const glue = base.includes('?') ? '&' : '?';
    const finalUrl = `${base}${glue}embed=1&theme=${theme}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);
  });

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      const active = document.documentElement.getAttribute('data-theme');
      this.currentTheme.set(active === 'light' ? 'light' : 'dark');

      this.observer = new MutationObserver(() => {
        const updated = document.documentElement.getAttribute('data-theme');
        this.currentTheme.set(updated === 'light' ? 'light' : 'dark');
      });
      this.observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleFullscreen(): void {
    this.isFullscreen.update((v) => !v);
  }

  reloadIframe(): void {
    if (this.frameElement?.nativeElement) {
      const current = this.frameElement.nativeElement.src;
      this.frameElement.nativeElement.src = current;
    }
  }
}
