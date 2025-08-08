import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { MediumService } from '../../services/medium.service';
import { MediumPost } from '../../../../shared/domain/MediumPost';
import { environment } from '../../../../../environments/environment.development';

@Component({
	selector: 'app-articles',
	imports: [CommonModule],
	templateUrl: './articles-section.component.html',
	styleUrl: './articles-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent implements OnInit {
	mediumService = inject(MediumService);

	// Responsive breakpoints
	private readonly MOBILE_BREAKPOINT = 768;
	private readonly TABLET_BREAKPOINT = 1024;

	// Signals for state management
	currentArticlePage = signal(1);
	articles = signal<MediumPost[]>([]);
	isLoading = signal(true);
	screenWidth = signal(typeof window !== 'undefined' ? window.innerWidth : 1024);

	// Computed properties for responsive behavior
	isMobile = computed(() => this.screenWidth() < this.MOBILE_BREAKPOINT);
	isTablet = computed(() => this.screenWidth() >= this.MOBILE_BREAKPOINT && this.screenWidth() < this.TABLET_BREAKPOINT);
	isDesktop = computed(() => this.screenWidth() >= this.TABLET_BREAKPOINT);

	// Responsive articles per page
	articlesPerPage = computed(() => {
		if (this.isMobile()) {
			return 2;
		} else if (this.isTablet()) {
			return 3;
		}
		return 4;
	});

	// Responsive grid classes
	gridClasses = computed(() => {
		if (this.isMobile()) {
			return 'grid grid-cols-1 gap-4';
		} else if (this.isTablet()) {
			return 'grid grid-cols-2 gap-5';
		}
		return 'grid grid-cols-2 gap-6';
	});

	@HostListener('window:resize', ['$event'])
	onResize(event: Event): void {
		const target = event.target as Window;
		this.screenWidth.set(target.innerWidth);
		// Reset to first page when screen size changes
		this.currentArticlePage.set(1);
	}

	ngOnInit(): void {
		this.mediumService.getUserPosts(environment.mediumUser).subscribe((posts) => {
			this.articles.set(posts);
			this.isLoading.set(false);
		});
	}

	// Computed properties for articles display
	visibleArticles = computed(() => {
		const startIndex = (this.currentArticlePage() - 1) * this.articlesPerPage();
		return this.articles().slice(startIndex, startIndex + this.articlesPerPage());
	});

	pageNumbers = computed(() => {
		const pageCount = Math.ceil(this.articles().length / this.articlesPerPage());
		return Array.from({ length: pageCount }, (_, i) => i + 1);
	});

	// Navigation classes for responsive pagination
	navigationClasses = computed(() => {
		if (this.isMobile()) {
			return 'flex flex-wrap gap-2 mb-6 justify-center';
		}
		return 'flex gap-4 mb-8';
	});

	// Button classes for responsive pagination buttons
	buttonClasses = computed(() => {
		if (this.isMobile()) {
			return 'w-10 h-10 text-sm';
		}
		return 'w-8 h-8';
	});

	// Methods
	setArticlePage(page: number): void {
		this.currentArticlePage.set(page);
	}

	openExternalLink(url: string): void {
		window.open(url, '_blank');
	}

	// Utility method for tracking
	trackByArticle(index: number, article: MediumPost): string {
		return article.link || index.toString();
	}

	trackByIndex(index: number): number {
		return index;
	}
}
