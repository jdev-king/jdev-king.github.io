import { CommonModule } from '@angular/common';
import { Component, signal, computed, HostListener, ChangeDetectionStrategy } from '@angular/core';

interface WorkExperience {
  startDate: Date;
  endDate: Date;
  company: string;
  companyUrl: string;
  position: string;
  tech: string[];
  description: string;
  responsibilities: string[];
}

@Component({
  selector: 'app-work',
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent {
  // Responsive breakpoints
  private readonly MOBILE_BREAKPOINT = 768;
  private readonly TABLET_BREAKPOINT = 1024;

  // Signals for state management
  sidebarVisible = signal(false);
  selectedWork = signal<WorkExperience | null>(null);
  screenWidth = signal(typeof window !== 'undefined' ? window.innerWidth : 1024);
  currentDate = new Date();

  // Computed properties for responsive behavior
  isMobile = computed(() => this.screenWidth() < this.MOBILE_BREAKPOINT);
  isTablet = computed(() => this.screenWidth() >= this.MOBILE_BREAKPOINT && this.screenWidth() < this.TABLET_BREAKPOINT);
  isDesktop = computed(() => this.screenWidth() >= this.TABLET_BREAKPOINT);

  // Responsive grid classes
  gridClasses = computed(() => {
    if (this.isMobile()) {
      return 'grid grid-cols-1 gap-3';
    } else if (this.isTablet()) {
      return 'grid grid-cols-[0.4fr_1fr] gap-4';
    }
    return 'grid grid-cols-[0.5fr_1fr_1fr] gap-4';
  });

  // Responsive sidebar width
  sidebarClasses = computed(() => {
    if (this.isMobile()) {
      return 'w-full';
    } else if (this.isTablet()) {
      return 'w-[70dvw]';
    }
    return 'w-[40dvw]';
  });

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const target = event.target as Window;
    this.screenWidth.set(target.innerWidth);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.sidebarVisible()) {
      this.closeSidebar();
    }
  }

  workExperience: WorkExperience[] = [
    {
      startDate: new Date('2026-01-01'),
      endDate: new Date(),
      company: 'AICSAC & SINTAD (Grupo Empresarial)',
      companyUrl: 'https://www.sintad.pe/',
      position: 'Tech Lead & Full Stack AI Architect',
      tech: [
        'Java 21 / Spring Boot 3.5',
        'FastAPI',
        'PySpark (Stages A/B/C)',
        'Apache Superset (Fork)',
        'AWS S3 / SQS / CodeArtifact',
        'Azure Functions',
        'EventCatalog & MCP',
        'CargoWise / EDI X12 / SAP',
      ],
      description:
        'Dirijo la arquitectura de productos corporativos en AICSAC (SCE Connect Middleware, Plataforma Analítica con modelos OBT en AWS, Sumax Analytics sobre Apache Superset y SCE Robot Framework) y audito e implemento más de 20 sistemas de integración B2B en SINTAD para operadores globales como DHL, Maersk, UPS, CEVA Logistics, Ripley y Astara.',
      responsibilities: [
        'Diseñé la arquitectura modular de SCE Connect Middleware (Spring Boot, MyBatis/JPA, Flyway, cifrado AES-256) para integrar el ERP local con SAP, Zoho CRM, CEVA Logistics (Woodstox XML/SFTP) y consumidores API sin exponer bases de datos a internet.',
        'Estructuré la Plataforma Analítica Multi-Stage en AWS (ingesta CDC hacia S3 RAW, transformación PySpark en Stages A/B/C y modelos OBT para Aduanas, Carga, Transporte y Contabilidad) consumida por Sumax Analytics (fork corporativo de Apache Superset con SSO JIT en AWS ECR/EC2).',
        'Creé el ecosistema de librerías transversales SCE Robot Framework en Java 21 (publicado en AWS CodeArtifact con Semantic Release) para estandarizar validación HMAC-SHA256, caché Caffeine, autenticación saliente polimórfica y latidos de salud cada 5 minutos con Circuit Breaker.',
        'Audité y dirigí la evolución de más de 20 integraciones B2B en producción: suite DHL (CargoWise eAdapter XML, HP EDI X12 214 con Smooks, Schneider Electric, Lenovo CUSDEC/CUSRES y JBA), API serverless en Azure Functions para Maersk, automatización StAX/EDI para UPS (Cisco, Dell, FGV), colas AWS SQS para Ripley e integración SAP + MuleSoft para Astara.',
        'Desplegué la AI Software Factory multi-agente aislada en zonas de confianza (DEV y OPS) sobre contenedores WSL2, gobernada por un catálogo vivo en EventCatalog + MCP y una puerta determinista de aseguramiento de calidad (Playwright, Gitleaks y revisión con modelo cruzado).',
      ],
    },
    {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-12-31'),
      company: 'SINTAD',
      companyUrl: 'https://www.sintad.pe/',
      position: 'Full Stack AI Engineer',
      tech: ['FastAPI', 'Vertex AI', 'GraphRAG', 'Angular', 'Redis', 'Neo4j', 'GCP', 'AWS'],
      description:
        'Diseñé la arquitectura GraphRAG híbrida Fortress Lite sobre Google Kubernetes Engine (GKE), reduciendo en un 95% los costos mensuales de inferencia LLM mediante caché semántico en Redis y enrutamiento por dominio.',
      responsibilities: [
        'Diseñé y desplegué la arquitectura Fortress Lite sobre GKE para procesar más de 33,000 consultas diarias sobre legislación aduanera, sistema armonizado, carga y contabilidad.',
        'Reduje el gasto operativo de inferencia en un 95% migrando cargas de trabajo hacia modelos Gemini Flash e interceptando el 40% del tráfico recurrente con Redis Semantic Cache en menos de 50ms.',
        'Implementé el motor de recuperación híbrido combinando grafos de conocimiento en Neo4j con búsqueda vectorial en CloudNativePG (PostgreSQL + pgvector).',
        'Construí el servicio de extracción documental automatizada con Google Cloud Document AI y FastAPI, acortando el tiempo de procesamiento de documentos aduaneros en un 70% y ahorrando más de 200 horas operativas al mes.',
      ],
    },
    {
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-10-31'),
      company: 'Hebrax IMS',
      companyUrl: 'https://hebrax-ims.com/',
      position: 'Co-Founder & AI Engineer',
      tech: ['FastAPI', 'LangChain', 'Angular', 'Firebase'],
      description:
        'Cofundé y dirigí el desarrollo técnico de una plataforma clínica de apoyo al triaje dermatológico y gestión de historias médicas sobre FastAPI, LangChain y Angular.',
      responsibilities: [
        'Desarrollé el asistente conversacional de triaje dermatológico preliminar para estructurar síntomas previos a la consulta médica.',
        'Implementé plantillas de validación clínica y restricción de contexto para evitar respuestas fuera de protocolo médico.',
        'Construí la aplicación web de extremo a extremo con FastAPI, Angular y Firebase desde el prototipo inicial hasta su despliegue.',
      ],
    },
    {
      startDate: new Date('2022-01-01'),
      endDate: new Date('2023-01-01'),
      company: 'SINTAD',
      companyUrl: 'https://www.sintad.pe/',
      position: 'Full Stack Developer',
      tech: ['Angular', 'Kotlin', 'Spring Boot', 'Flowise', 'Pinecone', 'LangChain'],
      description:
        'Participé en la modernización de módulos del ERP aduanero hacia Angular y servicios en Spring Boot / Kotlin, además de construir herramientas internas de búsqueda semántica documental.',
      responsibilities: [
        'Migré módulos críticos del ERP hacia Angular moderno, mejorando los tiempos de carga inicial y reduciendo la deuda técnica del frontend en un 30%.',
        'Desarrollé flujos internos de consulta documental con LangChain, Flowise y Pinecone que redujeron el tiempo de soporte manual en un 60%.',
        'Desacoplé funcionalidades de escritorio hacia servicios web RESTful en Spring Boot y Kotlin.',
      ],
    },
  ];

  calculateDuration(startDate: Date, endDate: Date): string {
    const currentDate = new Date();
    const totalMonths =
      ((endDate.getUTCDay() === currentDate.getUTCDay()
        ? currentDate.getTime()
        : endDate.getTime()) -
        startDate.getTime()) /
      (1000 * 60 * 60 * 24 * 30.44);

    const years = Math.floor(totalMonths / 12);
    const months = Math.floor(totalMonths % 12);

    return years > 0
      ? `${years} año${years > 1 ? 's' : ''}${
          months > 0 ? ` ${months} mes${months > 1 ? 'es' : ''}` : ''
        }`
      : `${months} mes${months > 1 ? 'es' : ''}`;
  }

  openSidebar(work: WorkExperience) {
    this.selectedWork.set(work);
    this.sidebarVisible.set(true);
  }

  closeSidebar() {
    this.sidebarVisible.set(false);
    setTimeout(() => {
      this.selectedWork.set(null);
    }, 300); // Wait for transition to complete
  }
}
