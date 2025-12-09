import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-architecture-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MarkdownModule],
  template: `
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
      <a routerLink="/architectures" class="inline-block mb-4">← Back to gallery</a>
      <div class="markdown-container">
      <!-- Carga dinámica del archivo .md -->
      <markdown 
        [src]="'/architectures/' + fileName" 
        mermaid clipboard> 
      </markdown>
    </div>
      <a routerLink="/contact" class="inline-block">Contact →</a>
    </section>
  `,
  styles: [`
    :host ::ng-deep .mermaid { display: flex; justify-content: center; margin: 2rem 0; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  fileName: string = '';
  readonly id = this.route.snapshot.paramMap.get('id') ?? 'architecture';
  constructor() {}

  async ngOnInit(): Promise<void> {
    this.fileName = `${this.id}.md`;
  }
}
