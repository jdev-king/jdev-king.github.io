import { CommonModule } from '@angular/common';
import {
  Component,
  signal,
  computed,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';

export interface EnterpriseDeliverable {
  readonly id: string;
  readonly code: string;
  readonly kind: 'Producto Corporativo' | 'Proyecto Enterprise B2B';
  readonly organization: 'AICSAC' | 'SINTAD' | 'AICSAC · SINTAD' | 'SINTAD · AICSAC';
  readonly clientOrScope: string;
  readonly title: string;
  readonly pattern: string;
  readonly status: string;
  readonly summary: string;
  readonly challenge: string;
  readonly architectureHighlights: string[];
  readonly pipelineSteps: string[];
  readonly stack: string[];
}

@Component({
  selector: 'app-enterprise-pipeline',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <!-- Section Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-5 border-b border-contrast">
        <div>
          <div class="section-kicker mb-2">
            <span>03 / REGISTRO DE PRODUCTOS Y PROYECTOS EMPRESARIALES</span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Catálogo de Plataformas e Integraciones B2B (SINTAD · AICSAC)
          </h2>
          <p class="text-secondary-theme text-sm sm:text-base mt-2 max-w-3xl">
            Inventario técnico de productos corporativos propios y sistemas de interoperabilidad en producción auditados y dirigidos para operadores logísticos globales, agencias de aduana y cadenas retail. Documentación pública saneada sin esquemas internos ni datos sensibles.
          </p>
        </div>

        <!-- Filter Controls -->
        <div class="flex flex-wrap gap-1.5 self-start lg:self-end" role="group" aria-label="Filtrar catálogo por tipo de entrega">
          @for (tab of filterTabs; track tab.id) {
            <button
              type="button"
              (click)="setFilter(tab.id)"
              [attr.aria-pressed]="activeFilter() === tab.id"
              class="filter-pill btn-tactile"
              [class.is-active]="activeFilter() === tab.id"
            >
              <span>{{ tab.label }} ({{ tab.count }})</span>
            </button>
          }
        </div>
      </div>

      <!-- Specification Summary Strip -->
      <div class="spec-ledger mb-8">
        <div class="spec-ledger-cell">
          <div class="spec-ledger-val is-accent">05</div>
          <div class="spec-ledger-lbl">Productos Base</div>
          <div class="spec-ledger-sub">Middleware · ETL · BI · Seguridad · IA</div>
        </div>
        <div class="spec-ledger-cell">
          <div class="spec-ledger-val">20+</div>
          <div class="spec-ledger-lbl">Sistemas B2B Activos</div>
          <div class="spec-ledger-sub">Agrupados en 7 ecosistemas cliente</div>
        </div>
        <div class="spec-ledger-cell">
          <div class="spec-ledger-val">EDI / XML / REST</div>
          <div class="spec-ledger-lbl">Protocolos Soportados</div>
          <div class="spec-ledger-sub">ANSI X12 · CUSDEC · eAdapter · SFTP</div>
        </div>
        <div class="spec-ledger-cell">
          <div class="spec-ledger-val">Multi-Cloud</div>
          <div class="spec-ledger-lbl">Despliegue Híbrido</div>
          <div class="spec-ledger-sub">On-Premise · AWS · GCP · Azure</div>
        </div>
      </div>

      <!-- Editorial Technical Index Ledger (RHYTHM 3 distinct from card grids per R-14) -->
      <div class="eng-card overflow-hidden" role="region" aria-label="Índice técnico de productos y proyectos">
        <div class="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-3 bg-elevated border-b border-contrast font-mono text-xs text-muted uppercase tracking-wider">
          <div class="lg:col-span-2">Código / Tipo</div>
          <div class="lg:col-span-3">Sistema & Alcance</div>
          <div class="lg:col-span-4">Resumen de Arquitectura</div>
          <div class="lg:col-span-3 text-right">Patrón & Especificación</div>
        </div>

        <div class="divide-y divide-contrast">
          @for (item of visibleDeliverables(); track item.id) {
            <article class="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start lg:items-center ledger-row">
              <!-- Col 1: Code & Classification -->
              <div class="lg:col-span-2 flex flex-wrap lg:flex-col items-center lg:items-start gap-2">
                <span class="font-mono text-xs font-bold" style="color: var(--color-accent);">
                  {{ item.code }}
                </span>
                <span class="kind-badge" [class.is-product]="item.kind === 'Producto Corporativo'">
                  {{ item.kind === 'Producto Corporativo' ? 'PRODUCTO' : 'PROYECTO B2B' }}
                </span>
                <span class="font-mono text-[11px] text-muted">
                  {{ item.organization }}
                </span>
              </div>

              <!-- Col 2: Title & Client/Scope -->
              <div class="lg:col-span-3">
                <h3 class="text-lg font-bold tracking-tight">
                  {{ item.title }}
                </h3>
                <div class="font-mono text-xs text-muted mt-1">
                  {{ item.clientOrScope }} · {{ item.status }}
                </div>
              </div>

              <!-- Col 3: Public Technical Summary -->
              <div class="lg:col-span-4">
                <p class="text-sm text-secondary-theme leading-relaxed mb-3">
                  {{ item.summary }}
                </p>
                <div class="flex flex-wrap gap-1.5">
                  @for (tech of item.stack.slice(0, 4); track tech) {
                    <span class="tech-chip">{{ tech }}</span>
                  }
                </div>
              </div>

              <!-- Col 4: Pattern & Action Button -->
              <div class="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-2.5 w-full">
                <span class="font-mono text-xs text-muted lg:text-right">
                  {{ item.pattern }}
                </span>
                <button
                  type="button"
                  (click)="openSheet(item)"
                  class="btn-tactile btn-secondary-eng text-xs"
                >
                  <span>Ver Ficha Técnica</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          }
        </div>
      </div>

      <!-- Progressive Disclosure Slide-Over Specification Sheet (R-26, R-32, R-36) -->
      <div
        class="pipeline-drawer"
        [class.is-open]="drawerOpen()"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="'Ficha técnica de ' + (selectedItem()?.title || 'sistema')"
      >
        @if (selectedItem(); as current) {
          <div class="p-6 sm:p-8">
            <div class="flex justify-between items-start gap-4 mb-6 pb-5 border-b border-contrast">
              <div>
                <div class="flex flex-wrap items-center gap-2 font-mono text-xs mb-1.5">
                  <span class="font-bold" style="color: var(--color-accent);">{{ current.code }}</span>
                  <span class="text-muted">·</span>
                  <span class="text-muted">{{ current.kind }}</span>
                  <span class="text-muted">·</span>
                  <span class="text-muted">{{ current.organization }}</span>
                </div>
                <h3 class="text-2xl font-bold tracking-tight">
                  {{ current.title }}
                </h3>
                <p class="font-mono text-xs text-muted mt-1">
                  {{ current.clientOrScope }} · Patrón: {{ current.pattern }}
                </p>
              </div>

              <button
                type="button"
                class="btn-tactile btn-secondary-eng shrink-0"
                (click)="closeSheet()"
                aria-label="Cerrar ficha técnica (Escape)"
              >
                Cerrar
              </button>
            </div>

            <div class="space-y-6 blueprint-spec">
              <div>
                <h4 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-2">
                  Reto Operativo y Contexto
                </h4>
                <p class="p-4 rounded bg-elevated border border-contrast text-sm text-secondary-theme leading-relaxed">
                  {{ current.challenge }}
                </p>
              </div>

              <div>
                <h4 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-3">
                  Decisiones de Arquitectura
                </h4>
                <ul class="blueprint-list text-sm">
                  @for (point of current.architectureHighlights; track $index) {
                    <li>{{ point }}</li>
                  }
                </ul>
              </div>

              <div>
                <h4 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-3">
                  Flujo del Pipeline de Extremo a Extremo
                </h4>
                <ol class="space-y-2.5 text-sm text-secondary-theme">
                  @for (step of current.pipelineSteps; track $index; let idx = $index) {
                    <li class="p-3 rounded bg-elevated border border-contrast flex items-start gap-3">
                      <span class="font-mono text-xs font-bold shrink-0 mt-0.5" style="color: var(--color-accent);">
                        0{{ idx + 1 }}
                      </span>
                      <span>{{ step }}</span>
                    </li>
                  }
                </ol>
              </div>

              <div class="pt-4 border-t border-contrast">
                <h4 class="font-mono text-xs uppercase tracking-wider text-muted font-bold mb-3">
                  Stack Tecnológico y Estándares
                </h4>
                <div class="flex flex-wrap gap-1.5">
                  @for (tech of current.stack; track $index) {
                    <span class="tech-chip">{{ tech }}</span>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      @if (drawerOpen()) {
        <div class="drawer-scrim" (click)="closeSheet()"></div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .filter-pill {
      padding: 0.45rem 0.9rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.75rem;
      border-radius: 0.375rem;
      color: var(--color-muted);
      background-color: var(--color-surface);
      border: 1px solid var(--color-border-strong);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .filter-pill:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }

    .filter-pill.is-active {
      color: var(--color-accent-contrast);
      background-color: var(--color-accent);
      border-color: var(--color-accent);
      font-weight: 600;
    }

    .divide-contrast > * + * {
      border-top: 1px solid var(--color-border);
    }

    .ledger-row {
      transition: background-color var(--duration-fast) var(--ease-out);
    }

    .ledger-row:hover {
      background-color: var(--color-surface-2);
    }

    .kind-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.15rem 0.5rem;
      border-radius: 0.25rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.68rem;
      font-weight: 600;
      color: var(--color-secondary);
      background-color: var(--color-surface-2);
      border: 1px solid var(--color-border-strong);
    }

    .kind-badge.is-product {
      color: var(--color-accent);
      border-color: var(--color-accent);
      background-color: var(--color-accent-subtle);
    }

    .pipeline-drawer {
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      width: 100%;
      max-width: 42rem;
      background-color: var(--color-surface);
      border-left: 1px solid var(--color-border-strong);
      box-shadow: var(--shadow-elevated);
      z-index: 50;
      overflow-y: auto;
      transform: translateX(100%);
      transition: transform var(--duration-normal) var(--ease-spring);
    }

    .pipeline-drawer.is-open {
      transform: translateX(0);
    }

    .drawer-scrim {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.65);
      z-index: 40;
    }
  `],
})
export class EnterprisePipelineComponent {
  readonly activeFilter = signal<'all' | 'Producto Corporativo' | 'Proyecto Enterprise B2B'>('all');
  readonly drawerOpen = signal(false);
  readonly selectedItem = signal<EnterpriseDeliverable | null>(null);

  readonly deliverables: EnterpriseDeliverable[] = [
    // 1. PRODUCTOS CORPORATIVOS (5)
    {
      id: 'prod-sce-connect',
      code: 'PROD-01',
      kind: 'Producto Corporativo',
      organization: 'AICSAC',
      clientOrScope: 'Plataforma Base de Interoperabilidad On-Premise',
      title: 'SCE Connect Middleware & Motor de Integración',
      pattern: 'Modular Monolith · Webhook/SFTP · AES-256',
      status: 'En Producción',
      summary:
        'Middleware corporativo desplegado en el servidor local del cliente que expone APIs REST autenticadas, procesa webhooks bidireccionales con SAP y Zoho CRM, gestiona licencias por módulo y extrae datos hacia AWS S3 sin exponer la base transaccional a internet.',
      challenge:
        'El ERP de comercio exterior opera en una arquitectura cliente-servidor dentro de la red privada de cada agencia. Se requería integrar sistemas externos (SAP, Zoho CRM, socios logísticos SFTP y consumidores API) y alimentar analítica cloud sin abrir puertos de base de datos ni contaminar el modelo transaccional legado.',
      architectureHighlights: [
        'Separación física de responsabilidades en cinco módulos desacoplados: aplicación central, pasarela API, motor de integración, control dinámico de licencias y extractor analítico.',
        'Motor de mapeo de campos configurable en base de datos sin recompilar y almacenamiento cifrado con AES-256 de credenciales de conexión hacia sistemas externos.',
        'Prevención de bucles infinitos entre flujos de entrada y salida mediante control de contexto transaccional y colas de eventos con reintentos automáticos.',
        'Exposición de endpoints REST documentados en OpenAPI/Swagger con validación de vigencia por cliente y módulo operativo.',
      ],
      pipelineSteps: [
        'Flujo Inbound: Recepción de webhooks desde SAP o Zoho CRM, validación de token, transformación dinámica de campos y persistencia transaccional controlada.',
        'Flujo Outbound: Captura de eventos operativos locales, encolamiento con estado pendiente y despacho asíncrono hacia APIs o servidores SFTP externos.',
        'Flujo Analytics: Exportación asíncrona de cargas históricas en CSV y lotes incrementales en JSON directamente hacia buckets asegurados en AWS S3.',
      ],
      stack: [
        'Java 21',
        'Spring Boot',
        'MyBatis & JPA',
        'Flyway',
        'MySQL',
        'AES-256',
        'AWS S3',
        'OpenAPI / Swagger',
      ],
    },
    {
      id: 'prod-analytics-platform',
      code: 'PROD-02',
      kind: 'Producto Corporativo',
      organization: 'AICSAC',
      clientOrScope: 'Ingeniería de Datos Multi-Stage & Modelos OBT',
      title: 'Plataforma Analítica Cloud (Stages A/B/C & OBTs)',
      pattern: 'Lakehouse ETL · PySpark · One Big Tables',
      status: 'En Producción',
      summary:
        'Pipeline ETL desacoplado sobre AWS S3, PySpark y Redshift/PostgreSQL que transforma extracciones históricas y eventos CDC en modelos analíticos OBT (One Big Tables) para los dominios de Aduanas, Carga, Transporte y Contabilidad.',
      challenge:
        'Las consultas de reportería ejecutiva sobre la base operativa degradaban el rendimiento transaccional y carecían de un modelo dimensional unificado que cruzara despachos aduaneros, embarques de carga, flota terrestre y estados financieros.',
      architectureHighlights: [
        'Desacoplamiento total del origen operativo mediante ingesta inicial en AWS S3 RAW gobernada por políticas IAM de privilegio mínimo por prefijo y cliente.',
        'Procesamiento incremental en tres capas técnicas (Stage A para tipado y normalización en PySpark, Stage B para reglas de negocio y deduplicación CDC, Stage C para consolidación SQL).',
        'Construcción de estructuras OBT (One Big Tables) orientadas a indicadores de negocio en cuatro dominios: Aduanas (despachos y DAM), Carga (cotizaciones y embarques), Transporte (ciclo de viajes) y Contabilidad (saldos y tesorería).',
      ],
      pipelineSteps: [
        'Extracción desde el módulo analítico on-premise hacia AWS S3 RAW combinando fotografías históricas con deltas incrementales.',
        'Ejecución de jobs en PySpark (Stages A y B) para limpieza, homologación de catálogos, deduplicación de eventos y enriquecimiento.',
        'Carga incremental en la base analítica (Stage C en Redshift/PostgreSQL) y materialización de OBTs listas para consumo en BI.',
      ],
      stack: [
        'PySpark',
        'AWS S3',
        'Debezium CDC',
        'PostgreSQL / Redshift',
        'AWS IAM',
        'SQL Dimensional',
        'Quarto / Plotly',
      ],
    },
    {
      id: 'prod-sumax-analytics',
      code: 'PROD-03',
      kind: 'Producto Corporativo',
      organization: 'AICSAC',
      clientOrScope: 'Plataforma de Business Intelligence & SSO',
      title: 'Sumax Analytics (Fork Corporativo de Apache Superset)',
      pattern: 'BI Platform · SSO JIT · Docker ECR/EC2',
      status: 'En Producción',
      summary:
        'Solución corporativa de Business Intelligence basada en un fork controlado de Apache Superset que consume la capa de modelos OBT, equipada con autenticación SSO con aprovisionamiento Just-In-Time (JIT) y despliegue automatizado en AWS.',
      challenge:
        'Se necesitaba entregar paneles ejecutivos e indicadores interactivos a múltiples empresas clientes sin administrar cuentas manualmente ni modificar el núcleo de Apache Superset de forma que impidiera absorber parches de seguridad del repositorio oficial.',
      architectureHighlights: [
        'Estrategia de fork limpio manteniendo la rama oficial de Apache Superset sincronizada y aislando las personalizaciones corporativas en módulos dedicados.',
        'Integración de autenticación Single Sign-On (SSO) corporativa con aprovisionamiento Just-In-Time (JIT) que asigna roles y permisos en el primer inicio de sesión.',
        'Arquitectura de despliegue reproducible en AWS EC2 desde imágenes en Amazon ECR compiladas por GitLab CI, protegidas por un sidecar nginx para terminación TLS y normalización de rutas.',
      ],
      pipelineSteps: [
        'Sincronización periódica con el upstream de Apache Superset y empaquetado de la imagen Docker con el módulo SSO y la identidad visual corporativa.',
        'Publicación automatizada en Amazon ECR mediante GitLab CI y actualización declarativa con Docker Compose en instancias EC2.',
        'Consumo exclusivo de la capa final de OBTs en PostgreSQL/Redshift para renderizar tableros de Aduanas, Carga, Transporte y Finanzas.',
      ],
      stack: [
        'Apache Superset',
        'Python',
        'SSO / OAuth2 JIT',
        'Docker Compose',
        'AWS ECR & EC2',
        'nginx TLS Sidecar',
        'GitLab CI/CD',
      ],
    },
    {
      id: 'prod-robot-framework',
      code: 'PROD-04',
      kind: 'Producto Corporativo',
      organization: 'SINTAD · AICSAC',
      clientOrScope: 'Ecosistema de Librerías Transversales en AWS CodeArtifact',
      title: 'SCE Robot Framework (Seguridad HMAC & Telemetría)',
      pattern: 'Shared Maven SDK · HMAC-SHA256 · Circuit Breaker',
      status: 'En Producción',
      summary:
        'Conjunto de librerías Maven en Java 21 y Spring Boot 3.5 que estandarizan la seguridad entrante (HMAC-SHA256 y API Key con caché Caffeine), la autenticación saliente polimórfica y el monitoreo autónomo con heartbeats para todos los robots del ecosistema.',
      challenge:
        'Decenas de demonios batch y microservicios de integración implementaban por separado su propia validación de credenciales, manejo de sesiones externas y reporte de caídas, dificultando la observabilidad centralizada y la rotación segura de llaves.',
      architectureHighlights: [
        'Módulo de seguridad entrante con filtros Spring Security para validación de firmas HMAC-SHA256 con ventana de tiempo anti-replay y API Keys respaldadas por caché en memoria Caffeine.',
        'Fábrica de estrategias de autenticación saliente que resuelve en tiempo de ejecución flujos OAuth2, JWT, Basic Auth y sesiones de SAP Business One.',
        'Módulo de salud y telemetría con envío automático de latidos (heartbeats) cada 5 minutos, protección por Circuit Breaker y carga automática de trazas de error hacia Google Cloud Storage.',
        'Publicación automatizada en AWS CodeArtifact mediante Semantic Release y Conventional Commits desde pipelines de GitLab.',
      ],
      pipelineSteps: [
        'Declaración del artefacto agrupador (starter) en cualquier robot o servicio Spring Boot del ecosistema.',
        'Intercepción automática de peticiones entrantes/salientes y registro periódico de disponibilidad hacia el monitor central.',
        'Versionado semántico automático en cada fusión a la rama principal y distribución privada en AWS CodeArtifact.',
      ],
      stack: [
        'Java 21',
        'Spring Boot 3.5',
        'Apache Maven',
        'HMAC-SHA256',
        'Caffeine Cache',
        'AWS CodeArtifact',
        'Google Cloud Storage',
        'Semantic Release',
      ],
    },
    {
      id: 'prod-ai-software-factory',
      code: 'PROD-05',
      kind: 'Producto Corporativo',
      organization: 'AICSAC · SINTAD',
      clientOrScope: 'Orquestación Multi-Agente & Catálogo de Arquitectura',
      title: 'AI Software Factory & Catálogo Vivo (EventCatalog)',
      pattern: 'Multi-Agent Factory · Trust Zones · EventCatalog MCP',
      status: 'Operativo v7.2',
      summary:
        'Fábrica de software asistida por agentes aislados en zonas de confianza (DEV y OPS) sobre contenedores WSL2, gobernada por presupuesto multimodelo en LiteLLM, diccionario estructural en EventCatalog y validación determinista previa a cada Merge Request.',
      challenge:
        'Acelerar el ciclo de análisis de requerimientos, desarrollo full-stack, pruebas E2E y documentación de arquitectura entre dos empresas del grupo sin exponer código fuente ni bases de datos a entradas externas no confiables.',
      architectureHighlights: [
        'Aislamiento estricto en dos zonas de confianza: contenedores de operación comercial (sin acceso a repositorios de código) y contenedores de desarrollo (que solo leen especificaciones técnicas saneadas).',
        'Catálogo unificado en EventCatalog alimentado por diccionarios estructurales YAML y arqueología de integraciones, consultable tanto por ingenieros humanos como por agentes vía MCP.',
        'Puerta determinista de aseguramiento de calidad antes de abrir cualquier Merge Request: compilación, pruebas unitarias, escaneo de secretos con Gitleaks, auditoría estática de interfaz y verificación en navegador con Playwright.',
        'Revisión de código cruzada utilizando un proveedor de modelo distinto al agente constructor para eliminar sesgos de autocomplacencia.',
      ],
      pipelineSteps: [
        'Consulta estructural en EventCatalog, análisis de casos borde y generación de la especificación técnica aprobada.',
        'Implementación delegada en ramas aisladas (Angular, Spring Boot, PySpark, Terraform) y ejecución de la puerta determinista de QA.',
        'Auditoría independiente del Merge Request y actualización automática del catálogo de arquitectura.',
      ],
      stack: [
        'EventCatalog & MCP',
        'LiteLLM & Langfuse',
        'Docker / WSL2',
        'Playwright CLI',
        'Gitleaks',
        'GitLab CI/CD',
        'Claude / Gemini / OpenAI',
      ],
    },

    // 2. PROYECTOS ENTERPRISE B2B REVISADOS Y EN PRODUCCIÓN (7 ECOSISTEMAS / 20+ SISTEMAS)
    {
      id: 'proj-dhl-ecosystem',
      code: 'B2B-01',
      kind: 'Proyecto Enterprise B2B',
      organization: 'SINTAD',
      clientOrScope: 'DHL Global Forwarding · HP · Schneider Electric · Lenovo · Epiroc',
      title: 'Ecosistema de Integración B2B para DHL (8 Sistemas Activos)',
      pattern: 'eAdapter XML · ANSI X12 EDI · Smooks · SFTP',
      status: 'En Producción',
      summary:
        'Suite de ocho sistemas de integración automatizada que conectan la operación aduanera de DHL con CargoWise One (eAdapter XML), Hewlett-Packard (EDI X12 214 y EDIFACT CUSDEC), Schneider Electric, Lenovo, Epiroc y el ERP contable JBA.',
      challenge:
        'DHL requería eliminar la digitación manual y los retrasos de horas en la sincronización de miles de declaraciones aduaneras, facturas comerciales, guías aéreas e hitos de seguimiento con su plataforma global CargoWise One y con los sistemas EDI de sus clientes multinacionales.',
      architectureHighlights: [
        'Integración bidireccional con CargoWise One mediante tres módulos Spring Boot (robot de descarga SFTP cada 5 minutos, aplicación de envío y proceso batch masivo) utilizando el protocolo estándar eAdapter XML y serialización JAXB.',
        'Motor de traducción EDI para Hewlett-Packard basado en Smooks Framework que transforma incidencias operativas en mensajes estándar ANSI X12 214 (Shipment Status) hacia GT Nexus y parsea declaraciones EDIFACT CUSDEC.',
        'Sistemas dedicados de procesamiento XML/SFTP y mesas de control para Schneider Electric, Lenovo (generación de tramas CUSDEC/CUSRES) y Epiroc.',
        'Orquestador atómico de archivos planos y facturación batch hacia el sistema financiero JBA con trazabilidad y alertas por correo.',
      ],
      pipelineSteps: [
        'Monitoreo desatendido de buzones SFTP y colas de eventos operativos mediante demonios programados en Spring Boot.',
        'Transformación bidireccional entre modelos relacionales y estándares internacionales (CargoWise eAdapter XML, ANSI X12 214, EDIFACT CUSDEC/CUSRES).',
        'Confirmación transaccional, archivo histórico con control de errores y notificación automática a los equipos operativos.',
      ],
      stack: [
        'Java / Spring Boot',
        'CargoWise eAdapter XML',
        'ANSI X12 214 / EDIFACT',
        'Smooks Framework',
        'JAXB',
        'JSch SFTP',
        'MyBatis / MySQL',
      ],
    },
    {
      id: 'proj-maersk-azure',
      code: 'B2B-02',
      kind: 'Proyecto Enterprise B2B',
      organization: 'AICSAC',
      clientOrScope: 'Maersk · Transporte Marítimo y Logística Global',
      title: 'API REST Serverless de Consulta Aduanera (Azure + Oracle Cloud)',
      pattern: 'Serverless API · FastAPI · Azure AD & Key Vault',
      status: 'En Producción',
      summary:
        'Intermediario serverless en Azure Functions con Python y FastAPI que permite a Maersk consultar en tiempo real el estado de órdenes aduaneras alojadas en Oracle Cloud sin exponer la base de datos legacy a internet.',
      challenge:
        'Maersk necesitaba visibilidad en tiempo real sobre sus operaciones de importación y exportación alojadas en infraestructura Oracle Cloud, cumpliendo políticas corporativas de seguridad cero-confianza y protegiendo la base operativa contra picos de tráfico.',
      architectureHighlights: [
        'Arquitectura híbrida entre Microsoft Azure (capa de exposición serverless) y Oracle Cloud (persistencia operativa privada).',
        'Autenticación corporativa mediante Azure Active Directory, políticas de Azure API Management y custodia de secretos en Azure Key Vault.',
        'Control de tasa de peticiones (Rate Limiting) y validación estricta con Pydantic para evitar sobrecarga sobre el motor transaccional.',
      ],
      pipelineSteps: [
        'Autenticación del consumidor corporativo de Maersk mediante tokens de Azure AD en el gateway de API Management.',
        'Ejecución de la función serverless en FastAPI con lectura segura de credenciales desde Azure Key Vault.',
        'Consulta optimizada de solo lectura sobre la réplica operativa y retorno de payloads JSON tipados en milisegundos.',
      ],
      stack: [
        'Python 3.11',
        'FastAPI',
        'Azure Functions',
        'Azure AD & Key Vault',
        'Azure API Management',
        'Oracle Cloud / MySQL',
        'Docker',
      ],
    },
    {
      id: 'proj-ups-ecosystem',
      code: 'B2B-03',
      kind: 'Proyecto Enterprise B2B',
      organization: 'AICSAC · SINTAD',
      clientOrScope: 'UPS · Cisco · Dell · FGV Service Envelope',
      title: 'Automatización Aduanera para UPS, Cisco y Dell (3 Sistemas)',
      pattern: 'Java 21 · StAX Streaming XML · EDI X12 -> DAM',
      status: 'En Producción',
      summary:
        'Ecosistema de tres plataformas multi-módulo para UPS que automatizan la descarga SFTP en lotes, el parseo en streaming de facturas comerciales de Cisco y Dell (XML y ANSI X12), la generación de declaraciones DAM y respuestas CUSRES.',
      challenge:
        'Procesar facturas comerciales internacionales de Cisco y Dell con cientos de números de parte (Part Numbers) por embarque sin errores de transcripción arancelaria y emitiendo respuestas aduaneras CUSRES y sobres XML propietarios en tiempo real.',
      architectureHighlights: [
        'Arquitectura multi-módulo en Java 21 y Spring Boot 3.5 con configuración SFTP dinámica en base de datos y procesamiento por lotes con reconexión automática.',
        'Extracción de identificadores mediante lectura XML en streaming (StAX) para manejar archivos extensos sin saturar la memoria heap.',
        'Conversión automática de tramas ANSI X12 de Dell con Smooks hacia declaraciones aduaneras XML (CUSDEC) y emisión de confirmaciones CUSRES para Cisco.',
        'Monitoreo operativo integrado con la librería corporativa de salud para reporte automático de latidos y trazas de error.',
      ],
      pipelineSteps: [
        'Descarga desatendida cada 30 segundos desde servidores SFTP remotos en lotes controlados con estampado temporal anti-colisión.',
        'Clasificación automática entre operaciones de importación y exportación, validación de partidas y generación de plantillas estructuradas.',
        'Transmisión de sobres XML (ServiceEnvelope / CUSRES) hacia los buzones globales de UPS, Dell y Cisco.',
      ],
      stack: [
        'Java 21',
        'Spring Boot 3.5',
        'StAX Streaming XML',
        'Smooks EDI X12',
        'JAXB CUSDEC / CUSRES',
        'JSch SFTP',
        'Apache POI',
      ],
    },
    {
      id: 'proj-ceva-pml',
      code: 'B2B-04',
      kind: 'Proyecto Enterprise B2B',
      organization: 'AICSAC · SINTAD',
      clientOrScope: 'CEVA Logistics · Schneider Electric · Consumidores API PML',
      title: 'Intercambio Bidireccional CEVA Logistics y Pasarela API PML',
      pattern: 'Bidirectional SFTP · Woodstox XML · REST API',
      status: 'En Producción',
      summary:
        'Integración operativa bidireccional con CEVA Logistics y Schneider Electric mediante generación XML estricta (B-File y Milestone) e ingesta programada de órdenes, complementada por la API REST pública de consulta aduanera PML.',
      challenge:
        'Sincronizar órdenes de embarque, hitos logísticos y catálogos de clientes/proveedores con la plataforma global de CEVA Logistics (que exige contratos estrictos de etiquetas XML cerradas por SFTP) y habilitar consultas REST seguras para socios externos.',
      architectureHighlights: [
        'Generación de archivos XML de embarque (B-File) e hitos operativos (Milestone) con el motor Woodstox para garantizar etiquetas de apertura y cierre explícitas exigidas por el validador global de CEVA.',
        'Mecanismo transaccional anti-duplicados en el flujo de entrada que elimina los archivos del servidor SFTP únicamente tras confirmar la persistencia exitosa en el ERP.',
        'Puente bidireccional Broker-to-Softway para intercambio de declaraciones y facturas de importación con Schneider Electric.',
        'Exposición del módulo PML con endpoints REST de consulta sobre declaraciones, anexos, incidencias, liquidaciones y facturas autenticados por token.',
      ],
      pipelineSteps: [
        'Detección de cambios operativos en órdenes e hitos, generación de tramas XML con Woodstox y depósito seguro en el SFTP de CEVA.',
        'Escaneo programado de archivos entrantes de órdenes y directorios, actualización transaccional y depuración automática del buzón remoto.',
        'Atención de consultas externas en tiempo real mediante la pasarela REST autenticada de SCE Connect.',
      ],
      stack: [
        'Spring Boot',
        'Woodstox XML',
        'JAXB',
        'SFTP Bidireccional',
        'REST API / Swagger',
        'MyBatis',
        'Apache POI',
      ],
    },
    {
      id: 'proj-ripley-adualink',
      code: 'B2B-05',
      kind: 'Proyecto Enterprise B2B',
      organization: 'SINTAD',
      clientOrScope: 'Ripley · Adualink · Transitario Internacional · Infocomex',
      title: 'Apertura Asíncrona de Órdenes Retail con AWS SQS y WebServices',
      pattern: 'Event-Driven Queue · AWS SQS · JAX-WS / REST',
      status: 'En Producción',
      summary:
        'Arquitectura multi-módulo para la cadena retail Ripley y agencias asociadas que desacopla la recepción de órdenes de importación mediante API REST y colas AWS SQS, automatizando la numeración y el envío de pólizas XML.',
      challenge:
        'Absorber picos de recepción de órdenes de importación de mercadería retail sin bloquear el sistema aduanero principal, coordinando rangos de numeración multi-empresa y transmitiendo pólizas hacia los servicios web corporativos de Ripley e Infocomex.',
      architectureHighlights: [
        'Desacoplamiento entre la recepción HTTP y la persistencia operativa utilizando colas administradas en Amazon SQS.',
        'Robots consumidores de colas para generación automática de correlativos de orden e inyección de incidencias multi-origen (DAP, DAI, EDI).',
        'Integración SOAP/JAX-WS para transmisión de pólizas XML al sistema DAM de Ripley y API REST con doble origen de datos para sincronización con Infocomex.',
      ],
      pipelineSteps: [
        'Recepción de la solicitud de apertura de orden en el endpoint REST, validación de estructura y publicación inmediata en AWS SQS.',
        'Consumo asíncrono por el robot generador, asignación de numeración por empresa y registro en la base operativa.',
        'Monitoreo de pólizas numeradas, despacho automático al servicio web de Ripley y notificación dinámica por correo electrónico.',
      ],
      stack: [
        'Java / Spring Boot',
        'AWS SQS',
        'REST API',
        'JAX-WS (SOAP XML)',
        'Dual DataSource',
        'MySQL',
      ],
    },
    {
      id: 'proj-astara-boxpool',
      code: 'B2B-06',
      kind: 'Proyecto Enterprise B2B',
      organization: 'SINTAD',
      clientOrScope: 'Astara (Kia / GAC) · Agencia Aduanera Boxpool',
      title: 'Automatización de Nacionalización Automotriz (SAP + MuleSoft)',
      pattern: 'Enterprise Integration · MuleSoft · AWS Secrets',
      status: 'En Producción',
      summary:
        'Pipeline automatizado de extremo a extremo que conecta el ERP SAP del grupo automotriz Astara con el sistema aduanero de Boxpool a través de MuleSoft Cloud, eliminando la transcripción manual de más de 50 atributos técnicos por vehículo.',
      challenge:
        'El proceso de nacionalización de lotes de vehículos importados requería copiar manualmente desde SAP hacia hojas de cálculo más de 50 especificaciones técnicas por unidad (chasis, motor, serie, cilindrada), generando cuellos de botella y errores en las declaraciones.',
      architectureHighlights: [
        'Arquitectura dividida en cuatro módulos Maven (modelo compartido, API REST en Spring Boot, cliente operativo y robot programado).',
        'Interoperabilidad directa con el bus corporativo MuleSoft Cloud de Astara para recibir lotes de vehículos exportados desde SAP.',
        'Gestión centralizada de credenciales y llaves de cifrado mediante AWS Secrets Manager y Spring Security.',
      ],
      pipelineSteps: [
        'Emisión de datos técnicos de vehículos desde SAP en Astara y enrutamiento seguro a través de MuleSoft Cloud.',
        'Recepción y validación de los más de 50 atributos por unidad en el microservicio Spring Boot de Boxpool.',
        'Generación automatizada de los registros de despacho aduanero y descarga de manifiestos sin intervención manual.',
      ],
      stack: [
        'Java 11+ / Spring Boot',
        'MuleSoft Cloud',
        'SAP Integration',
        'AWS Secrets Manager',
        'Spring Security',
        'JXLS & Apache POI',
      ],
    },
    {
      id: 'proj-event-driven-customs',
      code: 'B2B-07',
      kind: 'Proyecto Enterprise B2B',
      organization: 'AICSAC · SINTAD',
      clientOrScope: 'Palacios & Asociados (PASOC) · Dogana · TLI Aduanas',
      title: 'Sincronización Event-Driven de Despachos y Guías de Remisión',
      pattern: 'Event-Driven Sync · CDC Queues · Multi-Sede',
      status: 'En Producción',
      summary:
        'Sistemas de sincronización reactiva orientados a eventos para agencias de aduana que replican órdenes, liquidaciones y guías de remisión electrónicas en tiempo real entre bases operativas y plataformas de despacho.',
      challenge:
        'Mantener consistencia inmediata de datos de guías de remisión, clientes y declaraciones entre múltiples sedes y módulos auxiliares sin recurrir a cargas manuales por lotes al final del día.',
      architectureHighlights: [
        'Captura reactiva de mutaciones de negocio encoladas en estructuras de control desacopladas con marca de tiempo y estado de sincronización.',
        'Procesamiento idempotente con reintentos exponenciales ante cortes temporales de conectividad entre sedes.',
        'Adecuación de reglas de validación aduanera específicas por operador sin alterar el núcleo del sistema transaccional.',
      ],
      pipelineSteps: [
        'Detección inmediata de altas o modificaciones en guías de remisión y órdenes operativas.',
        'Serialización del delta de negocio y procesamiento asíncrono mediante trabajadores programados.',
        'Confirmación de entrega en el sistema destino y registro en bitácora de auditoría.',
      ],
      stack: [
        'Spring Boot',
        'Event-Driven CDC',
        'MySQL',
        'MyBatis / JPA',
        'REST & SFTP',
      ],
    },
  ];

  readonly filterTabs = [
    { id: 'all' as const, label: 'Todos', count: 12 },
    { id: 'Producto Corporativo' as const, label: 'Productos Corporativos', count: 5 },
    { id: 'Proyecto Enterprise B2B' as const, label: 'Proyectos Enterprise B2B', count: 7 },
  ];

  readonly visibleDeliverables = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.deliverables;
    return this.deliverables.filter((item) => item.kind === filter);
  });

  setFilter(filter: 'all' | 'Producto Corporativo' | 'Proyecto Enterprise B2B'): void {
    this.activeFilter.set(filter);
  }

  openSheet(item: EnterpriseDeliverable): void {
    this.selectedItem.set(item);
    this.drawerOpen.set(true);
  }

  closeSheet(): void {
    this.drawerOpen.set(false);
    setTimeout(() => {
      this.selectedItem.set(null);
    }, 250);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.drawerOpen()) {
      this.closeSheet();
    }
  }
}
