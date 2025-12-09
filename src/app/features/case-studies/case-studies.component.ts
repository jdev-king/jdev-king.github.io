import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-mono mb-6">Case Studies</h2>
      <article class="mb-8">
        <h3 class="text-xl font-semibold mb-2">Flagship Project</h3>
        <p class="text-sm md:text-base mb-4">Summary of the project, goals, and outcomes.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <img src="/imgs/black_background.jpg" alt="Screenshot" class="rounded" loading="lazy" decoding="async" />
          <img src="/imgs/normal pic.jpg" alt="Screenshot" class="rounded" loading="lazy" decoding="async" />
        </div>
      </article>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesComponent {}
