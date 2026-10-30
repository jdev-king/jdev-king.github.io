import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchifyViewerComponent } from '../../../../shared/components/archify-viewer/archify-viewer.component';

@Component({
  selector: 'app-nexus-flow',
  standalone: true,
  imports: [CommonModule, RouterModule, ArchifyViewerComponent],
  template: `
    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <a routerLink="/architectures" class="inline-block mb-6 text-primary hover:underline">← Back to gallery</a>
      
      <article class="prose lg:prose-xl mx-auto dark:prose-invert">
        <h1>NexusFlow 1.0</h1>
        <p class="text-sm text-gray-500">Integración Híbrida ERP • AICSAC • Noviembre 2024</p>

        <h2>1. Resumen Ejecutivo</h2>
        <p>
          <strong>NexusFlow</strong> es una plataforma de integración empresarial de alta disponibilidad diseñada para cerrar la brecha tecnológica entre el ERP Legacy SCE (MySQL 5.7 / VB6) y ecosistemas digitales modernos. La solución se fundamenta en el paradigma <strong>"Cloud-Driven, Edge-Executed"</strong>, donde la inteligencia y orquestación residen en la nube (GCP), mientras que la ejecución de I/O se realiza de forma segura en la infraestructura on-premise del cliente.
        </p>
        <p>Esta versión productiva no solo garantiza la transmisión de datos, sino que establece un estándar de <strong>Ingeniería Robusta</strong> mediante la implementación de patrones avanzados como:</p>
        <ol>
          <li><strong>Orquestación Asíncrona con Hidratación de Estado:</strong> Uso de Cloud Run efímero combinado con Firestore.</li>
          <li><strong>Captura de Datos de Cambio (CDC) Embebida:</strong> Implementación de <strong>Debezium Engine</strong>.</li>
          <li><strong>Seguridad Zero-Trust en Base de Datos.</strong></li>
          <li><strong>Observabilidad Activa (Heartbeat & Remote Logging).</strong></li>
          <li><strong>Patrón Claim-Check:</strong> Para payloads masivos (>1MB) utilizando Cloud Storage.</li>
        </ol>

        <h2>2. Principios de Arquitectura</h2>
        <ul>
          <li><strong>Desacoplamiento Temporal:</strong> Los sistemas externos nunca esperan al ERP Legacy.</li>
          <li><strong>Idempotencia por Diseño:</strong> Manejo de mensajes duplicados sin corromper la integridad.</li>
          <li><strong>Aislamiento de Fallos.</strong></li>
          <li><strong>Inmutabilidad de la Infraestructura.</strong></li>
          <li><strong>Protección del Legacy (Backpressure).</strong></li>
        </ul>

        <h2>3. Arquitectura Técnica Detallada</h2>
        <p>El diseño conecta el "Plano de Control" en Google Cloud con el "Plano de Ejecución" en la red del cliente.</p>

        <h3>3.1 Diagrama de Arquitectura Global (Interactive Archify)</h3>
        <app-archify-viewer
          src="/architectures/nexusflow_diagram.html"
          title="NexusFlow v1.0 - Hybrid Enterprise ERP Integration"
          height="620px"
        ></app-archify-viewer>

        <h3>3.2 Descripción de la Conexión VM Agente <-> Software SCE</h3>
        <ul>
            <li><strong>Topología:</strong> El Agente se ejecuta en una Micro-VM (Linux) dentro de la misma LAN o VLAN.</li>
            <li><strong>Protocolo:</strong> JDBC/TCP (3306) y Replicación (CDC).</li>
            <li><strong>Autenticación:</strong> Usuario específico <code>nexus_user</code>.</li>
        </ul>

        <h3>3.3 Estrategia de Captura de Datos (CDC)</h3>
        <p>Se utiliza <strong>Debezium</strong> embebido para lectura de Logs (Binary Log) en tiempo real, evitando polling intensivo.</p>

        <h2>4. Diseño de Datos y Persistencia</h2>
        <p>La arquitectura utiliza <strong>Firestore</strong> bajo un modelo de <strong>Aislamiento Jerárquico (Sub-collections)</strong>. Todos los datos sensibles se almacenan bajo el documento del cliente específico.</p>

        <h2>5. Flujos de Operaciones</h2>
        
        <h3>5.1 Flujo Inbound: Creación de Orden</h3>
        <p>Desde que un sistema externo envía una orden hasta que se inserta en el MySQL on-premise.</p>
        
        <h3>5.2 Flujo Outbound: Evento de Negocio con Enriquecimiento (Interactive Sequence)</h3>
        <p>El caso complejo donde el dato del evento no es suficiente y se requiere volver a consultar la BD y aplicar el patrón Claim-Check:</p>
        
        <app-archify-viewer
          src="/architectures/nexusflow_sequenceOutbound.html"
          title="NexusFlow Outbound Sequence & Claim-Check Pattern"
          height="680px"
        ></app-archify-viewer>

        <h2>6. Estrategia de Despliegue</h2>
        <p>
          El Agente se despliega preferiblemente como una <strong>Máquina Virtual Linux</strong> en el mismo hipervisor donde corre el servidor Windows del SCE.
        </p>

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
export class NexusFlowComponent {}
