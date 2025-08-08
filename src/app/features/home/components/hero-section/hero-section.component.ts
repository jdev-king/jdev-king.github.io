import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Hero Section Component
 * 
 * Displays the main hero section with responsive design featuring:
 * - Responsive typography and layout
 * - Social media links with enhanced hover effects
 * - Animated entrance effects
 * - Mobile-first responsive design
 * - Accessibility improvements
 */
@Component({
	selector: 'app-hero-section',
	imports: [CommonModule],
	templateUrl: './hero-section.component.html',
	styleUrl: './hero-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
	/**
	 * Social media links configuration
	 */
	readonly socialLinks = [
		{
			href: 'https://github.com/jdev-king',
			icon: 'fa-brands fa-github',
			label: 'GitHub Profile',
			name: 'GitHub'
		},
		{
			href: 'https://www.linkedin.com/in/jesusdiezp/',
			icon: 'fa-brands fa-linkedin',
			label: 'LinkedIn Profile',
			name: 'LinkedIn'
		},
		{
			href: 'https://www.instagram.com/jdev_king/',
			icon: 'fa-brands fa-instagram',
			label: 'Instagram Profile',
			name: 'Instagram'
		},
		{
			href: 'https://jdev-king.medium.com',
			icon: 'fa-brands fa-medium',
			label: 'Medium Profile',
			name: 'Medium'
		}
	] as const;

	/**
	 * Hero content configuration
	 */
	readonly heroContent = {
		title: 'AI Developer',
		description: 'I design and implement end-to-end AI solutions that optimize system performance, automate complex workflows, and drive efficiency.',
		image: {
			src: 'imgs/black_background.jpg',
			alt: 'AI Developer Hero Image'
		}
	} as const;

	/**
	 * TrackBy function for social links to optimize *ngFor performance
	 * @param index - The index of the item
	 * @param item - The social link item
	 * @returns The unique identifier for the item
	 */
	trackBySocialLink(index: number, item: typeof this.socialLinks[number]): string {
		return item.name;
	}
}
