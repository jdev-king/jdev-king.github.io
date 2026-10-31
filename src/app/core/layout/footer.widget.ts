import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-footer-widget',
	standalone: true,
	imports: [CommonModule, RouterModule],
	template: `
		<footer class="site-footer mt-24">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div class="footer-top flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8">
					<div>
						<div class="section-kicker mb-2">
							<span>DISPONIBLE PARA ROLES TECH LEAD & ARQUITECTURA DE SISTEMAS</span>
						</div>
						<h2 class="text-xl font-bold tracking-tight" style="color: var(--color-text);">
							Jesus Diez · <span class="font-mono text-base font-normal text-muted">&#64;jdev-king</span>
						</h2>
						<p class="text-sm text-muted max-w-xl mt-1">
							Diseño e implementación de sistemas de IA en producción, GraphRAG híbrido, captura de datos en tiempo real (CDC) e interoperabilidad cloud en GCP y AWS.
						</p>
					</div>

					<div class="flex flex-wrap items-center gap-3">
						<a routerLink="/contact" class="btn-tactile btn-primary-eng">
							<span>Contactar para Proyectos o Roles</span>
						</a>
						<button
							type="button"
							(click)="scrollToTop()"
							class="btn-tactile btn-secondary-eng"
							aria-label="Volver al principio de la página"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
							</svg>
							<span>Volver arriba</span>
						</button>
					</div>
				</div>

				<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 text-xs font-mono text-muted">
					<div>
						© {{ currentYear }} Jesus Diez (&#64;jdev-king). Especificaciones compiladas con Angular 19 y Archify.
					</div>
					<div class="flex flex-wrap items-center gap-3">
						<a routerLink="/" class="footer-link">Inicio</a>
						<a routerLink="/architectures" class="footer-link">Arquitecturas RFC</a>
						<a routerLink="/contact" class="footer-link">Contacto</a>
						<a href="https://github.com/jdev-king" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
						<a href="https://www.linkedin.com/in/jesusdiezp/" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a>
					</div>
				</div>
			</div>
		</footer>
	`,
	styles: [`
		:host { display: block; }
		.site-footer {
			background-color: var(--color-bg-elevated);
			border-top: 1px solid var(--color-border);
		}
		.footer-top {
			border-bottom: 1px solid var(--color-border);
		}
		.footer-link {
			display: inline-flex;
			align-items: center;
			min-height: 2.75rem;
			padding: 0 0.5rem;
			color: var(--color-muted);
			text-decoration: none;
			transition: color var(--duration-fast) var(--ease-out);
		}
		@media (hover: hover) and (pointer: fine) {
			.footer-link:hover {
				color: var(--color-accent);
			}
		}
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
