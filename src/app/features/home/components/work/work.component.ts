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
      startDate: new Date('2024-01-01'),
      endDate: new Date(),
      company: 'Sintad',
      companyUrl: 'https://www.sintad.pe/',
      position: 'AI Engineer | Full Stack Developer',
      tech: ['FastAPI', 'Vertex AI', 'RAG', 'Angular', 'Prompt Engineering'],
      description:
        'AI Engineer with strong experience in building production-ready, end-to-end AI systems and intelligent web applications. Skilled in designing conversational agents, applying prompt engineering strategies, and deploying scalable machine learning services in cloud environments. Expert in LangChain, GPT-4, and cloud-native architecture with a background in full-stack development.',
      responsibilities: [
        'Automated Document Processing: Led the design and deployment of an OCR system using Google Cloud Document AI and FastAPI, reducing invoice processing time by 70% and saving ~200+ hours/month.',
        'Conversational AI Deployment: Architected and implemented a GPT-4-powered agent that automated 30% of customer support, improving resolution time and increasing CSAT by 15%.',
        'Team Enablement via Prompt Engineering: Mentored junior developers on prompt engineering and AI tooling, which enhanced team delivery speed and reduced planning overhead in estimation sessions.',
        'AI-Driven Workflow: I designed, implemented, and trained development teams to use AI prompts throughout the development workflow, from creating user stories, generating unit tests, and developing features.',
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
        'End-to-End AI Chatbot Development: Spearheaded the architecture, design, and development of a dermatology-focused AI chatbot, delivering an intelligent assistant for patient triage and consultation support.',
        'Prompt Engineering & LLM Integration: Applied advanced prompt engineering techniques such as few-shot prompting to optimize ChatGPT responses for medical use cases, ensuring safety and relevance.',
        'LangChain Framework Expertise: Built the conversational system using the LangChain framework for modularity, context management, and scalable integration with APIs and knowledge sources.',
        'Full-Stack Product Delivery: Designed and implemented the entire web application from scratch using FastAPI and Angular, ensuring a responsive and secure user experience.',
        'Cross-Functional Ownership: Managed product lifecycle from ideation to deployment, validating the solution with early users and iterating based on feedback to improve usability and accuracy.',
      ],
    },
    {
      startDate: new Date('2022-01-01'),
      endDate: new Date('2024-01-01'),
      company: 'Sintad',
      companyUrl: 'https://www.sintad.pe/',
      position: 'Full Stack Developer',
      tech: ['Angular', 'Kotlin', 'SpringBoot', 'Flowise', 'Pinecone', 'LangChain'],
      description:
        'Leading the development and optimization of backend and frontend functionalities to enhance system performance and user experience. Implementing robust testing strategies with Mockito and Jest, achieving 90% code coverage and reducing production bugs. Driving codebase refactoring efforts to minimize technical debt and improve maintainability.',
      responsibilities: [
        'ERP Modernization: Led the migration to Angular 17 for a core ERP system, reducing frontend load times and cutting technical debt by 30%.',
        'AI-Assisted Development: Integrated Aider Chat for AI pair programming across ERP modules, accelerating development and improving code consistency.',
        'Process Automation: Developed internal automation tools using Flowise, Pinecone, and LangChain, reducing manual workflow effort by up to 60%.',
        'Cloud Integration: Migrated legacy desktop apps to cloud infrastructure, enabling remote access and enhancing system availability.',
        'Cross-Functional Collaboration: Worked across teams to redesign merchandise tracking features, improving UI/UX and operational monitoring.',
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
