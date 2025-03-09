import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { GitHubService } from '../../services/github.service';
import { RepoWithImage } from '../../../../shared/domain/GitHubRepo';

@Component({
	selector: 'app-projects',
	imports: [CommonModule],
	templateUrl: './projects-section.component.html',
	styleUrl: './projects-section.component.scss'
})
export class ProjectsComponent implements OnInit {
	private gitHubService = inject(GitHubService);

	isGridView = false;
	currentProjectIndex = 0;
	projectsToShow = 8;

	gitHubRepos: RepoWithImage[] = [];

	ngOnInit(): void {
		this.gitHubService
			.getUserReposWithReadmeImage('jdev-king')
			.pipe(map((repos) => repos.filter((repo) => !repo.fork)))
			.subscribe((repos) => {
				this.gitHubRepos = repos;
				console.log(this.gitHubRepos);
			});
	}

	toggleView() {
		this.isGridView = !this.isGridView;
	}

	// Projects navigation methods
	get visibleProjects(): RepoWithImage[] {
		const result: RepoWithImage[] = [];
		for (let i = 0; i < this.projectsToShow; i++) {
			const index = this.currentProjectIndex + i;
			// Only add projects if index is within bounds of projects array
			if (index < this.gitHubRepos.length) {
				result.push(this.gitHubRepos[index]);
			}
		}
		return result;
	}

	navigateProjects(direction: 'next' | 'prev'): void {
		const step = 8;
		if (direction === 'next') {
			this.currentProjectIndex = (this.currentProjectIndex + step) % this.gitHubRepos.length;
		} else if (direction === 'prev') {
			this.currentProjectIndex = (this.currentProjectIndex - step + this.gitHubRepos.length) % this.gitHubRepos.length;
		}
	}

	openExternalLink(url: string): void {
		window.open(url, '_blank');
	}
}
