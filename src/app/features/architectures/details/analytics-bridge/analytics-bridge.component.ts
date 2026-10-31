import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchifyViewerComponent } from '../../../../shared/components/archify-viewer/archify-viewer.component';

@Component({
  selector: 'app-analytics-bridge',
  standalone: true,
  imports: [CommonModule, RouterModule, ArchifyViewerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Top Architecture Switcher Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-contrast">
        <a routerLink="/architectures" class="btn-tactile btn-secondary-eng text-xs">
          <span>Volver a Galería de Arquitecturas</span>
        </a>

        <nav class="flex flex-wrap items-center gap-2" aria-label="Cambiar especificación RFC">
          <a routerLink="/architectures/sintad-ai-agent" class="arch-switch-pill">
            RFC-AI-301 · SINTAD AI Agent
          </a>
          <a routerLink="/architectures/nexusflow-v1" class="arch-switch-pill">
            RFC-ERP-101 · NexusFlow
          </a>
          <a routerLink="/architectures/analytics-bridge" class="arch-switch-pill is-active" aria-current="page">
            RFC-DATA-201 · Analytics Bridge
          </a>
        </nav>
      </div>

      <!-- Blueprint Hero Card (No badge above H1 per R-09; Specification Ledger per R-05/R-29) -->
      <header class="eng-card p-6 sm:p-8 lg:p-10 mb-8">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
          Unified Analytics Bridge v2.0
        </h1>

        <div class="flex flex-wrap items-center gap-2.5 mb-5 font-mono text-xs text-muted">
          <span class="font-bold" style="color: var(--color-accent);">RFC-DATA-201 · PRODUCCIÓN VERIFICADA</span>
          <span>·</span>
          <span>Versión 2.0 (Universal Translation Engine)</span>
          <span>·</span>
          <span>AICSAC / SUMAX</span>
          <span>·</span>
          <span>Multi-Cloud (On-Prem + GCP + AWS)</span>
        </div>

        <p class="text-secondary-theme text-base sm:text-lg max-w-4xl leading-relaxed mb-8">
          Pipeline de ingeniería de datos en streaming que habilita consultas analíticas en sub-segundos sobre los datos transaccionales del ERP legacy SCE. Un motor con estado en <strong>Google Cloud Dataflow (Apache Beam Python)</strong> homologa las estructuras relacionales hacia un almacén <strong>Star Schema en BigQuery</strong>, expuesto mediante <strong>FastAPI en Cloud Run</strong> hacia el microfrontend Angular de la plataforma <strong>SUMAX en AWS</strong>.
        </p>

        <!-- Specification Ledger Strip -->
        <div class="spec-ledger">
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val is-accent">$1.83</div>
            <div class="spec-ledger-lbl">Costo Mínimo por Cliente</div>
            <div class="spec-ledger-sub">Rango de $1.83 a $4.33 USD/mes</div>
          </div>
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val">&lt;120ms</div>
            <div class="spec-ledger-lbl">SLA Consultas API</div>
            <div class="spec-ledger-sub">Star Schema en BigQuery</div>
          </div>
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val">15+ Tablas</div>
            <div class="spec-ledger-lbl">Homologación en Vivo</div>
            <div class="spec-ledger-sub">Legacy SCE hacia modelo SUMAX</div>
          </div>
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val">4 Repos</div>
            <div class="spec-ledger-lbl">CI/CD Desacoplado</div>
            <div class="spec-ledger-sub">On-Prem · GCP · AWS</div>
          </div>
        </div>
      </header>

      <!-- Interactive Archify 3-Diagram Studio -->
      <div class="mb-10">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-4">
          <div>
            <div class="section-kicker mb-1.5">
              <span>ESTUDIO INTERACTIVO MULTI-VISTA (3 ARTEFACTOS ARCHIFY)</span>
            </div>
            <h2 class="text-2xl font-bold">
              {{ activeTab() === 'arch' ? '01 · Arquitectura Multi-Cloud de la Solución' : activeTab() === 'dataflow' ? '02 · Pipeline de Flujo de Datos en Tiempo Real (5 Etapas)' : '03 · Flujo CI/CD Multi-Repositorio y Despliegue' }}
            </h2>
          </div>

          <!-- Switcher between the 3 Analytics Bridge diagrams -->
          <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Seleccionar vista de diagrama Analytics Bridge">
            <button
              type="button"
              (click)="activeTab.set('arch')"
              [attr.aria-pressed]="activeTab() === 'arch'"
              class="tab-pill btn-tactile"
              [class.is-active]="activeTab() === 'arch'"
            >
              <span>01 · Arquitectura Global</span>
            </button>
            <button
              type="button"
              (click)="activeTab.set('dataflow')"
              [attr.aria-pressed]="activeTab() === 'dataflow'"
              class="tab-pill btn-tactile"
              [class.is-active]="activeTab() === 'dataflow'"
            >
              <span>02 · Dataflow (5 Etapas)</span>
            </button>
            <button
              type="button"
              (click)="activeTab.set('repoflow')"
              [attr.aria-pressed]="activeTab() === 'repoflow'"
              class="tab-pill btn-tactile"
              [class.is-active]="activeTab() === 'repoflow'"
            >
              <span>03 · Flujo CI/CD Repos</span>
            </button>
          </div>
        </div>

        @if (activeTab() === 'arch') {
          <app-archify-viewer
            src="/architectures/analytics-bridge_diagram.html"
            title="Unified Analytics Bridge: Solution Architecture"
            diagramType="ARCHITECTURE"
            height="620px"
          ></app-archify-viewer>
        } @else if (activeTab() === 'dataflow') {
          <app-archify-viewer
            src="/architectures/analytics-bridge_dataflow.html"
            title="Unified Analytics Bridge: Real-Time Data Pipeline"
            diagramType="DATAFLOW"
            height="580px"
          ></app-archify-viewer>
        } @else {
          <app-archify-viewer
            src="/architectures/analytics-bridge_repoflow.html"
            title="Unified Analytics Bridge: Multi-Repo CI/CD & Deployment Flow"
            diagramType="WORKFLOW"
            height="600px"
          ></app-archify-viewer>
        }
      </div>

      <!-- 2-Column Technical Specification Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8 space-y-6 blueprint-spec">
          <!-- Section 1 -->
          <article class="eng-card p-6 sm:p-8">
            <h2>
              <span class="sec-num">01</span>
              <span>Recorrido de Extremo a Extremo del Dato</span>
            </h2>
            <p>
              Diseñé el puente analítico para transformar mutaciones transaccionales crudas en métricas operativas sin añadir carga de lectura al servidor MySQL del cliente:
            </p>
            <ul class="blueprint-list">
              <li>El servidor <code>MySQL DB (SCE)</code> registra cambios en su binlog y el agente local <code>Debezium en Docker</code> los captura en sub-segundos.</li>
              <li>Los eventos JSON crudos se publican de forma asíncrona en el tópico <code>eventos-crudos</code> de <code>Google Pub/Sub</code>.</li>
              <li>Un pipeline con estado en <code>Cloud Dataflow</code> limpia, une y homologa las estructuras legacy hacia el modelo canónico de <strong>SUMAX</strong>.</li>
              <li><code>Google BigQuery</code> consolida tablas de hechos particionadas por fecha y tablas de dimensiones desnormalizadas bajo un diseño Star Schema.</li>
              <li>El servicio <code>FastAPI en Cloud Run</code> ejecuta consultas analíticas parametrizadas solicitadas por el microfrontend Angular alojado en AWS.</li>
            </ul>
          </article>

          <!-- Section 2: Dataflow Diagram in Context -->
          <article class="eng-card p-6 sm:p-8">
            <h2>
              <span class="sec-num">02</span>
              <span>Pipeline de Transformación (ETL/ELT en 5 Etapas)</span>
            </h2>
            <p>
              Diagrama interactivo del linaje de datos a través de las cinco etapas (Sources, Ingest, Transform, Store y Consume):
            </p>
            <app-archify-viewer
              src="/architectures/analytics-bridge_dataflow.html"
              title="Unified Analytics Bridge: Real-Time Data Pipeline"
              diagramType="DATAFLOW"
              height="560px"
            ></app-archify-viewer>
          </article>

          <!-- Section 3: Multi-Repo CI/CD Workflow -->
          <article class="eng-card p-6 sm:p-8">
            <h2>
              <span class="sec-num">03</span>
              <span>Estructura Multi-Repositorio y Entrega Continua</span>
            </h2>
            <p>
              Dividí el sistema en <strong>cuatro repositorios independientes</strong> con pipelines de despliegue aislados hacia On-Premise, GCP y AWS:
            </p>
            <div class="blueprint-table-wrap">
              <table class="blueprint-table">
                <thead>
                  <tr>
                    <th>Repositorio</th>
                    <th>Stack</th>
                    <th>Artefacto y Destino de Despliegue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>analytics-bridge-agent</code></td>
                    <td>Java + Debezium</td>
                    <td>Imagen Docker en Artifact Registry desplegada en la VM On-Premise del cliente.</td>
                  </tr>
                  <tr>
                    <td><code>analytics-bridge-pipeline</code></td>
                    <td>Python + Apache Beam</td>
                    <td>Flex Template en Cloud Storage ejecutado como job de streaming en Cloud Dataflow.</td>
                  </tr>
                  <tr>
                    <td><code>analytics-bridge-api</code></td>
                    <td>Python + FastAPI</td>
                    <td>Contenedor serverless en Artifact Registry desplegado en Google Cloud Run.</td>
                  </tr>
                  <tr>
                    <td><code>analytics-bridge-frontend</code></td>
                    <td>Angular Microfrontend</td>
                    <td>Bundle estático en AWS S3 y CloudFront integrado en la plataforma web SUMAX.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <app-archify-viewer
              src="/architectures/analytics-bridge_repoflow.html"
              title="Unified Analytics Bridge: Multi-Repo CI/CD Flow"
              diagramType="WORKFLOW"
              height="580px"
            ></app-archify-viewer>
          </article>
        </div>

        <!-- Right Sidebar (4 cols) -->
        <aside class="lg:col-span-4 space-y-6">
          <div class="eng-card p-6">
            <h3 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-4">
              Fases de Implementación y Costos
            </h3>
            <div class="space-y-3 text-sm">
              <div class="py-2 border-b border-contrast">
                <div class="font-mono text-xs text-muted">FASE 1 · MVP (1.5 a 2.5 meses)</div>
                <div class="font-semibold mt-0.5">Pipeline extremo a extremo y Star Schema base</div>
              </div>
              <div class="py-2 border-b border-contrast">
                <div class="font-mono text-xs text-muted">FASE 2 · ESCALADO (3 a 5 meses)</div>
                <div class="font-semibold mt-0.5">Métricas personalizadas y aislamiento multi-tenant</div>
              </div>
              <div class="py-2 border-b border-contrast">
                <div class="font-mono text-xs text-muted">FASE 3 · MODELOS ML (6+ meses)</div>
                <div class="font-semibold mt-0.5">Proyecciones de demanda sobre BigQuery ML</div>
              </div>
              <div class="flex justify-between pt-2">
                <span class="font-bold">Costo por Cliente</span>
                <span class="font-mono text-base font-bold" style="color: var(--color-accent);">$1.83 a $4.33 / mes</span>
              </div>
            </div>
          </div>

          <div class="eng-card p-6">
            <h3 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-3">
              Stack Multi-Cloud
            </h3>
            <div class="flex flex-wrap gap-1.5">
              <span class="tech-chip">Google Cloud Dataflow</span>
              <span class="tech-chip">Apache Beam Python</span>
              <span class="tech-chip">Google BigQuery</span>
              <span class="tech-chip">FastAPI on Cloud Run</span>
              <span class="tech-chip">Google Pub/Sub</span>
              <span class="tech-chip">Debezium CDC</span>
              <span class="tech-chip">AWS S3 & CloudFront</span>
              <span class="tech-chip">Angular Microfrontend</span>
            </div>
          </div>

          <div class="eng-card p-6">
            <h3 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-2">
              Ingeniería de Datos en Streaming
            </h3>
            <p class="text-xs text-muted mb-4">
              Diseño pipelines con Apache Beam y almacenes analíticos en BigQuery sobre bases operacionales existentes.
            </p>
            <a routerLink="/contact" class="btn-tactile btn-primary-eng w-full">
              <span>Agendar Revisión de Arquitectura</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .arch-switch-pill {
      display: inline-flex;
      align-items: center;
      min-height: 2.75rem;
      padding: 0.45rem 0.85rem;
      border-radius: 0.375rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.75rem;
      color: var(--color-muted);
      background-color: var(--color-surface);
      border: 1px solid var(--color-border-strong);
      text-decoration: none;
      transition: all var(--duration-fast) var(--ease-out);
    }
    .arch-switch-pill.is-active {
      color: var(--color-accent-contrast);
      border-color: var(--color-accent);
      background-color: var(--color-accent);
      font-weight: 600;
    }
    .tab-pill {
      min-height: 2.75rem;
      padding: 0.45rem 0.9rem;
      border-radius: 0.375rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.75rem;
      color: var(--color-muted);
      background-color: var(--color-surface);
      border: 1px solid var(--color-border-strong);
    }
    .tab-pill.is-active {
      color: var(--color-accent-contrast);
      background-color: var(--color-accent);
      border-color: var(--color-accent);
      font-weight: 600;
    }
    .sec-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 0.25rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      color: var(--color-accent);
      background-color: var(--color-surface-2);
      border: 1px solid var(--color-border-strong);
      flex-shrink: 0;
    }
  `],
})
export class AnalyticsBridgeComponent {
  readonly activeTab = signal<'arch' | 'dataflow' | 'repoflow'>('arch');
}

