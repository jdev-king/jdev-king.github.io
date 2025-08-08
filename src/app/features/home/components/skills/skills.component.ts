import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  // TrackBy function for better performance
  trackByCategory(index: number, category: SkillCategory): string {
    return category.title;
  }

  skillsData: SkillCategory[] = [
    {
      title: 'AI & Machine Learning',
      icon: 'fas fa-brain',
      skills: [
        {
          name: 'LLMs & NLP',
          level: 'Intermediate',
          proficiency: 55,
          tools: ['LangChain', 'LangGraph', 'LangSmith', 'Flowise'],
        },
        {
          name: 'AI APIs',
          level: 'Advance',
          proficiency: 85,
          tools: ['Google Vertex AI', 'OpenAI', 'Anthropic', 'Hugging Face'],
        },
        {
          name: 'Deep Learning',
          level: 'Begginer',
          proficiency: 25,
          tools: ['TensorFlow'],
        },
      ],
    },
    {
      title: 'Database & Storage',
      icon: 'fas fa-database',
      skills: [
        {
          name: 'Vector & Graph Databases',
          level: 'Intermediate',
          proficiency: 60,
          tools: ['Vertex Rag Engine', 'PG-vector', 'Pinecone', 'Neo4j'],
        },
        {
          name: 'Relational Databases',
          level: 'Intermediate',
          proficiency: 70,
          tools: ['PostgreSQL'],
        },
        {
          name: 'NoSQL Databases',
          level: 'Intermediate',
          proficiency: 55,
          tools: ['Firestore', 'MongoDB'],
        },
      ],
    },
    {
      title: 'Automation',
      icon: 'fas fa-bolt',
      skills: [
        {
          name: 'Workflow',
          level: 'Intermediate',
          proficiency: 40,
          tools: ['N8N', 'Make'],
        },
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'fas fa-cloud',
      skills: [
        {
          name: 'Cloud Platforms',
          level: 'Intermediate',
          proficiency: 60,
          tools: ['Google Cloud', 'AWS'],
        },
      ],
    },
    {
      title: 'Programming',
      icon: 'fas fa-code',
      skills: [
        {
          name: 'Languages',
          level: 'Advance',
          proficiency: 80,
          tools: ['Python', 'TypeScript', 'Java'],
        },
      ],
    },
    {
      title: 'Web Development',
      icon: 'fas fa-laptop-code',
      skills: [
        {
          name: 'Frontend',
          level: 'Advanced',
          proficiency: 90,
          tools: ['Angular', 'PrimeNG', 'TailwindCSS'],
        },
        {
          name: 'Backend',
          level: 'Intermediate',
          proficiency: 70,
          tools: ['FastAPI', 'Spring Boot'],
        },
      ],
    },
  ];
}
