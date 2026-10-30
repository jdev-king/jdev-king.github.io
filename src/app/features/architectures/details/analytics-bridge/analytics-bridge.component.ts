import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchifyViewerComponent } from '../../../../shared/components/archify-viewer/archify-viewer.component';

@Component({
  selector: 'app-analytics-bridge',
  standalone: true,
  imports: [CommonModule, RouterModule, ArchifyViewerComponent],
  template: `
    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <a routerLink="/architectures" class="inline-block mb-6 text-primary hover:underline">← Back to gallery</a>
      
      <article class="prose lg:prose-xl mx-auto dark:prose-invert">
        <h1>Unified Analytics Bridge</h1>
        
        <h2>1. Resumen Ejecutivo</h2>
        <p>
          El objetivo es dotar a los clientes del ERP legacy SCE de un dashboard de analítica operativa en tiempo real, superando el reto de sus infraestructuras on-premise y un modelo de datos deficiente. La solución establece un pipeline de datos robusto y escalable en Google Cloud Platform (GCP). Se desplegará un agente de Change Data Capture (CDC) en los servidores de los clientes con Docker para transmitir los cambios de la base de datos MySQL de forma segura a GCP.
        </p>
        <p>
          El componente central es un pipeline de procesamiento en <strong>Cloud Dataflow</strong> que actuará como un "motor de traducción universal". Este pipeline no solo ingerirá los datos, sino que los transformará en tiempo real, mapeando la estructura legacy de SCE al <strong>modelo de datos de negocio bien diseñado y validado del nuevo ERP SUMAX</strong>. Los datos limpios y estructurados se almacenarán en <strong>BigQuery</strong>, adoptando un esquema analítico denormalizado (Star Schema) para un rendimiento óptimo de las consultas.
        </p>
        <p>
          Una API serverless de alto rendimiento en <strong>Cloud Run</strong> expondrá estas métricas a un nuevo módulo de dashboard dentro de la plataforma SUMAX. Esta arquitectura no solo resuelve la necesidad inmediata, sino que crea un activo de datos unificado y estratégico, listo para incorporar los datos de SUMAX en el futuro y habilitar capacidades avanzadas de IA.
        </p>

        <h2>2. Arquitectura de la Solución</h2>
        
        <h3>Diagrama Conceptual del Flujo de Datos</h3>
        <ol>
            <li><strong>On-Premise (Cliente):</strong> <code>MySQL DB (SCE)</code> -> <code>Agente CDC (Debezium)</code> publica eventos de cambio.</li>
            <li><strong>GCP (Ingesta):</strong> Evento -> <code>Google Pub/Sub</code> (Cola de mensajes desacoplada).</li>
            <li><strong>GCP (Transformación):</strong> <code>Pub/Sub</code> -> <code>Cloud Dataflow</code> (Mapea, limpia, une y enriquece los datos, transformando el modelo SCE al modelo analítico de SUMAX).</li>
            <li><strong>GCP (Almacenamiento):</strong> <code>Cloud Dataflow</code> -> <code>Google BigQuery</code> (Puebla las tablas de hechos y dimensiones del Star Schema).</li>
            <li><strong>GCP (Servicio):</strong> <code>API de Métricas (FastAPI en Cloud Run)</code> <- realiza consultas a <code>BigQuery</code>.</li>
            <li><strong>AWS (Presentación):</strong> <code>SUMAX Frontend (Angular)</code> -> llama a la API en GCP -> Visualización del Dashboard.</li>
        </ol>

        <h3>Componentes Principales</h3>
        <ul>
            <li><strong>Agente CDC (On-Premise):</strong> Servicio Java ligero desplegado con Docker que monitorea el <code>binlog</code> de MySQL sin impactar el rendimiento del ERP.</li>
            <li><strong>Google Pub/Sub:</strong> Punto de entrada asíncrono y resiliente para todos los eventos de datos.</li>
            <li><strong>Google Cloud Dataflow:</strong> Corazón de la solución. Ejecuta la lógica de negocio para convertir datos crudos y desestructurados en información de valor, lista para el análisis.</li>
            <li><strong>Google BigQuery:</strong> Data warehouse serverless que actúa como la única fuente de verdad para toda la analítica operativa de la empresa.</li>
            <li><strong>Google Cloud Run:</strong> Hostea la API de backend, escalando de cero a N instancias automáticamente para servir las peticiones del frontend de forma costo-eficiente.</li>
        </ul>

        <h2>3. Stack Tecnológico Detallado</h2>
        <ul>
            <li><strong>Plataforma Cloud:</strong> <strong>Híbrida (GCP para el pipeline de datos, AWS para el frontend)</strong>.
                <ul><li><em>Justificación:</em> Aprovecha la superioridad del stack de datos de GCP y la experiencia del equipo de AICSAC, mientras se integra de forma nativa con la plataforma SUMAX existente en AWS.</li></ul>
            </li>
            <li><strong>Base de Datos Analítica:</strong> <strong>Google BigQuery</strong>.
                <ul><li><em>Justificación:</em> Su arquitectura serverless y su rendimiento en consultas sobre esquemas denormalizados lo hacen la opción ideal. El modelo de pago por consulta minimiza los costos.</li></ul>
            </li>
            <li><strong>Backend/Procesamiento:</strong>
                <ul>
                    <li><strong>Pipeline de Datos:</strong> <strong>Google Cloud Dataflow</strong> con el SDK de <strong>Python</strong>.
                        <ul><li><em>Justificación:</em> Es la herramienta perfecta para la transformación con estado (stateful) requerida para unir lógicamente los registros de SCE. Python acelera el desarrollo y se alinea con las habilidades del equipo.</li></ul>
                    </li>
                    <li><strong>API de Servicio:</strong> <strong>FastAPI</strong> en contenedor Docker sobre <strong>Google Cloud Run</strong>.
                        <ul><li><em>Justificación:</em> Combinación de alto rendimiento, escalado a cero y facilidad de desarrollo para el equipo de AICSAC.</li></ul>
                    </li>
                </ul>
            </li>
            <li><strong>Frontend:</strong> <strong>Angular (Microfrontend)</strong>.
                <ul><li><em>Justificación:</em> Permite un desarrollo desacoplado y una integración limpia en la plataforma SUMAX.</li></ul>
            </li>
        </ul>

        <h2>4. Plan de Implementación (Fases)</h2>
        <ul>
            <li><strong>Fase 1 (MVP - Creación de la Base Analítica - 1.5 a 2.5 meses):</strong> El objetivo es construir un pipeline funcional de extremo a extremo.</li>
            <li><strong>Fase 2 (Escalado y Personalización - 3 a 5 meses):</strong> Expandir el esquema y desarrollar personalización.</li>
            <li><strong>Fase 3 (Optimización y Futuro - 6+ meses):</strong> Optimización de costos e innovación con IA.</li>
        </ul>

        <h2>5. Análisis de Costos de Producción</h2>
        <p>Costo estimado mensual por cliente: <strong>$1.83 - $4.33 USD / mes</strong></p>

        <hr class="my-8">

        <h2>Estructura de Repositorios & CI/CD</h2>
        <p>Cuatro repositorios desacoplados con pipelines independientes:</p>
        <ol>
            <li><code>analytics-bridge-agent</code>: Agente On-Premise.</li>
            <li><code>analytics-bridge-pipeline</code>: Pipeline de Dataflow.</li>
            <li><code>analytics-bridge-api</code>: API de métricas.</li>
            <li><code>analytics-bridge-frontend</code>: Microfrontend Angular.</li>
        </ol>

        <h3>Diagrama de Flujo de los Repositorios (Interactive Archify)</h3>
        <app-archify-viewer
          src="/architectures/analytics-bridge_repoflow.html"
          title="Multi-Repo CI/CD and Target Environments Flow"
          height="580px"
        ></app-archify-viewer>

        <h3>Diagrama Arquitectónico de la Solución (Interactive Archify)</h3>
        <p>Componentes principales de la solución y sus límites de seguridad entre On-Premise, GCP y AWS:</p>
        <app-archify-viewer
          src="/architectures/analytics-bridge_diagram.html"
          title="Unified Analytics Bridge Solution Architecture"
          height="600px"
        ></app-archify-viewer>

        <h3>Diagrama de Flujo de Datos en Tiempo Real (Interactive Archify)</h3>
        <p>El recorrido de una mutación desde MySQL On-Premise hasta el Data Warehouse y la interfaz de usuario:</p>
        <app-archify-viewer
          src="/architectures/analytics-bridge_dataflow.html"
          title="Real-Time Data Pipeline Stream"
          height="560px"
        ></app-archify-viewer>

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
export class AnalyticsBridgeComponent {}
