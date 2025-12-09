import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MarkdownModule, MERMAID_OPTIONS, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'app-architecture-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MarkdownModule],
  providers: [
    provideMarkdown({
      mermaidOptions: {
        provide: MERMAID_OPTIONS,
        useValue: {
          theme: 'default',
        },
      },
    }),
  ],
  template: `
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
      <a routerLink="/architectures" class="inline-block mb-4">← Back to gallery</a>
      @if (isLoading()) {
        <div class="rounded-lg border border-contrast bg-surface p-4 animate-pulse mb-4" aria-live="polite" aria-busy="true">
          <div class="h-6 w-48 bg-gray-600 rounded mb-3"></div>
          <div class="h-4 w-full bg-gray-700 rounded mb-2"></div>
          <div class="h-4 w-11/12 bg-gray-700 rounded mb-2"></div>
          <div class="h-4 w-10/12 bg-gray-700 rounded"></div>
        </div>
      }

      <div class="markdown-container diagram-scroll p-4 md:p-6" role="region" aria-label="Markdown content">
        <!-- Carga dinámica del archivo .md -->
        <markdown
          class="prose lg:prose-xl"
          [src]="'/architectures/' + fileName()"
          mermaid
          clipboard
          (load)="onLoad()"
          (ready)="onReady()"
          (error)="onError($event)">
        </markdown>
      </div>

      @if (isError()) {
        <div class="mt-4 rounded-lg border border-contrast bg-surface p-4">
          <p class="text-red-400">No se pudo cargar el contenido.</p>
          <p class="text-muted text-sm">{{ errorMessage() || 'Inténtalo de nuevo más tarde.' }}</p>
        </div>
      }
      <a routerLink="/contact" class="inline-block">Contact →</a>
    </section>
  `,
  styles: [`
    :host ::ng-deep .mermaid { display: flex; justify-content: center; margin: 2rem 0; overflow: auto; }
    :host ::ng-deep .mermaid svg { height: auto; max-width: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly fileName = signal<string>('');
  readonly id = this.route.snapshot.paramMap.get('id') ?? 'architecture';
  readonly isLoading = signal<boolean>(true);
  readonly isError = signal<boolean>(false);
  readonly errorMessage = signal<string | undefined>(undefined);
  constructor() {}

  async ngOnInit(): Promise<void> {
    this.fileName.set(`${this.id}.md`);
  }

  onLoad(): void {
    this.isLoading.set(true);
    this.isError.set(false);
    this.errorMessage.set(undefined);
  }

  onReady(): void {
    this.isLoading.set(false);
    (async () => {
      try {
        const Prism = await import('prismjs');
        // await import('prismjs/components/prism-csharp');
        // await import('prismjs/components/prism-css');
        // (Prism as any).highlightAll();
      } catch {
        // ignore
      }
    })();
  }

  onError(e: unknown): void {
    this.isLoading.set(false);
    this.isError.set(true);
    this.errorMessage.set((e as any)?.message ?? undefined);
  }
}
