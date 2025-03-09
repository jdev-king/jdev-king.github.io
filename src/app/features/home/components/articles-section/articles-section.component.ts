import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MediumService } from '../../services/medium.service';
import { MediumPost } from '../../../../shared/domain/MediumPost';
import { environment } from '../../../../../environments/environment.development';

@Component({
	selector: 'app-articles',
	imports: [CommonModule],
	templateUrl: './articles-section.component.html',
	styleUrl: './articles-section.component.scss'
})
export class ArticlesComponent implements OnInit {
	mediumService = inject(MediumService);

	// Articles data and state
	currentArticlePage = 1;
	articlesPerPage = 4;
	articles: MediumPost[] = [];

	ngOnInit(): void {
		this.mediumService.getUserPosts(environment.mediumUser).subscribe((posts) => {
			this.articles = posts;
		});
	}

	// Articles navigation methods
	get visibleArticles(): MediumPost[] {
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

	openExternalLink(url: string): void {
		window.open(url, '_blank');
	}
}
