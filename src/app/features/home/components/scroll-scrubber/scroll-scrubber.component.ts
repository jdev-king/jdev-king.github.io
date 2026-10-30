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

interface PipelineStage {
  id: string;
  step: string;
  title: string;
  tag: string;
  color: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  diagramRoute: string;
  diagramTitle: string;
}

@Component({
  selector: 'app-scroll-scrubber',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      #scrubberContainer
      class="scroll-scrubber-section relative rounded-2xl border border-contrast bg-surface/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden transition-all duration-300"
    >
      <!-- Background Ambient Glow -->
      <div
        class="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500"
        [style.background]="activeStage().color"
        style="opacity: 0.12;"
      ></div>
      <div
        class="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500"
        [style.background]="activeStage().color"
        style="opacity: 0.08;"
      ></div>

      <!-- Section Header -->
      <div class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-contrast">
        <div>
          <div class="flex items-center gap-2 mb-2 font-mono text-xs">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              SCROLL-SCRUBBED PIPELINE
            </span>
            <span class="text-muted hidden sm:inline">// RECORRIDO INTERACTIVO</span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold tracking-tight text-white">
            Architecture in Motion
          </h2>
          <p class="text-muted text-sm sm:text-base max-w-2xl mt-1">
            Desplaza la página hacia abajo o desliza el control para explorar cada capa de ingeniería: desde la captura en tiempo real hasta el razonamiento GraphRAG en producción.
          </p>
        </div>

        <!-- Real-time Scrub Indicator & Jump Pills -->
        <div class="flex items-center gap-2 self-start md:self-end">
          <span class="text-xs font-mono text-muted">Progreso:</span>
          <span class="text-xs font-mono font-bold text-blue-400 min-w-[3rem]">
            {{ scrubPercent() }}%
          </span>
        </div>
      </div>

      <!-- Interactive Scrubber Track -->
      <div class="relative z-10 mb-8">
        <!-- Stage Tabs / Quick Jump -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          <button
            *ngFor="let stage of stages; let i = index"
            type="button"
            (click)="selectStage(i)"
            class="text-left p-2.5 rounded-lg border transition-all duration-200 cursor-pointer"
            [class.border-blue-500]="activeStageIndex() === i"
            [class.bg-blue-500_10]="activeStageIndex() === i"
            [class.border-contrast]="activeStageIndex() !== i"
            [class.bg-surface]="activeStageIndex() !== i"
            [style.borderColor]="activeStageIndex() === i ? stage.color : null"
            [style.backgroundColor]="activeStageIndex() === i ? 'rgba(59, 130, 246, 0.08)' : null"
          >
            <div class="flex items-center justify-between font-mono text-[11px] mb-1">
              <span class="font-bold" [style.color]="activeStageIndex() === i ? stage.color : 'var(--color-muted)'">
                {{ stage.step }}
              </span>
              <span *ngIf="activeStageIndex() === i" class="w-1.5 h-1.5 rounded-full" [style.backgroundColor]="stage.color"></span>
            </div>
            <div class="text-xs font-medium truncate" [class.text-white]="activeStageIndex() === i" [class.text-muted]="activeStageIndex() !== i">
              {{ stage.title }}
            </div>
          </button>
        </div>

        <!-- Scrub Range Slider -->
        <div class="relative flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            [value]="scrubPercent()"
            (input)="onSliderInput($event)"
            class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
            aria-label="Scrub architecture stages"
          />
        </div>
      </div>

      <!-- Active Stage Card with Hardware-Accelerated Transition -->
      <div class="relative z-10 min-h-[360px] rounded-xl border border-contrast bg-[#0d1117] p-6 lg:p-8 flex flex-col justify-between transition-all duration-300">
        <div>
          <!-- Stage Top Bar -->
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div class="flex items-center gap-3">
              <span
                class="px-3 py-1 rounded-md text-xs font-mono font-bold"
                [style.backgroundColor]="activeStage().color + '15'"
                [style.color]="activeStage().color"
                [style.border]="'1px solid ' + activeStage().color + '40'"
              >
                FASE {{ activeStage().step }}
              </span>
              <h3 class="text-xl sm:text-2xl font-mono font-bold text-white">
                {{ activeStage().title }}
              </h3>
            </div>
            <span class="text-xs font-mono px-2.5 py-1 rounded bg-gray-800/80 text-gray-300 border border-gray-700/60">
              {{ activeStage().tag }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-sm sm:text-base text-gray-300 leading-relaxed mb-6 max-w-4xl">
            {{ activeStage().description }}
          </p>

          <!-- Metrics Row -->
          <div class="grid grid-cols-3 gap-3 mb-6">
            <div
              *ngFor="let m of activeStage().metrics"
              class="p-3 sm:p-4 rounded-lg bg-gray-900/80 border border-gray-800/80"
            >
              <div class="text-xs font-mono text-muted uppercase tracking-wider mb-1">
                {{ m.label }}
              </div>
              <div class="text-lg sm:text-2xl font-mono font-bold" [style.color]="activeStage().color">
                {{ m.value }}
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Action Bar & Tech Chips -->
        <div class="pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <!-- Tech Chips -->
          <div class="flex flex-wrap gap-1.5">
            <span
              *ngFor="let t of activeStage().tech"
              class="text-xs font-mono px-2.5 py-0.5 rounded bg-gray-800/60 text-gray-300 border border-gray-700/40"
            >
              {{ t }}
            </span>
          </div>

          <!-- Action Button -->
          <a
            [routerLink]="activeStage().diagramRoute"
            class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-lg hover:shadow-blue-500/20 whitespace-nowrap"
          >
            <span>Ver Gráfico Interactivo Archify</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    input[type='range']::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #3b82f6;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
      border: 2px solid #ffffff;
      transition: transform 0.15s ease;
    }
    input[type='range']::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollScrubberComponent implements OnInit, OnDestroy {
  @ViewChild('scrubberContainer') scrubberContainer?: ElementRef<HTMLDivElement>;

  readonly stages: PipelineStage[] = [
    {
      id: 'ingestion-cdc',
      step: '01',
      title: 'CDC & Ingestión On-Premise',
      tag: 'Edge-Executed • Debezium Engine',
      color: '#06B6D4', // Cyan
      description:
        'Captura de cambios en tiempo real desde el ERP legacy SCE (MySQL 5.7) mediante lectura no intrusiva de Binary Logs. Los eventos se transmiten de inmediato hacia Google Pub/Sub sin generar locks ni degradar la base de datos de producción.',
      tech: ['MySQL 5.7 SCE', 'Debezium CDC', 'Micro-VM Linux', 'Google Pub/Sub', 'Zero-Trust'],
      metrics: [
        { label: 'Latencia Ingestión', value: '<1.2s' },
        { label: 'Rendimiento', value: '33k+ ops/día' },
        { label: 'Impacto en BD', value: '0.0% Locks' },
      ],
      diagramRoute: '/architectures/nexusflow-v1',
      diagramTitle: 'NexusFlow v1.0',
    },
    {
      id: 'stream-transformation',
      step: '02',
      title: 'Normalización & Star Schema',
      tag: 'Cloud Dataflow • Apache Beam',
      color: '#3B82F6', // Blue
      description:
        'Motor de traducción universal en streaming. Unifica más de 15 tablas relacionales legacy de SCE y las transforma en tiempo real al modelo dimensional de negocio Star Schema en BigQuery, disponible para dashboards analíticos.',
      tech: ['Cloud Dataflow', 'Python Beam', 'Google BigQuery', 'Cloud Run', 'FastAPI'],
      metrics: [
        { label: 'Costo Cliente/Mes', value: '$1.83 - $4.33' },
        { label: 'Tablas Normalizadas', value: '15+ Tablas' },
        { label: 'SLA de Consultas', value: '<120ms' },
      ],
      diagramRoute: '/architectures/analytics-bridge',
      diagramTitle: 'Unified Analytics Bridge',
    },
    {
      id: 'cognitive-firewall',
      step: '03',
      title: 'Cognitive Firewall & GraphRAG',
      tag: 'Fortress Lite • Sub-50ms Cache',
      color: '#10B981', // Emerald
      description:
        'Arquitectura de IA conversacional ultra-optimizada. Redis intercepta el 40% de consultas recurrentes en <50ms mediante hashing semántico. Para consultas complejas, orquesta razonamiento híbrido en grafos con Neo4j y vectores con CloudNativePG.',
      tech: ['Redis Cache', 'Neo4j Graph DB', 'CloudNativePG pgvector', 'Gemini 1.5 Flash-8B', 'GKE'],
      metrics: [
        { label: 'Reducción Costos IA', value: '95%' },
        { label: 'Hit Rate Firewall', value: '40% en <50ms' },
        { label: 'TCO Mensual', value: '<$800 USD' },
      ],
      diagramRoute: '/architectures/sintad-ai-agent',
      diagramTitle: 'SINTAD AI Knowledge Agent',
    },
    {
      id: 'enterprise-interop',
      step: '04',
      title: 'Interoperabilidad & Claim-Check',
      tag: 'DHL • Maersk • Expeditors • Ripley',
      color: '#8B5CF6', // Purple
      description:
        'Capa de integración empresarial asíncrona entre SAP B1, CargoWise, ERPs propietarios y APIs modernas. Implementa hidratación de estado con Firestore y el patrón Claim-Check en Cloud Storage para payloads de gran tamaño (>1MB).',
      tech: ['FastAPI', 'Spring Boot', 'Claim-Check GCS', 'Firestore State', 'Terraform', 'GitLab CI'],
      metrics: [
        { label: 'Idempotencia', value: '100% Blindada' },
        { label: 'Payloads Soportados', value: '>100MB' },
        { label: 'Líderes de Comercio', value: '4+ Gigantes' },
      ],
      diagramRoute: '/architectures/nexusflow-v1',
      diagramTitle: 'NexusFlow Outbound Sequence',
    },
  ];

  readonly activeStageIndex = signal(0);
  readonly rawProgress = signal(0); // 0 to 1

  readonly activeStage = computed(() => this.stages[this.activeStageIndex()]);
  readonly scrubPercent = computed(() => Math.round(this.rawProgress() * 100));

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.scrubberContainer?.nativeElement) return;
    const rect = this.scrubberContainer.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || 800;

    // Start progress when element enters middle/top of viewport
    const totalDist = rect.height + windowHeight * 0.4;
    const current = windowHeight - rect.top;

    if (current <= 0) {
      this.rawProgress.set(0);
      this.activeStageIndex.set(0);
      return;
    }

    const progress = Math.min(Math.max(current / totalDist, 0), 1);
    this.rawProgress.set(progress);

    // Map progress 0..1 to stage 0..3
    const stageIdx = Math.min(Math.floor(progress * this.stages.length), this.stages.length - 1);
    this.activeStageIndex.set(stageIdx);
  }

  selectStage(index: number): void {
    this.activeStageIndex.set(index);
    this.rawProgress.set(index / (this.stages.length - 1));
  }

  onSliderInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value) / 100;
    this.rawProgress.set(value);
    const stageIdx = Math.min(Math.floor(value * this.stages.length), this.stages.length - 1);
    this.activeStageIndex.set(stageIdx);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => this.onWindowScroll(), 100);
    }
  }

  ngOnDestroy(): void {}
}
