import { CommonModule } from '@angular/common';
import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../../shared/services/analytics.service';
import { ArchifyViewerComponent } from '../../../shared/components/archify-viewer/archify-viewer.component';

interface ArchitectureBlueprint {
  readonly id: string;
  readonly code: string;
  readonly version: string;
  readonly date: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly kpis: { label: string; value: string }[];
  readonly tags: string[];
  readonly diagrams: {
    id: string;
    label: string;
    type: string;
    src: string;
    title: string;
  }[];
}

@Component({
  selector: 'app-architectures-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, ArchifyViewerComponent],
  styleUrl: './architectures-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Hero Header (No pill badge above H1 per R-09) -->
      <header class="mb-10 pb-8 border-b border-contrast">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Especificaciones de Arquitectura (RFCs) y Laboratorio Archify
            </h1>
            <p class="font-mono text-xs text-muted mt-2">
              DOCUMENTACIÓN DE INGENIERÍA EN PRODUCCIÓN · AICSAC / SINTAD · 6 DIAGRAMAS INTERACTIVOS
            </p>
            <p class="text-secondary-theme text-base sm:text-lg max-w-3xl mt-3">
              Repositorio de especificaciones técnicas de sistemas distribuidos e inteligencia artificial compiladas con <strong>Archify</strong>. Inspecciona cada topología en tiempo real o abre el documento RFC completo.
            </p>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <div class="stat-pill">
              <span class="font-mono text-xs text-muted">SISTEMAS</span>
              <span class="font-mono text-sm font-bold" style="color: var(--color-accent);">03 RFCs</span>
            </div>
            <div class="stat-pill">
              <span class="font-mono text-xs text-muted">ARTEFACTOS ARCHIFY</span>
              <span class="font-mono text-sm font-bold text-primary-theme">06 INTERACTIVOS</span>
            </div>
          </div>
        </div>
      </header>

      <!-- 1. Flagship RFC Specification (Hierarchical differentiation per R-14) -->
      @if (architectures[0]; as flagship) {
        <article class="blueprint-card eng-card eng-card-interactive mb-6">
          <div class="card-meta-bar">
            <span class="font-mono text-xs font-bold" style="color: var(--color-accent);">
              ARQUITECTURA PRINCIPAL · {{ flagship.code }} · v{{ flagship.version }} ({{ flagship.date }})
            </span>
            <span class="font-mono text-xs text-muted">
              {{ flagship.diagrams.length }} Diagrama Archify
            </span>
          </div>

          <div class="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-8">
              <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5">
                <a [routerLink]="['/architectures', flagship.id]" (click)="track(flagship)" class="hover:underline">
                  {{ flagship.title }}
                </a>
              </h2>
              <div class="font-mono text-xs text-muted mb-3">
                {{ flagship.subtitle }}
              </div>
              <p class="text-sm sm:text-base text-secondary-theme leading-relaxed mb-5">
                {{ flagship.description }}
              </p>
              <div class="flex flex-wrap gap-1.5">
                @for (tag of flagship.tags; track tag) {
                  <span class="tech-chip">{{ tag }}</span>
                }
              </div>
            </div>

            <div class="lg:col-span-4 flex flex-col gap-3 lg:border-l lg:border-contrast lg:pl-6">
              <div class="grid grid-cols-3 gap-2">
                @for (kpi of flagship.kpis; track kpi.label) {
                  <div class="mini-kpi">
                    <div class="mini-kpi-val" style="color: var(--color-accent);">{{ kpi.value }}</div>
                    <div class="mini-kpi-lbl">{{ kpi.label }}</div>
                  </div>
                }
              </div>
              <a
                [routerLink]="['/architectures', flagship.id]"
                (click)="track(flagship)"
                class="btn-tactile btn-primary-eng w-full justify-between"
              >
                <span>Abrir Especificación RFC-AI-301</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </article>
      }

      <!-- 2. Supporting Architecture Specifications (2-Column Grid) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        @for (item of architectures.slice(1); track item.id) {
          <article class="blueprint-card eng-card eng-card-interactive flex flex-col justify-between">
            <div>
              <div class="card-meta-bar">
                <span class="font-mono text-xs font-bold text-primary-theme">
                  {{ item.code }} · v{{ item.version }} ({{ item.date }})
                </span>
                <span class="font-mono text-xs text-muted">
                  {{ item.diagrams.length }} Diagramas Archify
                </span>
              </div>

              <div class="p-6">
                <h2 class="text-xl font-bold tracking-tight mb-1.5">
                  <a [routerLink]="['/architectures', item.id]" (click)="track(item)" class="hover:underline">
                    {{ item.title }}
                  </a>
                </h2>
                <div class="font-mono text-xs text-muted mb-3">
                  {{ item.subtitle }}
                </div>
                <p class="text-sm text-secondary-theme leading-relaxed mb-5">
                  {{ item.description }}
                </p>

                <div class="grid grid-cols-3 gap-2 mb-5">
                  @for (kpi of item.kpis; track kpi.label) {
                    <div class="mini-kpi">
                      <div class="mini-kpi-val text-primary-theme">{{ kpi.value }}</div>
                      <div class="mini-kpi-lbl">{{ kpi.label }}</div>
                    </div>
                  }
                </div>

                <div class="flex flex-wrap gap-1.5">
                  @for (tag of item.tags; track tag) {
                    <span class="tech-chip">{{ tag }}</span>
                  }
                </div>
              </div>
            </div>

            <div class="card-footer-bar">
              <a
                [routerLink]="['/architectures', item.id]"
                (click)="track(item)"
                class="btn-tactile btn-secondary-eng w-full justify-between"
              >
                <span>Abrir Especificación y Diagramas</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        }
      </div>

      <!-- 3. Interactive Master Diagram Explorer (All 6 Archify Diagrams) -->
      <div class="eng-card p-6 sm:p-8">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-contrast">
          <div>
            <div class="section-kicker mb-1.5">
              <span>EXPLORADOR INTERACTIVO DE TOPOLOGÍAS (6 ARTEFACTOS)</span>
            </div>
            <h2 class="text-2xl font-bold">
              Laboratorio Interactivo de Diagramas Archify
            </h2>
            <p class="text-sm text-muted mt-0.5">
              Selecciona cualquiera de los 6 diagramas interactivos de arquitectura, secuencia, flujo de datos y CI/CD para inspeccionarlo aquí mismo.
            </p>
          </div>

          <a
            [routerLink]="['/architectures', activeDiagramEntry().archId]"
            class="btn-tactile btn-secondary-eng self-start lg:self-auto"
          >
            <span>Abrir RFC de {{ activeDiagramEntry().archTitle }}</span>
          </a>
        </div>

        <!-- 6 Diagram Selector Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6" role="group" aria-label="Seleccionar diagrama interactivo Archify">
          @for (d of allDiagrams; track d.id; let idx = $index) {
            <button
              type="button"
              (click)="selectDiagram(idx)"
              [attr.aria-pressed]="selectedDiagramIndex() === idx"
              class="diagram-tab-btn btn-tactile"
              [class.is-selected]="selectedDiagramIndex() === idx"
            >
              <div class="flex items-center justify-between w-full mb-1">
                <span class="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-surface border border-contrast font-bold" style="color: var(--color-accent);">
                  {{ d.type }}
                </span>
                <span class="font-mono text-[11px] text-muted">0{{ idx + 1 }}</span>
              </div>
              <div class="text-xs font-bold text-left truncate w-full" style="color: var(--color-text);">
                {{ d.label }}
              </div>
              <div class="text-[11px] text-muted text-left truncate w-full">
                {{ d.archTitle }}
              </div>
            </button>
          }
        </div>

        <!-- Embedded Archify Studio -->
        <app-archify-viewer
          [src]="activeDiagramEntry().src"
          [title]="activeDiagramEntry().title"
          [diagramType]="activeDiagramEntry().type"
          height="620px"
        ></app-archify-viewer>
      </div>
    </section>
  `,
})
export class ArchitecturesGalleryComponent {
  private readonly analytics = new AnalyticsService();

  readonly architectures: ArchitectureBlueprint[] = [
    {
      id: 'sintad-ai-agent',
      code: 'RFC-AI-301',
      version: '3.1',
      date: 'Diciembre 2025',
      title: 'SINTAD AI Knowledge Agent',
      subtitle: 'Fortress Lite · Hybrid GraphRAG & Cognitive Firewall',
      description:
        'Sistema conversacional en Kubernetes (GKE) diseñado para procesar 33,333 consultas diarias sobre normativas de Aduanas, Carga y Contabilidad con un presupuesto operativo de $800 USD/mes.',
      kpis: [
        { value: '33.3k/d', label: 'Consultas' },
        { value: '<50ms', label: 'Redis Hit' },
        { value: '-95%', label: 'Costo LLM' },
      ],
      tags: ['GraphRAG', 'Neo4j', 'Redis Cache', 'CloudNativePG', 'Gemini 1.5 Flash-8B', 'GKE'],
      diagrams: [
        {
          id: 'sintad-arch',
          label: '1. Arquitectura GraphRAG y Firewall Cognitivo',
          type: 'ARCHITECTURE',
          src: '/architectures/sintad-ai-agent_diagram.html',
          title: 'SINTAD AI Knowledge Agent: Fortress Lite v3.1',
        },
      ],
    },
    {
      id: 'nexusflow-v1',
      code: 'RFC-ERP-101',
      version: '1.0',
      date: 'Noviembre 2024',
      title: 'NexusFlow Hybrid ERP Platform',
      subtitle: 'Cloud-Driven, Edge-Executed Integration & CDC',
      description:
        'Plataforma de integración empresarial que conecta el ERP legacy SCE (MySQL 5.7) con Google Cloud mediante captura de cambios en tiempo real (Debezium), hidratación de estado en Firestore y patrón Claim-Check.',
      kpis: [
        { value: '0% Locks', label: 'Binlog CDC' },
        { value: '>1MB', label: 'Claim-Check' },
        { value: '100%', label: 'Idempotente' },
      ],
      tags: ['Debezium CDC', 'Cloud Run', 'Pub/Sub', 'Firestore', 'Claim-Check GCS', 'Zero-Trust'],
      diagrams: [
        {
          id: 'nexus-arch',
          label: '2. Arquitectura Global Híbrida (GCP y Edge)',
          type: 'ARCHITECTURE',
          src: '/architectures/nexusflow_diagram.html',
          title: 'NexusFlow v1.0: Hybrid Enterprise ERP Integration',
        },
        {
          id: 'nexus-seq',
          label: '3. Secuencia Outbound y Patrón Claim-Check',
          type: 'SEQUENCE',
          src: '/architectures/nexusflow_sequenceOutbound.html',
          title: 'NexusFlow Outbound Event Processing Sequence',
        },
      ],
    },
    {
      id: 'analytics-bridge',
      code: 'RFC-DATA-201',
      version: '2.0',
      date: 'Enero 2025',
      title: 'Unified Analytics Bridge',
      subtitle: 'Streaming ETL/ELT Pipeline & Star Schema Warehouse',
      description:
        'Pipeline de ingeniería de datos en tiempo real que homologa más de 15 tablas relacionales legacy hacia un esquema analítico Star Schema en BigQuery mediante Apache Beam en Cloud Dataflow y API serverless en Cloud Run.',
      kpis: [
        { value: '$1.83/m', label: 'TCO Cliente' },
        { value: '<120ms', label: 'Query SLA' },
        { value: '4 Repos', label: 'Multi-Cloud' },
      ],
      tags: ['Cloud Dataflow', 'Apache Beam', 'BigQuery Star Schema', 'FastAPI', 'AWS Angular MFE'],
      diagrams: [
        {
          id: 'ab-arch',
          label: '4. Arquitectura Multi-Cloud (On-Prem, GCP y AWS)',
          type: 'ARCHITECTURE',
          src: '/architectures/analytics-bridge_diagram.html',
          title: 'Unified Analytics Bridge: Solution Architecture',
        },
        {
          id: 'ab-dataflow',
          label: '5. Pipeline de Datos Streaming (5 Etapas)',
          type: 'DATAFLOW',
          src: '/architectures/analytics-bridge_dataflow.html',
          title: 'Unified Analytics Bridge: Real-Time Data Pipeline',
        },
        {
          id: 'ab-repoflow',
          label: '6. Flujo CI/CD Multi-Repositorio',
          type: 'WORKFLOW',
          src: '/architectures/analytics-bridge_repoflow.html',
          title: 'Unified Analytics Bridge: Multi-Repo CI/CD Flow',
        },
      ],
    },
  ];

  readonly allDiagrams = this.architectures.flatMap((arch) =>
    arch.diagrams.map((d) => ({
      ...d,
      archId: arch.id,
      archTitle: arch.title,
    }))
  );

  readonly selectedDiagramIndex = signal(0);
  readonly activeDiagramEntry = computed(() => this.allDiagrams[this.selectedDiagramIndex()]);

  selectDiagram(index: number): void {
    this.selectedDiagramIndex.set(index);
  }

  track(item: ArchitectureBlueprint): void {
    this.analytics.track('architecture_view', {
      id: item.id,
      title: item.title,
    });
  }
}

