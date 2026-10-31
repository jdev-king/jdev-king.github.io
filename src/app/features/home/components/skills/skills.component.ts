import { CommonModule } from '@angular/common';
import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';

interface Skill {
  name: string;
  level: string;
  proficiency: number;
  tools: string[];
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  readonly selectedCategory = signal<string>('All');

  readonly categories = ['All', 'AI & Machine Learning', 'Cloud & DevOps', 'Languages & Frameworks', 'Testing & Quality'];

  readonly skillsData: SkillCategory[] = [
    {
      title: 'AI & Machine Learning',
      icon: 'fas fa-brain',
      skills: [
        {
          name: 'Generative AI & Multi-Agent Factory',
          level: 'Advanced',
          proficiency: 95,
          tools: ['Gemini 1.5/2.5 Flash', 'Claude Sonnet/Opus', 'LiteLLM & Langfuse', 'EventCatalog MCP', 'LightRAG', 'Flowise', 'LangChain'],
        },
        {
          name: 'Knowledge Graphs & Vectors',
          level: 'Advanced',
          proficiency: 92,
          tools: ['Neo4j Cypher', 'CloudNativePG pgvector', 'Redis Semantic Cache', 'Pinecone', 'Vertex AI RAG Engine'],
        },
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'fas fa-cloud',
      skills: [
        {
          name: 'Multi-Cloud & Data Platforms',
          level: 'Advanced',
          proficiency: 92,
          tools: ['AWS (S3, SQS, ECR, EC2, CodeArtifact)', 'GCP (GKE, Cloud Run, Dataflow, BigQuery)', 'Azure Functions & Key Vault', 'Apache Superset (Fork BI)'],
        },
        {
          name: 'DevOps, Security & Governance',
          level: 'Advanced',
          proficiency: 90,
          tools: ['Kubernetes (GKE)', 'Docker / WSL2', 'Terraform IaC', 'GitLab CI/CD', 'Semantic Release', 'HMAC-SHA256 & AES-256'],
        },
      ],
    },
    {
      title: 'Languages & Frameworks',
      icon: 'fas fa-code',
      skills: [
        {
          name: 'Backend, Middleware & B2B Protocols',
          level: 'Advanced',
          proficiency: 94,
          tools: ['Java 21', 'Spring Boot 3.5', 'Python / FastAPI', 'PySpark & Apache Beam', 'Debezium CDC', 'ANSI X12 / EDIFACT Smooks', 'JAXB / StAX / Woodstox', 'MuleSoft & CargoWise'],
        },
        {
          name: 'Frontend & Architecture Visualization',
          level: 'Advanced',
          proficiency: 88,
          tools: ['TypeScript', 'Angular 19', 'Tailwind CSS', 'Microfrontends', 'EventCatalog', 'Archify'],
        },
      ],
    },
    {
      title: 'Testing & Quality',
      icon: 'fas fa-vial',
      skills: [
        {
          name: 'Deterministic QA & Verification',
          level: 'Advanced',
          proficiency: 88,
          tools: ['Playwright CLI', 'Pytest', 'JUnit / Mockito', 'Gitleaks', 'SonarQube', 'TDD / BDD'],
        },
      ],
    },
  ];

  readonly visibleCategories = computed(() => {
    const selected = this.selectedCategory();
    if (selected === 'All') return this.skillsData;
    return this.skillsData.filter((c) => c.title === selected);
  });

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  trackByCategory(index: number, category: SkillCategory): string {
    return category.title;
  }
}
