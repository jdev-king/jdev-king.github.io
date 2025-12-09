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
  styleUrl: './architectures-gallery.component.scss',
  template: ` 
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
      <header class="gallery-header">
        <h2 class="gallery-title">Designed Solutions Architecture</h2>
        <p class="gallery-subtitle">Gallery of cloud and software architectures.</p>
      </header>
      @if (loading()) {
        <div class="gallery-loading" role="status" aria-live="polite">
          <div class="spinner" aria-label="Loading"></div>
        </div>
      } @else {
        <div class="gallery-grid">
          @for (item of architectures; track item.id) {
            <a
              [routerLink]="['/architectures', item.id]"
              class="arch-card"
              (click)="track(item)"
            >
              <div class="arch-card-body">
                <h3 class="arch-title">{{ item.title }}</h3>
                <p class="arch-summary">{{ item.description }}</p>
                <div class="arch-tags">
                  <span *ngFor="let tag of item.tags" class="badge">{{ tag }}</span>
                </div>
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
