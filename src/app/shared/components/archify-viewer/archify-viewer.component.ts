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
  OnDestroy,
  HostListener
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-archify-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #viewerContainer
      class="archify-studio"
      [class.fullscreen]="isFullscreen()"
    >
      <!-- Studio Window Chrome (No traffic-light dots or glowing pulses per R-05/R-09) -->
      <div class="studio-toolbar">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="studio-badge">
            <span>ARCHIFY :: {{ diagramType }}</span>
          </span>
          <span class="studio-title truncate">{{ title }}</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 shrink-0">
          <!-- Expand Height Toggle (when not fullscreen) -->
          @if (!isFullscreen()) {
            <button
              type="button"
              (click)="toggleTallMode()"
              class="studio-ctrl-btn btn-tactile hidden sm:inline-flex"
              [attr.aria-pressed]="isTall()"
              [title]="isTall() ? 'Vista compacta' : 'Ampliar alto del lienzo'"
            >
              <span>{{ isTall() ? 'Vista Estándar' : 'Ampliar Lienzo' }}</span>
            </button>
          }

          <!-- Standalone Open Link -->
          <a
            [href]="rawSrc()"
            target="_blank"
            rel="noopener noreferrer"
            class="studio-ctrl-btn btn-tactile"
            title="Abrir gráfico interactivo en pestaña dedicada"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            <span>Nueva Pestaña</span>
          </a>

          <!-- Reload Button -->
          <button
            type="button"
            (click)="reloadIframe()"
            class="studio-ctrl-btn btn-tactile"
            aria-label="Reiniciar vista del diagrama"
            title="Reiniciar vista del diagrama"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span class="sr-only">Reiniciar</span>
          </button>

          <!-- Fullscreen Toggle -->
          <button
            type="button"
            (click)="toggleFullscreen()"
            class="studio-ctrl-btn is-primary btn-tactile"
            [attr.aria-pressed]="isFullscreen()"
            title="Pantalla completa (Esc para salir)"
          >
            @if (!isFullscreen()) {
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
              </svg>
            } @else {
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            }
            <span>{{ isFullscreen() ? 'Salir (Esc)' : 'Pantalla Completa' }}</span>
          </button>
        </div>
      </div>

      <!-- Iframe Canvas with Explicit Empty, Loading, and Error States (R-27) -->
      <div class="studio-canvas" [style.height]="currentHeight()">
        @if (frameState() === 'empty') {
          <div class="studio-state-overlay" role="status">
            <div class="font-mono text-xs font-semibold mb-1" style="color: var(--color-accent);">
              LIENZO SIN DIAGRAMA SELECCIONADO
            </div>
            <p class="text-sm text-secondary-theme max-w-md mb-4">
              No se ha asignado una ruta de artefacto Archify. Carga la topología principal para inspeccionar el flujo interactivo.
            </p>
            <button type="button" class="btn-tactile btn-primary-eng" (click)="loadDefaultDiagram()">
              Cargar topología SINTAD AI Agent
            </button>
          </div>
        } @else {
          @if (frameState() === 'loading') {
            <div class="studio-state-overlay" role="status" aria-live="polite">
              <div class="font-mono text-xs font-semibold mb-1" style="color: var(--color-accent);">
                CARGANDO TOPOLOGÍA ARCHIFY
              </div>
              <p class="text-sm text-secondary-theme">
                Inicializando nodos vectoriales y controles de zoom para {{ title }}...
              </p>
            </div>
          }

          @if (frameState() === 'error') {
            <div class="studio-state-overlay" role="alert">
              <div class="font-mono text-xs font-semibold mb-1" style="color: var(--color-accent);">
                ERROR AL CARGAR EL ARTEFACTO INTERACTIVO
              </div>
              <p class="text-sm text-secondary-theme max-w-md mb-4">
                No fue posible renderizar el archivo ({{ rawSrc() }}). Verifica tu conexión o vuelve a cargar el lienzo.
              </p>
              <button type="button" class="btn-tactile btn-primary-eng" (click)="reloadIframe()">
                Reintentar carga del diagrama
              </button>
            </div>
          }

          <iframe
            #frameElement
            [src]="sanitizedSrc()"
            width="1200"
            height="620"
            class="w-full h-full border-0"
            [title]="title"
            loading="lazy"
            allow="fullscreen"
            (load)="onFrameLoad()"
            (error)="onFrameError()"
          ></iframe>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .archify-studio {
      border-radius: 0.625rem;
      border: 1px solid var(--color-border-strong);
      background-color: var(--color-bg-elevated);
      overflow: hidden;
      box-shadow: var(--shadow-elevated);
    }

    .archify-studio.fullscreen {
      position: fixed;
      inset: 0;
      z-index: 9999;
      margin: 0;
      border-radius: 0;
      width: 100vw;
      height: 100vh;
    }

    .archify-studio.fullscreen .studio-canvas {
      height: calc(100vh - 60px) !important;
    }

    .studio-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.625rem 1rem;
      background-color: var(--color-bg-elevated);
      border-bottom: 1px solid var(--color-border);
    }

    .studio-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.2rem 0.55rem;
      border-radius: 0.25rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--color-accent);
      background-color: var(--color-surface-2);
      border: 1px solid var(--color-border-strong);
    }

    .studio-title {
      font-family: 'Fira Code', monospace;
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--color-text-secondary);
    }

    .studio-ctrl-btn {
      min-height: 2.75rem;
      min-width: 2.75rem;
      padding: 0.45rem 0.8rem;
      border-radius: 0.375rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      background-color: var(--color-surface);
      border: 1px solid var(--color-border-strong);
    }

    @media (hover: hover) and (pointer: fine) {
      .studio-ctrl-btn:hover {
        color: var(--color-text);
        border-color: var(--color-accent);
        background-color: var(--color-surface-2);
      }
    }

    .studio-ctrl-btn.is-primary {
      color: var(--color-accent-contrast);
      background-color: var(--color-accent);
      border-color: var(--color-accent);
      font-weight: 600;
    }

    @media (hover: hover) and (pointer: fine) {
      .studio-ctrl-btn.is-primary:hover {
        background-color: var(--color-accent-hover);
        border-color: var(--color-accent-hover);
      }
    }

    .studio-canvas {
      position: relative;
      width: 100%;
      background-color: var(--color-bg);
      transition: height var(--duration-normal) var(--ease-out);
    }

    .studio-state-overlay {
      position: absolute;
      inset: 0;
      z-index: 15;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      background-color: var(--color-surface);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchifyViewerComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);

  readonly rawSrc = signal<string>('');
  readonly frameState = signal<'loading' | 'ready' | 'error' | 'empty'>('loading');

  @Input({ required: true })
  set src(val: string) {
    const trimmed = (val || '').trim();
    this.rawSrc.set(trimmed);
    this.frameState.set(trimmed ? 'loading' : 'empty');
  }
  get src(): string {
    return this.rawSrc();
  }

  @Input() title: string = 'Architecture Diagram';
  @Input() height: string = '600px';
  @Input() diagramType: string = 'INTERACTIVE';

  @ViewChild('viewerContainer') viewerContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('frameElement') frameElement?: ElementRef<HTMLIFrameElement>;

  readonly isFullscreen = signal(false);
  readonly isTall = signal(false);
  readonly currentTheme = signal<'dark' | 'light'>('dark');
  private observer?: MutationObserver;

  readonly currentHeight = computed(() => {
    if (this.isFullscreen()) return '100%';
    if (this.isTall()) return '820px';
    return this.height;
  });

  readonly sanitizedSrc = computed<SafeResourceUrl>(() => {
    const base = this.rawSrc();
    if (!base) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }
    const theme = this.currentTheme();
    const glue = base.includes('?') ? '&' : '?';
    const finalUrl = `${base}${glue}embed=1&theme=${theme}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);
  });

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isFullscreen()) {
      this.isFullscreen.set(false);
    }
  }

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

  onFrameLoad(): void {
    if (this.rawSrc()) {
      this.frameState.set('ready');
    }
  }

  onFrameError(): void {
    this.frameState.set('error');
  }

  loadDefaultDiagram(): void {
    this.src = '/architectures/sintad-ai-agent_diagram.html';
  }

  toggleFullscreen(): void {
    this.isFullscreen.update((v) => !v);
  }

  toggleTallMode(): void {
    this.isTall.update((v) => !v);
  }

  reloadIframe(): void {
    if (this.frameElement?.nativeElement && this.rawSrc()) {
      this.frameState.set('loading');
      const current = this.frameElement.nativeElement.src;
      this.frameElement.nativeElement.src = current;
    }
  }
}

