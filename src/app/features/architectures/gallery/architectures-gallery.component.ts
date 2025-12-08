import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../../shared/services/analytics.service';

interface ArchitectureCard {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
}

@Component({
  selector: 'app-architectures-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-mono mb-6">Designed Solutions Architecture</h2>
      <p class="text-sm md:text-base mb-8">Gallery of cloud and software architectures.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (item of items; track item.id) {
          <a [routerLink]="['/architectures', item.id]" class="rounded-lg p-4 border" (click)="track(item)">
            <h3 class="text-lg md:text-xl font-semibold mb-2">{{ item.title }}</h3>
            <p class="text-sm md:text-base line-clamp-3">{{ item.summary }}</p>
          </a>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitecturesGalleryComponent {
  private readonly analytics = new AnalyticsService();
  readonly items: ArchitectureCard[] = [
    { id: 'event-driven-orders', title: 'Event-Driven Orders', summary: 'Scalable ordering with idempotent processing and saga orchestration.' },
    { id: 'data-analytics-pipeline', title: 'Analytics Pipeline', summary: 'Batch and streaming analytics across data lake and warehouse.' },
    { id: 'multi-region-api', title: 'Multi-Region API', summary: 'Global edge routing with active-active failover and eventual consistency.' },
  ];

  track(item: ArchitectureCard): void {
    this.analytics.track('architecture_view', { id: item.id, title: item.title });
  }
}
