import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-footer-widget',
	standalone: true,
	imports: [CommonModule, RouterModule],
	template: `
		<footer class="mt-20 border-t border-contrast bg-surface/80 backdrop-blur-sm py-12">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
				<div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-contrast/60">
					<div>
						<div class="flex items-center gap-2 mb-1">
							<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
							<span class="text-xs font-mono font-semibold text-emerald-400">DISPONIBLE PARA TECH LEAD & STAFF AI ROLES</span>
						</div>
						<h3 class="text-lg font-mono font-bold text-white">Jesus Diez</h3>
						<p class="text-xs font-mono text-muted">
							Diseño e implementación de sistemas de IA, GraphRAG y plataformas distribuidas en la nube.
						</p>
					</div>

					<div class="flex items-center gap-3">
						<button
							type="button"
							(click)="scrollToTop()"
							class="px-3 py-1.5 rounded-lg border border-contrast hover:border-blue-500/50 text-xs font-mono text-muted hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
						>
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
							</svg>
							<span>Volver arriba</span>
						</button>
					</div>
				</div>

				<div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs font-mono text-muted">
					<div>
						© {{ currentYear }} Jesus Diez (&#64;jdev-king). Hecho con Angular 19, Tailwind CSS & Archify.
					</div>
					<div class="flex items-center gap-4">
						<a routerLink="/" class="hover:text-blue-400 transition-colors">Inicio</a>
						<a routerLink="/architectures" class="hover:text-blue-400 transition-colors">Arquitecturas</a>
						<a routerLink="/contact" class="hover:text-blue-400 transition-colors">Contacto</a>
						<a href="https://github.com/jdev-king" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition-colors">GitHub</a>
						<a href="https://www.linkedin.com/in/jesusdiezp/" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition-colors">LinkedIn</a>
					</div>
				</div>
			</div>
		</footer>
	`,
	styles: [`
		:host { display: block; }
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
	readonly currentYear = new Date().getFullYear();

	scrollToTop(): void {
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
}
