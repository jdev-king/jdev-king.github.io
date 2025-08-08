import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { map } from 'rxjs';
import { GitHubService } from '../../services/github.service';
import { RepoWithImage } from '../../../../shared/domain/GitHubRepo';

interface ViewConfig {
	projectsPerRow: number;
	projectsToShow: number;
	navigationStep: number;
}

interface ResponsiveBreakpoint {
	breakpoint: number;
	config: ViewConfig;
}

@Component({
	selector: 'app-projects',
	imports: [CommonModule],
	templateUrl: './projects-section.component.html',
	styleUrl: './projects-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
	private gitHubService = inject(GitHubService);

	// Responsive breakpoints configuration
	private readonly responsiveBreakpoints: ResponsiveBreakpoint[] = [
		{ breakpoint: 0, config: { projectsPerRow: 1, projectsToShow: 2, navigationStep: 2 } },    // Mobile
		{ breakpoint: 640, config: { projectsPerRow: 2, projectsToShow: 4, navigationStep: 4 } },  // SM
		{ breakpoint: 768, config: { projectsPerRow: 2, projectsToShow: 6, navigationStep: 6 } },  // MD
		{ breakpoint: 1024, config: { projectsPerRow: 3, projectsToShow: 6, navigationStep: 6 } }, // LG
		{ breakpoint: 1280, config: { projectsPerRow: 4, projectsToShow: 8, navigationStep: 8 } }  // XL
	];

	// Signals for reactive state management
	readonly isGridView = signal<boolean>(false);
	readonly currentProjectIndex = signal<number>(0);
	readonly screenWidth = signal<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
	readonly gitHubRepos = signal<RepoWithImage[]>([]);
	readonly isLoading = signal<boolean>(true);

	// Computed properties
	readonly currentViewConfig = computed<ViewConfig>(() => {
		const width = this.screenWidth();
		const breakpoint = this.responsiveBreakpoints
			.slice()
			.reverse()
			.find(bp => width >= bp.breakpoint);
		return breakpoint?.config || this.responsiveBreakpoints[0].config;
	});

	readonly visibleProjects = computed<RepoWithImage[]>(() => {
		const repos = this.gitHubRepos();
		const currentIndex = this.currentProjectIndex();
		const config = this.currentViewConfig();
		
		if (!this.isGridView()) {
			return repos; // Show all for marquee view
		}
		
		const result: RepoWithImage[] = [];
		for (let i = 0; i < config.projectsToShow; i++) {
			const index = currentIndex + i;
			if (index < repos.length) {
				result.push(repos[index]);
			}
		}
		return result;
	});

	readonly canNavigatePrev = computed<boolean>(() => {
		return this.currentProjectIndex() > 0;
	});

	readonly canNavigateNext = computed<boolean>(() => {
		const repos = this.gitHubRepos();
		const currentIndex = this.currentProjectIndex();
		const config = this.currentViewConfig();
		return currentIndex < repos.length - config.projectsToShow;
	});

	readonly gridCssClasses = computed<string>(() => {
		const config = this.currentViewConfig();
		const baseClasses = 'mb-8 grid gap-4 md:gap-6';
		
		switch (config.projectsPerRow) {
			case 1: return `${baseClasses} grid-cols-1`;
			case 2: return `${baseClasses} grid-cols-1 sm:grid-cols-2`;
			case 3: return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
			case 4: return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
			default: return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
		}
	});

	@HostListener('window:resize', ['$event'])
	onResize(event: Event): void {
		const target = event.target as Window;
		this.screenWidth.set(target.innerWidth);
		// Reset navigation when screen size changes
		this.currentProjectIndex.set(0);
	}

	ngOnInit(): void {
		this.gitHubService
			.getUserReposWithReadmeImage('jdev-king')
			.pipe(map((repos) => repos.filter((repo) => !repo.fork)))
			.subscribe({
				next: (repos) => {
					this.gitHubRepos.set(repos);
					this.isLoading.set(false);
					console.log('Loaded projects:', repos.length);
				},
				error: (error) => {
					console.error('Error loading projects:', error);
					this.isLoading.set(false);
				}
			});
	}

	toggleView(): void {
		this.isGridView.update(current => !current);
		// Reset navigation when switching views
		this.currentProjectIndex.set(0);
	}

	// Projects navigation methods

	navigateProjects(direction: 'next' | 'prev'): void {
		const config = this.currentViewConfig();
		const repos = this.gitHubRepos();
		const currentIndex = this.currentProjectIndex();
		const step = config.navigationStep;

		if (direction === 'next' && currentIndex < repos.length - config.projectsToShow) {
			const newIndex = Math.min(currentIndex + step, repos.length - config.projectsToShow);
			this.currentProjectIndex.set(newIndex);
		} else if (direction === 'prev' && currentIndex > 0) {
			const newIndex = Math.max(currentIndex - step, 0);
			this.currentProjectIndex.set(newIndex);
		}
	}

	// Track by function for performance optimization
	trackByProject(index: number, project: RepoWithImage): string {
		return project.id?.toString() || project.name;
	}

	// Utility functions for template
	readonly Math = Math;

	openExternalLink(url: string): void {
		window.open(url, '_blank');
	}
}
