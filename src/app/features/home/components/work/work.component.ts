import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

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
	styleUrl: './work.component.scss'
})
export class WorkComponent {
	sidebarVisible = signal(false);
	selectedWork = signal<WorkExperience | null>(null);
	currentDate = new Date();
	workExperience: WorkExperience[] = [
		{
			startDate: new Date('2024-07'),
			endDate: new Date(),
			company: 'Sintad',
			companyUrl: 'https://www.sintad.pe/',
			position: 'Full Stack Developer (Semi-Senior) & AI Specialist',
			tech: ['Flask', 'Pinecone', 'Flowise', 'Vertex AI', 'Angular'],
			description:
				'Leading the design, development, and implementation of AI-driven solutions to optimize business processes and enhance system efficiency. Spearheading the integration of machine learning models, automation tools, and AI-assisted development workflows to improve performance, reduce manual effort, and drive innovation across multiple ERP modules.',
			responsibilities: [
				'Designed and deployed a scalable OCR service using Google Cloud Document AI, reducing manual processing time by 40%.',
				'Developed and implemented an automated customer service solution with LLM´s & RAG, achieving a 60% reduction in human intervention.',
				'Integrated Aider Chat for AI-assisted pair programming across all ERP modules, enhancing development efficiency and code quality by 40%.',
				'Migrated company products to Angular 17, improving system performance by 20% and reducing technical debt.',
				'Refactored production systems, achieving a 90% issue resolution rate and minimizing downtime.'
			]
		},
		{
			startDate: new Date('2024-04'),
			endDate: new Date('2024-10'),
			company: 'Hebrax IMS',
			companyUrl: 'https://hebrax-ims.com/',
			position: 'Co-Founder & CTO',
			tech: ['FastAPI', 'LLM´s', 'Angular', 'Firebase'],
			description:
				'Driving the development of AI-powered solutions and scalable web architectures to enhance automation, system performance, and user experience. Leading the design and deployment of GPT-4 conversational agents, optimizing customer interactions through seamless integration. Architecting high-performance web platforms with modern frameworks, ensuring efficiency and accelerated delivery. Enhancing UI/UX processes with prototyping tools to streamline development and improve client satisfaction. Establishing robust code quality standards to increase maintainability and reduce defects across development workflows.',
			responsibilities: [
				'Built GPT-4-powered conversational agents, automating 30% of customer interactions with seamless system integration.',
				'Designed the architecture for a scalable dermatological web platform, delivering the project 20% ahead of schedule.',
				'Integrated Angular 17, FastAPI, and GCP to enhance system performance by 15%.',
				'Prototyped UI designs in Figma, reducing development revisions by 25% and increasing client satisfaction.',
				'Established code quality standards using Husky, Prettier, and ESLint, improving maintainability and reducing defects by 30%.'
			]
		},
		{
			startDate: new Date('2022-12'),
			endDate: new Date('2024-06'),
			company: 'Sintad',
			companyUrl: 'https://www.sintad.pe/',
			position: 'Full Stack Developer (Junior)',
			tech: ['Angular', 'Kotlin', 'SpringBoot'],
			description:
				'Leading the development and optimization of backend and frontend functionalities to enhance system performance and user experience. Implementing robust testing strategies with Mockito and Jest, achieving 90% code coverage and reducing production bugs. Driving codebase refactoring efforts to minimize technical debt and improve maintainability. Designing and developing mobile applications with Kotlin, streamlining operational workflows and increasing efficiency.',
			responsibilities: [
				'Developed and enhanced backend and frontend functionalities, improving system efficiency and user experience.',
				'Created unit tests with Mockito and Jest, achieving 90% code coverage and reducing production bugs by 20%.',
				'Refactored the codebase, reducing technical debt by 25%.',
				'Designed and implemented a mobile app with Kotlin, streamlining driver tasks and improving operational efficiency.'
			]
		},
		{
			startDate: new Date('2021-12'),
			endDate: new Date('2022-03'),
			company: 'Sintad',
			companyUrl: 'https://www.sintad.pe/',
			position: 'Full Stack Developer (Junior)',
			tech: ['Angular', 'SpringBoot'],
			description:
				'Development and optimization of backend and frontend functionalities to enhance system performance and user experience',
			responsibilities: [
				'Developed key functionalities, including trip tracking, trip incident management, and the creation and editing of transport orders, improving operational efficiency by 15%.'
			]
		}
	];

	calculateDuration(startDate: Date, endDate: Date): string {
		const currentDate = new Date();
		const totalMonths =
			((endDate.getUTCDay() === currentDate.getUTCDay() ? currentDate.getTime() : endDate.getTime()) -
				startDate.getTime()) /
			(1000 * 60 * 60 * 24 * 30.44);

		const years = Math.floor(totalMonths / 12);
		const months = Math.floor(totalMonths % 12);

		return years > 0
			? `${years} year${years > 1 ? 's' : ''}${months > 0 ? ` ${months} month${months > 1 ? 's' : ''}` : ''}`
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
