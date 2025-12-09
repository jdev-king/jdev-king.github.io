import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngular, faNodeJs, faPython, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faRobot, faBrain } from '@fortawesome/free-solid-svg-icons';

enum TechCategory {
  Backend = 'backend',
  Frontend = 'frontend',
  Database = 'database',
  Cloud = 'cloud',
  AI = 'ai',
}

type TechItem = {
  id: string;
  name: string;
  category: TechCategory;
  version: string;
  latestVersion?: string;
  mastery: number;
  tools: string[];
};

function compareVersion(a: string | undefined, b: string | undefined): number {
  if (!a || !b) return 0;
  const na = a.replace(/[^0-9.]/g, '').split('.').map((x) => parseInt(x || '0', 10));
  const nb = b.replace(/[^0-9.]/g, '').split('.').map((x) => parseInt(x || '0', 10));
  const len = Math.max(na.length, nb.length);
  for (let i = 0; i < len; i++) {
    const da = na[i] || 0;
    const db = nb[i] || 0;
    if (da > db) return 1;
    if (da < db) return -1;
  }
  return 0;
}

@Component({
  selector: 'app-mastering-stack',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  styleUrl: './mastering-stack.component.scss',
  template: `
    <section class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-mono mb-6">Mastering Stack</h2>

      <div class="space-y-8">
        <ng-container *ngFor="let group of grouped()">
          <article class="mastering-section">
            <header class="flex items-center justify-between mb-4">
              <h3 class="section-title">{{ group.meta.label }}</h3>
            </header>

            <div class="mastering-grid" data-testid="grid-responsive">
              <ng-container *ngFor="let item of group.items">
                <div class="mastering-card" [ngClass]="'accent-' + item.category">
                  <div class="mastering-header">
                    <div>
                      <div class="mastering-title">{{ item.name }}</div>
                    </div>
                    <div *ngIf="isOutdated(item)" class="badge-outdated" aria-live="polite" data-testid="badge-outdated">
                      Update available
                    </div>
                  </div>

                  <div class="mastering-item-grid" [attr.data-testid]="'item-grid-' + item.id">
                    <div class="mastering-item-main">
                      <fa-icon [icon]="getIcon(item)" size="2x" class="mastering-icon" role="img" [attr.aria-label]="item.name + ' icon'" [attr.data-testid]="'icon-' + item.id"></fa-icon>
                      <div class="mastering-version">v{{ item.version }}</div>
                      <div class="mastering-progress" [attr.aria-label]="'Mastery for ' + item.name" role="progressbar" [attr.aria-valuenow]="item.mastery" aria-valuemin="0" aria-valuemax="100" [attr.data-testid]="'progress-' + item.id">
                        <div class="progress-bar">
                          <div class="progress-fill" [style.width.%]="item.mastery"></div>
                        </div>
                        <div class="progress-label">{{ item.mastery }}%</div>
                      </div>
                    </div>

                    <div *ngIf="item.tools.length > 0" class="mastering-tools" [attr.data-testid]="'tools-col-' + item.id">
                      <div class="mastering-tools-title">Complementary tools</div>
                      <ul class="mastering-tools-list">
                        <li *ngFor="let t of item.tools" class="mastering-tool-item">{{ t }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
          </article>
        </ng-container>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasteringStackComponent {
  private readonly categoryMeta = {
    [TechCategory.Backend]: { label: 'Backend', color: 'bg-blue-600', accent: 'blue-500' },
    [TechCategory.Frontend]: { label: 'Frontend', color: 'bg-red-600', accent: 'red-500' },
    [TechCategory.Database]: { label: 'Databases', color: 'bg-purple-600', accent: 'purple-500' },
    [TechCategory.Cloud]: { label: 'Cloud', color: 'bg-cyan-600', accent: 'cyan-500' },
    [TechCategory.AI]: { label: 'AI', color: 'bg-orange-600', accent: 'orange-500' },
  } as const;

  readonly items = signal<ReadonlyArray<TechItem>>([
    {
      id: 'node',
      name: 'Node.js (TypeScript)',
      category: TechCategory.Backend,
      version: '22.9.0 + TS 5.7',
      latestVersion: '22.9.0 + TS 5.7',
      mastery: 88,
      tools: ['Jest', 'Async programming'],
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      category: TechCategory.Backend,
      version: '0.115.6',
      latestVersion: '0.115.6',
      mastery: 82,
      tools: ['pytest'],
    },
    {
      id: 'angular',
      name: 'Angular',
      category: TechCategory.Frontend,
      version: '19.1',
      latestVersion: '19.1',
      mastery: 90,
      tools: ['Jest', 'PrimeNG', 'Tailwind', 'Signals'],
    },
    {
      id: 'postgres',
      name: 'PostgreSQL',
      category: TechCategory.Database,
      version: '16',
      latestVersion: '16',
      mastery: 84,
      tools: [],
    },
    {
      id: 'gcloud',
      name: 'Google Cloud',
      category: TechCategory.Cloud,
      version: 'gcloud 492.0.0',
      latestVersion: 'gcloud 492.0.0',
      mastery: 78,
      tools: [],
    },
    {
      id: 'vertex',
      name: 'Google Vertex AI',
      category: TechCategory.AI,
      version: 'Vertex AI v1',
      latestVersion: 'Vertex AI v1',
      mastery: 76,
      tools: ['CrewAI', 'LangGraph', 'Langfuse'],
    },
  ]);

  readonly expanded = signal<Record<string, boolean>>({});

  readonly grouped = computed(() => {
    const groups: Record<string, { meta: { label: string; color: string; accent: string }; items: TechItem[] }> = {};
    for (const item of this.items()) {
      const meta = this.categoryMeta[item.category];
      const key = item.category;
      if (!groups[key]) groups[key] = { meta, items: [] };
      groups[key].items.push(item);
    }
    return Object.values(groups);
  });

  toggle(id: string) {
    const map = { ...this.expanded() };
    map[id] = !map[id];
    this.expanded.set(map);
  }

  isOutdated(item: TechItem): boolean {
    return compareVersion(item.version, item.latestVersion) < 0;
  }

  getIcon(item: TechItem): any {
    switch (item.id) {
      case 'angular':
        return faAngular;
      case 'node':
        return faNodeJs;
      case 'fastapi':
        return faPython;
      case 'postgres':
        return faDatabase;
      case 'gcloud':
        return faGoogle;
      case 'vertex':
        return faRobot;
      default:
        return faBrain;
    }
  }
}
