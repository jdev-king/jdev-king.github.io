import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
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
  styleUrl: './architectures-gallery.component.scss',
  template: `
    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
      <header class="gallery-header mb-10 pb-6 border-b border-contrast">
        <div class="flex items-center gap-2 mb-2 font-mono text-xs">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            ARCHIFY POWERED
          </span>
          <span class="text-muted">// GRÁFICOS INTERACTIVOS & ESPECIFICACIONES</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-mono font-bold text-white mb-2">
          Designed Solutions Architecture
        </h2>
        <p class="text-muted text-base max-w-3xl">
          Arquitecturas cloud-native y de IA en producción, documentadas y renderizadas como gráficos interactivos standalone con Archify (zoom, pan, selección de nodos, temas e inspección profunda).
        </p>
      </header>

      <div class="gallery-grid">
        @for (item of architectures; track item.id) {
          <div class="arch-card flex flex-col justify-between group hover:border-blue-500/50 transition-all duration-200">
            <div class="arch-card-body">
              <!-- Live Badge -->
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[11px] font-mono font-semibold border border-blue-500/20">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Archify Interactive
                </span>
                <span class="text-xs font-mono text-muted">v{{ item.version || '1.0' }}</span>
              </div>

              <h3 class="arch-title text-xl font-mono font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                {{ item.title }}
              </h3>
              <p class="arch-summary text-sm text-gray-300 leading-relaxed mb-4">
                {{ item.description }}
              </p>

              <div class="arch-tags mb-4">
                <span *ngFor="let tag of item.tags" class="badge">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Card Footer Links -->
            <div class="p-4 pt-3 border-t border-contrast flex items-center justify-between gap-3 bg-surface/50">
              <a
                [routerLink]="['/architectures', item.id]"
                class="text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                (click)="track(item)"
              >
                <span>Ver Caso de Estudio</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>

              <a
                [href]="item.interactiveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-mono text-muted hover:text-white transition-colors flex items-center gap-1"
                title="Abrir gráfico interactivo standalone"
              >
                <span>Gráfico Standalone</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class ArchitecturesGalleryComponent {
  private http = inject(HttpClient);
  private readonly analytics = new AnalyticsService();
  architectures: any[] = [
    {
      id: 'nexusflow-v1',
      version: '1.0',
      title: 'NexusFlow v1.0: Integración Híbrida ERP',
      description:
        'Plataforma de alta disponibilidad que conecta ERPs Legacy con la Nube (GCP) utilizando arquitectura orientada a eventos, CDC (Debezium) y patrones de ejecución en el borde (Edge).',
      tags: [
        'Event-Driven',
        'GCP',
        'CDC / Debezium',
        'Docker',
        'Microservices',
      ],
      fileName: 'nexusflow-v1.md',
      interactiveUrl: '/architectures/nexusflow_diagram.html',
    },
    {
      id: 'sintad-ai-agent',
      version: '3.1',
      title: 'SINTAD AI Agent v3.1: IA & GraphRAG',
      description:
        'Arquitectura de IA conversacional optimizada en costos (<$1k/mes). Implementa RAG Híbrido (Grafos + Vectores), Caché Semántico con Redis y despliegue en Kubernetes.',
      tags: [
        'AI / LLM',
        'Kubernetes',
        'RAG',
        'Neo4j',
        'Redis',
        'Cost-Optimization',
      ],
      fileName: 'sintad-ai-v3.md',
      interactiveUrl: '/architectures/sintad-ai-agent_diagram.html',
    },
    {
      id: 'analytics-bridge',
      version: '2.0',
      title: 'Unified Analytics Bridge: Pipeline de Datos',
      description:
        'Solución de Ingeniería de Datos para analítica en tiempo real. Transformación de datos Legacy a esquemas modernos (Star Schema) usando Cloud Dataflow y BigQuery.',
      tags: [
        'Data Engineering',
        'BigQuery',
        'Dataflow',
        'ETL',
        'Python',
        'Analytics',
      ],
      fileName: 'analytics-bridge.md',
      interactiveUrl: '/architectures/analytics-bridge_diagram.html',
    },
  ];

  track(item: ArchitectureCard): void {
    this.analytics.track('architecture_view', {
      id: item.id,
      title: item.title,
    });
  }
}
