import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community'; 
import { MERMAID_OPTIONS, provideMarkdown } from 'ngx-markdown';

ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: 'legacy' })

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(),
		provideAnimations(),
		provideMarkdown({
			mermaidOptions: {
				provide: MERMAID_OPTIONS,
				useValue: {
					theme: 'default',
				},
			},
		}),
	]
};
