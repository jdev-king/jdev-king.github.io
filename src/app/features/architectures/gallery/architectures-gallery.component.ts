import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../../shared/services/analytics.service';
import { HttpClient } from '@angular/common/http';

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
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-mono mb-6">
        Designed Solutions Architecture
      </h2>
      <p class="text-sm md:text-base mb-8">
        Gallery of cloud and software architectures.
      </p>
      @if (loading()) {
        <div class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">  
        @for (item of architectures; track item.id) {
        <a
          [routerLink]="['/architectures', item.id]"
          class="rounded-lg p-4 border"
          (click)="track(item)"
        >
          <h3 class="text-lg md:text-xl font-semibold mb-2">
            {{ item.title }}
          </h3>
          <p class="text-sm md:text-base line-clamp-3">
            {{ item.description }}
          </p>
          <div class="tags">
            <span *ngFor="let tag of item.tags" class="badge">{{ tag }}</span>
          </div>
        </a>
        }
      </div>
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitecturesGalleryComponent implements OnInit {
  private http = inject(HttpClient);
  private readonly analytics = new AnalyticsService();
  architectures: any[] = [];
  loading = signal(true);


  ngOnInit(): void {
    this.http.get<any[]>('/architectures/manifest.json').subscribe({
      next: (data) => (this.architectures = data),
      error: (err) => console.error('Failed to load architectures manifest', err),
      complete: () => {
        this.loading.set(false);
        console.log('Architectures manifest loaded successfully');
      },
    });
  }

  track(item: ArchitectureCard): void {
    this.analytics.track('architecture_view', {
      id: item.id,
      title: item.title,
    });
  }
}
