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
	styleUrl: './skills.component.scss'
})
export class SkillsComponent {
	skillsData: SkillCategory[] = [
		{
			title: 'AI & Machine Learning',
			icon: 'fas fa-brain',
			skills: [
				{
					name: 'LLMs & NLP',
					level: 'Intermediate',
					proficiency: 55,
					tools: ['LangChain', 'LangGraph', 'LangSmith', 'Flowise']
				},
				{
					name: 'AI APIs',
					level: 'Advance',
					proficiency: 85,
					tools: ['OpenAI', 'Anthropic', 'Google Gemini', 'Hugging Face']
				},
				{
					name: 'Deep Learning',
					level: 'Begginer',
					proficiency: 25,
					tools: ['TensorFlow']
				}
			]
		},
		{
			title: 'Database & Storage',
			icon: 'fas fa-database',
			skills: [
				{
					name: 'Vector & Graph Databases',
					level: 'Intermediate',
					proficiency: 55,
					tools: ['Pinecone', 'Neo4j']
				}
			]
		},
		{
			title: 'Automation',
			icon: 'fas fa-bolt',
			skills: [
				{
					name: 'Workflow',
					level: 'Intermediate',
					proficiency: 60,
					tools: ['N8N', 'Make']
				}
			]
		},
		{
			title: 'Cloud & DevOps',
			icon: 'fas fa-cloud',
			skills: [
				{
					name: 'Cloud Platforms',
					level: 'Intermediate',
					proficiency: 60,
					tools: ['GCP', 'AWS']
				}
			]
		},
		{
			title: 'Programming',
			icon: 'fas fa-code',
			skills: [
				{
					name: 'Languages',
					level: 'Advance',
					proficiency: 80,
					tools: ['Python', 'TypeScript', 'Java']
				}
			]
		},
		{
			title: 'Web Development',
			icon: 'fas fa-laptop-code',
			skills: [
				{
					name: 'Frontend',
					level: 'Advanced',
					proficiency: 85,
					tools: ['Angular', 'PrimeNG', 'TailwindCSS']
				},
				{
					name: 'Backend',
					level: 'Intermediate',
					proficiency: 60,
					tools: ['Spring Boot', 'Flask', 'FastAPI']
				}
			]
		}
	];
}
