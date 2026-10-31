import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchifyViewerComponent } from '../../../../shared/components/archify-viewer/archify-viewer.component';

@Component({
  selector: 'app-sintad-ai-agent',
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
          <a routerLink="/architectures/sintad-ai-agent" class="arch-switch-pill is-active" aria-current="page">
            RFC-AI-301 · SINTAD AI Agent
          </a>
          <a routerLink="/architectures/nexusflow-v1" class="arch-switch-pill">
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
          SINTAD AI Knowledge Agent (Fortress Lite v3.1)
        </h1>

        <div class="flex flex-wrap items-center gap-2.5 mb-5 font-mono text-xs text-muted">
          <span class="font-bold" style="color: var(--color-accent);">RFC-AI-301 · PRODUCCIÓN VERIFICADA</span>
          <span>·</span>
          <span>Versión 3.1</span>
          <span>·</span>
          <span>AICSAC / SINTAD</span>
          <span>·</span>
          <span>Diciembre 2025</span>
        </div>

        <p class="text-secondary-theme text-base sm:text-lg max-w-4xl leading-relaxed mb-8">
          Arquitectura de inteligencia artificial conversacional empresarial sobre Google Kubernetes Engine (GKE) que procesa más de <strong>33,000 consultas diarias</strong> con un presupuesto operativo total de <strong>$800 USD/mes</strong>, combinando un cortafuegos semántico en Redis (&lt;50ms) con recuperación híbrida GraphRAG sobre normativas de Aduanas, Carga y Contabilidad.
        </p>

        <!-- Specification Ledger Strip -->
        <div class="spec-ledger">
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val is-accent">-95%</div>
            <div class="spec-ledger-lbl">Reducción Costo Inferencia</div>
            <div class="spec-ledger-sub">Gemini Flash-8B + Semantic Cache</div>
          </div>
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val">&lt;50ms</div>
            <div class="spec-ledger-lbl">Latencia Cache Hit</div>
            <div class="spec-ledger-sub">40% tráfico recurrente en Redis</div>
          </div>
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val">33,333</div>
            <div class="spec-ledger-lbl">Consultas Diarias</div>
            <div class="spec-ledger-sub">Picos de 300 RPM en GKE</div>
          </div>
          <div class="spec-ledger-cell">
            <div class="spec-ledger-val">~$800 USD</div>
            <div class="spec-ledger-lbl">TCO Mensual Total</div>
            <div class="spec-ledger-sub">3,000 usuarios activos</div>
          </div>
        </div>
      </header>

      <!-- Interactive Archify Diagram Studio -->
      <div class="mb-10">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-3">
          <div>
            <div class="section-kicker mb-1.5">
              <span>TOPOLOGÍA INTERACTIVA COMPILADA CON ARCHIFY</span>
            </div>
            <h2 class="text-2xl font-bold">
              Arquitectura Fortress Lite v3.1: Cortafuegos Semántico y GraphRAG Híbrido
            </h2>
          </div>
          <span class="font-mono text-xs text-muted">
            public/architectures/sintad-ai-agent_diagram.html
          </span>
        </div>

        <app-archify-viewer
          src="/architectures/sintad-ai-agent_diagram.html"
          title="SINTAD AI Knowledge Agent: Fortress Lite v3.1"
          diagramType="ARCHITECTURE"
          height="640px"
        ></app-archify-viewer>
      </div>

      <!-- 2-Column Technical Specification Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Main Content (8 cols) -->
        <div class="lg:col-span-8 space-y-6 blueprint-spec">
          <!-- Section 1 -->
          <article class="eng-card p-6 sm:p-8">
            <h2>
              <span class="sec-num">01</span>
              <span>Contexto Operativo y Objetivos de Nivel de Servicio (SLAs)</span>
            </h2>
            <p>
              Diseñé <strong>Fortress Lite v3.1</strong> para dotar al ecosistema aduanero y logístico de SINTAD de un asistente técnico que responda consultas sobre legislación aduanera, operativa de carga y reglas contables sin incurrir en costos elevados de inferencia LLM.
            </p>
            <h3>Criterios de Diseño</h3>
            <ul class="blueprint-list">
              <li>Reducción del 95% en gastos de tokens combinando modelos ligeros de baja latencia con caché semántico determinístico en memoria.</li>
              <li>Tiempo de respuesta inferior a 50 milisegundos para el 40% de las consultas frecuentes sobre partidas arancelarias y procedimientos operativos.</li>
              <li>Escalado horizontal en Kubernetes verificado para absorber picos sostenidos de 300 solicitudes por minuto durante el horario laboral.</li>
            </ul>
          </article>

          <!-- Section 2 -->
          <article class="eng-card p-6 sm:p-8">
            <h2>
              <span class="sec-num">02</span>
              <span>Decisiones de Ingeniería en el Cluster GKE</span>
            </h2>
            <ul class="blueprint-list">
              <li>
                Situé una capa de Redis Semantic Cache inmediatamente detrás del GKE Ingress para evaluar el hash semántico de cada consulta antes de invocar agentes o modelos externos.
              </li>
              <li>
                Configuré el orquestador en Flowise para clasificar la intención de cada mensaje y delegar el contexto hacia tres motores especializados: <code>LightRAG: Aduanas</code>, <code>LightRAG: Carga</code> y <code>LightRAG: Conta</code>.
              </li>
              <li>
                Combiné <strong>Neo4j Graph DB</strong> para recorrer relaciones jerárquicas entre artículos normativos con un cluster de alta disponibilidad en <strong>CloudNativePG (PostgreSQL + pgvector)</strong> para búsqueda vectorial.
              </li>
              <li>
                Instrumenté la trazabilidad de spans, latencias y consumo de tokens mediante <strong>Langfuse</strong> respaldado por almacenamiento analítico columnar en <strong>ClickHouse OLAP</strong>.
              </li>
            </ul>
          </article>

          <!-- Section 3: Decision Matrix Table -->
          <article class="eng-card p-6 sm:p-8">
            <h2>
              <span class="sec-num">03</span>
              <span>Matriz de Decisiones Tecnológicas</span>
            </h2>
            <p>
              Cada componente del namespace <code>sintad-ai</code> en Kubernetes responde a una restricción concreta de latencia, disponibilidad o costo:
            </p>
            <div class="blueprint-table-wrap">
              <table class="blueprint-table">
                <thead>
                  <tr>
                    <th>Capa / Rol</th>
                    <th>Tecnología</th>
                    <th>Justificación de Ingeniería</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Cortafuegos Semántico</strong></td>
                    <td><code>Redis Cache</code></td>
                    <td>Latencia sub-milisegundo; resuelve el 40% de consultas repetitivas sin invocar el LLM.</td>
                  </tr>
                  <tr>
                    <td><strong>Motor LLM</strong></td>
                    <td><code>Gemini 1.5 Flash-8B</code></td>
                    <td>Costo de $0.10 por millón de tokens con ventana de contexto amplia para síntesis RAG guiada.</td>
                  </tr>
                  <tr>
                    <td><strong>Grafo Normativo</strong></td>
                    <td><code>Neo4j Graph DB</code></td>
                    <td>Recorridos de relaciones entre decretos, artículos legales y partidas arancelarias sin joins costosos.</td>
                  </tr>
                  <tr>
                    <td><strong>Almacén Vectorial HA</strong></td>
                    <td><code>CloudNativePG</code></td>
                    <td>Cluster PostgreSQL nativo en Kubernetes con <code>pgvector</code>, failover automático y cero licenciamiento.</td>
                  </tr>
                  <tr>
                    <td><strong>Observabilidad LLM</strong></td>
                    <td><code>ClickHouse + Langfuse</code></td>
                    <td>Registro de trazas, evaluación de respuestas y auditoría de costos por tenant en tiempo real.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <!-- Right Sidebar (4 cols) -->
        <aside class="lg:col-span-4 space-y-6">
          <div class="eng-card p-6">
            <h3 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-4">
              Desglose Operativo (TCO)
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between py-2 border-b border-contrast">
                <span class="text-muted">Usuarios Activos</span>
                <span class="font-mono font-semibold">3,000 usuarios</span>
              </div>
              <div class="flex justify-between py-2 border-b border-contrast">
                <span class="text-muted">Volumen Diario</span>
                <span class="font-mono font-semibold">33,333 consultas</span>
              </div>
              <div class="flex justify-between py-2 border-b border-contrast">
                <span class="text-muted">Tasa de Acierto Redis</span>
                <span class="font-mono font-semibold" style="color: var(--color-accent);">40% (&lt;50ms)</span>
              </div>
              <div class="flex justify-between pt-2">
                <span class="font-bold">Presupuesto Mensual</span>
                <span class="font-mono text-lg font-bold" style="color: var(--color-accent);">~$800 USD/mes</span>
              </div>
            </div>
          </div>

          <div class="eng-card p-6">
            <h3 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-3">
              Stack de Infraestructura
            </h3>
            <div class="flex flex-wrap gap-1.5">
              <span class="tech-chip">Google Kubernetes Engine</span>
              <span class="tech-chip">Redis Semantic Cache</span>
              <span class="tech-chip">Flowise Orchestrator</span>
              <span class="tech-chip">LightRAG</span>
              <span class="tech-chip">Neo4j Graph DB</span>
              <span class="tech-chip">CloudNativePG</span>
              <span class="tech-chip">Vertex AI Gemini</span>
              <span class="tech-chip">ClickHouse OLAP</span>
              <span class="tech-chip">Langfuse</span>
            </div>
          </div>

          <div class="eng-card p-6">
            <h3 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-2">
              Implementación de Arquitecturas GraphRAG
            </h3>
            <p class="text-xs text-muted mb-4">
              Diseño y despliego sistemas RAG híbridos y agentes sobre Kubernetes con control estricto de latencia y costos de inferencia.
            </p>
            <a routerLink="/contact" class="btn-tactile btn-primary-eng w-full">
              <span>Contactar sobre Arquitecturas IA</span>
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
export class SintadAiAgentComponent {}

