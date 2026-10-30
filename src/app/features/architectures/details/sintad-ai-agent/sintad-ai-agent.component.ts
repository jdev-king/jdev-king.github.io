import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchifyViewerComponent } from '../../../../shared/components/archify-viewer/archify-viewer.component';

@Component({
  selector: 'app-sintad-ai-agent',
  standalone: true,
  imports: [CommonModule, RouterModule, ArchifyViewerComponent],
  template: `
    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <a routerLink="/architectures" class="inline-block mb-6 text-primary hover:underline">← Back to gallery</a>
      
      <article class="prose lg:prose-xl mx-auto dark:prose-invert">
        <h1>SINTAD AI KNOWLEDGE AGENT</h1>
        <p class="text-sm text-gray-500">Version 3.1 "Fortress Lite" • AICSAC • December 2025</p>

        <h2>1. Executive Summary & Architecture Drivers</h2>
        <p>
          El objetivo es desplegar un sistema de IA conversacional para SINTAD capaz de procesar <strong>33,000+ consultas diarias</strong> con un presupuesto operativo inferior a <strong>$1,000 USD/mes</strong>, manteniendo la capacidad de razonamiento profundo sobre normativas de Aduanas, Carga y Contabilidad.
        </p>
        
        <h3>1.1 Business Goals</h3>
        <ul>
          <li><strong>Eficiencia de Costos Extrema:</strong> Reducción del 95% en costos de IA mediante modelos "Lite" y Caching.</li>
          <li><strong>Latencia Ultra-Baja:</strong> Respuestas en <50ms para consultas recurrentes.</li>
          <li><strong>Escalabilidad:</strong> Preparada para picos de 300 RPM.</li>
        </ul>

        <h3>1.2 Key Technical Decisions</h3>
        <ol>
          <li><strong>Capa de Velocidad (Redis Semantic Cache):</strong> Interceptar preguntas frecuentes.</li>
          <li><strong>Motor de Inferencia (Gemini 1.5 Flash-8B):</strong> Modelo eficiente ($0.10/1M tokens).</li>
          <li><strong>GraphRAG Híbrido:</strong> Persistencia en <strong>Neo4j</strong> (Grafos) y <strong>CloudNativePG</strong> (Vectores).</li>
          <li><strong>Seguridad Zero Trust.</strong></li>
        </ol>

        <h2>2. Solution Architecture Diagram (Interactive Archify)</h2>
        <p>El flujo introduce un "Cortafuegos Cognitivo" (Redis) que reduce la carga hacia los agentes LightRAG. Explora los componentes, conexiones y trazas de forma interactiva:</p>
        
        <app-archify-viewer
          src="/architectures/sintad-ai-agent_diagram.html"
          title="SINTAD AI Knowledge Agent - Fortress Lite v3.1"
          height="620px"
        ></app-archify-viewer>

        <h2>3. Tech Stack & Decision Matrix</h2>
        <div class="overflow-x-auto">
          <table class="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th class="border border-gray-300 dark:border-gray-700 p-2 text-left">Componente</th>
                <th class="border border-gray-300 dark:border-gray-700 p-2 text-left">Selección</th>
                <th class="border border-gray-300 dark:border-gray-700 p-2 text-left">Justificación Técnica</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 p-2">Cache</td>
                <td class="border border-gray-300 dark:border-gray-700 p-2"><strong>Redis</strong></td>
                <td class="border border-gray-300 dark:border-gray-700 p-2">Latencia sub-milisegundo, caching semántico.</td>
              </tr>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 p-2">LLM</td>
                <td class="border border-gray-300 dark:border-gray-700 p-2"><strong>Gemini 1.5 Flash-8B</strong></td>
                <td class="border border-gray-300 dark:border-gray-700 p-2">Costo disruptivo, suficiente para RAG guiado.</td>
              </tr>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 p-2">Graph DB</td>
                <td class="border border-gray-300 dark:border-gray-700 p-2"><strong>Neo4j</strong></td>
                <td class="border border-gray-300 dark:border-gray-700 p-2">Traversals nativos 100x más rápidos.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>4. Financial Projection (TCO)</h2>
        <p><strong>Capacidad Diaria Estimada: ~33,333 Consultas</strong></p>
        <p>Base de cálculo: 3,000 usuarios activos, promedio 11 consultas/día.</p>
        <p class="font-bold text-xl mt-4">TOTAL ESTIMADO: ~$800.00 USD / Mes</p>
        
        <h2>5. Deployment Artifact</h2>
        <p>El despliegue utiliza un Master Manifest de Kubernetes para orquestar GKE, Redis, CNPG, Neo4j, ClickHouse y los servicios de aplicación.</p>

      </article>

      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
         <a routerLink="/contact" class="inline-block text-primary font-semibold hover:underline">Contact →</a>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SintadAiAgentComponent {}
