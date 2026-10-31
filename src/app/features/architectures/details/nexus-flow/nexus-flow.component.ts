import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchifyViewerComponent } from '../../../../shared/components/archify-viewer/archify-viewer.component';

@Component({
  selector: 'app-nexus-flow',
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
          <a routerLink="/architectures/nexusflow-v1" class="arch-switch-pill is-active" aria-current="page">
            RFC-ERP-101 · NexusFlow
          </a>
          <a routerLink="/architectures/analytics-bridge" class="arch-switch-pill">
            RFC-DATA-201 · Analytics Bridge
          </a>
        </nav>
      </div>

      <!-- Blueprint Hero Card (No badge above H1 per R-09; Specification Ledger per R-05/R-29) -->
      <header class="eng-card p-6 sm:p-8 lg:p-10 mb-8">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
          NexusFlow v1.0: Integración Híbrida ERP y Captura CDC
        </h1>

        <div class="flex flex-wrap items-center gap-2.5 mb-5 font-mono text-xs text-muted">
          <span class="font-bold" style="color: var(--color-accent);">RFC-ERP-101 · PRODUCCIÓN VERIFICADA</span>
          <span>·</span>
          <span>Versión 1.0 (Cloud-Driven, Edge-Executed)</span>
          <span>·</span>
          <span>AICSAC</span>
          <span>·</span>
          <span>Noviembre 2024</span>
        </div>

        <p class="text-secondary-theme text-base sm:text-lg max-w-4xl leading-relaxed mb-8">
          Plataforma de integración empresarial diseñada para sincronizar el ERP transaccional SCE (MySQL 5.7 / VB6) con ecosistemas digitales en la nube. La orquestación e hidratación de estado operan en Google Cloud Run y Firestore, mientras que el agente local ejecuta <strong>Debezium CDC</strong> sobre el Binary Log en la infraestructura del cliente sin bloquear las tablas operativas.
        </p>

        <!-- Specification Ledger Strip -->
        <div class="spec-ledger">
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val is-accent">0.0%</div>
            <div class="spec-ledger-lbl">Locks en ERP Legacy</div>
            <div class="spec-ledger-sub">Lectura directa de MySQL Binlog</div>
          </div>
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val">&gt;1MB</div>
            <div class="spec-ledger-lbl">Patrón Claim-Check</div>
            <div class="spec-ledger-sub">Descarga de blobs en Cloud Storage</div>
          </div>
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val">100%</div>
            <div class="spec-ledger-lbl">Entrega Idempotente</div>
            <div class="spec-ledger-sub">Locks distribuidos en Firestore</div>
          </div>
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val">Zero-Trust</div>
            <div class="spec-ledger-lbl">Seguridad en Red Local</div>
            <div class="spec-ledger-sub">Sin puertos de entrada abiertos</div>
          </div>
        </div>
      </header>

      <!-- Interactive Archify Multi-Diagram Studio -->
      <div class="mb-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <div class="section-kicker mb-1.5">
              <span>ESTUDIO DE DIAGRAMAS INTERACTIVOS (2 ARTEFACTOS ARCHIFY)</span>
            </div>
            <h2 class="text-2xl font-bold">
              {{ activeTab() === 'arch' ? '3.1 Diagrama de Arquitectura Global (GCP y Agente Edge)' : '5.2 Diagrama de Secuencia Outbound y Patrón Claim-Check' }}
            </h2>
          </div>

          <!-- Switcher between the 2 NexusFlow diagrams -->
          <div class="flex items-center gap-2" role="group" aria-label="Seleccionar vista de diagrama NexusFlow">
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
              (click)="activeTab.set('seq')"
              [attr.aria-pressed]="activeTab() === 'seq'"
              class="tab-pill btn-tactile"
              [class.is-active]="activeTab() === 'seq'"
            >
              <span>02 · Secuencia Outbound</span>
            </button>
          </div>
        </div>

        @if (activeTab() === 'arch') {
          <app-archify-viewer
            src="/architectures/nexusflow_diagram.html"
            title="NexusFlow v1.0: Hybrid Enterprise ERP Integration"
            diagramType="ARCHITECTURE"
            height="620px"
          ></app-archify-viewer>
        } @else {
          <app-archify-viewer
            src="/architectures/nexusflow_sequenceOutbound.html"
            title="NexusFlow Outbound Sequence & Claim-Check Pattern"
            diagramType="SEQUENCE"
            height="680px"
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
              <span>Patrones de Ingeniería Aplicados</span>
            </h2>
            <p>
              Diseñé NexusFlow para conectar ERPs monolíticos on-premise con plataformas SaaS y socios logísticos globales bajo cuatro mecanismos de confiabilidad:
            </p>
            <ul class="blueprint-list">
              <li>Instancias efímeras en Google Cloud Run combinadas con transacciones atómicas en Cloud Firestore para hidratar el estado de cada evento.</li>
              <li>Ejecución de <code>Debezium Engine</code> embebido dentro del agente Java/Linux para leer el Binary Log de MySQL 5.7 en tiempo real sin ejecutar consultas de polling SQL.</li>
              <li>Aislamiento de red donde el agente opera con credenciales de lectura mínima (<code>nexus_user</code>) en la VLAN local y solo abre conexiones salientes TLS hacia Google Cloud Pub/Sub.</li>
              <li>Implementación del patrón Claim-Check para almacenar payloads comprimidos mayores a 1MB en Google Cloud Storage y transmitir únicamente una URI firmada por Pub/Sub.</li>
            </ul>
          </article>

          <!-- Section 2 -->
          <article class="eng-card p-6 sm:p-8">
            <h2>
              <span class="sec-num">02</span>
              <span>Resiliencia, Idempotencia y Control de Flujo</span>
            </h2>
            <ul class="blueprint-list">
              <li>Pub/Sub absorbe ráfagas de eventos para que los sistemas externos nunca bloqueen esperando respuesta del servidor MySQL local.</li>
              <li>Cada evento incluye una llave determinística de idempotencia con TTL en Firestore que descarta reintentos duplicados de red.</li>
              <li>Las configuraciones, credenciales y bitácoras en Firestore se particionan en sub-colecciones aisladas por cliente.</li>
              <li>Una cola local con control de backpressure regula la velocidad de inserción hacia MySQL 5.7 durante sincronizaciones entrantes.</li>
            </ul>
          </article>

          <!-- Section 3: Sequence Deep Dive with inline viewer -->
          <article class="eng-card p-6 sm:p-8">
            <h2>
              <span class="sec-num">03</span>
              <span>Secuencia Outbound con Enriquecimiento y Claim-Check</span>
            </h2>
            <p>
              Cuando ocurre una actualización en el ERP local que debe notificarse a un sistema externo (SAP B1, CargoWise o CRM corporativo), el flujo coordina la captura CDC, la descarga del blob en Cloud Storage y la entrega verificada por webhook:
            </p>
            <app-archify-viewer
              src="/architectures/nexusflow_sequenceOutbound.html"
              title="NexusFlow Outbound Event Processing Sequence"
              diagramType="SEQUENCE"
              height="640px"
            ></app-archify-viewer>
          </article>
        </div>

        <!-- Right Sidebar (4 cols) -->
        <aside class="lg:col-span-4 space-y-6">
          <div class="eng-card p-6">
            <h3 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-4">
              Topología del Agente Edge
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between py-2 border-b border-contrast">
                <span class="text-muted">Host Runtime</span>
                <span class="font-mono font-semibold">Linux Micro-VM</span>
              </div>
              <div class="flex justify-between py-2 border-b border-contrast">
                <span class="text-muted">Motor CDC</span>
                <span class="font-mono font-semibold" style="color: var(--color-accent);">Debezium Embedded</span>
              </div>
              <div class="flex justify-between py-2 border-b border-contrast">
                <span class="text-muted">Protocolo DB</span>
                <span class="font-mono font-semibold">MySQL Binlog :3306</span>
              </div>
              <div class="flex justify-between pt-2">
                <span class="text-muted">Actualización</span>
                <span class="font-mono font-semibold">Watchtower Sidecar</span>
              </div>
            </div>
          </div>

          <div class="eng-card p-6">
            <h3 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-3">
              Stack Tecnológico
            </h3>
            <div class="flex flex-wrap gap-1.5">
              <span class="tech-chip">Google Cloud Run</span>
              <span class="tech-chip">Cloud Pub/Sub</span>
              <span class="tech-chip">Cloud Firestore</span>
              <span class="tech-chip">Cloud Storage (Claim-Check)</span>
              <span class="tech-chip">Debezium Engine</span>
              <span class="tech-chip">MySQL 5.7 SCE</span>
              <span class="tech-chip">Docker & Watchtower</span>
              <span class="tech-chip">Cloud Logging</span>
            </div>
          </div>

          <div class="eng-card p-6">
            <h3 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-2">
              Integración de Sistemas Legacy
            </h3>
            <p class="text-xs text-muted mb-4">
              ¿Necesitas sincronizar un ERP on-premise (SAP B1, CargoWise, MySQL, SQL Server) con la nube sin degradar su rendimiento?
            </p>
            <a routerLink="/contact" class="btn-tactile btn-primary-eng w-full">
              <span>Conversar sobre Integración CDC</span>
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
export class NexusFlowComponent {
  readonly activeTab = signal<'arch' | 'seq'>('arch');
}

