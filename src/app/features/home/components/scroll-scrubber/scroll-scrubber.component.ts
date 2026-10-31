import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  signal,
  computed,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchifyViewerComponent } from '../../../../shared/components/archify-viewer/archify-viewer.component';

interface PipelineStage {
  id: string;
  step: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  architectureHighlight: string;
  tech: string[];
  metrics: { label: string; value: string; sub: string }[];
  diagramRoute: string;
  archifyHtml: string;
  diagramTitle: string;
}

@Component({
  selector: 'app-scroll-scrubber',
  standalone: true,
  imports: [CommonModule, RouterModule, ArchifyViewerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Section Heading -->
    <div class="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
      <div>
        <div class="section-kicker mb-2">
          <span>01 / PIPELINE DE ARQUITECTURA CONTROLADO POR SCROLL</span>
        </div>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          De Datos Transaccionales a Inferencia GraphRAG en Tiempo Real
        </h2>
        <p class="text-muted text-sm sm:text-base max-w-2xl mt-2">
          Desplázate verticalmente para recorrer cómo viaja un evento empresarial por las 4 etapas de arquitectura en producción, o selecciona una etapa para inspeccionar su diagrama interactivo Archify.
        </p>
      </div>

      <div class="flex items-center gap-3 self-start lg:self-end">
        <div class="scrub-readout">
          <span class="text-xs font-mono text-muted">ESTADO DEL TRAZADO</span>
          <span class="text-sm font-mono font-bold" style="color: var(--color-accent);">
            {{ scrubPercent() }}% · ETAPA {{ activeStage().step }}/04
          </span>
        </div>
      </div>
    </div>

    <!-- Tall Scroll Runway (Sticky on Desktop) -->
    <div #runwayElement class="scrolly-runway">
      <div class="scrolly-sticky-stage">
        <div class="stage-frame eng-card">
          <!-- Top Master Scrub Bar -->
          <div class="stage-top-bar">
            <div class="flex items-center gap-2.5">
              <span class="font-mono text-xs font-semibold tracking-wider" style="color: var(--color-text);">
                TRAZADO DE TOPOLOGÍA // {{ activeStage().tag }}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div class="flex items-center gap-2">
                <label for="pipeline-scrub-slider" class="font-mono text-xs text-muted">
                  Posición:
                </label>
                <input
                  id="pipeline-scrub-slider"
                  type="range"
                  min="0"
                  max="100"
                  [value]="scrubPercent()"
                  (input)="onSliderInput($event)"
                  class="scrub-slider"
                />
              </div>
              <button
                type="button"
                (click)="toggleLiveArchify()"
                [attr.aria-pressed]="showInlineArchify()"
                class="btn-tactile preview-toggle-btn"
                [class.is-open]="showInlineArchify()"
              >
                <span>{{ showInlineArchify() ? 'Ver Esquema de Trazado' : 'Abrir Visor Archify Aquí' }}</span>
              </button>
            </div>
          </div>

          <!-- Main 12-Col Grid Inside Sticky Stage -->
          <div class="grid grid-cols-1 lg:grid-cols-12">
            <!-- Left Column (4 cols): 4 Interactive Chapters with Continuous Progress Rails -->
            <div class="lg:col-span-4 stage-chapters">
              @for (stage of stages; track stage.id; let i = $index) {
                <button
                  type="button"
                  (click)="jumpToStage(i)"
                  [attr.aria-pressed]="activeStageIndex() === i"
                  class="chapter-btn"
                  [class.is-active]="activeStageIndex() === i"
                  [class.is-completed]="activeStageIndex() > i"
                >
                  <!-- Vertical Scroll Fill Rail -->
                  <div class="chapter-rail" aria-hidden="true">
                    <div
                      class="chapter-rail-fill"
                      [style.transform]="'scaleY(' + getStageFill(i) + ')'"
                    ></div>
                  </div>

                  <div class="chapter-content">
                    <div class="flex items-center justify-between gap-2">
                      <span
                        class="font-mono text-xs font-bold"
                        [style.color]="activeStageIndex() === i ? 'var(--color-accent)' : 'var(--color-muted)'"
                      >
                        ETAPA {{ stage.step }}
                      </span>
                      <span class="font-mono text-[11px] text-muted">
                        {{ i * 25 }}% a {{ (i + 1) * 25 }}%
                      </span>
                    </div>
                    <div class="chapter-title">{{ stage.shortTitle }}</div>
                    <div class="chapter-subtitle">{{ stage.subtitle }}</div>
                  </div>
                </button>
              }
            </div>

            <!-- Right Column (8 cols): Scroll-Scrubbed Topology SVG + Telemetry OR Live Archify Embed -->
            <div class="lg:col-span-8 stage-viewport">
              @if (!showInlineArchify()) {
                <!-- 1. Interactive Scroll-Scrubbed SVG Schematic (Theme-adaptive via CSS variables per R-34) -->
                <div class="schematic-box">
                  <div class="schematic-header">
                    <span class="font-mono text-xs text-muted">
                      FLUJO DE PAQUETES EN TIEMPO REAL (X={{ packetX() | number:'1.0-0' }}px)
                    </span>
                    <span class="font-mono text-xs font-semibold" style="color: var(--color-accent);">
                      {{ activeStage().diagramTitle }}
                    </span>
                  </div>

                  <svg
                    viewBox="0 0 800 220"
                    width="800"
                    height="220"
                    class="w-full h-auto select-none"
                    role="img"
                    aria-label="Diagrama de pipeline interactivo controlado por scroll a través de las 4 etapas de arquitectura"
                  >
                    <!-- Zone Background Boundaries -->
                    <!-- Zone 0: Edge CDC -->
                    <rect
                      x="20" y="20" width="175" height="175" rx="8"
                      style="fill: var(--color-surface);"
                      [style.stroke]="activeStageIndex() === 0 ? 'var(--color-accent)' : 'var(--color-border-strong)'"
                      [attr.stroke-width]="activeStageIndex() === 0 ? '2' : '1'"
                      stroke-dasharray="4 3"
                    />
                    <text x="34" y="42" style="fill: var(--color-muted);" font-family="Fira Code, monospace" font-size="10" font-weight="700">
                      01. ON-PREM EDGE
                    </text>

                    <!-- Zone 1: Stream & Star Schema -->
                    <rect
                      x="215" y="20" width="175" height="175" rx="8"
                      style="fill: var(--color-surface);"
                      [style.stroke]="activeStageIndex() === 1 ? 'var(--color-accent)' : 'var(--color-border-strong)'"
                      [attr.stroke-width]="activeStageIndex() === 1 ? '2' : '1'"
                      stroke-dasharray="4 3"
                    />
                    <text x="229" y="42" style="fill: var(--color-muted);" font-family="Fira Code, monospace" font-size="10" font-weight="700">
                      02. GCP DATAFLOW
                    </text>

                    <!-- Zone 2: Cognitive Firewall & GraphRAG -->
                    <rect
                      x="410" y="20" width="175" height="175" rx="8"
                      style="fill: var(--color-surface);"
                      [style.stroke]="activeStageIndex() === 2 ? 'var(--color-accent)' : 'var(--color-border-strong)'"
                      [attr.stroke-width]="activeStageIndex() === 2 ? '2' : '1'"
                      stroke-dasharray="4 3"
                    />
                    <text x="424" y="42" style="fill: var(--color-muted);" font-family="Fira Code, monospace" font-size="10" font-weight="700">
                      03. GKE GRAPHRAG
                    </text>

                    <!-- Zone 3: Enterprise Interop -->
                    <rect
                      x="605" y="20" width="175" height="175" rx="8"
                      style="fill: var(--color-surface);"
                      [style.stroke]="activeStageIndex() === 3 ? 'var(--color-accent)' : 'var(--color-border-strong)'"
                      [attr.stroke-width]="activeStageIndex() === 3 ? '2' : '1'"
                      stroke-dasharray="4 3"
                    />
                    <text x="619" y="42" style="fill: var(--color-muted);" font-family="Fira Code, monospace" font-size="10" font-weight="700">
                      04. ENTERPRISE API
                    </text>

                    <!-- Base Inactive Pipeline Track -->
                    <line
                      x1="60" y1="112" x2="740" y2="112"
                      style="stroke: var(--color-border-strong);"
                      stroke-width="3"
                      stroke-linecap="round"
                    />

                    <!-- Active Scroll-Scrubbed Pipeline Track -->
                    <line
                      x1="60" y1="112"
                      [attr.x2]="packetX()"
                      y2="112"
                      style="stroke: var(--color-accent);"
                      stroke-width="4"
                      stroke-linecap="round"
                    />

                    <!-- Architecture Nodes -->
                    <!-- Node 0: MySQL + Debezium -->
                    <g>
                      <rect
                        x="42" y="76" width="130" height="72" rx="6"
                        style="fill: var(--color-surface-2);"
                        [style.stroke]="rawProgress() >= 0 ? 'var(--color-accent)' : 'var(--color-border-strong)'"
                        stroke-width="1.5"
                      />
                      <text x="107" y="103" text-anchor="middle" style="fill: var(--color-text);" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="700">
                        Debezium CDC
                      </text>
                      <text x="107" y="121" text-anchor="middle" style="fill: var(--color-muted);" font-family="Fira Code, monospace" font-size="9.5">
                        MySQL Binlog / PubSub
                      </text>
                      <text x="107" y="138" text-anchor="middle" style="fill: var(--color-accent);" font-family="Fira Code, monospace" font-size="9" font-weight="600">
                        0.0% DB Locks
                      </text>
                    </g>

                    <!-- Node 1: Dataflow + BigQuery -->
                    <g>
                      <rect
                        x="237" y="76" width="130" height="72" rx="6"
                        style="fill: var(--color-surface-2);"
                        [style.stroke]="rawProgress() >= 0.25 ? 'var(--color-accent)' : 'var(--color-border-strong)'"
                        stroke-width="1.5"
                      />
                      <text x="302" y="103" text-anchor="middle" style="fill: var(--color-text);" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="700">
                        Beam + BigQuery
                      </text>
                      <text x="302" y="121" text-anchor="middle" style="fill: var(--color-muted);" font-family="Fira Code, monospace" font-size="9.5">
                        Star Schema DW
                      </text>
                      <text x="302" y="138" text-anchor="middle" style="fill: var(--color-accent);" font-family="Fira Code, monospace" font-size="9" font-weight="600">
                        $1.83/mes TCO
                      </text>
                    </g>

                    <!-- Node 2: Redis + Neo4j GraphRAG -->
                    <g>
                      <rect
                        x="432" y="76" width="130" height="72" rx="6"
                        style="fill: var(--color-surface-2);"
                        [style.stroke]="rawProgress() >= 0.5 ? 'var(--color-accent)' : 'var(--color-border-strong)'"
                        stroke-width="1.5"
                      />
                      <text x="497" y="103" text-anchor="middle" style="fill: var(--color-text);" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="700">
                        Hybrid GraphRAG
                      </text>
                      <text x="497" y="121" text-anchor="middle" style="fill: var(--color-muted);" font-family="Fira Code, monospace" font-size="9.5">
                        Redis + Neo4j + CNPG
                      </text>
                      <text x="497" y="138" text-anchor="middle" style="fill: var(--color-accent);" font-family="Fira Code, monospace" font-size="9" font-weight="600">
                        &lt;50ms Cache Hit
                      </text>
                    </g>

                    <!-- Node 3: Claim-Check + Global ERP -->
                    <g>
                      <rect
                        x="627" y="76" width="130" height="72" rx="6"
                        style="fill: var(--color-surface-2);"
                        [style.stroke]="rawProgress() >= 0.75 ? 'var(--color-accent)' : 'var(--color-border-strong)'"
                        stroke-width="1.5"
                      />
                      <text x="692" y="103" text-anchor="middle" style="fill: var(--color-text);" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="700">
                        Claim-Check API
                      </text>
                      <text x="692" y="121" text-anchor="middle" style="fill: var(--color-muted);" font-family="Fira Code, monospace" font-size="9.5">
                        GCS + Firestore Lock
                      </text>
                      <text x="692" y="138" text-anchor="middle" style="fill: var(--color-accent);" font-family="Fira Code, monospace" font-size="9" font-weight="600">
                        DHL · Maersk · SAP
                      </text>
                    </g>

                    <!-- Scroll-Scrubbed Moving Data Packet -->
                    <g [attr.transform]="'translate(' + packetX() + ', 112)'">
                      <circle r="9" style="fill: var(--color-accent);" opacity="0.25" />
                      <circle r="5" style="fill: var(--color-surface); stroke: var(--color-accent);" stroke-width="3" />
                    </g>
                  </svg>
                </div>

                <!-- 2. Active Stage Specification & Metrics Details -->
                <div class="stage-details">
                  <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div class="flex items-center gap-2.5">
                      <span class="stage-badge">
                        ETAPA {{ activeStage().step }}
                      </span>
                      <h3 class="text-xl sm:text-2xl font-bold">
                        {{ activeStage().title }}
                      </h3>
                    </div>
                    <span class="font-mono text-xs text-muted">
                      {{ activeStage().architectureHighlight }}
                    </span>
                  </div>

                  <p class="text-sm sm:text-base text-secondary-theme leading-relaxed mb-5">
                    {{ activeStage().description }}
                  </p>

                  <!-- 3 KPI Cards -->
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    @for (m of activeStage().metrics; track $index) {
                      <div class="stage-kpi-card">
                        <div class="text-xs font-mono text-muted uppercase">{{ m.label }}</div>
                        <div class="text-xl font-bold mt-0.5" style="color: var(--color-accent);">
                          {{ m.value }}
                        </div>
                        <div class="text-[11px] font-mono text-muted mt-0.5">{{ m.sub }}</div>
                      </div>
                    }
                  </div>

                  <!-- Footer: Tech Stack + Direct Case Study Link -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-contrast">
                    <div class="flex flex-wrap gap-1.5">
                      @for (t of activeStage().tech; track $index) {
                        <span class="tech-chip">{{ t }}</span>
                      }
                    </div>

                    <div class="flex items-center gap-2.5 shrink-0">
                      <a [routerLink]="activeStage().diagramRoute" class="btn-tactile btn-primary-eng">
                        <span>Inspeccionar Especificación RFC</span>
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              } @else {
                <!-- Inline Live Archify Interactive Viewer -->
                <div class="p-4 sm:p-6">
                  <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span class="font-mono text-xs font-semibold" style="color: var(--color-accent);">
                      VISOR ARCHIFY EN VIVO: {{ activeStage().diagramTitle }}
                    </span>
                    <a [routerLink]="activeStage().diagramRoute" class="font-mono text-xs link-accent">
                      Abrir especificación RFC completa
                    </a>
                  </div>
                  <app-archify-viewer
                    [src]="activeStage().archifyHtml"
                    [title]="activeStage().diagramTitle"
                    height="470px"
                  ></app-archify-viewer>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .scrub-readout {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0.9rem;
      border-radius: 0.375rem;
      background-color: var(--color-surface);
      border: 1px solid var(--color-border-strong);
    }

    /* Sticky Scroll Runway on Desktop */
    @media (min-width: 1024px) {
      .scrolly-runway {
        min-height: 240vh;
        position: relative;
      }
      .scrolly-sticky-stage {
        position: sticky;
        top: 5.25rem;
        z-index: 20;
      }
    }

    .stage-frame {
      overflow: hidden;
      border: 1px solid var(--color-border-strong);
    }

    .stage-top-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.65rem 1.25rem;
      background-color: var(--color-bg-elevated);
      border-bottom: 1px solid var(--color-border);
    }

    .scrub-slider {
      width: 140px;
      height: 6px;
      border-radius: 4px;
      appearance: none;
      background: var(--color-surface-2);
      accent-color: var(--color-accent);
    }

    .preview-toggle-btn {
      min-height: 2.75rem;
      padding: 0.45rem 0.85rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.75rem;
      border-radius: 0.375rem;
      background-color: var(--color-surface);
      color: var(--color-text);
      border: 1px solid var(--color-border-strong);
    }

    .preview-toggle-btn.is-open {
      background-color: var(--color-accent);
      color: var(--color-accent-contrast);
      border-color: var(--color-accent);
    }

    .stage-chapters {
      display: flex;
      flex-direction: column;
      background-color: var(--color-bg-elevated);
      border-bottom: 1px solid var(--color-border);
    }

    @media (min-width: 1024px) {
      .stage-chapters {
        border-bottom: none;
        border-right: 1px solid var(--color-border);
      }
    }

    .chapter-btn {
      position: relative;
      display: flex;
      align-items: stretch;
      gap: 0.875rem;
      min-height: 4.5rem;
      padding: 1rem 1.25rem;
      text-align: left;
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--color-border);
      transition: background-color var(--duration-fast) var(--ease-out);
    }

    .chapter-btn:last-child {
      border-bottom: none;
    }

    @media (hover: hover) and (pointer: fine) {
      .chapter-btn:hover {
        background-color: var(--color-surface);
      }
    }

    .chapter-btn.is-active {
      background-color: var(--color-surface);
    }

    .chapter-rail {
      width: 4px;
      border-radius: 2px;
      background-color: var(--color-surface-2);
      overflow: hidden;
      flex-shrink: 0;
    }

    .chapter-rail-fill {
      width: 100%;
      height: 100%;
      background-color: var(--color-accent);
      transform-origin: 50% 0%;
      will-change: transform;
    }

    .chapter-content {
      flex: 1;
      min-width: 0;
    }

    .chapter-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.98rem;
      font-weight: 700;
      color: var(--color-text);
      margin-top: 0.2rem;
    }

    .chapter-subtitle {
      font-size: 0.78rem;
      color: var(--color-muted);
      margin-top: 0.15rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .stage-viewport {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: var(--color-surface);
    }

    .schematic-box {
      padding: 1rem 1.25rem 0.5rem;
      background-color: var(--color-bg-elevated);
      border-bottom: 1px solid var(--color-border);
    }

    .schematic-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.35rem;
    }

    .stage-details {
      padding: 1.35rem 1.5rem;
    }

    .stage-badge {
      padding: 0.2rem 0.55rem;
      border-radius: 0.25rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--color-accent);
      background-color: var(--color-surface-2);
      border: 1px solid var(--color-border-strong);
    }

    .stage-kpi-card {
      padding: 0.875rem 1rem;
      border-radius: 0.375rem;
      background-color: var(--color-bg-elevated);
      border: 1px solid var(--color-border);
    }
  `]
})
export class ScrollScrubberComponent implements OnInit, OnDestroy {
  @ViewChild('runwayElement') runwayElement?: ElementRef<HTMLDivElement>;

  readonly stages: PipelineStage[] = [
    {
      id: 'ingestion-cdc',
      step: '01',
      shortTitle: 'Middleware On-Premise y CDC',
      title: 'SCE Connect, NexusFlow CDC y Robot Framework',
      subtitle: 'Spring Boot / Debezium Binlog / HMAC-SHA256 & AES-256',
      tag: 'SCE CONNECT & NEXUSFLOW · ON-PREM EDGE',
      description:
        'SCE Connect y el agente Nexus Guard operan en el servidor local del cliente sin exponer puertos de base de datos a internet. Capturan cambios mediante Debezium Binlog CDC y colas transaccionales, validan firmas entrantes HMAC-SHA256 y API Keys con caché Caffeine, cifran conexiones externas con AES-256 y reportan latidos de salud cada 5 minutos mediante SCE Robot Framework.',
      architectureHighlight: 'Diagrama: nexusflow_diagram.html',
      tech: ['SCE Connect Middleware', 'Debezium Binlog CDC', 'SCE Robot Framework', 'HMAC-SHA256 & AES-256', 'Google Pub/Sub & AWS S3'],
      metrics: [
        { label: 'Latencia de Captura', value: '<1.2s', sub: 'Streaming continuo Binlog' },
        { label: 'Impacto en ERP Legacy', value: '0.0% Locks', sub: 'Sin lecturas sobre tablas activas' },
        { label: 'Seguridad y Salud', value: 'HMAC + TLS 1.3', sub: 'Heartbeats cada 5m y AES-256' },
      ],
      diagramRoute: '/architectures/nexusflow-v1',
      archifyHtml: '/architectures/nexusflow_diagram.html',
      diagramTitle: 'NexusFlow v1.0: Hybrid Enterprise ERP Integration',
    },
    {
      id: 'stream-transformation',
      step: '02',
      shortTitle: 'Analítica Multi-Stage, OBTs y BI',
      title: 'Plataforma Analítica (Stages A/B/C, OBTs) y Sumax Analytics',
      subtitle: 'AWS S3 & PySpark / Cloud Dataflow & BigQuery / Apache Superset Fork',
      tag: 'ANALYTICS PLATFORM & SUMAX BI · MULTI-CLOUD',
      description:
        'Las extracciones históricas e incrementales alimentan dos flujos analíticos desacoplados: el pipeline en AWS S3 procesado con PySpark (Stages A, B y C) hacia modelos OBT (One Big Tables) para Aduanas, Carga, Transporte y Contabilidad consumidos en Sumax Analytics (fork corporativo de Apache Superset con SSO JIT), y el puente en streaming con Apache Beam hacia BigQuery.',
      architectureHighlight: 'Diagrama: analytics-bridge_dataflow.html',
      tech: ['PySpark Stages A/B/C', 'Modelos OBT (4 Dominios)', 'Sumax Analytics (Superset)', 'Cloud Dataflow & BigQuery', 'AWS S3 & Redshift/Postgres'],
      metrics: [
        { label: 'Dominios Modelados', value: '04 OBTs', sub: 'Aduanas, Carga, Transporte, Finanzas' },
        { label: 'Costo Streaming / Mes', value: '$1.83 a $4.33', sub: 'Dataflow + Star Schema BigQuery' },
        { label: 'Capa de Consumo BI', value: 'Superset SSO', sub: 'Fork corporativo con JIT en AWS ECR' },
      ],
      diagramRoute: '/architectures/analytics-bridge',
      archifyHtml: '/architectures/analytics-bridge_dataflow.html',
      diagramTitle: 'Unified Analytics Bridge: Real-Time Data Pipeline',
    },
    {
      id: 'cognitive-firewall',
      step: '03',
      shortTitle: 'GraphRAG Híbrido y Factory IA',
      title: 'Fortress Lite GraphRAG y AI Software Factory Multi-Agente',
      subtitle: 'GKE / Redis (<50ms) / Neo4j + pgvector / EventCatalog MCP',
      tag: 'SINTAD AI AGENT V3.1 & SOFTWARE FACTORY',
      description:
        'Para atender 33,333 consultas diarias de comercio exterior con menos de $800 USD/mes, Redis resuelve el 40% del tráfico recurrente en menos de 50ms antes de enrutar hacia agentes LightRAG sobre Neo4j y CloudNativePG pgvector. En paralelo, la Software Factory multi-agente (zonas DEV y OPS con EventCatalog y puerta determinista de QA) automatiza especificaciones, desarrollo y auditoría de código.',
      architectureHighlight: 'Diagrama: sintad-ai-agent_diagram.html',
      tech: ['Redis Semantic Cache', 'Neo4j & pgvector GraphRAG', 'Gemini Flash on GKE', 'EventCatalog & MCP', 'LiteLLM & Langfuse'],
      metrics: [
        { label: 'Ahorro en Inferencia', value: '-95% Costo', sub: 'Migración a Gemini Flash + Cache' },
        { label: 'Latencia Cache Hit', value: '<50ms', sub: '40% de consultas resueltas al instante' },
        { label: 'Capacidad Operativa', value: '33,333 / día', sub: 'GKE + Zonas aisladas DEV / OPS' },
      ],
      diagramRoute: '/architectures/sintad-ai-agent',
      archifyHtml: '/architectures/sintad-ai-agent_diagram.html',
      diagramTitle: 'SINTAD AI Knowledge Agent: Fortress Lite v3.1',
    },
    {
      id: 'enterprise-interop',
      step: '04',
      shortTitle: 'Interoperabilidad B2B y EDI/XML',
      title: 'Orquestación B2B Global (DHL · Maersk · UPS · CEVA · Ripley · Astara)',
      subtitle: 'CargoWise eAdapter / ANSI X12 Smooks / Azure Serverless / AWS SQS',
      tag: 'ENTERPRISE B2B ECOSYSTEM · 20+ SISTEMAS',
      description:
        'Conecta la operación aduanera con socios globales mediante protocolos especializados: sincronización bidireccional con CargoWise One (eAdapter XML/SFTP) y traducción EDI X12 214 / CUSDEC con Smooks para DHL (HP, Schneider, Lenovo), API REST serverless en Azure Functions para Maersk, procesamiento en streaming StAX/CUSRES para UPS (Cisco y Dell), colas AWS SQS para Ripley e integración SAP vía MuleSoft para Astara.',
      architectureHighlight: 'Diagrama: nexusflow_sequenceOutbound.html',
      tech: ['CargoWise eAdapter XML', 'ANSI X12 / EDIFACT Smooks', 'Azure Functions FastAPI', 'AWS SQS & MuleSoft', 'Cloud Run Claim-Check'],
      metrics: [
        { label: 'Sistemas B2B en Prod', value: '20+ Activos', sub: 'Robots SFTP, EDI X12, APIs y Colas' },
        { label: 'Garantía de Entrega', value: '100% Idempotente', sub: 'Claim-Check en GCS y colas SQS' },
        { label: 'Operadores Globales', value: '07 Ecosistemas', sub: 'DHL, Maersk, UPS, CEVA, Ripley, Astara' },
      ],
      diagramRoute: '/architectures/nexusflow-v1',
      archifyHtml: '/architectures/nexusflow_sequenceOutbound.html',
      diagramTitle: 'NexusFlow Outbound Event Processing Sequence',
    },
  ];

  readonly activeStageIndex = signal(0);
  readonly rawProgress = signal(0.12);
  readonly showInlineArchify = signal(false);

  readonly activeStage = computed(() => this.stages[this.activeStageIndex()]);
  readonly scrubPercent = computed(() => Math.round(this.rawProgress() * 100));
  readonly packetX = computed(() => 60 + this.rawProgress() * 680);

  private rafId: number | null = null;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof window === 'undefined') return;
    if (this.rafId !== null) return;
    this.rafId = window.requestAnimationFrame(() => {
      this.rafId = null;
      this.computeScrollProgress();
    });
  }

  private computeScrollProgress(): void {
    const el = this.runwayElement?.nativeElement;
    if (!el || typeof window === 'undefined') return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 800;

    // On desktop (>=1024px), the runway is tall (250vh) and sticky
    if (window.innerWidth >= 1024) {
      const scrollableDistance = rect.height - vh * 0.75;
      if (scrollableDistance <= 0) return;
      const scrolled = -rect.top + vh * 0.2;
      if (scrolled < 0 || rect.bottom < vh * 0.25) {
        if (scrolled < 0) {
          this.rawProgress.set(0.05);
          this.activeStageIndex.set(0);
        }
        return;
      }
      const p = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      this.rawProgress.set(p);
      const idx = Math.min(Math.floor(p * this.stages.length), this.stages.length - 1);
      this.activeStageIndex.set(idx);
    }
  }

  getStageFill(index: number): number {
    const p = this.rawProgress();
    const start = index * 0.25;
    const end = (index + 1) * 0.25;
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / 0.25;
  }

  jumpToStage(index: number): void {
    const targetProgress = index * 0.25 + 0.12;
    this.activeStageIndex.set(index);
    this.rawProgress.set(targetProgress);

    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && this.runwayElement?.nativeElement) {
      const el = this.runwayElement.nativeElement;
      const rect = el.getBoundingClientRect();
      const runwayTop = rect.top + window.scrollY;
      const scrollableDistance = rect.height - window.innerHeight * 0.75;
      const targetScrollY = runwayTop + (index / this.stages.length) * scrollableDistance;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }

  onSliderInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const val = Number(target.value) / 100;
    this.rawProgress.set(val);
    const idx = Math.min(Math.floor(val * this.stages.length), this.stages.length - 1);
    this.activeStageIndex.set(idx);
  }

  toggleLiveArchify(): void {
    this.showInlineArchify.update((v) => !v);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => this.computeScrollProgress(), 80);
    }
  }

  ngOnDestroy(): void {
    if (this.rafId !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(this.rafId);
    }
  }
}

