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
          name: 'Generative AI & LLMs',
          level: 'Advanced',
          proficiency: 95,
          tools: ['Gemini 1.5/2.5 Flash', 'Claude 3.5 Sonnet', 'GPT-4o', 'Prompt Engineering', 'LangChain', 'Flowise', 'LightRAG'],
        },
        {
          name: 'Knowledge Graphs & Vectors',
          level: 'Advanced',
          proficiency: 92,
          tools: ['Neo4j Cypher', 'CloudNativePG pgvector', 'Pinecone', 'Redis Semantic Cache', 'Vertex AI RAG Engine'],
        },
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'fas fa-cloud',
      skills: [
        {
          name: 'Cloud Platforms',
          level: 'Advanced',
          proficiency: 90,
          tools: ['Google Cloud (GCP)', 'Amazon Web Services (AWS)', 'Cloud Run', 'BigQuery', 'Pub/Sub', 'Dataflow'],
        },
        {
          name: 'DevOps & Orchestration',
          level: 'Advanced',
          proficiency: 88,
          tools: ['Kubernetes (GKE)', 'Docker Compose', 'Terraform IaC', 'GitLab CI/CD', 'GitHub Actions', 'MCP Servers'],
        },
      ],
    },
    {
      title: 'Languages & Frameworks',
      icon: 'fas fa-code',
      skills: [
        {
          name: 'Backend & Data Streaming',
          level: 'Advanced',
          proficiency: 92,
          tools: ['Python', 'FastAPI', 'Java', 'Spring Boot', 'Apache Beam', 'Debezium CDC', 'PostgreSQL', 'MySQL'],
        },
        {
          name: 'Frontend & UI Engineering',
          level: 'Advanced',
          proficiency: 88,
          tools: ['TypeScript', 'Angular 19', 'Tailwind CSS', 'Microfrontends', 'Responsive UX', 'Archify'],
        },
      ],
    },
    {
      title: 'Testing & Quality',
      icon: 'fas fa-vial',
      skills: [
        {
          name: 'Testing & Verification',
          level: 'Advanced',
          proficiency: 85,
          tools: ['Pytest', 'Jest', 'Jasmine / Karma', 'TDD / BDD', 'Integration Testing'],
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
