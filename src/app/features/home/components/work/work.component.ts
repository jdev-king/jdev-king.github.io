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
  workExperience: WorkExperience[] = [
    {
      startDate: new Date('2026-01-01'),
      endDate: new Date(),
      company: 'ASESORIA INFORMATICA & COMERCIO S.A.C.',
      companyUrl: '',
      position: 'Tech Lead & Full Stack AI Engineer',
      tech: ['FastAPI', 'Spring Boot', 'PySpark', 'Terraform', 'GitLab CI/CD', 'SAP B1', 'CargoWise'],
      description:
        'Delivering mission-critical interoperability solutions for global trade leaders (DHL, Maersk, Expeditors, Ripley). Architecting integration layers between legacy enterprise systems and modern real-time data platforms on GCP and AWS, while promoting AI-first workflows.',
      responsibilities: [
        'Enterprise Interoperability: Delivered solutions for global trade leaders (DHL, Maersk, Expeditors, Ripley), architecting integration layers between SAP B1, CargoWise, Sintad SCE, and modern microservices.',
        'Real-Time Systems: Engineered real-time APIs and dashboards using FastAPI, Spring Boot, and PySpark on hybrid cloud environments.',
        'DevOps & Automation: Established DevOps best practices using Terraform, GitLab CI/CD, TDD, and BDD methodologies.',
        'AI-First Transformation: Promoted AI-first workflows across teams, transforming manual processes into automated, AI-assisted pipelines.',
      ],
    },
    {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-12-31'),
      company: 'Sintad',
      companyUrl: 'https://www.sintad.pe/',
      position: 'Full Stack AI Engineer',
      tech: ['FastAPI', 'Vertex AI', 'RAG', 'Angular', 'Prompt Engineering', 'Redis', 'Neo4j', 'GCP', 'AWS'],
      description:
        'Architected hybrid GraphRAG systems and reduced LLM operational costs by 95%. Designed scalable cloud-native architectures on GCP and AWS while leading engineering teams in delivering production-grade AI solutions.',
      responsibilities: [
        'GraphRAG System: Architected "Fortress Lite", a hybrid GraphRAG system deployed on GKE, processing 33,000+ daily queries.',
        'Cost Optimization: Reduced LLM operational costs by 95% by migrating inference to Gemini 2.5 Flash-lite and implementing Redis semantic caching.',
        'High Performance & Security: Achieved sub-50ms latency for 40% of traffic while maintaining Zero Trust security and regulatory compliance via Neo4j.',
        'Cloud Architecture: Designed scalable cloud-native architectures on GCP and AWS, optimizing infrastructure costs and application performance.',
        'Team Leadership: Led and mentored engineering teams, translating complex business requirements into production-grade solutions.',
        'AI Pipeline: Built an AI-driven Problem-to-Code pipeline that auto-generates architecture documents, security analyses, ClickUp tasks, user stories, and unit tests.',
        'OCR Automation: Led OCR automation using Google Cloud Document AI and FastAPI, reducing document processing time by 70% and saving 200+ hours/month.',
      ],
    },
    {
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-10-31'),
      company: 'Hebrax IMS',
      companyUrl: 'https://hebrax-ims.com/',
      position: 'Co-Founder | AI Engineer',
      tech: ['FastAPI', 'LangChain', 'Angular', 'Firebase'],
      description:
        'Co-founded and led the technical development of AI-powered healthcare solutions. Spearheaded the architecture, design, and development of intelligent systems for medical applications, focusing on dermatology consultation support and patient triage automation.',
      responsibilities: [
        'AI Chatbot Development: Designed and delivered an AI-powered dermatology chatbot for patient triage and consultation support.',
        'Prompt Engineering: Applied advanced prompt engineering (few-shot, role-based prompting) for safe medical LLM use.',
        'Full-Stack Delivery: Built the full-stack product using FastAPI and Angular, managing the entire lifecycle from ideation to deployment.',
      ],
    },
    {
      startDate: new Date('2022-01-01'),
      endDate: new Date('2023-01-01'),
      company: 'Sintad',
      companyUrl: 'https://www.sintad.pe/',
      position: 'Full Stack Developer',
      tech: ['Angular', 'Kotlin', 'SpringBoot', 'Flowise', 'Pinecone', 'LangChain'],
      description:
        'Led ERP modernization initiatives, migrating legacy systems to Angular 17, reducing technical debt by 30%. Integrated AI-assisted development tools and developed internal automation tools.',
      responsibilities: [
        'ERP Modernization: Led the migration to Angular 17 for a core ERP system, reducing frontend load times and cutting technical debt by 30%.',
        'AI-Assisted Development: Integrated AI-assisted development tools (Aider Chat) to accelerate delivery and improve code consistency.',
        'Process Automation: Developed internal automation tools using LangChain, Flowise, and Pinecone, reducing manual effort by 60%.',
        'Cloud Integration: Migrated legacy desktop applications to cloud-native architectures, improving availability and scalability.',
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
      ? `${years} year${years > 1 ? 's' : ''}${
          months > 0 ? ` ${months} month${months > 1 ? 's' : ''}` : ''
        }`
      : `${months} month${months > 1 ? 's' : ''}`;
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
