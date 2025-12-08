import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import mermaid from 'mermaid';

@Component({
  selector: 'app-architecture-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
      <a routerLink="/architectures" class="inline-block mb-4">← Back to gallery</a>
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-mono mb-2">{{ id }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="space-y-3">
          <div class="border rounded p-4">
            <h3 class="text-lg font-semibold mb-2">Technical Specifications</h3>
            <dl class="grid grid-cols-2 gap-2 text-sm">
              <dt>Cloud</dt><dd>AWS</dd>
              <dt>Services</dt><dd>S3, Lambda, API Gateway</dd>
              <dt>Pattern</dt><dd>Event-driven</dd>
            </dl>
          </div>
          <div class="border rounded p-4">
            <h3 class="text-lg font-semibold mb-2">Problem</h3>
            <p class="text-sm">Describe the problem and constraints.</p>
          </div>
          <div class="border rounded p-4">
            <h3 class="text-lg font-semibold mb-2">Key Features & Benefits</h3>
            <ul class="list-disc pl-5 text-sm">
              <li>Scalable</li>
              <li>Resilient</li>
              <li>Cost-efficient</li>
            </ul>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">Architecture Diagram</h3>
          <div id="mermaid" class="border rounded p-4" aria-label="Architecture diagram"></div>
        </div>
      </div>
      <a routerLink="/contact" class="inline-block">Contact →</a>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly id = this.route.snapshot.paramMap.get('id') ?? 'architecture';
  constructor() {}

  async ngOnInit(): Promise<void> {
    const el = document.getElementById('mermaid');
    if (!el) return;
    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'default' : 'dark';
    mermaid.initialize({ startOnLoad: false, theme });
    const diagram = `flowchart LR
      A[Client] --> B[API Gateway]
      B --> C[Lambda]
      C --> D[S3]
    `;
    const { svg } = await mermaid.render('diagram', diagram);
    el.innerHTML = svg;
  }
}
