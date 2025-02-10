import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fadeAnimation, slideAnimation } from '../../shared/animations/animations';
import { SkillsComponent } from './components/skills/skills.component';

interface Article {
	title: string;
	description: string;
}

interface Project {
	title: string;
	description: string;
	image: string;
}

interface Work {
	startDate: Date;
	endDate: Date;
	company: string;
	companyUrl: string;
	position: string;
	tech: string;
}

@Component({
	selector: 'app-home',
	imports: [CommonModule, SkillsComponent],
	animations: [slideAnimation, fadeAnimation],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	isGridView = false;
	currentProjectIndex = 0;
	projectsToShow = 8;
	projects: Project[] = [
		{
			title: 'Project 1',
			description: 'Description for project 1',
			image:
				'https://cdn.sanity.io/images/bbnkhnhl/production/8f43a4a2a98e66e445da6aa51960e0fc241fb2c2-1460x968.jpg?w=1200&q=75&fit=clip&auto=format'
		},
		{
			title: 'Project 2',
			description: 'Description for project 2',
			image:
				'https://cdn.sanity.io/images/bbnkhnhl/production/8f43a4a2a98e66e445da6aa51960e0fc241fb2c2-1460x968.jpg?w=1200&q=75&fit=clip&auto=format'
		},
		{
			title: 'Project 3',
			description: 'Description for project 3',
			image:
				'https://cdn.sanity.io/images/bbnkhnhl/production/8f43a4a2a98e66e445da6aa51960e0fc241fb2c2-1460x968.jpg?w=1200&q=75&fit=clip&auto=format'
		},
		{
			title: 'Project 4',
			description: 'Description for project 4',
			image:
				'https://cdn.sanity.io/images/bbnkhnhl/production/8f43a4a2a98e66e445da6aa51960e0fc241fb2c2-1460x968.jpg?w=1200&q=75&fit=clip&auto=format'
		},
		{
			title: 'Project 5',
			description: 'Description for project 5',
			image:
				'https://cdn.sanity.io/images/bbnkhnhl/production/8f43a4a2a98e66e445da6aa51960e0fc241fb2c2-1460x968.jpg?w=1200&q=75&fit=clip&auto=format'
		}
	];

	// Articles data and state
	currentArticlePage = 1;
	articlesPerPage = 4;
	articles: Article[] = [
		{
			title: 'The simplest example is kafka + golang',
			description:
				'This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.'
		},
		{
			title: 'The simplest example is kafka + golang',
			description:
				'This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.'
		},
		{
			title: 'The simplest example is kafka + golang',
			description:
				'This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.'
		},
		{
			title: 'The simplest example is kafka + golang',
			description:
				'This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.'
		},
		{
			title: 'The simplest example is kafka + golang',
			description:
				'This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.'
		},
		{
			title: 'The simplest example is kafka + golang',
			description:
				'This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.'
		}
	];

	currentDate = new Date();
	workExperience: Work[] = [
		{
			startDate: new Date('2024-07'),
			endDate: new Date(),
			company: 'Sintad',
			companyUrl: 'https://www.sintad.pe/',
			position: 'Full Stack Developer (Semi-Senior) & AI Specialist',
			tech: 'Flask, Vertex AI & Angular'
		},
		{
			startDate: new Date('2024-04'),
			endDate: new Date('2024-10'),
			company: 'Hebrax IMS',
			companyUrl: 'https://hebrax-ims.com/',
			position: 'Co-Founder & CTO',
			tech: 'FastAPI, LLM´s & Angular'
		},
		{
			startDate: new Date('2022-12'),
			endDate: new Date('2024-06'),
			company: 'Sintad',
			companyUrl: 'https://www.sintad.pe/',
			position: 'Full Stack Developer (Junior)',
			tech: 'Angular, Kotlin & SpringBoot'
		},
		{
			startDate: new Date('2021-12'),
			endDate: new Date('2022-03'),
			company: 'Sintad',
			companyUrl: 'https://www.sintad.pe/',
			position: 'Full Stack Developer (Junior)',
			tech: 'Angular & SpringBoot'
		}
	];

	toggleView() {
		this.isGridView = !this.isGridView;
	}

	// Projects navigation methods
	get visibleProjects(): Project[] {
		const result: Project[] = [];
		for (let i = 0; i < this.projectsToShow; i++) {
			const index = this.currentProjectIndex + i;
			// Only add projects if index is within bounds of projects array
			if (index < this.projects.length) {
				result.push(this.projects[index]);
			}
		}
		return result;
	}

	navigateProjects(direction: 'next' | 'prev'): void {
		const step = 8;
		if (direction === 'next') {
			this.currentProjectIndex = (this.currentProjectIndex + step) % this.projects.length;
		} else if (direction === 'prev') {
			this.currentProjectIndex = (this.currentProjectIndex - step + this.projects.length) % this.projects.length;
		}
	}

	// Articles navigation methods
	get visibleArticles(): Article[] {
		const startIndex = (this.currentArticlePage - 1) * this.articlesPerPage;
		return this.articles.slice(startIndex, startIndex + this.articlesPerPage);
	}

	getPageNumbers(): number[] {
		const pageCount = Math.ceil(this.articles.length / this.articlesPerPage);
		return Array.from({ length: pageCount }, (_, i) => i + 1);
	}

	setArticlePage(page: number): void {
		this.currentArticlePage = page;
	}

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
}
